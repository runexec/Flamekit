import 'reflect-metadata';
import { container } from 'tsyringe';
import * as vscode from 'vscode';
import { TextDecoder } from 'util';

let Message: { info: (message: string) => void };

type Viewable = new () => any;
type View = { View: Viewable };

let AppView: View;
let TWConfigView: View;
let TWImportView: View;
let TWPostCSSConfigView: View;
let TWPostCSSLoaderView: View;
let AlpineImportView: View;
let LiveSocketView: View;
let TSConfigConfigView: View;
let TSWebpackConfigView: View & { getReplace: () => [string, string][] };

export const init = () => newCreatePETALDisposable();

const Decoder = new TextDecoder('utf-8');

const newCreatePETALDisposable = () => {
    Message = container.resolve('Util.Message.info');
    TWConfigView = container.resolve('tailwind.ConfigView');
    TWImportView = container.resolve('tailwind.ImportView');
    TWPostCSSConfigView = container.resolve('tailwind.PostCSSConfigView');
    TWPostCSSLoaderView = container.resolve('tailwind.PostCSSLoaderView');
    TSConfigConfigView = container.resolve('typescript.TSConfigConfigView');
    TSWebpackConfigView = container.resolve('typescript.WebpackConfigView');
    const tw_config_view = new TWConfigView.View().toString();
    const tw_postcss_config_view = new TWPostCSSConfigView.View().toString();
    const tw_postcss_loader_view = new TWPostCSSLoaderView.View().toString();
    const ts_config_view = new TSConfigConfigView.View().toString();
    const ts_webpack_config_view = new TSWebpackConfigView.View();
    return vscode.commands.registerCommand('runexecFlamekit.setupPETAL', () => {
        Message.info('Attempting to install TypeScript, AlpineJS, and TailwindCSS');
        const folders = vscode.workspace.workspaceFolders;
        if (folders) {
            const terminal = vscode.window.createTerminal('Flamekit PETAL');
            const {
                js_uri, loadjs_uri, ts_uri, ts_config_uri, ts, css, assets_path, 
                tailwind_config_path, postcss_config_path, webpack_config_path
            } = getVars({ folders: folders });
            terminal.show();
            terminal.sendText(`cd ${assets_path}`);
            terminal.sendText('# Installing TypeScript');
            terminal.sendText(`npm install typescript ts-loader@8.1.0 --save-dev`);
            terminal.sendText('npm install @types/phoenix --save');
            terminal.sendText('# Installing AlpineJS');
            terminal.sendText(`npm install alpinejs --save`);
            terminal.sendText(`# Installing TailwindCSS`)
            terminal.sendText(`npm install tailwindcss postcss postcss-import autoprefixer postcss-loader@4.2.0 --save-dev`);
            css.forEach(x => {
                const local_uri: vscode.Uri = x[0];
                const local_view: string = x[1];
                backupConfig({ terminal: terminal, uri: local_uri });
                writeImports({ terminal: terminal, uri: local_uri, view: local_view });
            });
            backupConfig({ terminal: terminal, uri: ts_config_uri });
            terminal.sendText(`# Creating ${ts_config_uri}`);
            vscode.workspace.fs.writeFile(ts_config_uri, Buffer.from(ts_config_view, 'utf-8'));
            /*
            terminal.sendText(`# Creating ${ts_uri}`);
            vscode.workspace.fs.writeFile(ts_uri, Buffer.from(ts, 'utf-8'))
            */ // TODO fix, merge or remove above.
            backupConfig({ terminal: terminal, uri: js_uri });
            terminal.sendText("# Renaming app.js to loadjs.js");
            vscode.workspace.fs.rename(js_uri, loadjs_uri);
            terminal.sendText('# Creating app.ts');
            vscode.workspace.fs.writeFile(ts_uri, Buffer.from('import "./loadjs";'));
            let uri = vscode.Uri.parse(tailwind_config_path);
            backupConfig({ terminal: terminal, uri: uri });
            terminal.sendText('# Creating ' + uri.toString());
            vscode.workspace.fs.writeFile(uri, Buffer.from(tw_config_view, 'utf-8'))
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
                ts_webpack_config_view.getReplace().forEach((r: string[]) => config = config.replace(r[0], r[1]));
                terminal.sendText('# Updating ' + uri.toString());
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
            terminal.sendText(`# Updating ${uri.toString()}`)
            const updated = view + "\n" + Decoder.decode(data);
            vscode.workspace.fs.writeFile(uri, Buffer.from(updated));
        });
    });
};

const backupConfig = ({ terminal, uri }: {
    terminal: vscode.Terminal,
    uri: vscode.Uri
}) => {
    // skips if not there
    vscode.workspace.fs.stat(uri).then(() => {
        terminal.sendText(`# Backing up ${uri}`);
        vscode.workspace.fs.copy(uri, vscode.Uri.parse(uri.toString() + '.bak'));
    });
};

const getVars = ({ folders }: { folders: readonly vscode.WorkspaceFolder[] }) => {
    AppView = container.resolve('petal.AppView');
    TWImportView = container.resolve('tailwind.ImportView');
    AlpineImportView = container.resolve('alpine.AlpineImportView');
    LiveSocketView = container.resolve('alpine.LiveSocketView');
    const app_view = (new AppView.View()).toString();
    const tw_import_view = (new TWImportView.View()).toString();
    const alpine_import_view = (new AlpineImportView.View()).toString();
    const live_socket_view = (new LiveSocketView.View()).toString();
    const folder = folders[0].uri.toString() + '/assets';
    const assets_path = folder.replace('file://', '');
    const js_path = assets_path + '/js';
    const appts_path = js_path + '/app.ts';
    const appjs_path = js_path + '/app.js';
    const loadjs_path = js_path + '/loadjs.js';
    const appts_uri = vscode.Uri.parse(appts_path);
    const appjs_uri = vscode.Uri.parse(appjs_path);
    const loadjs_uri = vscode.Uri.parse(loadjs_path);
    const ts = [alpine_import_view, app_view, live_socket_view].join("\n");
    const css_path = assets_path + '/css';
    const appscss_path = css_path + '/app.scss';
    const appcss_path = css_path + '/app.css';
    const scss_uri = vscode.Uri.parse(appscss_path);
    const css_uri = vscode.Uri.parse(appcss_path);
    const css: [vscode.Uri, string][] = [scss_uri, css_uri].map(x => [x, tw_import_view]);
    const tailwind_config_path = assets_path + '/tailwind.config.js';
    const postcss_config_path = assets_path + '/postcss.config.js';
    const webpack_config_path = assets_path + '/webpack.config.js';
    const ts_config_uri = vscode.Uri.parse(assets_path + '/tsconfig.json');
    return {
        loadjs_uri: loadjs_uri,
        js_uri: appjs_uri,
        ts_uri: appts_uri,
        ts_config_uri: ts_config_uri,
        ts: ts,
        css: css,
        assets_path: assets_path,
        tailwind_config_path: tailwind_config_path,
        postcss_config_path: postcss_config_path,
        webpack_config_path: webpack_config_path
    };
};
