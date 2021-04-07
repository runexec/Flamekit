import 'reflect-metadata';
import { singleton, container } from 'tsyringe';
import * as vscode from 'vscode';
import * as Fragment from '../../fragment';

let Constant: Map<string, any>;
let FragmentListFiles: { asArray: ({ file_name }: { file_name: string }) => string[] };

export async function createFragment(F: Fragment.FragmentList): Promise<void> {
	Constant = container.resolve('ConstantInstance');
	FragmentListFiles = container.resolve('fragment.FragmentListFiles');
	const new_files = FragmentListFiles.asArray({ file_name: F.line }),
		paths = new_files.map(x => `${F.directory}${x})}`),
		uris = new_files.map(x => vscode.Uri.parse(F.fs_path + x + '.' + Constant.get('EXTENSION_EEX')));
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
	createFragment: (F: Fragment.FragmentList) => Promise<void> = createFragment;
}