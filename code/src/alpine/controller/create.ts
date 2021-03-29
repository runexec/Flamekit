import * as Message from '../../util/message';
import * as vscode from 'vscode';
import * as LiveSocketView from '../view/liveSocketView';

export const init = (context: vscode.ExtensionContext) => {
    let disposable = newCreateAlpineDisposable(context);
    context.subscriptions.push(disposable);
};

const view = (new LiveSocketView.LiveSocketView()).toString();

const newCreateAlpineDisposable = (_context: vscode.ExtensionContext) => {
    console.log('init');
    return vscode.workspace.onDidSaveTextDocument((document: vscode.TextDocument) => {
        if (document.fileName.match(/\.js$/)) {
            const editor = vscode.window.activeTextEditor;
            editor && editor.edit((edit) => {
                const text = document.getText();
                const start = text.match(/=install\.alpine/)?.index;
                if (start) {
                    Message.info(`Found Alpine Install Line`);
                    const start_pos = document.positionAt(start);
                    const end_pos = document.positionAt(start + 15);
                    edit.replace(new vscode.Range(start_pos, end_pos), view);
                }
            });
        } else { console.log(document.fileName.match(/.*\.js/)); }
    });
};
