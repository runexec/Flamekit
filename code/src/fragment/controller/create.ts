/* eslint-disable curly */
/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import * as Enums from '../../enum';
import * as Util from '../../util';
import * as LineTypeObject from './lineTypeObject';
import * as Constant from '../../constant';
import * as Fragment from '../fragment';
import * as File from './file';
import * as FileName from '../view/fragment/fileName';
import * as Group from './group';
import * as Entity from './entity';
import * as CreateFragment from './create';

export const init = ({ context }: { context?: vscode.ExtensionContext }) => {
	if (context) {
		let disposable = newCreateFragmentDisposableCommand({context: context});
		context.subscriptions.push(disposable);
		disposable = newCreateFragmentDisposable({context: context});
		context.subscriptions.push(disposable);
	}
};

const newCreateFragmentDisposableCommand = ({ context }: { context?: vscode.ExtensionContext }) => {
	return vscode.commands.registerCommand('runexecFlamekit.createFragment', () => {
		const active_document = vscode.window.activeTextEditor?.document;
		active_document && createFragment({active_document: active_document});
	});
};

const newCreateFragmentDisposable = ({ context }: { context?: vscode.ExtensionContext }) => {
	return vscode.workspace.onDidSaveTextDocument((d: vscode.TextDocument) => {
		const m = d.fileName.match(Constant.EXTENSION_REGEX);
		const active_document = vscode.window.activeTextEditor?.document;
		m && active_document && createFragment({active_document: active_document});
	});
};

export const createFragment = async ({ active_document } : { active_document: vscode.TextDocument | undefined }) => {
	if (active_document) {
		const directory = Util.getDirectory({ active_document: active_document }),
			fs_path = Util.getDirectory({ active_document: active_document, fs: true }),
			lines = active_document.getText().toString().split("\n");
		let fragment: Fragment.Fragment;
		directory && fs_path && LineTypeObject.getFragmentData(lines)
			.filter(x => x.line_type !== Enums.LineType.Unknown)
			.forEach(async (entity) => {
				// TODO: refactor so constant not called for each iteration
				const new_edit = Entity.createFragmentEntity(entity);
				vscode.window.activeTextEditor?.edit((edit: vscode.TextEditorEdit) => {
					if (new_edit && directory && fs_path) {
						fragment = new new_edit.Base(directory, fs_path, new_edit.line);
						CreateFragment.initFragment(fragment);
						new_edit.call(edit);
						vscode.window.activeTextEditor?.document.save();
					}
				});
			});
	}
};

export async function initFragment(F: Fragment.Fragment): Promise<void>;
export async function initFragment(F: Fragment.FragmentLive): Promise<void>;
export async function initFragment(F: Fragment.FragmentLiveList): Promise<void>;
export async function initFragment(F: Fragment.FragmentLiveArray): Promise<void>;
export async function initFragment(F: Fragment.FragmentList): Promise<void>;
export async function initFragment(F: Fragment.FragmentArray): Promise<void> {
	switch (true) {
		case F instanceof Fragment.FragmentUnknown: null; break;
		case F instanceof Fragment.FragmentLiveList: createFragmentLiveList(F); break;
		case F instanceof Fragment.FragmentLiveArray: createFragmentLiveArray(F); break;
		case F instanceof Fragment.FragmentLive: createFragmentLive(F); break;
		case F instanceof Fragment.FragmentList: createFragmentList(F); break;
		case F instanceof Fragment.FragmentArray: createFragmentArray(F); break;
		case F instanceof Fragment.Fragment: _createFragment(F); break;
		default: null;
	}
}

async function _createFragment(F: Fragment.Fragment): Promise<void> {
	const new_file = FileName.fragmentFileName(Group.fragmentGroup(F.line)),
		path = `${F.directory}${new_file}`,
		uri = vscode.Uri.parse(F.fs_path + new_file + '.' + Constant.EXTENSION_EEX);
	vscode.workspace.fs.stat(uri).then((_) => { }, _ => {
		vscode.window.showInformationMessage(`Creating file: ${path}`);
		vscode.workspace.fs.writeFile(uri, Buffer.from('', 'utf-8'));
	}).then(() => vscode.commands.executeCommand('runexecFlamekit.createCSS'));
}

