/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import * as Enums from './enum';

export interface IPaths {
    calling_path: string;
    active_path: string | undefined;
}

export interface IWorkingPaths extends IPaths {
    assets_path: string;
    css_path: string;
}

export interface ILineTypeFragmentCalls {
    getTag: Function,
    getNewFragment: Function,
    save: Function,
    Base: any,
}

export interface ICreateFragmentLine {
    line: string | undefined, 
    line_number: number, 
    line_type: Enums.LineType
};