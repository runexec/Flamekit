/* eslint-disable curly */
/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import * as CreateFragment from './fragment/controller/create';
import * as CreateCSS from './css/createCSS';

export function activate(context: vscode.ExtensionContext) {
	CreateCSS.init(context);
	CreateFragment.init(context);
}

// this method is called when your extension is deactivated
export function deactivate() { }