import * as vscode from 'vscode';
import * as Message from '../../util/message';
import * as TWConfigView from '../../tailwindcss/view/configView';
import * as TWImportView from '../../tailwindcss/view/importView';
import * as TWPostCSSLoaderView from '../../tailwindcss/view/postCSSLoaderView';
import * as TWPostCSSConfigView from '../../tailwindcss/view/postCSSConfigView';
import * as AlpineImportView from '../../alpine/view/alpineImportView';
import * as LiveSocketView from '../../alpine/view/liveSocketView';
import * as AppView from '../view/view';
/* TODO: tsconfig.json or it will error about files*/

import * as TSWebpackConfigView from '../../typescript/view/webpackConfigView';

import { TextDecoder } from 'util';

const app_view = new AppView.View().toString();
const tw_import_view = new TWImportView.View().toString();
const tw_config_view = new TWConfigView.View().toString();
const tw_postcss_config_view = new TWPostCSSConfigView.View().toString();
const tw_postcss_loader_view = new TWPostCSSLoaderView.View().toString();
const alpine_import_view = (new AlpineImportView.View()).toString();
const live_socket_view = (new LiveSocketView.View()).toString();
const ts_webpack_config_view = new TSWebpackConfigView.View();

const Decoder = new TextDecoder('utf-8');

const newCreatePETALDisposable = ({ context }: { context?: vscode.ExtensionContext }) => {
    return vscode.commands.registerCommand('runexecFlamekit.setupPETAL', () => {
        Message.info('Attempting to instal TypeScript, AlpineJS, and TailwindCSS');
        const folders = vscode.workspace.workspaceFolders;
        if (folders) {
            const terminal = vscode.window.createTerminal('Flamekit PETAL');
            const {
                ts_uri, ts, css, assets_path, tailwind_config_path, postcss_config_path, webpack_config_path
            } = getVars({ folders: folders });
            terminal.show();
            terminal.sendText(`cd ${assets_path}`);
            terminal.sendText('# Installing TypeScript');
            terminal.sendText(`npm install typescript ts-loader --save-dev`);
            terminal.sendText('# Installing AlpineJS');
            terminal.sendText(`npm install alpinejs --save`);
            terminal.sendText(`# Installing TailwindCSS`)
            terminal.sendText(`npm install tailwindcss postcss postcss-import autoprefixer postcss-loader@4.2.0 --save-dev`);
            css.forEach(x => writeImports({ terminal: terminal, uri: x[0], view: x[1] }));
            terminal.sendText(`# Creating ${ts_uri}`)
            backupConfig({ terminal: terminal, uri: ts_uri });
            vscode.workspace.fs.writeFile(ts_uri, Buffer.from(ts, 'utf-8'));
            let uri = vscode.Uri.parse(tailwind_config_path);
            backupConfig({ terminal: terminal, uri: uri });
            terminal.sendText('# Creating ' + uri.toString());
            vscode.workspace.fs.writeFile(uri, Buffer.from(tw_config_view, 'utf-8'));
            uri = vscode.Uri.parse(postcss_config_path);
            backupConfig({ terminal: terminal, uri: uri });
            terminal.sendText('# Creating ' + uri.toString());
            vscode.workspace.fs.writeFile(uri, Buffer.from(tw_postcss_config_view, 'utf-8'));            
            uri = vscode.Uri.parse(webpack_config_path);
            backupConfig({ terminal: terminal, uri: uri });
            vscode.workspace.fs.readFile(uri).then(data => {
                let config = Decoder.decode(data);
                const isPostcss = config.indexOf(`'postcss-loader'`) === -1;
                config = !isPostcss ? config : config.replace("'css-loader',\n", tw_postcss_loader_view);
                terminal.sendText('# Updating ' + uri.toString());
                ts_webpack_config_view.getReplace().forEach((r) => config = config.replace(r[0], r[1]));
                vscode.workspace.fs.writeFile(uri, Buffer.from(config, 'utf-8'));
            });
        }
    });
};


const writeImports = ({ terminal, uri, view }: {
    terminal: vscode.Terminal,
    uri: vscode.Uri,
    view: string
}) => {
    // skips uri on rejection
    vscode.workspace.fs.stat(uri).then(() => {
        vscode.workspace.fs.readFile(uri).then((data) => {
            backupConfig({ terminal: terminal, uri: uri });
            terminal.sendText(`# Updating ${uri.toString()}`)
            const updated = view + "\n" + Decoder.decode(data);
            vscode.workspace.fs.writeFile(uri, Buffer.from(updated));
        });
    });
};

const backupConfig = ({ terminal, uri } : { 
    terminal: vscode.Terminal, 
    uri: vscode.Uri 
}) => {
    terminal.sendText(`# Backing up ${uri}`);
    vscode.workspace.fs.copy(uri, vscode.Uri.parse(uri.toString() + '.bak'));
};

const getVars = ({ folders }: { folders: readonly vscode.WorkspaceFolder[] }) => {
    const folder = folders[0].uri.toString() + '/assets';
    const assets_path = folder.replace('file://', '');
    const js_path = assets_path + '/js';
    const appts_path = js_path + '/app.ts';
    const appts_uri = vscode.Uri.parse(appts_path);
    const js = [alpine_import_view, app_view, live_socket_view].join("\n");
    const css_path = assets_path + '/css';
    const appscss_path = css_path + '/app.scss';
    const appcss_path = css_path + '/app.css';
    const scss_uri = vscode.Uri.parse(appscss_path);
    const css_uri = vscode.Uri.parse(appcss_path);
    const css: [vscode.Uri, string][] = [scss_uri, css_uri].map(x => [x, tw_import_view]);
    const tailwind_config_path = assets_path + '/tailwind.config.js';
    const postcss_config_path = assets_path + '/postcss.config.js';
    const webpack_config_path = assets_path + '/webpack.config.js';
    return {
        ts_uri: appts_uri,
        ts: js,
        css: css,
        assets_path: assets_path,
        tailwind_config_path: tailwind_config_path,
        postcss_config_path: postcss_config_path,
        webpack_config_path: webpack_config_path
    };
};

export const init = ({ context }: { context?: vscode.ExtensionContext }) => {
    if (context) {
        let disposable = newCreatePETALDisposable({ context: context });
        context.subscriptions.push(disposable);
    }
};