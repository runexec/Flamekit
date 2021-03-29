/* eslint-disable curly */
/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import * as CreateFragment from './fragment/controller/create';
import * as CreateCSS from './css/createCSS';
import * as CreateAlpine from './alpine/controller/create';
import * as CreateTailwindCSS from './tailwindcss/controller/create';

export function activate(context: vscode.ExtensionContext) {
	CreateCSS.init(context);
	CreateFragment.init(context);
	CreateAlpine.init(context);
	CreateTailwindCSS.init(context);
}

// this method is called when your extension is deactivated
export function deactivate() { }