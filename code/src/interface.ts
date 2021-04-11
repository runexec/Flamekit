/* eslint-disable @typescript-eslint/naming-convention */
import { singleton } from 'tsyringe';
import * as vscode from 'vscode';
import * as Enums from './enum';

export interface IPaths {
    calling_path: string;
    active_path: string | undefined;
}

export interface IWorkingPaths extends IPaths {
    assets_path: string;
    css_path: string;
    js_path: string;
}