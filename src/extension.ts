/* eslint-disable @typescript-eslint/naming-convention */
import { eventNames } from 'node:process';
import { TextDecoder } from 'util';
import * as vscode from 'vscode';

const FLAMEKIT_INDEX = 'flamekit.index.css';

const EXTENSION_EEX = "eex";
const EXTENSION_EEX_REGEX = /\S+\.eex/;
const EXTENSION_LEEX = "leex";
const EXTENSION_LEEX_REGEX = /\S+\.leex/;
const EXTENSION_REGEX = /\S+\.(eex|leex)/;

export function activate(context: vscode.ExtensionContext) {
	let disposable = newCreateCSSDisposable(context);
	context.subscriptions.push(disposable);
	disposable = newCreateFragmentDisposable(context);
	context.subscriptions.push(disposable);
	disposable = vscode.workspace.onDidSaveTextDocument((d: vscode.TextDocument) => {
		const m = d.fileName.match(EXTENSION_REGEX);
		const active_document = vscode.window.activeTextEditor?.document;
		if (m && active_document) {
			createFragment(active_document);
		}
	});
	context.subscriptions.push(disposable);
}
// get active texteditor

// this method is called when your extension is deactivated
export function deactivate() { }

/*
* @param active_document - 
* Current document in focus. Must end with or`html.eex` or `html.leex`
*
* @returns Absolute path of document in focus
*/
const getCallingPath = ({ active_document, fs = false }: {
	active_document: vscode.TextDocument,
	fs?: boolean
}): string => {
	const x = fs ? 'fspath' : 'path';
	return fs ? active_document.uri.fsPath : active_document.uri.path;
};

/*
* Assuming the standard project layout, returning a relative child path of `/lib/`.
*
* Example:
* # file:///tmp/project/lib/my_web/xyz/index.html.leex
* active_path = "/my_web/xyz/index.html.leex"
* 
* @param active_document - Current document in focus. Must end with or`html.eex` or `html.leex`
*
* @returns A relative child file path of `/lib/`
*/
const getActivePath = ({ active_document, fs = false }: {
	active_document: vscode.TextDocument,
	fs?: boolean
}): string | undefined => {
	return (
		fs
			? getFullActivePath({ active_document: active_document })
			: getCallingPath({ active_document: active_document, fs: fs }).split('/lib/')[1]
	);
};

const getFullActivePath = ({ active_document }: {
	active_document: vscode.TextDocument
}) => {
	return getCallingPath({ active_document: active_document, fs: true });
};

interface IPaths {
	calling_path: string;
	active_path: string | undefined;
}

const getPaths = ({ active_document }: {
	active_document: vscode.TextDocument
}): IPaths => {
	return {
		calling_path: getCallingPath({ active_document: active_document }),
		active_path: getActivePath({ active_document: active_document })
	}
};

const getActiveFileName = ({ active_document, fs = false }: {
	active_document: vscode.TextDocument
	fs?: boolean
}): string | null => {
	const m = getCallingPath({ active_document: active_document, fs: fs }).match(/[\w,\s]+\.html\.(eex|leex)$/);
	return m ? m[0] : null;
};

/*
* Assuming the standard project layout, returning a relative child path of `/lib/`.
*
* Example:
* # file:///tmp/project/lib/my_web/xyz/index.html.leex
* directory = "/my_web/xyz/"
* 
* @param active_document - Current document in focus. Must end with or`html.eex` or `html.leex`
*
* @returns A relative child folder path of `/lib/`
*/
const getDirectory = ({ active_document, fs = false }: {
	active_document: vscode.TextDocument,
	fs?: boolean
}): string | null => {
	const pp = getActivePath({ active_document: active_document, fs: fs });
	if (pp !== undefined) {
		const name = getActiveFileName({ active_document: active_document, fs: fs });
		return name ? pp.split(name)[0] : null;
	}
	return null;
};

interface IWorkpingPaths extends IPaths {
	assets_path: string;
	css_path: string;
}

const getWorkingPaths = ({ wsf, active_document }: {
	wsf: readonly vscode.WorkspaceFolder[],
	active_document: vscode.TextDocument
}): IWorkpingPaths => {
	const root_uri = wsf[0].uri;
	const assets_path = `${root_uri.toString()}/assets`
	const directory = getDirectory({ active_document: active_document });
	const css_path = `${assets_path}/css/${directory}`;
	const paths = getPaths({ active_document: active_document });
	const new_paths = { assets_path: assets_path, css_path: css_path };
	return Object.assign({}, new_paths, paths);
};

const getFlamekitCSSIndex = ({ assets_path }: { assets_path: string }): vscode.Uri => {
	return vscode.Uri.parse(`${assets_path}/css/${FLAMEKIT_INDEX}`);
};

