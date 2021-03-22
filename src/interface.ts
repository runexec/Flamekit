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
    getTagLength: Function,
    getNewFragment: Function,
    save: Function,
}

export interface ICreateFragmentStack extends Object {
    offset: number,
    save: Function,
    line: string,
    line_type: Enums.LineType,
    line_number: number,
    start_position: vscode.Position,
    end_position: vscode.Position,
    fragment: string,
    is_list: boolean,
    call: Function
};

export interface ICreateFragmentLine {
    line: string | undefined, 
    line_number: number, 
    line_type: Enums.LineType
};