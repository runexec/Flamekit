import 'reflect-metadata';
import { singleton, container } from 'tsyringe';
import * as vscode from 'vscode';

let Constant: Map<string, any>;

type Fragmenting = new (directory: string, fs_path: string, line: string) => {
	save: Function,
	getTag: (file_name: string) => string,
	getNewFragment: (file_name: string) => string,
	Base: any
};

interface FragmentLive extends Fragmenting {
    line: string,
	fs_path: string,
	directory: string,
    document: undefined | vscode.TextDocument
};

let FileName: { fragmentLiveFileName: (x: string) => string };
let FragmentLiveGroup: { getGroup: (x: string) => string };

export async function createFragment(F: FragmentLive): Promise<void> {
	Constant = container.resolve('ConstantInstance');
	FileName = container.resolve('fragment.FileName');
	FragmentLiveGroup = container.resolve('fragment.FragmentLiveGroup');
	const new_file = FileName.fragmentLiveFileName(FragmentLiveGroup.getGroup(F.line)),
		path = `${F.directory}${new_file}`,
		uri = vscode.Uri.parse(F.fs_path + new_file + '.' + Constant.get('EXTENSION_EX'));
	vscode.workspace.fs.stat(uri).then((_) => { }, _ => {
		vscode.window.showInformationMessage(`Creating file: ${path}`);
		vscode.workspace.fs.writeFile(uri, Buffer.from('', 'utf-8'));
	}).then(() => vscode.commands.executeCommand('runexecFlamekit.createCSS'));
}

@singleton()
export class Injection {
	createFragment: (F: FragmentLive) => Promise<void> = createFragment;
}