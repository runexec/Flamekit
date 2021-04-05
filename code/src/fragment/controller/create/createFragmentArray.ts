import 'reflect-metadata';
import {container} from 'tsyringe';
import * as vscode from 'vscode';
import * as Fragment from '../../fragment';
import * as File from '../file';

const Constant : Map<string, any> = container.resolve('ConstantInstance');

export async function createFragment(F: Fragment.FragmentArray): Promise<void> {
	const new_files = File.FragmentArrayFiles.asArray({ file_name: F.line }),
		paths = new_files.map(x => `${F.directory}${x}`),
		uris = new_files.map(x => vscode.Uri.parse(F.fs_path + x + '.' + Constant.get('EXTENSION_EEX')));
	uris.forEach((uri, idx) => {
		const fp = paths[idx];
		vscode.workspace.fs.stat(uri).then((_) => { }, _ => {
			vscode.window.showInformationMessage(`Creating file: ${fp}`);
			vscode.workspace.fs.writeFile(uri, Buffer.from('', 'utf-8'));
		}).then(() => vscode.commands.executeCommand('runexecFlamekit.createCSS'));
	});
}
