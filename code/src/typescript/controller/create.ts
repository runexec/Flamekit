import * as Util from '../../util';
import * as Message from '../../util/message';
import * as vscode from 'vscode';
import * as BabelrcConfigView from '../view/babelrcConfigView';
import * as WebpackConfigView from '../view/webpackConfigView';
import { TextDecoder } from 'util';

export const init = ({ context }: { context?: vscode.ExtensionContext }) => {
    if (context) {
        let disposable = newCreateTypeScriptDisposable({ context: context });
        context.subscriptions.push(disposable);
    }
};

const babelrc_config_view = (new BabelrcConfigView.View()).toString();
const webpack_config_view = new WebpackConfigView.View();

const newCreateTypeScriptDisposable = ({ context }: { context?: vscode.ExtensionContext }) => {
    return vscode.workspace.onDidSaveTextDocument((document: vscode.TextDocument) => {
        let terminal_home: string,
            terminal: vscode.Terminal,
            babelrc: string,
            babelrc_uri: vscode.Uri,
            babelrc_config: string,
            webpack: string,
            webpack_uri: vscode.Uri,
            webpack_config: string;
        if (document.fileName.match(/\.(js|ts)$/)) {
            const editor = vscode.window.activeTextEditor;
            editor && editor.edit((edit) => {
                const text = document.getText();
                const start = text.match(/=setupTS/)?.index;
                if (start && start !== -1) {
                    Message.info(`Found Typescript Install Line`);
                    const start_pos = document.positionAt(start);
                    const end_pos = document.positionAt(start + 8);
                    edit.delete(new vscode.Range(start_pos, end_pos));
                    const { assets_path } = Util.getWorkingPaths({
                        wsf: vscode.workspace.workspaceFolders || [],
                        active_document: document
                    });
                    terminal_home = assets_path.replace('file://', '');
                    babelrc = assets_path + '/.babelrc';
                    webpack = assets_path + '/webpack.config.js';
                }
            }).then(() => {
                if (terminal_home) {
                    terminal = vscode.window.createTerminal('Flamekit TypeScript Install');
                    terminal.show();
                    terminal.sendText('Updating .babelrc');
                    if (babelrc) {
                        babelrc_uri = vscode.Uri.parse(babelrc);
                        vscode.workspace.fs.readFile(babelrc_uri).then((config) => {
                            babelrc_config = new TextDecoder('utf-8').decode(config);
                            babelrc_config = babelrc_config.replace('"presets": [', babelrc_config_view);
                            babelrc_uri && vscode.workspace.fs.writeFile(babelrc_uri, Buffer.from(babelrc_config));
                        })
                    }
                    terminal.sendText('Updating webpack.config.js');
                    if (webpack) {
                        webpack_uri = vscode.Uri.parse(webpack);
                        vscode.workspace.fs.readFile(webpack_uri).then((config) => {
                            webpack_config = new TextDecoder('utf-8').decode(config);
                            webpack_config = 
                                webpack_config
                                    .replace(webpack_config_view.getReplace(), webpack_config_view.toString());
                            webpack_uri && vscode.workspace.fs.writeFile(webpack_uri, Buffer.from(webpack_config));
                        })
                    }
                    terminal.sendText('# Installing TypeScript');
                    terminal.sendText(`cd ${terminal_home}`);
                    terminal.sendText(`npm install --save-dev @babel/preset-typescript`);
                    terminal.sendText(``);
                }
            });
        }
    });
};
