/* eslint-disable curly */
/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import * as Constant from '../constant';
import * as FragmentTag from './fragmentTag';
import * as FragmentFileName from './fragmentFileName';
import * as FragmentFile from './fragmentFile';
import * as FragmentGroup from './fragmentGroup';
import * as Message from '../util/message';

export class Fragment {
	line: string;
	fs_path: string;
	directory: string;
	document: undefined | vscode.TextDocument;


	constructor(directory: string, fs_path: string, line: string) {
		this.directory = directory;
		this.fs_path = fs_path;
		this.line = line;
	}

	private clean_offset: number = 0;
	private cleanMatch(line: string) {
		const m = line.match(/<\/\S+><\/\S+>/),
			m2 = line.match(/<\/\S+>\}<\/\S+>/),
			found = [m, m2].filter(x => x)[0];
		this.clean_offset = found == m2 ? 0 : 1;
		return found;
	}

	clean() {
		if ((this.document = vscode.window.activeTextEditor?.document)) {
			setTimeout(() => {
				const editor = vscode.window.activeTextEditor;
				editor && editor.edit((e) => {
					const text = editor.document.getText();
					text.split("\n").forEach(async (line, idx) => {
						let m = null,
							latest = vscode.window.activeTextEditor?.document;
						if (latest && (m = this.cleanMatch(line))) {
							m.forEach((token) => {
								const dirt = token;
								const offset = dirt.split('>')[1].length;
								const start_char = line.indexOf(dirt) + offset + this.clean_offset;
								const start_pos = new vscode.Position(idx, start_char);
								const end_pos = start_pos && new vscode.Position(start_pos.line, start_pos.character + dirt.length + 1);
								if (start_pos && end_pos) {
									Message.info(end_pos.line + ' - ' + end_pos.character + ' <<<<<<<');
									e.delete(new vscode.Range(start_pos, end_pos));
								}
							});
						}
					});
				});
			}, 100);
		}
	};
}

export class FragmentUnknown extends Fragment { };
export function createUnknown<F extends Fragment>(F: F) { return F; }

export function createFragment<F extends Fragment>(F: F) {
	return _createFragment(F.directory, F.fs_path, F.line);
};

export class FragmentLive extends Fragment { };
export function createFragmentLive<F extends FragmentLive>(F: F) {
	_createFragmentLive(F.directory, F.fs_path, F.line);
}

export class FragmentArray extends Fragment { };
export function createFragmentArray<F extends FragmentArray>(F: F) {
	_createFragmentArray(F.directory, F.fs_path, F.line);
}

export class FragmentLiveArray extends Fragment { };
export function createFragmentLiveArray<F extends FragmentLiveArray>(F: F) {
	_createFragmentLiveArray(F.directory, F.fs_path, F.line);
}

export class FragmentList extends Fragment { };
export function createFragmentList<F extends FragmentList>(F: F) {
	_createFragmentList(F.directory, F.fs_path, F.line);
}

export class FragmentLiveList extends Fragment { };
export function createFragmentLiveList<F extends FragmentLiveList>(F: F) {
	_createFragmentLiveList(F.directory, F.fs_path, F.line);
}

export const _createFragment = (directory: string, fs_path: string, line: string) => {
	const new_file = FragmentFileName.fragmentFileName(FragmentGroup.fragmentGroup(line)),
		path = `${directory}${new_file}`,
		uri = vscode.Uri.parse(fs_path + new_file + '.' + Constant.EXTENSION_EEX);
	vscode.workspace.fs.stat(uri).then((_) => { }, _ => {
		vscode.window.showInformationMessage(`Creating file: ${path}`);
		vscode.workspace.fs.writeFile(uri, Buffer.from('', 'utf-8'));
	}).then(() => vscode.commands.executeCommand('runexecFlamekit.createCSS'));
};

export const _createFragmentLive = (directory: string, fs_path: string, line: string) => {
	const new_file = FragmentFileName.fragmentFileName(FragmentTag.fragmentLiveTag(line)).replace(/\.html/, '_live.html'),
		path = `${directory}${new_file}`,
		uri = vscode.Uri.parse(fs_path + new_file + '.' + Constant.EXTENSION_LEEX);
	vscode.workspace.fs.stat(uri).then((_) => { }, _ => {
		vscode.window.showInformationMessage(`Creating file: ${path}`);
		vscode.workspace.fs.writeFile(uri, Buffer.from('', 'utf-8'));
	}).then(() => vscode.commands.executeCommand('runexecFlamekit.createCSS'));
};

export const _createFragmentArray = (directory: string, fs_path: string, line: string) => {
	const new_files = FragmentFile.fragmentArrayFiles(line),
		paths = new_files.map(x => `${directory}${x}`),
		uris = new_files.map(x => vscode.Uri.parse(fs_path + x + '.' + Constant.EXTENSION_EEX));
	uris.forEach((uri, idx) => {
		const fp = paths[idx];
		vscode.workspace.fs.stat(uri).then((_) => { }, _ => {
			vscode.window.showInformationMessage(`Creating file: ${fp}`);
			vscode.workspace.fs.writeFile(uri, Buffer.from('', 'utf-8'));
		}).then(() => vscode.commands.executeCommand('runexecFlamekit.createCSS'));
	});
};

export const _createFragmentLiveArray = (directory: string, fs_path: string, line: string) => {
	const new_files = FragmentFile.fragmentLiveArrayFiles(line),
		paths = new_files.map(x => `${directory}${x.replace(/\.html/, '_live.html')}`),
		uris = new_files.map(x => vscode.Uri.parse(fs_path + x + '.' + Constant.EXTENSION_LEEX));
	uris.forEach((uri, idx) => {
		const fp = paths[idx];
		vscode.workspace.fs.stat(uri).then((_) => { }, _ => {
			vscode.window.showInformationMessage(`Creating file: ${fp}`);
			vscode.workspace.fs.writeFile(uri, Buffer.from('', 'utf-8'));
		}).then(() => vscode.commands.executeCommand('runexecFlamekit.createCSS'));
	});
};

export const _createFragmentList = (directory: string, fs_path: string, line: string) => {
	const new_files = FragmentFile.fragmentListFiles(line),
		paths = new_files.map(x => `${directory}${x})}`),
		uris = new_files.map(x => vscode.Uri.parse(fs_path + x + '.' + Constant.EXTENSION_EEX));
	uris.forEach((uri, idx) => {
		const fp = paths[idx];
		vscode.workspace.fs.stat(uri).then((_) => { }, _ => {
			vscode.window.showInformationMessage(`Creating file: ${fp}`);
			vscode.workspace.fs.writeFile(uri, Buffer.from('', 'utf-8'));
		}).then(() => vscode.commands.executeCommand('runexecFlamekit.createCSS'));
	});
};

export const _createFragmentLiveList = (directory: string, fs_path: string, line: string) => {
	const new_files = FragmentFile.fragmentLiveListFiles(line),
		paths = new_files.map(x => `${directory}${x.replace(/\.html/, '_live.html')}`),
		uris = new_files.map(x => vscode.Uri.parse(fs_path + x + '.' + Constant.EXTENSION_LEEX));
	uris.forEach((uri, idx) => {
		const fp = paths[idx];
		vscode.workspace.fs.stat(uri).then((_) => { }, _ => {
			vscode.window.showInformationMessage(`Creating file: ${fp}`);
			vscode.workspace.fs.writeFile(uri, Buffer.from('', 'utf-8'));
		}).then(() => vscode.commands.executeCommand('runexecFlamekit.createCSS'));
	});
};