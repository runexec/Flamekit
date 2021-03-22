/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import * as Interface_ from '../interface';
import * as Constant from '../constant';

/*
* @param active_document - 
* Current document in focus. Must end with or`html.eex` or `html.leex`
*
* @returns Absolute path of document in focus
*/
export const getCallingPath = ({ active_document, fs = false }: {
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
export const getActivePath = ({ active_document, fs = false }: {
	active_document: vscode.TextDocument,
	fs?: boolean
}): string | undefined => {
	return fs
		? getFullActivePath({ active_document: active_document })
		: getCallingPath({ active_document: active_document, fs: fs }).split('/lib/')[1];
};

export const getFullActivePath = ({ active_document }: {
	active_document: vscode.TextDocument
}) => {
	return getCallingPath({ active_document: active_document, fs: true });
};

export const getPaths = ({ active_document }: {
	active_document: vscode.TextDocument
}): Interface_.IPaths => {
	return {
		calling_path: getCallingPath({ active_document: active_document }),
		active_path: getActivePath({ active_document: active_document })
	};
};

export const getActiveFileName = ({ active_document, fs = false }: {
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
export const getDirectory = ({ active_document, fs = false }: {
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

export const getWorkingPaths = ({ wsf, active_document }: {
	wsf: readonly vscode.WorkspaceFolder[],
	active_document: vscode.TextDocument
}): Interface_.IWorkingPaths => {
	const root_uri = wsf[0].uri,
		assets_path = `${root_uri.toString()}/assets`,
		directory = getDirectory({ active_document: active_document }),
		css_path = `${assets_path}/css/${directory}`,
		paths = getPaths({ active_document: active_document }),
		new_paths = { assets_path: assets_path, css_path: css_path };
	return Object.assign({}, new_paths, paths);
};

export const showImproperFileError = ({ active_document }: {
	active_document: vscode.TextDocument
}): void => {
	const calling_path = getCallingPath({ active_document: active_document }),
		msg = `
	Command must be executed in a file ending with \`html.leex\` or \`html.eex\`. : ${calling_path}
	`;
	vscode.window.showErrorMessage(msg);
};

export const showInvalidPathError = ({ active_document }: {
	active_document: vscode.TextDocument
}): void => {
	const invalid_path = getCallingPath({ active_document: active_document });
	vscode.window.showErrorMessage(`Invalid path: ${invalid_path}`);
};

export const showNoWorkspaceError = (): void => {
	vscode.window.showErrorMessage('Command must be executed within a Workspace.');
};

export const getFlamekitCSSIndex = ({ assets_path }: { assets_path: string }): vscode.Uri => {
	return vscode.Uri.parse(`${assets_path}/css/${Constant.FLAMEKIT_INDEX}`);
};