async function createFragmentArray(F: Fragment.FragmentArray): Promise<void> {
	const new_files = File.fragmentArrayFiles(F.line),
		paths = new_files.map(x => `${F.directory}${x}`),
		uris = new_files.map(x => vscode.Uri.parse(F.fs_path + x + '.' + Constant.EXTENSION_EEX));
	uris.forEach((uri, idx) => {
		const fp = paths[idx];
		vscode.workspace.fs.stat(uri).then((_) => { }, _ => {
			vscode.window.showInformationMessage(`Creating file: ${fp}`);
			vscode.workspace.fs.writeFile(uri, Buffer.from('', 'utf-8'));
		}).then(() => vscode.commands.executeCommand('runexecFlamekit.createCSS'));
	});
}

async function createFragmentList(F: Fragment.FragmentList): Promise<void> {
	const new_files = File.fragmentListFiles(F.line),
		paths = new_files.map(x => `${F.directory}${x})}`),
		uris = new_files.map(x => vscode.Uri.parse(F.fs_path + x + '.' + Constant.EXTENSION_EEX));
	uris.forEach((uri, idx) => {
		const fp = paths[idx];
		vscode.workspace.fs.stat(uri).then((_) => { }, _ => {
			vscode.window.showInformationMessage(`Creating file: ${fp}`);
			vscode.workspace.fs.writeFile(uri, Buffer.from('', 'utf-8'));
		}).then(() => vscode.commands.executeCommand('runexecFlamekit.createCSS'));
	});
}

async function createFragmentLive(F: Fragment.FragmentLive): Promise<void> {
	const new_file = FileName.fragmentLiveFileName(Group.fragmentLiveGroup(F.line)),
		path = `${F.directory}${new_file}`,
		uri = vscode.Uri.parse(F.fs_path + new_file + '.' + Constant.EXTENSION_EX);
	vscode.workspace.fs.stat(uri).then((_) => { }, _ => {
		vscode.window.showInformationMessage(`Creating file: ${path}`);
		vscode.workspace.fs.writeFile(uri, Buffer.from('', 'utf-8'));
	}).then(() => vscode.commands.executeCommand('runexecFlamekit.createCSS'));
}

async function createFragmentLiveArray(F: Fragment.FragmentLiveArray): Promise<void> {
	const new_files = File.fragmentLiveArrayFiles(F.line),
		paths = new_files.map(x => `${F.directory}${x.replace(/\.html/, '_live.html')}`),
		uris = new_files.map(x => vscode.Uri.parse(F.fs_path + x + '.' + Constant.EXTENSION_LEEX));
	uris.forEach((uri, idx) => {
		const fp = paths[idx];
		vscode.workspace.fs.stat(uri).then((_) => { }, _ => {
			vscode.window.showInformationMessage(`Creating file: ${fp}`);
			vscode.workspace.fs.writeFile(uri, Buffer.from('', 'utf-8'));
		}).then(() => vscode.commands.executeCommand('runexecFlamekit.createCSS'));
	});
}

async function createFragmentLiveList(F: Fragment.FragmentLiveList): Promise<void> {
	const new_files = File.fragmentLiveListFiles(F.line),
		paths = new_files.map(x => `${F.directory}${x.replace(/\.html/, '_live.html')}`),
		uris = new_files.map(x => vscode.Uri.parse(F.fs_path + x + '.' + Constant.EXTENSION_EX));
	uris.forEach((uri, idx) => {
		const fp = paths[idx];
		vscode.workspace.fs.stat(uri).then((_) => { }, _ => {
			vscode.window.showInformationMessage(`Creating file: ${fp}`);
			vscode.workspace.fs.writeFile(uri, Buffer.from('', 'utf-8'));
		}).then(() => vscode.commands.executeCommand('runexecFlamekit.createCSS'));
	});
}