/* eslint-disable curly */
/* eslint-disable @typescript-eslint/naming-convention */
import "reflect-metadata";
import * as vscode from 'vscode';
import * as Service from './service';


export function activate(context: vscode.ExtensionContext) {
	Service.init({ context: context });
}

// this method is called when your extension is deactivated
export function deactivate() { }