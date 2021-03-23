/* eslint-disable curly */
/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import * as Enums from '../enum';
import * as Util from '../util/util';
import * as FragmentLineTypeData from './fragmentLineTypeData';
import * as Constant from '../constant';
import * as Message from '../util/message';

export const init = (context: vscode.ExtensionContext) => {
	let disposable = newCreateFragmentDisposableCommand(context);
	context.subscriptions.push(disposable);
	disposable = newCreateFragmentDisposable(context);
	context.subscriptions.push(disposable);
};

const newCreateFragmentDisposableCommand = (_context: vscode.ExtensionContext) => {
	return vscode.commands.registerCommand('runexecFlamekit.createFragment', () => {
		const active_document = vscode.window.activeTextEditor?.document;
		if (active_document) createFragment(active_document);
	});
};

const newCreateFragmentDisposable = (_context: vscode.ExtensionContext) => {
	return vscode.workspace.onDidSaveTextDocument((d: vscode.TextDocument) => {
		const m = d.fileName.match(Constant.EXTENSION_REGEX);
		const active_document = vscode.window.activeTextEditor?.document;
		if (m && active_document) createFragment(active_document);
	});
};

export const createFragment = async (active_document: vscode.TextDocument | undefined) => {
	if (active_document) {
		const directory = Util.getDirectory({ active_document: active_document }),
			fs_path = Util.getDirectory({ active_document: active_document, fs: true });
		directory && fs_path && _createFragment(active_document, directory, fs_path);
	}
};

const _createFragment = async (active_document: vscode.TextDocument, directory: string, fs_path: string) => {
	const lines = cleanupLines(active_document),
		current_content = FragmentLineTypeData.getFragmentData(lines)
			.filter(x => x.line_type !== Enums.LineType.Unknown);
	current_content.forEach(entity => {
		let e = FragmentLineTypeData.createFragmentEntity(entity),
			new_edit;
		vscode.window.activeTextEditor?.edit((edit: vscode.TextEditorEdit) => {
			if ((new_edit = e) && new_edit && directory && fs_path) {
				let fragment = new new_edit.Base(directory, fs_path, new_edit.line);
				new_edit.save(fragment);
				new_edit.call(edit);
				vscode.window.activeTextEditor?.document.save();
			}
		});
	});
};


const cleanupLines = (active_document: vscode.TextDocument) => {
	// This one cleans Fragment </tag>asdasdasd</tag> at the end of a List
	return active_document.getText().toString().replace(/<\/\S+>*.?<\/\S+>/g, '').split("\n");
};
/*

TODO: investigating cursor must be set to bottom for certain expansion

*/