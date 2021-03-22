/* eslint-disable curly */
/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import { TextDecoder } from 'util';
import * as Constant from './constant';
import * as CreateFragment from './fragment/createFragment';
import * as Util from './util/util';
export function activate(context: vscode.ExtensionContext) {
	let disposable = newCreateCSSDisposable(context);
	context.subscriptions.push(disposable);
	disposable = CreateFragment.newCreateFragmentDisposable(context);
	context.subscriptions.push(disposable);
	disposable = vscode.workspace.onDidSaveTextDocument((d: vscode.TextDocument) => {
		const m = d.fileName.match(Constant.EXTENSION_REGEX);
		const active_document = vscode.window.activeTextEditor?.document;
		if (m && active_document) {
			CreateFragment.createFragment(active_document);
		}
	});
	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }

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
	const { assets_path, active_path, css_path } = Util.getWorkingPaths({ wsf: wsf, active_document: active_document });
	if (active_path) {
		createCSSPath({ css_path: css_path });
		const flamekit_uri = Util.getFlamekitCSSIndex({ assets_path: assets_path }),
			active_filename = Util.getActiveFileName({ active_document: active_document }),
			new_css_path = `${vscode.Uri.parse(css_path).toString()}${active_filename}.css`,
			css_import = createNewCSS({ active_path: active_path, new_css_path: new_css_path }),
			call = () => createImports({ flamekit_uri: flamekit_uri, css_import: css_import });
		vscode.workspace.fs.stat(flamekit_uri).then(_ => { call(); }, _ => {
			vscode.window.showInformationMessage(`Creating ${flamekit_uri.toString()}`);
			vscode.workspace.fs.writeFile(flamekit_uri, Buffer.from(css_import + "\n", 'utf-8'));
		});
	}
};

const newCreateCSSDisposable = (context: vscode.ExtensionContext) => {
	return vscode.commands.registerCommand('runexecFlamekit.createCSS', () => {
		const wsf: readonly vscode.WorkspaceFolder[] | undefined = vscode.workspace.workspaceFolders;
		const active_document = vscode.window.activeTextEditor?.document;
		if (active_document !== undefined)
			switch (true) {
				case !Util.getActivePath({ active_document: active_document }):
					Util.showInvalidPathError({ active_document: active_document });
					break;
				case !Util.getActiveFileName({ active_document: active_document }):
					Util.showImproperFileError({ active_document: active_document });
					break;
				default:
					wsf !== undefined
						? createCSSFiles({ wsf: wsf, active_document: active_document })
						: Util.showNoWorkspaceError();
			}
	});
};