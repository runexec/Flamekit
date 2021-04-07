import 'reflect-metadata';
import {singleton, container} from 'tsyringe';
import * as vscode from 'vscode';
import * as FileName from '../../view/fragment/fileName';
import * as Fragment from '../../fragment';

const Constant : Map<string, any> = container.resolve('ConstantInstance');

const FragmentGroup : { 
    getGroup: (x:string) => string 
} = container.resolve('fragment.FragmentGroup');

export async function createFragment(F: Fragment.Fragment): Promise<void> {
    const new_file = FileName.fragmentFileName(FragmentGroup.getGroup(F.line)),
        path = `${F.directory}${new_file}`,
        uri = vscode.Uri.parse(F.fs_path + new_file + '.' + Constant.get('EXTENSION_EEX'));
    vscode.workspace.fs.stat(uri).then((_) => { }, _ => {
        vscode.window.showInformationMessage(`Creating file: ${path}`);
        vscode.workspace.fs.writeFile(uri, Buffer.from('', 'utf-8'));
    }).then(() => vscode.commands.executeCommand('runexecFlamekit.createCSS'));
}

@singleton()
export class Injection {
    createFragment: (F: Fragment.Fragment) => Promise<void> = createFragment;
}