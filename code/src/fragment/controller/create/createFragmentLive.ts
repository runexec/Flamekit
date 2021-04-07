import 'reflect-metadata';
import { singleton, container } from 'tsyringe';
import * as vscode from 'vscode';
import * as Fragment from '../../fragment';

const Constant: Map<string, any> = container.resolve('ConstantInstance');

const FileName: {
	fragmentLiveFileName: (x: string) => string
} = container.resolve('fragment.FragmentFileName');

const FragmentLiveGroup: {
	getGroup: (x: string) => string
} = container.resolve('fragment.FragmentLiveGroup');

export async function createFragment(F: Fragment.FragmentLive): Promise<void> {
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
	createFragment: (F: Fragment.FragmentLive) => Promise<void> = createFragment;
}