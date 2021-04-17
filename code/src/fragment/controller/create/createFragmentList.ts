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

interface FragmentList extends Fragmenting {
    line: string,
	fs_path: string,
	directory: string,
    document: undefined | vscode.TextDocument
};

let FragmentListFiles: { asArray: ({ file_name }: { file_name: string }) => string[] };

export async function createFragment(F:FragmentList): Promise<void> {
	Constant = container.resolve('ConstantInstance');
	FragmentListFiles = container.resolve('fragment.FragmentListFiles');
	const new_files = FragmentListFiles.asArray({ file_name: F.line }),
		paths = new_files.map(x => `${F.directory}${x})}`),
		uris = new_files.map(x => vscode.Uri.parse(F.fs_path + x + '.' + Constant.get('EXTENSION_EEX')));
	uris.forEach((uri, idx) => {
		const fp = paths[idx];
		const fragment_name = new_files[idx];
		vscode.workspace.fs.stat(uri).then((_) => { }, _ => {
			vscode.window.showInformationMessage(`Creating file: ${fp}`);
			vscode.workspace.fs.writeFile(uri, Buffer.from(contentTemplate(fragment_name), 'utf-8'));
		}).then(() => vscode.commands.executeCommand('runexecFlamekit.createCSS'));
	});
}

const contentTemplate = (name: string) =>  name;

@singleton()
export class Injection {
	createFragment: (F: FragmentList) => Promise<void> = createFragment;
}