import * as vscode from 'vscode';
import { TextDecoder } from 'util';
import { container } from 'tsyringe';

let Util : { getWorkingPaths: Function }; // todo
let Message: { info: (message: string) => void };

type Viewable = new () => any;
type View = { View: Viewable };

let TSConfigConfigView: View;
let TSWebpackConfigView: View & { getReplace: () => [string, string][] };


export const init = ({ context }: { context?: vscode.ExtensionContext }) => {
    if (context) {
        let disposable = newCreateTypeScriptDisposable({ context: context });
        context.subscriptions.push(disposable);
    }
};

const newCreateTypeScriptDisposable = ({ context }: { context?: vscode.ExtensionContext }) => {
    TSConfigConfigView = container.resolve('typescript.TSConfigConfigView');
    TSWebpackConfigView = container.resolve('typescript.WebpackConfigView');
    const webpack_config_view = new TSWebpackConfigView.View();
    const tsconfig_config_view = new TSConfigConfigView.View().toString();
    return vscode.workspace.onDidSaveTextDocument((document: vscode.TextDocument) => {
        let terminal_home: string,
            terminal: vscode.Terminal,
            webpack: string,
            webpack_uri: vscode.Uri,
            webpack_config: string,
            tsconfig: string,
            tsconfig_uri: vscode.Uri;
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
                    webpack = assets_path + '/webpack.config.js';
                    tsconfig = assets_path + '/tsconfig.json';
                }
            }).then(() => {
                if (terminal_home) {
                    terminal = vscode.window.createTerminal('Flamekit TypeScript Install');
                    terminal.show();
                    terminal.sendText('# Updating webpack.config.js');
                    if (webpack) {
                        webpack_uri = vscode.Uri.parse(webpack);
                        vscode.workspace.fs.readFile(webpack_uri).then((config) => {
                            webpack_config = new TextDecoder('utf-8').decode(config);
                            webpack_config_view.getReplace().forEach(([old, now]:[string,string]) => {
                                webpack_config = webpack_config.replace(old, now);
                            });
                            webpack_uri && vscode.workspace.fs.writeFile(webpack_uri, Buffer.from(webpack_config));
                        })
                    }
                    terminal.sendText('# Creating tsconfig.json');
                    if (tsconfig) {
                        tsconfig_uri = vscode.Uri.parse(tsconfig);
                        vscode.workspace.fs.writeFile(tsconfig_uri, Buffer.from(tsconfig_config_view));
                    }
                    terminal.sendText('# Installing TypeScript');
                    terminal.sendText(`cd ${terminal_home}`);
                    terminal.sendText(`npm install typescript ts-loader --save-dev`);
                }
            });
        }
    });
};
