import * as Util from '../../util';
import * as Message from '../../util/message';
import * as vscode from 'vscode';
import { TextDecoder } from 'util';


export const init = ({ context }: { context: vscode.ExtensionContext }) => {
    let disposable = newCreateTailwindCSSDisposable({ context: context });
    context.subscriptions.push(disposable);
};

const view =
    `
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
` + "\n";

const tw_config_view =
    `
module.exports = {
  purge: [
    '../lib/**/*.ex',
    '../lib/**/*.leex',
    '../lib/**/*.eex',
    './js/**/*.js'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
`;

const postcss_config_view =
    `
module.exports = {
    plugins: [
            require('postcss-import'),
            require('tailwindcss'),
            require('autoprefixer'),
    ]
}
`;

const postcss_loader_view = "'css-loader',\n'postcss-loader',\n";

const Decoder = new TextDecoder('utf-8');

const newCreateTailwindCSSDisposable = ({ context }: { context: vscode.ExtensionContext }) => {
    let terminal_home: string | null = null,
        terminal: vscode.Terminal | null = null,
        tailwind_config_path: string | null = null,
        postcss_config_path: string | null = null,
        webpack_config_path: string | null = null;
    return vscode.workspace.onDidSaveTextDocument(async (document: vscode.TextDocument) => {
        if (document.fileName.match(/\.(s)css$/)) {
            const editor = vscode.window.activeTextEditor;
            editor && editor.edit((edit) => {
                const start = document.getText().match(/=setupTW/)?.index;
                if (start) {
                    Message.info('Found TailwindCSS Install Line');
                    const start_pos = document.positionAt(start);
                    const end_pos = document.positionAt(start + 8);
                    edit.delete(new vscode.Range(start_pos, end_pos));
                    edit.replace(new vscode.Position(0, 0), view);
                    const { assets_path } = Util.getWorkingPaths({
                        wsf: vscode.workspace.workspaceFolders || [],
                        active_document: document
                    });
                    terminal_home = assets_path.replace('file://', '');
                    tailwind_config_path = assets_path + '/tailwind.config.js';
                    postcss_config_path = assets_path + '/postcss.config.js';
                    webpack_config_path = assets_path + '/webpack.config.js';
                }
            }).then(() => {
                if (terminal_home && tailwind_config_path && postcss_config_path && webpack_config_path) {
                    terminal = vscode.window.createTerminal('Flamekit TailwindCSS Install');
                    terminal.show();
                    terminal.sendText(`cd ${terminal_home}`);
                    terminal.sendText('# Installing TailwindCSS');
                    let uri = vscode.Uri.parse(tailwind_config_path);
                    terminal && terminal.sendText('# Creating ' + uri.toString());
                    vscode.workspace.fs.writeFile(uri, Buffer.from(tw_config_view, 'utf-8'));
                    uri = vscode.Uri.parse(postcss_config_path);
                    terminal && terminal.sendText('# Creating ' + uri.toString());
                    vscode.workspace.fs.writeFile(uri, Buffer.from(postcss_config_view, 'utf-8'));
                    uri = vscode.Uri.parse(webpack_config_path);
                    vscode.workspace.fs.readFile(uri).then(data => {
                        if (Decoder.decode(data).indexOf(`'postcss-loader'`) === -1) {
                            terminal && terminal.sendText('# Updating ' + uri.toString());
                            vscode.workspace.fs.readFile(uri).then(data => {
                                const webpack_content = Decoder.decode(data).replace("'css-loader',\n", postcss_loader_view);
                                vscode.workspace.fs.writeFile(uri, Buffer.from(webpack_content, 'utf-8'));
                            });
                        }
                    });
                    terminal.sendText(`npm install tailwindcss postcss postcss-import autoprefixer postcss-loader@4.2.0 --save-dev`);
                }
                terminal_home = null,
                    tailwind_config_path = null,
                    postcss_config_path = null,
                    webpack_config_path = null;
            });
        }
    });
};
