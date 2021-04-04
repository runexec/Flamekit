/* eslint-disable curly */
/* eslint-disable @typescript-eslint/naming-convention */
import "reflect-metadata";
import { container } from 'tsyringe';
import * as vscode from 'vscode';
import * as Injection from './injection';

const AlpineInstance = container.resolve(Injection.Alpine);
const CSSInstance = container.resolve(Injection.CSS);
const FragmentInstance = container.resolve(Injection.Fragment);
const PETALInstance = container.resolve(Injection.PETAL);
const TailwindCSSInstance = container.resolve(Injection.TailwindCSS);
const TypeScriptInstance = container.resolve(Injection.TypeScript);

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