import * as vscode from 'vscode';
import * as Message from '../../util/message';
import * as TWConfigView from '../../tailwindcss/view/configView';
import * as TWImportView from '../../tailwindcss/view/importView';
import * as TWPostCSSLoaderView from '../../tailwindcss/view/postCSSLoaderView';
import * as TWPostCSSConfigView from '../../tailwindcss/view/postCSSConfigView';
import { TextDecoder } from 'util';

const tw_import_view = new TWImportView.View().toString();
const tw_config_view = new TWConfigView.View().toString();
const tw_postcss_config_view = new TWPostCSSConfigView.View().toString();
const tw_postcss_loader_view = new TWPostCSSLoaderView.View().toString();

const Decoder = new TextDecoder('utf-8');

const newCreatePETALDisposable = ({ context }: { context?: vscode.ExtensionContext }) => {
    return vscode.commands.registerCommand('runexecFlamekit.setupPETAL', () => {
        Message.info('Attempting to instal TypeScript, AlpineJS, and TailwindCSS');
        const folders = vscode.workspace.workspaceFolders;
        if (folders) {
            const folder = folders[0].uri.toString() + '/assets';
            const assets_path = folder.replace('file://', '');
            const css_path = assets_path + '/css';
            const appscss_path = css_path + '/app.scss';
            const appcss_path = css_path + '/app.css';
            const scss_uri = vscode.Uri.parse(appscss_path);
            const css_uri = vscode.Uri.parse(appcss_path);
            const tailwind_config_path = assets_path + '/tailwind.config.js';
            const postcss_config_path = assets_path + '/postcss.config.js';
            const webpack_config_path = assets_path + '/webpack.config.js';
            const terminal = vscode.window.createTerminal('Flamekit PETAL');
            terminal.show();
            terminal.sendText(`cd ${assets_path}`);
            terminal.sendText('# Installing TypeScript');
            terminal.sendText(`npm install typescript ts-loader --save-dev`);
            terminal.sendText('# Installing AlpineJS');
            terminal.sendText(`npm install alpinejs --save`);
            terminal.sendText(`# Installing TailwindCSS`)
            terminal.sendText(`npm install tailwindcss postcss postcss-import autoprefixer postcss-loader@4.2.0 --save-dev`);
            // skips uri on rejection
            [scss_uri, css_uri].forEach((uri) => {
                vscode.workspace.fs.stat(uri).then(() => {
                    vscode.workspace.fs.readFile(uri).then((data) => {
                        terminal.sendText(`# Updating ${uri.toString()}`)
                        const updated = tw_import_view + "\n" + Decoder.decode(data);
                        vscode.workspace.fs.writeFile(uri, Buffer.from(updated));
                    });
                });
            });
            let uri = vscode.Uri.parse(tailwind_config_path);
            terminal && terminal.sendText('# Creating ' + uri.toString());
            vscode.workspace.fs.writeFile(uri, Buffer.from(tw_config_view, 'utf-8'));
            uri = vscode.Uri.parse(postcss_config_path);
            terminal && terminal.sendText('# Creating ' + uri.toString());
            vscode.workspace.fs.writeFile(uri, Buffer.from(tw_postcss_config_view, 'utf-8'));
            uri = vscode.Uri.parse(webpack_config_path);
            vscode.workspace.fs.readFile(uri).then(data => {
                if (Decoder.decode(data).indexOf(`'postcss-loader'`) === -1) {
                    terminal && terminal.sendText('# Updating ' + uri.toString());
                    vscode.workspace.fs.readFile(uri).then(data => {
                        const webpack_content = Decoder.decode(data).replace("'css-loader',\n", tw_postcss_loader_view);
                        vscode.workspace.fs.writeFile(uri, Buffer.from(webpack_content, 'utf-8'));
                    });
                }
            });
        }
    });
};

export const init = ({ context }: { context?: vscode.ExtensionContext }) => {
    if (context) {
        let disposable = newCreatePETALDisposable({ context: context });
        context.subscriptions.push(disposable);
    }
};