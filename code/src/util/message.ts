import * as vscode from 'vscode';
import * as Constant from '../constant';

export const info = (message: string) => { vscode.window.showInformationMessage(message); };
export const debugInfo = (message: string) => { if (Constant.DEBUG_MODE) info(message); };
