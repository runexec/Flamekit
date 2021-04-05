import "reflect-metadata";
import { container } from 'tsyringe';
import * as vscode from 'vscode';

type Instance = {
    init: ({ context }: { context: vscode.ExtensionContext; }) => void
};

const AlpineInstance: Instance = container.resolve('AlpineInstance');
const CSSInstance: Instance = container.resolve('CSSInstance');
const FragmentInstance: Instance = container.resolve('FragmentInstance');
const PETALInstance: Instance = container.resolve('PETALInstance');
const TailwindCSSInstance: Instance = container.resolve('TailwindCSSInstance');
const TypeScriptInstance: Instance = container.resolve('TypeScriptInstance');

export function init({ context }: { context: vscode.ExtensionContext }) {
    AlpineInstance.init({ context: context });
    CSSInstance.init({ context: context });
    FragmentInstance.init({ context: context });
    PETALInstance.init({ context: context });
    TailwindCSSInstance.init({ context: context });
    TypeScriptInstance.init({ context: context });
}