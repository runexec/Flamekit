import { TextDecoder } from 'util';
import * as vscode from 'vscode';

const FLAMEKIT_INDEX = 'flamekit.index.css';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('runexecFlamekit.createCSS', () => {
		const wsf: readonly vscode.WorkspaceFolder[] | undefined = vscode.workspace.workspaceFolders;
		const active_document = vscode.window.activeTextEditor?.document;
		if (active_document !== undefined)
			switch (true) {
				case !getParentPath(active_document):
					showInvalidPathError(active_document);
					break;
				case !getParentFileName(active_document):
					showImproperFileError(active_document);
					break;
				default:
					wsf !== undefined
						? createCSSFiles(wsf, active_document)
						: showNoWorkspaceError();
			}
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }


/*
* @param active_document - 
* Current document in focus. Must end with or`html.eex` or `html.leex`
*
* @returns Absolute path of document in focus
*/
const getCallingPath = (active_document: vscode.TextDocument): string => {
	return active_document.uri.path;
};

/*
* Assuming the standard project layout, returning a relative child path of `/lib/`.
*
* Example:
* # file:///tmp/project/lib/my_web/xyz/index.html.leex
* parent_path = "/my_web/xyz/index.html.leex"
* 
* @param active_document - Current document in focus. Must end with or`html.eex` or `html.leex`
*
* @returns A relative child file path of `/lib/`
*/
const getParentPath = (active_document: vscode.TextDocument): string | undefined => {
	return getCallingPath(active_document).split('/lib/')[1];
};

interface IPaths {
	calling_path: string;
	parent_path: string | undefined;
}

const getPaths = (active_document: vscode.TextDocument): IPaths => {
	return {
		calling_path: getCallingPath(active_document),
		parent_path: getParentPath(active_document)
	}
};

const getParentFileName = (active_document: vscode.TextDocument): string | null => {
	const m = getCallingPath(active_document).match(/[\w,\s]+\.html\.(eex|leex)$/);
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
const getDirectory = (active_document: vscode.TextDocument): string | null => {
	const pp = getParentPath(active_document);
	if (pp !== undefined) {
		const name = getParentFileName(active_document);
		return name ? pp.split(name)[0] : null;
	}
	return null;
};

interface IWorkpingPaths extends IPaths {
	assets_path: string;
	css_path: string;
}

const getWorkingPaths = (wsf: readonly vscode.WorkspaceFolder[], active_document: vscode.TextDocument): IWorkpingPaths => {
	const root_uri = wsf[0].uri;
	const assets_path = `${root_uri.toString()}/assets`
	const directory = getDirectory(active_document);
	const css_path = `${assets_path}/css/${directory}`;
	const paths = getPaths(active_document);
	const new_paths = { assets_path: assets_path, css_path: css_path };
	return Object.assign({}, new_paths, paths)
};

const getFlamekitCSSIndex = (assets_path: string) => {
	return vscode.Uri.parse(`${assets_path}/css/${FLAMEKIT_INDEX}`);
};

const createCSSFiles = (wsf: readonly vscode.WorkspaceFolder[], active_document: vscode.TextDocument): void => {
	const { assets_path, parent_path, css_path } = getWorkingPaths(wsf, active_document);
	const flamekit_uri = getFlamekitCSSIndex(assets_path);
	let msg = `Creating directory ${css_path}`;
	vscode.window.showInformationMessage(msg);
	const css_uri = vscode.Uri.parse(css_path);
	vscode.workspace.fs.createDirectory(css_uri);
	const parent_filename = getParentFileName(active_document);
	const new_css_path = `${css_uri.toString()}${parent_filename}.css`;
	msg = `Creating ${new_css_path}`;
	vscode.window.showInformationMessage(msg);
	const css_import = `@import "./${parent_path}.css";`;
	const new_css_uri = vscode.Uri.parse(new_css_path);
	let buff = Buffer.from(`/* ${css_import} */`, 'utf-8');
	vscode.workspace.fs.writeFile(new_css_uri, buff);
	const createImports = () => {
		vscode.workspace.fs
			.readFile(flamekit_uri)
			.then(data => {
				const read_string = data ? new TextDecoder('utf-8').decode(data) : "";
				const cache = new Map();
				const existing_imports: string[] = [];
				read_string.split("\n").forEach(x => {
					x = x.trim();
					if (x != '' && x.search(css_import) === -1 && !cache.has(x)) {
						cache.set(x, true)
						existing_imports.push(x);
					}
				});
				existing_imports.push(css_import + "\n");
				msg = `Adding ${css_import}`;
				vscode.window.showInformationMessage(msg);
				buff = Buffer.from(existing_imports.join("\n"), 'utf-8');
				vscode.workspace.fs.writeFile(flamekit_uri, buff);
			});
	}
	vscode.workspace.fs.stat(flamekit_uri).then(_ => { createImports(); }, _ => {
		vscode.window.showInformationMessage(`Creating ${flamekit_uri.toString()}`);
		vscode.workspace.fs.writeFile(flamekit_uri, Buffer.from(css_import + "\n", 'utf-8'));
	});
};

const showImproperFileError = (active_document: vscode.TextDocument): void => {
	const calling_path = getCallingPath(active_document);
	const msg = `
	Command must be executed in a file ending with \`html.leex\` or \`html.eex\`. : ${calling_path}
	`;
	vscode.window.showErrorMessage(msg);
};

const showInvalidPathError = (active_document: vscode.TextDocument): void => {
	const invalid_path = getCallingPath(active_document);
	vscode.window.showErrorMessage(`Invalid path: ${invalid_path}`);
};

const showNoWorkspaceError = (): void => {
	vscode.window.showErrorMessage('Command must be executed within a Workspace.');
};