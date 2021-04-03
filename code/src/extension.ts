/* eslint-disable curly */
/* eslint-disable @typescript-eslint/naming-convention */
import "reflect-metadata";
import { container } from 'tsyringe';
import * as vscode from 'vscode';
import * as Injections from './injections'

const AlpineInstance = container.resolve(Injections.Alpine);
const CSSInstance = container.resolve(Injections.CSS);
const FragmentInstance = container.resolve(Injections.Fragment);
const PETALInstance = container.resolve(Injections.PETAL);
const TailwindCSSInstance = container.resolve(Injections.TailwindCSS);
const TypeScriptInstance = container.resolve(Injections.TypeScript);

export function activate(context: vscode.ExtensionContext) {
	AlpineInstance.init({ context: context });
	CSSInstance.init({ context: context });
	FragmentInstance.init({ context: context });
	PETALInstance.init({ context: context });
	TailwindCSSInstance.init({ context: context });
	TypeScriptInstance.init({ context: context });
}

// this method is called when your extension is deactivated
export function deactivate() { }