/* eslint-disable curly */
/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import * as Enums from '../enum';
import * as Util from '../util/util';
import * as FragmentLineTypeData from './fragmentLineTypeData';

export const newCreateFragmentDisposable = (context: vscode.ExtensionContext) => {
	return vscode.commands.registerCommand('runexecFlamekit.createFragment', () => {
		const active_document = vscode.window.activeTextEditor?.document;
		if (active_document) createFragment(active_document);
	});
};

export const createFragment = (
	active_document: vscode.TextDocument | undefined,
) => {
	if (active_document) {
		const current_content = FragmentLineTypeData.getFragmentData(active_document.getText().toString().split("\n"))
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
						vscode.window.activeTextEditor?.document.save();
					}
				});
			})();
		});
	}
};