import 'reflect-metadata';
import { singleton, container } from 'tsyringe';
import * as vscode from 'vscode';

type View<T extends string> = { View: new () => { toString: () => string } }
type Viewable = View<string>;

export const init = () => newCreateAlpineDisposable();

const newCreateAlpineDisposable = () => {
    const Message: {
        info: (message: string) => void
    } = container.resolve('Util.Message.info');
    const Util: { getWorkingPaths: Function } = container.resolve('Util');
    const LiveSocketView: Viewable = container.resolve('alpine.LiveSocketView');
    const view = (new LiveSocketView.View()).toString();
    const ImportView: Viewable = container.resolve('alpine.AlpineImportView');
    const import_view = (new ImportView.View()).toString();
    return vscode.workspace.onDidSaveTextDocument((document: vscode.TextDocument) => {
        let terminal_home: string | null = null,
            terminal: vscode.Terminal | null;
        if (document.fileName.match(/\.(js|ts)$/)) {
            const editor = vscode.window.activeTextEditor;
            editor && editor.edit((edit) => {
                const text = document.getText();
                const start = text.match(/=setupAlpine/)?.index;
                if (start !== undefined && start !== -1) {
                    Message.info(`Found Alpine Install Line`);
                    const start_pos = document.positionAt(start);
                    const end_pos = document.positionAt(start + view.length);
                    edit.replace(new vscode.Range(start_pos, end_pos), view);
                    edit.replace(new vscode.Position(0, 0), import_view);
                    const { assets_path } = Util.getWorkingPaths({
                        wsf: vscode.workspace.workspaceFolders || [],
                        active_document: document
                    });
                    terminal_home = assets_path.replace('file://', '');
                }
            }).then(() => {
                if (terminal_home) {
                    terminal = vscode.window.createTerminal('Flamekit AlpineJS Install');
                    terminal.show();
                    terminal.sendText('# Installing AlpineJS');
                    terminal.sendText(`cd ${terminal_home}`);
                    terminal_home = null;
                    terminal.sendText(`npm install alpinejs --save`);
                }
            });
        }
    });
};


@singleton()
export class Injection {
    init = init;
}