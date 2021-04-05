import * as vscode from 'vscode';
import 'reflect-metadata';
import {container} from 'tsyringe';

const Constant : Map<string, any> = container.resolve('ConstantInstance');

export const info = (message: string) => { vscode.window.showInformationMessage(message); };
export const debugInfo = (message: string) => { if (Constant.get('DEBUG_MODE')) info(message); };
