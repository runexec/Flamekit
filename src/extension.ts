/* eslint-disable @typescript-eslint/naming-convention */
import { eventNames } from 'node:process';
import { TextDecoder } from 'util';
import * as vscode from 'vscode';

const FLAMEKIT_INDEX = 'flamekit.index.css';

const EXTENSION_EEX = "eex",
	EXTENSION_EEX_REGEX = /\S+\.eex/,
	EXTENSION_LEEX = "leex",
	EXTENSION_LEEX_REGEX = /\S+\.leex/,
	EXTENSION_REGEX = /\S+\.(eex|leex)/;

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
	return fs && active_document.uri.fsPath || active_document.uri.path;
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
	};
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
	const root_uri = wsf[0].uri,
		assets_path = `${root_uri.toString()}/assets`,
		directory = getDirectory({ active_document: active_document }),
		css_path = `${assets_path}/css/${directory}`,
		paths = getPaths({ active_document: active_document }),
		new_paths = { assets_path: assets_path, css_path: css_path };
	return Object.assign({}, new_paths, paths);
};

const getFlamekitCSSIndex = ({ assets_path }: { assets_path: string }): vscode.Uri => {
	return vscode.Uri.parse(`${assets_path}/css/${FLAMEKIT_INDEX}`);
};

const createCSSPath = ({ css_path }: {
	css_path: string
}): void => {
	const css_uri = vscode.Uri.parse(css_path),
		msg = `Creating directory ${css_path}`;
	vscode.window.showInformationMessage(msg);
	vscode.workspace.fs.createDirectory(css_uri);
};

const createNewCSS = ({ active_path, new_css_path }: {
	active_path: string,
	new_css_path: string
}): string => {
	vscode.window.showInformationMessage(`Creating ${new_css_path}`);
	const css_import = `@import "./${active_path}.css";`,
		new_css_uri = vscode.Uri.parse(new_css_path),
		buff = Buffer.from(`/* ${css_import} */`, 'utf-8');
	vscode.workspace.fs.writeFile(new_css_uri, buff);
	return css_import;
};

