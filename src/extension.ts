import { TextDecoder } from 'util';
import * as vscode from 'vscode';

const FLAMEKIT_INDEX = 'flamekit.index.css';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('runexecFlamekit.createCSS', () => {
		const wsf: readonly vscode.WorkspaceFolder[] | undefined = vscode.workspace.workspaceFolders;
		if (!wsf) {
			vscode.window.showErrorMessage('Command bust be executed within a Workspace.');
		} else {
			const active_document = vscode.window.activeTextEditor?.document;
			if (active_document) {
				const related_path = active_document.uri.path;
				const parent_path = related_path.split('/lib/')[1];
				if (!parent_path) {
					vscode.window.showErrorMessage(`Invalid path: ${related_path}`);
				} else {
					const m = related_path.match(/[\w,\s]+\.html.leex$/);
					const parent_filename = m ? m[0] : m;
					if (parent_filename) {
						const directory = parent_path.split(parent_filename)[0];
						const root_uri = wsf[0].uri;
						const assets_path = `${root_uri.toString()}/assets`
						const css_path = `${assets_path}/css/${directory}`;
						const msg_attempt = `Creating directory ${css_path}`;
						vscode.window.showInformationMessage(msg_attempt);
						const css_uri = vscode.Uri.parse(css_path);
						vscode.workspace.fs.createDirectory(css_uri).then(_ => {
							const new_css_path = `${css_uri.toString()}${parent_filename}.css`;
							let msg = `Creating ${new_css_path}`;
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
					} else {
						const msg = `
						Command must be executed in a file ending with \`html.leex\`. : ${related_path}
						`;
						vscode.window.showErrorMessage(msg);
					}
				}
			}
		}
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
