import { TextDecoder } from 'util';
import * as vscode from 'vscode';

const FLAMEKIT_INDEX = 'flamekit.index.css';

const getRelatedPath = (active_document:vscode.TextDocument) => {
	return active_document.uri.path;
};

const getParentPath = (active_document:vscode.TextDocument) => {
	return getRelatedPath(active_document).split('/lib/')[1];
}

const getPaths = (active_document:vscode.TextDocument) => {
	return {
		related_path: getRelatedPath(active_document),
		parent_path: getParentPath(active_document)
	}
};

const getParentFileName = (active_document:vscode.TextDocument) => {
	const {related_path} = getPaths(active_document);
	const m = related_path.match(/[\w,\s]+\.html\.(eex|leex)$/);
	return m ? m[0] : null;
};

const getDirectory = (active_document:vscode.TextDocument) => {
	const {parent_path} = getPaths(active_document);
	const name = getParentFileName(active_document);
	return name ? parent_path.split(name)[0] : null;
};

const getWorkingPaths = (wsf:readonly vscode.WorkspaceFolder[], active_document:vscode.TextDocument) => {
	const root_uri = wsf[0].uri;
	const assets_path = `${root_uri.toString()}/assets`
	const directory = getDirectory(active_document);
	const css_path = `${assets_path}/css/${directory}`;
	const paths = getPaths(active_document);
	const new_paths = {assets_path:assets_path, css_path:css_path};
	return Object.assign({}, new_paths, paths)
};

const createCSSFiles = (wsf:readonly vscode.WorkspaceFolder[], active_document:vscode.TextDocument) => {
	const {assets_path, parent_path, related_path, css_path} = getWorkingPaths(wsf, active_document);
	let msg = `Creating directory ${css_path}`;
	vscode.window.showInformationMessage(msg);
	const css_uri = vscode.Uri.parse(css_path);
	vscode.workspace.fs.createDirectory(css_uri).then(_ => {
		const parent_filename = getParentFileName(active_document);
		const new_css_path = `${css_uri.toString()}${parent_filename}.css`;
		msg = `Creating ${new_css_path}`;
		let uri = vscode.Uri.parse(new_css_path);
		vscode.window.showInformationMessage(msg);
		const css_import = `@import "./${parent_path}.css";`;
		let buff = Buffer.from(`/* ${css_import} */`, 'utf-8');
		vscode.workspace.fs.writeFile(uri, buff).then(_ => {
			uri = vscode.Uri.parse(`${assets_path}/css/${FLAMEKIT_INDEX}`);
			vscode.workspace.fs.readFile(uri)
				.then((data) => {
					const read_string = new TextDecoder('utf-8').decode(data);
					const cache = new Map();
					let existing_imports = '';
					read_string.split("\n").forEach(x => {
						x = x.trim();
						if (!cache.has(x)) {
							cache.set(x, x) 
							existing_imports += x + "\n";
						}
					});
					existing_imports += css_import;
					msg = `Adding ${css_import}`;
					vscode.window.showInformationMessage(msg);
					buff = Buffer.from(existing_imports, 'utf-8');
					vscode.workspace.fs.writeFile(uri, buff);
				});
		});
	});
}

const showImproperFileError = (active_document:vscode.TextDocument) => {
	const related_path = getRelatedPath(active_document);
	const msg = `
	Command must be executed in a file ending with \`html.leex\` or \`html.eex\`. : ${related_path}
	`;
	vscode.window.showErrorMessage(msg);
};

const showInvalidPathError = (active_document:vscode.TextDocument) => {
	const invalid_path = getRelatedPath(active_document);
	vscode.window.showErrorMessage(`Invalid path: ${invalid_path}`);
};

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('runexecFlamekit.createCSS', () => {
		const wsf: readonly vscode.WorkspaceFolder[] | undefined = vscode.workspace.workspaceFolders;
		if (!wsf) {
			vscode.window.showErrorMessage('Command bust be executed within a Workspace.');
		} else {
			const active_document = vscode.window.activeTextEditor?.document;
			if (active_document) {	
				if (!getParentPath(active_document)) {
					showInvalidPathError(active_document);
				} else {					
					if (!getParentFileName(active_document)) {
						showImproperFileError(active_document);
					} else {
						createCSSFiles(wsf, active_document);
					}
				}
			}
		}
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
