/* eslint-disable curly */
/* eslint-disable @typescript-eslint/naming-convention */
import "reflect-metadata";
import * as vscode from 'vscode';
import * as Service from './service';

const disposing : vscode.Disposable[] = [];

export function activate(context: vscode.ExtensionContext) { 
    Service.init().forEach((d:vscode.Disposable) => {
        context.subscriptions.push(d);
    }) 
}

export function deactivate() { disposing.forEach(d => d.dispose()); }