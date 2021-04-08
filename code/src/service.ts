import "reflect-metadata";
import { container } from 'tsyringe';
import './injection';
import * as vscode from 'vscode';

type Instance = {
    init: ({ context }: { 
        context: vscode.ExtensionContext; 
    }) => void
};

let AlpineInstance: Instance;
let CSSInstance: Instance;
let FragmentInstance: Instance;
let PETALInstance: Instance;
let TailwindCSSInstance: Instance;
let TypeScriptInstance: Instance;

export function init({ context }: { context: vscode.ExtensionContext }) {
    AlpineInstance = container.resolve('AlpineInstance');
    AlpineInstance.init({ context: context });
    CSSInstance = container.resolve('CSSInstance');
    CSSInstance.init({ context: context });
    FragmentInstance = container.resolve('FragmentInstance');
    FragmentInstance.init({ context: context });
    TypeScriptInstance = container.resolve('TypeScriptInstance');
    TypeScriptInstance.init({ context: context });
    TailwindCSSInstance = container.resolve('TailwindCSSInstance');
    TailwindCSSInstance.init({ context: context });
    PETALInstance = container.resolve('PETALInstance');
    PETALInstance.init({ context: context });
}