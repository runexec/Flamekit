/* eslint-disable curly */
/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import * as Enums from '../../enum';
import * as Util from '../../util/util';
import * as LineTypeObject from './lineTypeObject';
import * as Constant from '../../constant';
import * as Fragment from '../fragment';
import * as File from './file';
import * as FileName from './fileName';
import * as Tag from './tag';
import * as Group from './group';
import * as Entity from './entity';

export const init = (context: vscode.ExtensionContext) => {
	let disposable = newCreateFragmentDisposableCommand(context);
	context.subscriptions.push(disposable);
	disposable = newCreateFragmentDisposable(context);
	context.subscriptions.push(disposable);
};

const newCreateFragmentDisposableCommand = (_context: vscode.ExtensionContext) => {
	return vscode.commands.registerCommand('runexecFlamekit.createFragment', () => {
		const active_document = vscode.window.activeTextEditor?.document;
		if (active_document) createFragment(active_document);
	});
};

const newCreateFragmentDisposable = (_context: vscode.ExtensionContext) => {
	return vscode.workspace.onDidSaveTextDocument((d: vscode.TextDocument) => {
		const m = d.fileName.match(Constant.EXTENSION_REGEX);
		const active_document = vscode.window.activeTextEditor?.document;
		if (m && active_document) createFragment(active_document);
	});
};

export const createFragment = async (active_document: vscode.TextDocument | undefined) => {
	if (active_document) {
		const directory = Util.getDirectory({ active_document: active_document }),
			fs_path = Util.getDirectory({ active_document: active_document, fs: true }),
			lines = active_document.getText().toString().split("\n");
		directory && fs_path && LineTypeObject.getFragmentData(lines)
			.filter(x => x.line_type !== Enums.LineType.Unknown)
			.forEach(async (entity) => {
				const new_edit = Entity.createFragmentEntity(entity);
				let fragment: Fragment.Fragment;
				vscode.window.activeTextEditor?.edit((edit: vscode.TextEditorEdit) => {
					if (new_edit && directory && fs_path) {
						fragment = new new_edit.Base(directory, fs_path, new_edit.line);
						new_edit.save(fragment);
						new_edit.call(edit);
						vscode.window.activeTextEditor?.document.save();
					}
				});
			});
	}
};

export function initFragment(F: Fragment.Fragment) : void;
export function initFragment(F: Fragment.FragmentLive) : void;
export function initFragment(F: Fragment.FragmentLiveList) : void;
export function initFragment(F: Fragment.FragmentLiveArray) : void;
export function initFragment(F: Fragment.FragmentList) : void;
export function initFragment(F: Fragment.FragmentArray) : void { 
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

function _createFragment(F: Fragment.Fragment): void {
	const new_file = FileName.fragmentFileName(Group.fragmentGroup(F.line)),
		path = `${F.directory}${new_file}`,
		uri = vscode.Uri.parse(F.fs_path + new_file + '.' + Constant.EXTENSION_EEX);
	vscode.workspace.fs.stat(uri).then((_) => { }, _ => {
		vscode.window.showInformationMessage(`Creating file: ${path}`);
		vscode.workspace.fs.writeFile(uri, Buffer.from('', 'utf-8'));
	}).then(() => vscode.commands.executeCommand('runexecFlamekit.createCSS'));
}

function createFragmentArray(F: Fragment.FragmentArray): void {
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

function createFragmentList(F: Fragment.FragmentList): void {
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

function createFragmentLive(F: Fragment.FragmentLive): void {
	const new_file = FileName.fragmentLiveFileName(
		Tag.fragmentLiveTag(F.line)).replace(/\.html/, '_live.html'
		),
		path = `${F.directory}${new_file}`,
		uri = vscode.Uri.parse(F.fs_path + new_file + '.' + Constant.EXTENSION_EX);
	vscode.workspace.fs.stat(uri).then((_) => { }, _ => {
		vscode.window.showInformationMessage(`Creating file: ${path}`);
		vscode.workspace.fs.writeFile(uri, Buffer.from('', 'utf-8'));
	}).then(() => vscode.commands.executeCommand('runexecFlamekit.createCSS'));
}

function createFragmentLiveArray(F: Fragment.FragmentLiveArray): void {
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

function createFragmentLiveList(F: Fragment.FragmentLiveList): void {
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