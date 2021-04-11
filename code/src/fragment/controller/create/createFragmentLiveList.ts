import 'reflect-metadata';
import { container, singleton } from 'tsyringe';
import * as vscode from 'vscode';

let Constant: Map<string, any>;

type Fragmenting = new (directory: string, fs_path: string, line: string) => {
	save: Function,
	getTag: (file_name: string) => string,
	getNewFragment: (file_name: string) => string,
	Base: any
};

interface FragmentLiveList extends Fragmenting {
    line: string,
	fs_path: string,
	directory: string,
    document: undefined | vscode.TextDocument
};

let FragmentLiveListFiles: {asArray: ({ file_name }: { file_name: string }) => string[]};

export async function createFragment(F: FragmentLiveList): Promise<void> {
	Constant = container.resolve('ConstantInstance');
	FragmentLiveListFiles = container.resolve('fragment.FragmentLiveListFiles');
	const new_files = FragmentLiveListFiles.asArray({ file_name: F.line }),
		paths = new_files.map(x => `${F.directory}${x.replace(/\.html/, '_live.html')}`),
		uris = new_files.map(x => vscode.Uri.parse(F.fs_path + x + '.' + Constant.get('EXTENSION_EX')));
	uris.forEach((uri, idx) => {
		const fp = paths[idx];
		vscode.workspace.fs.stat(uri).then((_) => { }, _ => {
			vscode.window.showInformationMessage(`Creating file: ${fp}`);
			vscode.workspace.fs.writeFile(uri, Buffer.from('', 'utf-8'));
		}).then(() => vscode.commands.executeCommand('runexecFlamekit.createCSS'));
	});
}

@singleton()
export class Injection {
	createFragment: (F: FragmentLiveList) => Promise<void> = createFragment;
}