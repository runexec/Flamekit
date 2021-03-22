/* eslint-disable curly */
/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import * as CreateFragment from './fragment/createFragment';
import * as CSS from './util/css';

export function activate(context: vscode.ExtensionContext) {
	CSS.init(context);
	CreateFragment.init(context);
}

// this method is called when your extension is deactivated
export function deactivate() { }