/* eslint-disable curly */
/* eslint-disable @typescript-eslint/naming-convention */
import 'reflect-metadata';
import { container } from 'tsyringe';
import * as vscode from 'vscode';

let Constant: Map<string, any>;

type Fragmenting = new (directory: string, fs_path: string, line: string) => {
	save: Function,
	getTag: (file_name: string) => string,
	getNewFragment: (file_name: string) => string,
	Base: any
};

const FragmentTypes = container.resolve('Fragment') as {
	Fragment: Fragmenting,
	FragmentList: Fragmenting,
	FragmentArray: Fragmenting,
	FragmentLive: Fragmenting,
	FragmentLiveList: Fragmenting,
	FragmentLiveArray: Fragmenting,
	FragmentUnknown: Fragmenting
};

type Fragment = typeof FragmentTypes.Fragment;
type FragmentList = typeof FragmentTypes.FragmentList;
type FragmentArray = typeof FragmentTypes.FragmentArray;
type FragmentLive = typeof FragmentTypes.FragmentLive;
type FragmentLiveList = typeof FragmentTypes.FragmentLiveList;
type FragmentLiveArray = typeof FragmentTypes.FragmentLiveArray;
// type FragmentUnknown = typeof FragmentTypes.FragmentUnknown;

let LineTypeInjection = container.resolve('type.LineType') as {
	LineType: { [k: string]: number },
};

type LineType = typeof LineTypeInjection.LineType;

export interface FragmentLine {
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

export async function initFragment(F: Fragment): Promise<void>;
export async function initFragment(F: FragmentLive): Promise<void>;
export async function initFragment(F: FragmentLiveList): Promise<void>;
export async function initFragment(F: FragmentLiveArray): Promise<void>;
export async function initFragment(F: FragmentList): Promise<void>;
export async function initFragment(F: FragmentArray): Promise<void> {
	CreateFragment = container.resolve('fragment.CreateFragment');
	CreateFragmentArray = container.resolve('fragment.CreateFragmentArray');
	CreateFragmentList = container.resolve('fragment.CreateFragmentList');
	CreateFragmentLive = container.resolve('fragment.CreateFragmentLive');
	CreateFragmentLiveArray = container.resolve('fragment.CreateFragmentLiveArray');
	CreateFragmentLiveList = container.resolve('fragment.CreateFragmentLiveList');
	switch (true) {
		case F instanceof FragmentTypes.FragmentUnknown: null; break;
		case F instanceof FragmentTypes.FragmentLiveList: CreateFragmentLiveList.createFragment(F); break;
		case F instanceof FragmentTypes.FragmentLiveArray: CreateFragmentLiveArray.createFragment(F); break;
		case F instanceof FragmentTypes.FragmentLive: CreateFragmentLive.createFragment(F); break;
		case F instanceof FragmentTypes.FragmentList: CreateFragmentList.createFragment(F); break;
		case F instanceof FragmentTypes.FragmentArray: CreateFragmentArray.createFragment(F); break;
		case F instanceof FragmentTypes.Fragment: CreateFragment.createFragment(F); break;
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
		let fragment: Fragment;
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
