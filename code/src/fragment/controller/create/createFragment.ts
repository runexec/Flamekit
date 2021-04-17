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

interface Fragment extends Fragmenting {
    line: string,
	fs_path: string,
	directory: string,
    document: undefined | vscode.TextDocument
};

let FragmentGroup: {getGroup: (x: string) => string};
let FileName: { fragmentFileName: (x: string) => string };

export async function createFragment(F: Fragment): Promise<void> {
    Constant = container.resolve('ConstantInstance');
    FragmentGroup = container.resolve('fragment.FragmentGroup');
    FileName = container.resolve('fragment.FileName')
    const new_file = FileName.fragmentFileName(FragmentGroup.getGroup(F.line)),
        path = `${F.directory}${new_file}`,
        uri = vscode.Uri.parse(F.fs_path + new_file + '.' + Constant.get('EXTENSION_EEX')),
        fragment_name = new_file;
    vscode.workspace.fs.stat(uri).then((_) => { }, _ => {
        vscode.window.showInformationMessage(`Creating file: ${path}`);
        vscode.workspace.fs.writeFile(uri, Buffer.from(contentTemplate(fragment_name), 'utf-8'));
    }).then(() => vscode.commands.executeCommand('runexecFlamekit.createCSS'));
}

const contentTemplate = (name: string) =>  name;

@singleton()
export class Injection {
    createFragment: (F: Fragment) => Promise<void> = createFragment;
}