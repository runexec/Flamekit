import * as vscode from 'vscode';

export const info = (message: string) => { vscode.window.showInformationMessage(message); };