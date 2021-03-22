/* eslint-disable curly */
/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import * as Enums from '../enum';
import * as Util from '../util/util';
import * as FragmentLineTypeData from './fragmentLineTypeData';
import * as Constant from '../constant';

export const init = (context: vscode.ExtensionContext) => {
	let disposable = newCreateFragmentDisposableCommand(context);
	context.subscriptions.push(disposable);
	disposable = newCreateFragmentDisposable(context);
	context.subscriptions.push(disposable);
};

export const newCreateFragmentDisposableCommand = (_context: vscode.ExtensionContext) => {
	return vscode.commands.registerCommand('runexecFlamekit.createFragment', () => {
		const active_document = vscode.window.activeTextEditor?.document;
		if (active_document) createFragment(active_document);
	});
};

export const newCreateFragmentDisposable = (_context: vscode.ExtensionContext) => {
	return vscode.workspace.onDidSaveTextDocument((d: vscode.TextDocument) => {
		const m = d.fileName.match(Constant.EXTENSION_REGEX);
		const active_document = vscode.window.activeTextEditor?.document;
		if (m && active_document) {
			createFragment(active_document);
		}
	});
};

export const createFragment = (
	active_document: vscode.TextDocument | undefined,
) => {
	if (active_document) {
		const lines = active_document.getText().toString().split("\n"),
			current_content = FragmentLineTypeData.getFragmentData(lines)
				.filter(x => x.line_type !== Enums.LineType.Unknown)
				.reverse(),
			directory = Util.getDirectory({ active_document: active_document }),
			fs_path = Util.getDirectory({ active_document: active_document, fs: true });
		current_content.forEach(entity => {
			(async () => {
				let e = FragmentLineTypeData.createFragmentEntity(entity),
					new_edit;
				vscode.window.activeTextEditor?.edit((edit: vscode.TextEditorEdit) => {
					if ((new_edit = e) && new_edit) {
						new_edit.save(directory, fs_path, new_edit.line);
						new_edit.call(edit);
						// recursive call
						vscode.window.activeTextEditor?.document.save();
					}
				});
			})();
		});
	}
};