import 'reflect-metadata';
import { singleton, container } from 'tsyringe';
import * as vscode from 'vscode';
import * as Fragment from '../../fragment';

const Constant: Map<string, any> = container.resolve('ConstantInstance');

const FragmentLiveArrayFiles: {
	asArray: ({ file_name }: { file_name: string }) => string[]
} = container.resolve('fragment.FragmentLiveArrayFiles');

export async function createFragment(F: Fragment.FragmentLiveArray): Promise<void> {
	const new_files = FragmentLiveArrayFiles.asArray({ file_name: F.line }),
		paths = new_files.map(x => `${F.directory}${x.replace(/\.html/, '_live.html')}`),
		uris = new_files.map(x => vscode.Uri.parse(F.fs_path + x + '.' + Constant.get('EXTENSION_LEEX')));
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
	createFragment: (F: Fragment.FragmentLiveArray) => Promise<void> = createFragment;
}