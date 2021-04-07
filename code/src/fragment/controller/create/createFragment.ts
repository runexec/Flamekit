import 'reflect-metadata';
import { singleton, container } from 'tsyringe';
import * as vscode from 'vscode';
import * as Fragment from '../../fragment';

let Constant: Map<string, any>;
let FragmentGroup: {getGroup: (x: string) => string};
let FileName: { fragmentFileName: (x: string) => string };

export async function createFragment(F: Fragment.Fragment): Promise<void> {
    Constant = container.resolve('ConstantInstance');
    FragmentGroup = container.resolve('fragment.FragmentGroup');
    FileName = container.resolve('fragment.FileName')
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