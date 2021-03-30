/* eslint-disable curly */
/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import * as CreateFragment from './fragment/controller/create';
import * as CreateCSS from './css/controller/create';
import * as CreateAlpine from './alpine/controller/create';
import * as CreateTailwindCSS from './tailwindcss/controller/create';

export function activate(context: vscode.ExtensionContext) {
	CreateCSS.init({context: context});
	CreateFragment.init({context: context});
	CreateAlpine.init({context: context});
	CreateTailwindCSS.init(context);
}

// this method is called when your extension is deactivated
export function deactivate() { }