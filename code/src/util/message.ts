import * as vscode from 'vscode';
import * as Constant from '../constant';

const DEBUG = Constant.DEBUG_MODE;
export const info = (message: string) => { vscode.window.showInformationMessage(message); };
export const debugInfo = (message: string) => { if (DEBUG) info(message); };
