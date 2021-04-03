/* eslint-disable curly */
/* eslint-disable @typescript-eslint/naming-convention */
import "reflect-metadata";
import { container } from 'tsyringe';
import * as vscode from 'vscode';
import Alpine from './alpine/injectable';
import TailwindCSS from './fragment/injectable';
import CSS from './css/injectable';
import TypeScript from './typescript/injectable';
import PETAL from './petal/injectable';

const AlpineInstance = container.resolve(Alpine);
const FragmentInstance = container.resolve(TailwindCSS);
const CSSInstance = container.resolve(CSS);
const TailwindCSSInstance = container.resolve(TailwindCSS);
const TypeScriptInstance = container.resolve(TypeScript);
const PETALInstance = container.resolve(PETAL);

export function activate(context: vscode.ExtensionContext) {
	CSSInstance.init({ context: context });
	FragmentInstance.init({ context: context });
	AlpineInstance.init({ context: context });
	TailwindCSSInstance.init({ context: context });
	TypeScriptInstance.init({ context: context });
	PETALInstance.init({ context: context });
}

// this method is called when your extension is deactivated
export function deactivate() { }