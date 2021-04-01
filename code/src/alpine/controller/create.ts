import * as Util from '../../util';
import * as Message from '../../util/message';
import * as vscode from 'vscode';
import * as LiveSocketView from '../view/liveSocketView';
import * as AlpineImportView from '../view/alpineImportView';

export const init = ({ context }: { context?: vscode.ExtensionContext }) => {
    if (context) {
        let disposable = newCreateAlpineDisposable({ context: context });
        context.subscriptions.push(disposable);
    }
};

const view = (new LiveSocketView.View()).toString();
const import_view = (new AlpineImportView.View()).toString();

const newCreateAlpineDisposable = ({ context }: { context?: vscode.ExtensionContext }) => {
    return vscode.workspace.onDidSaveTextDocument((document: vscode.TextDocument) => {
        let terminal_home: string | null = null,
            terminal: vscode.Terminal | null;
        if (document.fileName.match(/\.(js|ts)$/)) {
            const editor = vscode.window.activeTextEditor;
            editor && editor.edit((edit) => {
                const text = document.getText();
                const start = text.match(/=setupAlpine/)?.index;
                if (start && start !== -1) {
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
