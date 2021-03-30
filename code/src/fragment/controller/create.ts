/* eslint-disable curly */
/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import * as Enums from '../../enum';
import * as Util from '../../util';
import * as LineTypeObject from './lineTypeObject';
import * as Constant from '../../constant';
import * as Fragment from '../fragment';
import * as Entity from './entity';
import * as CreateFragment from './create/createFragment';
export * as CreateFragment from './create/createFragment';
import * as CreateFragmentArray from './create/createFragmentArray';
export * as CreateFragmentArray from './create/createFragmentArray';
import * as CreateFragmentList from './create/createFragmentList';
export * as CreateFragmentList from './create/createFragmentList';
import * as CreateFragmentLive from './create/createFragmentLive';
export * as CreateFragmentLive from './create/createFragmentLive';
import * as CreateFragmentLiveArray from './create/createFragmentLiveArray';
export * as CreateFragmentLiveArray from './create/createFragmentLiveArray';
import * as CreateFragmentLiveList from './create/createFragmentLiveList';
export * as CreateFragmentLiveList from './create/createFragmentLiveList';

export const init = ({ context }: { context?: vscode.ExtensionContext }) => {
	if (context) {
		const disposable = newCreateFragmentDisposable({ context: context });
		context.subscriptions.push(disposable);
	}
};

const newCreateFragmentDisposable = ({ context }: { context?: vscode.ExtensionContext }) => {
	return vscode.workspace.onDidSaveTextDocument((d: vscode.TextDocument) => {
		const m = d.fileName.match(Constant.EXTENSION_REGEX);
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
		const directory = Util.getDirectory({ active_document: active_document }),
			fs_path = Util.getDirectory({ active_document: active_document, fs: true }),
			lines = active_document.getText().toString().split("\n");
		let fragment: Fragment.Fragment;
		directory && fs_path && LineTypeObject.getFragmentData({content: lines})
			.filter(x => x.line_type !== Enums.LineType.FragmentUnknown)
			.forEach(async (entity) => {
				// TODO: refactor so constant not called for each iteration
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
