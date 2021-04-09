import "reflect-metadata";
import { container } from 'tsyringe';
import './injection';
import * as vscode from 'vscode';

type Instance = { init: () => vscode.Disposable };

export function init() {
    return [
        (container.resolve('AlpineInstance') as Instance).init(),
        (container.resolve('CSSInstance') as Instance).init(),
        (container.resolve('FragmentInstance') as Instance).init(),
        (container.resolve('TypeScriptInstance') as Instance).init(),
        (container.resolve('TailwindCSSInstance') as Instance).init(),
        (container.resolve('PETALInstance') as Instance).init()
    ];
}