const createFlamekitCSS = ({ data, flamekit_uri, css_import }: {
	data: any,
	flamekit_uri: vscode.Uri,
	css_import: string
}) => {
	const read_string = data ? new TextDecoder('utf-8').decode(data) : '',
		cache = new Map(),
		existing_imports: string[] = [];
	read_string.split("\n").forEach(x => {
		x = x.trim();
		if (x !== '' && x.search(css_import) === -1 && !cache.has(x)) {
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
		createCSSPath({ css_path: css_path });
		const flamekit_uri = getFlamekitCSSIndex({ assets_path: assets_path }),
			active_filename = getActiveFileName({ active_document: active_document }),
			new_css_path = `${vscode.Uri.parse(css_path).toString()}${active_filename}.css`,
			css_import = createNewCSS({ active_path: active_path, new_css_path: new_css_path }),
			call = () => createImports({ flamekit_uri: flamekit_uri, css_import: css_import });
		vscode.workspace.fs.stat(flamekit_uri).then(_ => { call(); }, _ => {
			vscode.window.showInformationMessage(`Creating ${flamekit_uri.toString()}`);
			vscode.workspace.fs.writeFile(flamekit_uri, Buffer.from(css_import + "\n", 'utf-8'));
		});
	}
};

const showImproperFileError = ({ active_document }: {
	active_document: vscode.TextDocument
}): void => {
	const calling_path = getCallingPath({ active_document: active_document }),
		msg = `
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
	FragmentArray,
	FragmentLive,
	FragmentLiveArray,
	FragmentList,
	FragmentLiveList,
	Unknown
}

const FRAGMENT_REGEX = /=f\{\S+\}/,
	FRAGMENT_GROUP_REGEX = /=f\{(\S+)\}/,
	FRAGMENT_ARRAY_REGEX = /=f\{\[.*\]\}/,
	FRAGMENT_ARRAY_GROUP_REGEX = /=f\{\[(.*)\]\}/,
	FRAGMENT_LIVE_REGEX = /=lf\{\S+\}/,
	FRAGMENT_LIVE_GROUP_REGEX = /=lf\{(\S+)\}/,
	FRAGMENT_LIVE_ARRAY_REGEX = /=lf\{\[.*\]\}/,
	FRAGMENT_LIVE_ARRAY_GROUP_REGEX = /=lf\{\[(.*)\]\}/,
	FRAGMENT_LIST_GROUP_REGEX = />(=l\{\[.*)<\//,
	FRAGMENT_LIVE_LIST_GROUP_REGEX = />(=ll\{\[.*)<\//;

const fragmentFile = (x: string) => `_${x.trimLeft()}.html`,
	fragmentTemplate = (x: string) => `<%= render "${fragmentFile(x)}" %>`,
	fragmentLiveFile = (x: string) => `_${x.trimLeft()}_live.html`,
	fragmentLiveTemplate = (x: string) => `<%= render "${fragmentLiveFile(x)}" %>`,
	fragmentListFile = (x: string) => `_${x.trimLeft().replace(/[\],\[,\},\{]/, '')}.html`,
	_store_fragmentListTemplate: [tagStart: string, tagEnd: string][] = [],
	fragmentListTemplate = (x: string, tag: string) => {
		const tagStart = '<' + tag + '>',
			tagEnd = '</' + tagStart.split(' ')[0].split('<')[1] + '>';
		_store_fragmentListTemplate.push([tagStart, tagEnd]);
		return `${tagStart}<%= render "${fragmentListFile(x)}" %>${tagEnd}`;
	};

const matchFragment = (x: string): string | null => (x.match(FRAGMENT_REGEX) || [null])[0],
	matchFragmentLive = (x: string): string | null => (x.match(FRAGMENT_LIVE_REGEX) || [null])[0],
	matchFragmentArray = (x: string): string | null => (x.match(FRAGMENT_ARRAY_GROUP_REGEX) || [null, null])[1],
	matchFragmentLiveArray = (x: string): string | null => (x.match(FRAGMENT_LIVE_ARRAY_GROUP_REGEX) || [null, null])[1],
	matchFragmentList = (x: string): string | null => (x.match(FRAGMENT_LIST_GROUP_REGEX) || [null, null])[1],
	matchFragmentLiveList = (x: string): string | null => (x.match(FRAGMENT_LIVE_LIST_GROUP_REGEX) || [null, null])[1];

const isFragment = (x: string) => matchFragment(x) !== null,
	isFragmentLive = (x: string) => matchFragmentLive(x) !== null,
	isFragmentArray = (x: string) => matchFragmentArray(x) !== null,
	isFragmentLiveArray = (x: string) => matchFragmentLiveArray(x) !== null,
	isFragmentList = (x: string) => matchFragmentList(x) !== null,
	isFragmentList_LineType = (x: LineType) => x === LineType.FragmentList || LineType.FragmentLiveList,
	isFragmentLiveList = (x: string) => matchFragmentLiveList(x) !== null;

const fragmentGroup = (x: string) => (x.match(FRAGMENT_GROUP_REGEX) || [])[1],
	fragmentLiveGroup = (x: string) => (x.match(FRAGMENT_LIVE_GROUP_REGEX) || [])[1],
	fragmentArrayGroup = (x: string) => (x.match(FRAGMENT_ARRAY_GROUP_REGEX) || [])[1],
	fragmentLiveArrayGroup = (x: string) => (x.match(FRAGMENT_LIVE_ARRAY_GROUP_REGEX) || [])[1],
	fragmentListGroup = (x: string) => (x.match(FRAGMENT_LIST_GROUP_REGEX) || [])[1],
	fragmentLiveListGroup = (x: string) => (x.match(FRAGMENT_LIVE_LIST_GROUP_REGEX) || [])[1];

const fragmentTag = (x: string) => (x.match(FRAGMENT_REGEX) || [''])[0],
	fragmentLiveTag = (x: string) => (x.match(FRAGMENT_LIVE_REGEX) || [''])[0],
	fragmentArrayTag = (x: string) => (x.match(FRAGMENT_ARRAY_REGEX) || [''])[0],
	fragmentLiveArrayTag = (x: string) => (x.match(FRAGMENT_LIVE_ARRAY_REGEX) || [''])[0],
	fragmentListTag = (x: string) => (x.match(FRAGMENT_LIST_GROUP_REGEX) || [''])[0],
	fragmentLiveListTag = (x: string) => (x.match(FRAGMENT_LIVE_LIST_GROUP_REGEX) || [''])[0];

const fragmentTagLength = (x: string) => fragmentTag(x).length,
	fragmentLiveTagLength = (x: string) => fragmentLiveTag(x).length,
	fragmentArrayTagLength = (x: string) => fragmentArrayTag(x).length,
	fragmentLiveArrayTagLength = (x: string) => fragmentLiveArrayTag(x).length,
	fragmentListTagLength = (x: string) => fragmentListTag(x).length,
	fragmentLiveListTagLength = (x: string) => fragmentLiveListTag(x).length;

const fragmentString = (x: string) => fragmentTemplate(fragmentGroup(x)),
	fragmentLiveString = (x: string) => fragmentLiveTemplate(fragmentLiveGroup(x)),
	fragmentArrayString = (x: string) => {
		const group = fragmentArrayGroup(x);
		const fragments = group ? group.split(', ') : false;
		return fragments ? fragments.map(x => fragmentTemplate(x)).join("\n") : "";
	},
	fragmentListString = (x: string) => {
		const group = fragmentListGroup(x),
			remove_brackets = (x: string) => x.replace(/((=l\{\[)|(\]\}))/g, ''),
			fragments = group ? remove_brackets(group).split(', ') : false;
		if (fragments) {
			const tag = (x.match(/<(.*)\//) || ['', 'unknownTag'])[1].split('>')[0];
			return fragments.map(x => fragmentListTemplate(x, tag)).join('\n');
		}
		return '';
	},
	fragmentLiveArrayString = (x: string) => {
		const group = fragmentLiveArrayGroup(x);
		const fragments = group ? group.split(', ') : false;
		return fragments ? fragments.map(x => fragmentLiveTemplate(x)).join("\n") : "";
	},
	fragmentLiveListString = (x: string) => {
		const group = fragmentLiveListGroup(x);
		console.log(group);
		const fragments = group ? group.split(', ') : false;
		return fragments ? fragments.map(x => fragmentLiveTemplate(x)).join("\n") : "";
	},
	fragmentArrayFiles = (x: string): string[] => {
		const group = fragmentArrayGroup(x),
			fragments = group ? group.split(', ') : false;
		return fragments ? fragments.map(x => fragmentFile(x)) : [];
	},
	fragmentLiveArrayFiles = (x: string): string[] => {
		const group = fragmentLiveArrayGroup(x),
			fragments = group ? group.split(', ') : false;
		return fragments ? fragments.map(x => fragmentLiveFile(x)) : [];
	},
	fragmentListFiles = (x: string): string[] => {
		const group = fragmentListGroup(x);
		let fragments: string[] | undefined;
		if (group) {
			const m = group.match(/\[(.*)\]/);
			m && (fragments = m[1].split(', '));
			console.log(fragments);
		}
		return fragments ? fragments.map(x => fragmentListFile(x)) : [];
	},
	fragmentLiveListFiles = (x: string): string[] => {
		const group = fragmentLiveListGroup(x),
			fragments = group ? group.split(', ') : false;
		return fragments ? fragments.map(x => fragmentLiveFile(x)) : [];
	};

const isValidFragment = (x: string) => {
	return [
		isFragment,
		isFragmentLive,
		isFragmentArray,
		isFragmentLiveArray,
		isFragmentList,
		isFragmentLiveList
	].some((f) => f(x));
};

const fragmentData = (content: string[]): {
	line: string | undefined,
	line_number: number,
	line_type: LineType
} => {
	let line_type = LineType.Unknown,
		line_number = 0;
	const lines = content.filter((line, idx) => isValidFragment(line) && ((line_number = idx) === idx)),
		line = lines.filter(x => x !== undefined)[0];
	if (line !== undefined) {
		switch (true) {
			case isFragment(line): line_type = LineType.Fragment; break;
			case isFragmentLive(line): line_type = LineType.FragmentLive; break;
			// List must come before Array because similar regular expression
			case isFragmentList(line): line_type = LineType.FragmentList; break;
			case isFragmentLiveList(line): line_type = LineType.FragmentLiveList; break;
			case isFragmentArray(line): line_type = LineType.FragmentArray; break;
			case isFragmentLiveArray(line): line_type = LineType.FragmentLiveArray; break;
			default: line_type = LineType.Unknown;
		}
	}
	return { line: line, line_number: line_number, line_type: line_type };
};

const _createFragment = (directory: string, fs_path: string, line: string) => {
	const new_file = fragmentFile(fragmentGroup(line)),
		path = `${directory}${new_file}`,
		uri = vscode.Uri.parse(fs_path + new_file + '.' + EXTENSION_EEX);
	vscode.workspace.fs.stat(uri).then((_) => { }, _ => {
		vscode.window.showInformationMessage(`Creating file: ${path}`);
		vscode.workspace.fs.writeFile(uri, Buffer.from('', 'utf-8'));
	});
};

const _createFragmentLive = (directory: string, fs_path: string, line: string) => {
	const new_file = fragmentFile(fragmentLiveGroup(line)).replace(/\.html/, '_live.html'),
		path = `${directory}${new_file}`,
		uri = vscode.Uri.parse(fs_path + new_file + '.' + EXTENSION_LEEX);
	vscode.workspace.fs.stat(uri).then((_) => { }, _ => {
		vscode.window.showInformationMessage(`Creating file: ${path}`);
		vscode.workspace.fs.writeFile(uri, Buffer.from('', 'utf-8'));
	});
};

const _createFragmentArray = (directory: string, fs_path: string, line: string) => {
	const new_files = fragmentArrayFiles(line),
		paths = new_files.map(x => `${directory}${x}`),
		uris = new_files.map(x => vscode.Uri.parse(fs_path + x + '.' + EXTENSION_EEX));
	uris.forEach((uri, idx) => {
		const fp = paths[idx];
		vscode.workspace.fs.stat(uri).then((_) => { }, _ => {
			vscode.window.showInformationMessage(`Creating file: ${fp}`);
			vscode.workspace.fs.writeFile(uri, Buffer.from('', 'utf-8'));
		});
	});
};

const _createFragmentLiveArray = (directory: string, fs_path: string, line: string) => {
	const new_files = fragmentLiveArrayFiles(line),
		paths = new_files.map(x => `${directory}${x.replace(/\.html/, '_live.html')}`),
		uris = new_files.map(x => vscode.Uri.parse(fs_path + x + '.' + EXTENSION_LEEX));
	uris.forEach((uri, idx) => {
		const fp = paths[idx];
		vscode.workspace.fs.stat(uri).then((_) => { }, _ => {
			vscode.window.showInformationMessage(`Creating file: ${fp}`);
			vscode.workspace.fs.writeFile(uri, Buffer.from('', 'utf-8'));
		});
	});
};

const _createFragmentList = (directory: string, fs_path: string, line: string) => {
	const new_files = fragmentListFiles(line),
		paths = new_files.map(x => `${directory}${x})}`),
		uris = new_files.map(x => vscode.Uri.parse(fs_path + x + '.' + EXTENSION_LEEX));
	uris.forEach((uri, idx) => {
		const fp = paths[idx];
		vscode.workspace.fs.stat(uri).then((_) => { }, _ => {
			vscode.window.showInformationMessage(`Creating file: ${fp}`);
			vscode.workspace.fs.writeFile(uri, Buffer.from('', 'utf-8'));
		});
	});
};

const _createFragmentLiveList = (directory: string, fs_path: string, line: string) => {
	const new_files = fragmentLiveListFiles(line),
		paths = new_files.map(x => `${directory}${x.replace(/\.html/, '_live.html')}`),
		uris = new_files.map(x => vscode.Uri.parse(fs_path + x + '.' + EXTENSION_LEEX));
	uris.forEach((uri, idx) => {
		const fp = paths[idx];
		vscode.workspace.fs.stat(uri).then((_) => { }, _ => {
			vscode.window.showInformationMessage(`Creating file: ${fp}`);
			vscode.workspace.fs.writeFile(uri, Buffer.from('', 'utf-8'));
		});
	});
};

interface ILineTypeFragmentCalls {
	getTag: Function,
	getTagLength: Function,
	getNewFragment: Function,
	save: Function,
}

const fragment_data = {
	getTag: fragmentTag,
	getTagLength: fragmentTagLength,
	getNewFragment: fragmentString,
	save: _createFragment
},
	fragment_array_data = {
		getTag: fragmentArrayTag,
		getTagLength: fragmentArrayTagLength,
		getNewFragment: fragmentArrayString,
		save: _createFragmentArray
	},
	fragment_live_data = {
		getTag: fragmentLiveTag,
		getTagLength: fragmentLiveTagLength,
		getNewFragment: fragmentLiveString,
		save: _createFragmentLive
	},
	fragment_live_array_data = {
		getTag: fragmentLiveArrayTag,
		getTagLength: fragmentLiveArrayTagLength,
		getNewFragment: fragmentLiveArrayString,
		save: _createFragmentLiveArray
	},
	fragment_live_list_data = {
		getTag: fragmentLiveListTag,
		getTagLength: fragmentLiveListTagLength,
		getNewFragment: fragmentLiveListString,
		save: _createFragmentLiveList
	},
	fragment_list_data = {
		getTag: fragmentListTag,
		getTagLength: fragmentListTagLength,
		getNewFragment: fragmentListString,
		save: _createFragmentList
	},
	fragment_unknown_data = {
		getTag: (x: string) => { },
		getTagLength: (x: string) => { },
		getNewFragment: (x: string) => { },
		save: (_directory: string, _fs_path: string, _line: string) => { },
	};

const fragmentLineTypeData = (line_type: LineType): ILineTypeFragmentCalls => {
	let calls = fragment_unknown_data;
	switch (line_type) {
		case LineType.Fragment: calls = fragment_data; break;
		case LineType.FragmentLive: calls = fragment_live_data; break;
		case LineType.FragmentArray: calls = fragment_array_data; break;
		case LineType.FragmentLiveArray: calls = fragment_live_array_data; break;
		case LineType.FragmentList: calls = fragment_list_data; break;
		case LineType.FragmentLiveList: calls = fragment_live_list_data; break;
		default: calls = fragment_unknown_data; break;
	}
	return calls;
};

const isValidCreateFragment = (x: LineType) => {
	return [
		LineType.Fragment,
		LineType.FragmentArray,
		LineType.FragmentLive,
		LineType.FragmentLiveArray,
		LineType.FragmentList,
		LineType.FragmentLiveList,
	].some(y => y === x);
};

const createFragment = (active_document: vscode.TextDocument) => {
	const content = active_document.getText().toString().split("\n");
	const { line, line_number, line_type } = fragmentData(content);
	if (line && isValidCreateFragment(line_type)) {
		const display_number = line_number + 1;
		vscode.window.showInformationMessage(`Fragment found on line number: ${display_number}`);
		const { save, getTag, getTagLength, getNewFragment } = fragmentLineTypeData(line_type),
			new_fragment = getNewFragment(line),
			tag = getTag(line),
			tagStart = _store_fragmentListTemplate[0][0],
			tagEnd = _store_fragmentListTemplate[0][1];
		tagStart ? _store_fragmentListTemplate.pop() : null;
		const start_line = line_number,
			start_char = isFragmentList_LineType(line_type)
				? line.indexOf(tagStart)
				: line.indexOf(tag),
			start_position = new vscode.Position(start_line, start_char),
			end_line = line_number,
			end_char = isFragmentList_LineType(line_type)
				? start_char + tagStart.length + tagEnd.length + getTagLength(line)
				: start_char + getTagLength(line),
			end_position = new vscode.Position(end_line, end_char),
			replace_range = new vscode.Range(start_position, end_position);
		vscode.window.activeTextEditor?.edit((edit: vscode.TextEditorEdit) => {
			edit.replace(replace_range, new_fragment);
			const directory = getDirectory({ active_document: active_document }),
				fs_path = getDirectory({ active_document: active_document, fs: true });
			save(directory, fs_path, line);
		});
	}
};

const newCreateFragmentDisposable = (context: vscode.ExtensionContext) => {
	return vscode.commands.registerCommand('runexecFlamekit.createFragment', () => {
		const active_document = vscode.window.activeTextEditor?.document;
		if (active_document) createFragment(active_document);
	});
};