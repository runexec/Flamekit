/* eslint-disable curly */
/* eslint-disable @typescript-eslint/naming-convention */
import 'reflect-metadata';
import { container } from 'tsyringe';
import * as vscode from 'vscode';
import * as Fragment from '../fragment';

let Constant: Map<string, any>;

let LineTypeInjection = container.resolve('type.LineType') as {
	LineType: { [k: string]: number },
};

type LineType = typeof LineTypeInjection.LineType;

interface FragmentLine {
    line: string | undefined,
    line_number: number,
    line_type: LineType
}

export interface Paths {
    calling_path: string;
    active_path: string | undefined;
}

export interface WorkingPaths extends Paths {
    assets_path: string;
    css_path: string;
    js_path: string;
}

let Entity: {
	create: ({ input_line }: {
		input_line: FragmentLine
	}) => any
}

let LineTypeObject: { getFragmentData: Function, getLineTypeObject: Function };

let Util: {
	getDirectory: ({ active_document, fs }: {
		active_document: vscode.TextDocument, fs?: boolean
	}) => string,
};

let CreateFragment: { createFragment: Function };
let CreateFragmentArray: { createFragment: Function };
let CreateFragmentList: { createFragment: Function };
let CreateFragmentLive: { createFragment: Function };
let CreateFragmentLiveArray: { createFragment: Function };
let CreateFragmentLiveList: { createFragment: Function };

export const init = () => newCreateFragmentDisposable();

const newCreateFragmentDisposable = () => {
	Constant = container.resolve('ConstantInstance');
	return vscode.workspace.onDidSaveTextDocument((d: vscode.TextDocument) => {
		const m = d.fileName.match(Constant.get('EXTENSION_REGEX'));
		const active_document = vscode.window.activeTextEditor?.document;
		m && active_document && createFragment({ active_document: active_document });
	});
};

export async function initFragment(F: Fragment.Fragment): Promise<void>;
export async function initFragment(F: Fragment.FragmentLive): Promise<void>;
export async function initFragment(F: Fragment.FragmentLiveList): Promise<void>;
export async function initFragment(F: Fragment.FragmentLiveArray): Promise<void>;
export async function initFragment(F: Fragment.FragmentList): Promise<void>;
export async function initFragment(F: Fragment.FragmentArray): Promise<void> {
	CreateFragment = container.resolve('fragment.CreateFragment');
	CreateFragmentArray = container.resolve('fragment.CreateFragmentArray');
	CreateFragmentList = container.resolve('fragment.CreateFragmentList');
	CreateFragmentLive = container.resolve('fragment.CreateFragmentLive');
	CreateFragmentLiveArray = container.resolve('fragment.CreateFragmentLiveArray');
	CreateFragmentLiveList = container.resolve('fragment.CreateFragmentLiveList');
	switch (true) {
		case F instanceof Fragment.FragmentUnknown: null; break;
		case F instanceof Fragment.FragmentLiveList: CreateFragmentLiveList.createFragment(F); break;
		case F instanceof Fragment.FragmentLiveArray: CreateFragmentLiveArray.createFragment(F); break;
		case F instanceof Fragment.FragmentLive: CreateFragmentLive.createFragment(F); break;
		case F instanceof Fragment.FragmentList: CreateFragmentList.createFragment(F); break;
		case F instanceof Fragment.FragmentArray: CreateFragmentArray.createFragment(F); break;
		case F instanceof Fragment.Fragment: CreateFragment.createFragment(F); break;
		default: null;
	}
}

export const createFragment = async ({ active_document }: { active_document: vscode.TextDocument | undefined }) => {
	if (active_document) {
		Util = container.resolve('Util');
		Entity = container.resolve('fragment.Entity');
		LineTypeObject = container.resolve('fragment.LineTypeObject');
		const directory = Util.getDirectory({ active_document: active_document }),
			fs_path = Util.getDirectory({ active_document: active_document, fs: true }),
			lines = active_document.getText().toString().split("\n");
		let fragment: Fragment.Fragment;
		directory && fs_path && LineTypeObject.getFragmentData({ content: lines })
			.filter((x: any) => x.line_type !== LineTypeInjection.LineType['FragmentUnknown'])
			.forEach(async (entity: any) => {
				const new_edit = Entity.create({ input_line: entity });
				vscode.window.activeTextEditor?.edit((edit: vscode.TextEditorEdit) => {
					if (new_edit && directory && fs_path) {
						fragment = new new_edit.Base(directory, fs_path, new_edit.line);
						initFragment(fragment);
						new_edit.call(edit);
						vscode.window.activeTextEditor?.document.save();
					}
				});
			});
	}
};
