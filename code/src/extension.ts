/* eslint-disable curly */
/* eslint-disable @typescript-eslint/naming-convention */
import "reflect-metadata";
import { container } from 'tsyringe';
import * as vscode from 'vscode';
import * as Injections from './injections'

const AlpineInstance = container.resolve(Injections.Alpine);
const FragmentInstance = container.resolve(Injections.Fragment);
const CSSInstance = container.resolve(Injections.CSS);
const TailwindCSSInstance = container.resolve(Injections.TailwindCSS);
const TypeScriptInstance = container.resolve(Injections.TypeScript);
const PETALInstance = container.resolve(Injections.PETAL);

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