const createCSSPath = ({ css_path }: {
	css_path: string
}): void => {
	const css_uri = vscode.Uri.parse(css_path);
	let msg = `Creating directory ${css_path}`;
	vscode.window.showInformationMessage(msg);
	vscode.workspace.fs.createDirectory(css_uri);
};

const createNewCSS = ({ active_path, new_css_path }: {
	active_path: string,
	new_css_path: string
}): string => {
	vscode.window.showInformationMessage(`Creating ${new_css_path}`);
	const css_import = `@import "./${active_path}.css";`;
	const new_css_uri = vscode.Uri.parse(new_css_path);
	const buff = Buffer.from(`/* ${css_import} */`, 'utf-8');
	vscode.workspace.fs.writeFile(new_css_uri, buff);
	return css_import;
};

const createFlamekitCSS = ({ data, flamekit_uri, css_import }: {
	data: any,
	flamekit_uri: vscode.Uri,
	css_import: string
}) => {
	const read_string = data ? new TextDecoder('utf-8').decode(data) : "";
	const cache = new Map();
	const existing_imports: string[] = [];
	read_string.split("\n").forEach(x => {
		x = x.trim();
		if (x != '' && x.search(css_import) === -1 && !cache.has(x)) {
			cache.set(x, 0);
			existing_imports.push(x);
		}
	});
	existing_imports.push(css_import + "\n");
	vscode.window.showInformationMessage(`Adding ${css_import}`);
	const buff = Buffer.from(existing_imports.join("\n"), 'utf-8');
	vscode.workspace.fs.writeFile(flamekit_uri, buff);
};

const createImports = ({ flamekit_uri, css_import }: {
	flamekit_uri: vscode.Uri,
	css_import: string
}) => {
	vscode.workspace.fs
		.readFile(flamekit_uri)
		.then(x => createFlamekitCSS({ data: x, flamekit_uri: flamekit_uri, css_import: css_import }));
};

const createCSSFiles = ({ wsf, active_document }: {
	wsf: readonly vscode.WorkspaceFolder[],
	active_document: vscode.TextDocument
}): void => {
	const { assets_path, active_path, css_path } = getWorkingPaths({ wsf: wsf, active_document: active_document });
	if (active_path) {
		const flamekit_uri = getFlamekitCSSIndex({ assets_path: assets_path });
		createCSSPath({ css_path: css_path });
		const active_filename = getActiveFileName({ active_document: active_document });
		const new_css_path = `${vscode.Uri.parse(css_path).toString()}${active_filename}.css`;
		const css_import = createNewCSS({ active_path: active_path, new_css_path: new_css_path });
		const call = () => createImports({ flamekit_uri: flamekit_uri, css_import: css_import });
		vscode.workspace.fs.stat(flamekit_uri).then(_ => { call(); }, _ => {
			vscode.window.showInformationMessage(`Creating ${flamekit_uri.toString()}`);
			vscode.workspace.fs.writeFile(flamekit_uri, Buffer.from(css_import + "\n", 'utf-8'));
		});
	}
};

const showImproperFileError = ({ active_document }: {
	active_document: vscode.TextDocument
}): void => {
	const calling_path = getCallingPath({ active_document: active_document });
	const msg = `
	Command must be executed in a file ending with \`html.leex\` or \`html.eex\`. : ${calling_path}
	`;
	vscode.window.showErrorMessage(msg);
};

const showInvalidPathError = ({ active_document }: {
	active_document: vscode.TextDocument
}): void => {
	const invalid_path = getCallingPath({ active_document: active_document });
	vscode.window.showErrorMessage(`Invalid path: ${invalid_path}`);
};

const showNoWorkspaceError = (): void => {
	vscode.window.showErrorMessage('Command must be executed within a Workspace.');
};


const newCreateCSSDisposable = (context: vscode.ExtensionContext) => {
	return vscode.commands.registerCommand('runexecFlamekit.createCSS', () => {
		const wsf: readonly vscode.WorkspaceFolder[] | undefined = vscode.workspace.workspaceFolders;
		const active_document = vscode.window.activeTextEditor?.document;
		if (active_document !== undefined)
			switch (true) {
				case !getActivePath({ active_document: active_document }):
					showInvalidPathError({ active_document: active_document });
					break;
				case !getActiveFileName({ active_document: active_document }):
					showImproperFileError({ active_document: active_document });
					break;
				default:
					wsf !== undefined
						? createCSSFiles({ wsf: wsf, active_document: active_document })
						: showNoWorkspaceError();
			}
	});
};

enum LineType {
	Fragment,
	FragmentArray
}

