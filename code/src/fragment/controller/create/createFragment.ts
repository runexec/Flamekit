import * as vscode from 'vscode';
import * as Constant from '../../../constant';
import * as Fragment from '../../fragment';
import * as FileName from '../../view/fragment/fileName';
import * as Group from '../group';

export async function createFragment(F: Fragment.Fragment): Promise<void> {
    const new_file = FileName.fragmentFileName(Group.FragmentGroup.getGroup(F.line)),
        path = `${F.directory}${new_file}`,
        uri = vscode.Uri.parse(F.fs_path + new_file + '.' + Constant.EXTENSION_EEX);
    vscode.workspace.fs.stat(uri).then((_) => { }, _ => {
        vscode.window.showInformationMessage(`Creating file: ${path}`);
        vscode.workspace.fs.writeFile(uri, Buffer.from('', 'utf-8'));
    }).then(() => vscode.commands.executeCommand('runexecFlamekit.createCSS'));
}