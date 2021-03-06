import 'reflect-metadata';
import {singleton, container} from 'tsyringe';
import * as vscode from 'vscode';
import * as Util from '../util';

export interface Paths {
    calling_path: string;
    active_path: string | undefined;
}

export interface WorkingPaths extends Paths {
    assets_path: string;
    css_path: string;
    js_path: string;
}

@singleton()
class Injection extends Object {
    getCallingPath: ({ active_document, fs }: { active_document: vscode.TextDocument; fs?: boolean | undefined; }) => string;
    getActivePath: ({ active_document, fs }: { active_document: vscode.TextDocument; fs?: boolean | undefined; }) => string | undefined;
    getFullActivePath: ({ active_document }: { active_document: vscode.TextDocument; }) => string;
    getPaths: ({ active_document }: { active_document: vscode.TextDocument; }) => Paths;
    getActiveFileName: ({ active_document, fs }: { active_document: vscode.TextDocument; fs?: boolean | undefined; }) => string | null;
    getDirectory: ({ active_document, fs }: { active_document: vscode.TextDocument; fs?: boolean | undefined; }) => string | null;
    getWorkingPaths: ({ wsf, active_document }: { wsf: readonly vscode.WorkspaceFolder[]; active_document: vscode.TextDocument; }) => WorkingPaths;
    showImporoperFileError: ({ active_document }: { active_document: vscode.TextDocument; }) => void;
    showInvalidPathError: ({ active_document }: { active_document: vscode.TextDocument; }) => void;
    showNoWorkspaceError: () => void;
    getFlamekitCSSIndex: ({ assets_path }: { assets_path: string; }) => vscode.Uri;
    constructor() {
        super();
        this.getCallingPath = Util.getCallingPath;
        this.getActivePath = Util.getActivePath;
        this.getFullActivePath = Util.getFullActivePath;
        this.getPaths = Util.getPaths;
        this.getActiveFileName = Util.getActiveFileName;
        this.getDirectory = Util.getDirectory;
        this.getWorkingPaths = Util.getWorkingPaths;
        this.showImporoperFileError = Util.showImproperFileError;
        this.showInvalidPathError = Util.showInvalidPathError;
        this.showNoWorkspaceError = Util.showNoWorkspaceError;
        this.getFlamekitCSSIndex = Util.getFlamekitCSSIndex;
    }
}

container.register('Util', Injection);