const FRAGMENT_REGEX = /fragment\{\S+\}/;
const FRAGMENT_GROUP_REGEX = /fragment\{(\S+)\}/;
const FRAGMENT_ARRAY_REGEX = /fragment\{\[.*\]\}/;
const FRAGMENT_ARRAY_GROUP_REGEX = /fragment\{\[(.*)\]\}/;
const matchFragment = (x: string): string | null => (x.match(FRAGMENT_REGEX) || [null])[0];
const isFragment = (x: string) => matchFragment(x) !== null;
const matchFragmentArray = (x: string): string | null => (x.match(FRAGMENT_ARRAY_GROUP_REGEX) || [null, null])[1];
const isFragmentArray = (x: string) => matchFragmentArray(x) !== null;
const fragmentFile = (x: string) => `_${x}.html`;
const fragmentArrayFiles = (x: string): string[] => {
	const group = fragmentArrayGroup(x);
	const fragments = group ? group.replace(', ', ',').split(',') : false;
	return fragments ? fragments.map(x => fragmentFile(x)) : [];
};
const fragmentTemplate = (x: string) => `<%= render "${fragmentFile(x)}" %>`;
const fragmentGroup = (x: string) => (x.match(FRAGMENT_GROUP_REGEX) || [])[1];
const fragmentArrayGroup = (x: string) => (x.match(FRAGMENT_ARRAY_GROUP_REGEX) || [])[1];
const fragmentTag = (x: string) => (x.match(FRAGMENT_REGEX) || [''])[0];
const fragmentArrayTag = (x: string) => (x.match(FRAGMENT_ARRAY_REGEX) || [''])[0];
const fragmentTagLength = (x: string) => fragmentTag(x).length;
const fragmentArrayTagLength = (x: string) => fragmentArrayTag(x).length;
const fragmentString = (x: string) => fragmentTemplate(fragmentGroup(x));
const fragmentArrayString = (x: string) => {
	const group = fragmentArrayGroup(x);
	const fragments = group ? group.replace(', ', ',').split(',') : false;
	return fragments ? fragments.map(x => fragmentTemplate(x)).join("\n") : "";
};
const createFragment = (active_document: vscode.TextDocument) => {
	const content = active_document.getText().toString();
	let line: string | undefined,
		line_type: LineType | undefined,
		line_number = 0,
		display_number = 0;
	const [fragment_line] = content.split("\n").filter((line, idx) => isFragment(line) && ((line_number = idx) === idx));
	const [fragment_array_line] = content.split("\n").filter((line, idx) => isFragmentArray(line) && ((line_number = idx) === idx));
	if ((line = fragment_line || fragment_array_line)) {
		display_number = line_number + 1;
		vscode.window.showInformationMessage(`Fragment found on line number: ${display_number}`);
		line_type = fragment_line ? LineType.Fragment : LineType.FragmentArray;
		const getTag = line_type === LineType.Fragment ? fragmentTag : fragmentArrayTag,
			getTagLength = line_type === LineType.Fragment ? fragmentTagLength : fragmentArrayTagLength,
			getNewFragment = line_type === LineType.Fragment ? fragmentString : fragmentArrayString;
		const tag = getTag(line);
		const start_line = line_number,
			start_char = line.indexOf(tag),
			start_position = new vscode.Position(start_line, start_char);
		const end_line = line_number,
			end_char = start_char + getTagLength(line),
			end_position = new vscode.Position(end_line, end_char);
		const replace_range = new vscode.Range(start_position, end_position);
		const new_fragment = getNewFragment(line);
		vscode.window.activeTextEditor?.edit((edit: vscode.TextEditorEdit) => {
			edit.replace(replace_range, new_fragment);
			const directory = getDirectory({ active_document: active_document });
			const fs_path = getDirectory({ active_document: active_document, fs: true });
			line = line || ''; // shut up compiler => line || ''
			switch (line_type) {
				case LineType.Fragment:
					const new_file = fragmentFile(fragmentGroup(line));
					const path = `${directory}${new_file}`;
					const uri = vscode.Uri.parse(fs_path + new_file + '.' + EXTENSION_EEX);
					vscode.workspace.fs.stat(uri).then((_) => { }, _ => {
						vscode.window.showInformationMessage(`Creating file: ${path}`);
						vscode.workspace.fs.writeFile(uri, Buffer.from('', 'utf-8'));
					});
					break;
				case LineType.FragmentArray:
					const new_files = fragmentArrayFiles(line);
					const paths = new_files.map(x => `${directory}${x}`);
					const uris = new_files.map(x => vscode.Uri.parse(fs_path + x + '.' + EXTENSION_EEX));
					uris.forEach((uri, idx) => {
						const fp = paths[idx];
						vscode.workspace.fs.stat(uri).then((_) => { }, _ => {
							vscode.window.showInformationMessage(`Creating file: ${fp}`);
							vscode.workspace.fs.writeFile(uri, Buffer.from('', 'utf-8'));
						});
					});
					break;
			}
		});
	}
};

const newCreateFragmentDisposable = (context: vscode.ExtensionContext) => {
	return vscode.commands.registerCommand('runexecFlamekit.createFragment', () => {
		const active_document = vscode.window.activeTextEditor?.document;
		if (active_document) createFragment(active_document);
	});
};
