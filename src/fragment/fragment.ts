/* eslint-disable curly */
/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import * as Constant from '../constant';
import * as FragmentTag from './fragmentTag';
import * as FragmentFileName from './fragmentFileName';
import * as FragmentFile from './fragmentFile';
import * as FragmentGroup from './fragmentGroup';

export const _createFragment = (directory: string, fs_path: string, line: string) => {
	const new_file = FragmentFileName.fragmentFileName(FragmentGroup.fragmentGroup(line)),
		path = `${directory}${new_file}`,
		uri = vscode.Uri.parse(fs_path + new_file + '.' + Constant.EXTENSION_EEX);
	vscode.workspace.fs.stat(uri).then((_) => { }, _ => {
		vscode.window.showInformationMessage(`Creating file: ${path}`);
		vscode.workspace.fs.writeFile(uri, Buffer.from('', 'utf-8'));
	});
};

export const _createFragmentLive = (directory: string, fs_path: string, line: string) => {
	const new_file = FragmentFileName.fragmentFileName(FragmentTag.fragmentLiveTag(line)).replace(/\.html/, '_live.html'),
		path = `${directory}${new_file}`,
		uri = vscode.Uri.parse(fs_path + new_file + '.' + Constant.EXTENSION_LEEX);
	vscode.workspace.fs.stat(uri).then((_) => { }, _ => {
		vscode.window.showInformationMessage(`Creating file: ${path}`);
		vscode.workspace.fs.writeFile(uri, Buffer.from('', 'utf-8'));
	});
};

export const _createFragmentArray = (directory: string, fs_path: string, line: string) => {
	const new_files = FragmentFile.fragmentArrayFiles(line),
		paths = new_files.map(x => `${directory}${x}`),
		uris = new_files.map(x => vscode.Uri.parse(fs_path + x + '.' + Constant.EXTENSION_EEX));
	uris.forEach((uri, idx) => {
		const fp = paths[idx];
		vscode.workspace.fs.stat(uri).then((_) => { }, _ => {
			vscode.window.showInformationMessage(`Creating file: ${fp}`);
			vscode.workspace.fs.writeFile(uri, Buffer.from('', 'utf-8'));
		});
	});
};

export const _createFragmentLiveArray = (directory: string, fs_path: string, line: string) => {
	const new_files = FragmentFile.fragmentLiveArrayFiles(line),
		paths = new_files.map(x => `${directory}${x.replace(/\.html/, '_live.html')}`),
		uris = new_files.map(x => vscode.Uri.parse(fs_path + x + '.' + Constant.EXTENSION_LEEX));
	uris.forEach((uri, idx) => {
		const fp = paths[idx];
		vscode.workspace.fs.stat(uri).then((_) => { }, _ => {
			vscode.window.showInformationMessage(`Creating file: ${fp}`);
			vscode.workspace.fs.writeFile(uri, Buffer.from('', 'utf-8'));
		});
	});
};

export const _createFragmentList = (directory: string, fs_path: string, line: string) => {
	const new_files = FragmentFile.fragmentListFiles(line),
		paths = new_files.map(x => `${directory}${x})}`),
		uris = new_files.map(x => vscode.Uri.parse(fs_path + x + '.' + Constant.EXTENSION_EEX));
	uris.forEach((uri, idx) => {
		const fp = paths[idx];
		vscode.workspace.fs.stat(uri).then((_) => { }, _ => {
			vscode.window.showInformationMessage(`Creating file: ${fp}`);
			vscode.workspace.fs.writeFile(uri, Buffer.from('', 'utf-8'));
		});
	});
};

export const _createFragmentLiveList = (directory: string, fs_path: string, line: string) => {
	const new_files = FragmentFile.fragmentLiveListFiles(line),
		paths = new_files.map(x => `${directory}${x.replace(/\.html/, '_live.html')}`),
		uris = new_files.map(x => vscode.Uri.parse(fs_path + x + '.' + Constant.EXTENSION_LEEX));
	uris.forEach((uri, idx) => {
		const fp = paths[idx];
		vscode.workspace.fs.stat(uri).then((_) => { }, _ => {
			vscode.window.showInformationMessage(`Creating file: ${fp}`);
			vscode.workspace.fs.writeFile(uri, Buffer.from('', 'utf-8'));
		});
	});
};
