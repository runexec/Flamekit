/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
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
    save: Function,
    line: string,
    start_position: vscode.Position,
    fragment: string,
    is_list: boolean,
    call: Function
};