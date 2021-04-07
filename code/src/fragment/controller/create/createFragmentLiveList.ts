import * as vscode from 'vscode';
import * as Fragment from '../../fragment';
import 'reflect-metadata';
import {container, singleton} from 'tsyringe';

const Constant : Map<string, any> = container.resolve('ConstantInstance');

const FragmentLiveListFiles : { 
    asArray: ({file_name} : {file_name:string}) => string[]
} = container.resolve('fragment.FragmentLiveListFiles');

export async function createFragment(F: Fragment.FragmentLiveList): Promise<void> {
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
    createFragment: (F: Fragment.FragmentLiveList) => Promise<void> = createFragment;
}