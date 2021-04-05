/* eslint-disable curly */
/* eslint-disable @typescript-eslint/naming-convention */
import "reflect-metadata";
import './injection';
import * as vscode from 'vscode';
import * as Services from './services';

export function activate(context: vscode.ExtensionContext) {
	Services.init({ context: context });
}

// this method is called when your extension is deactivated
export function deactivate() { }