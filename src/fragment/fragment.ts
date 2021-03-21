/* eslint-disable curly */
/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import * as Constant from '../constant';
import * as Enums from '../enum';
import * as Util from '../util/util';
import * as Interface_ from '../interface';
import * as IsFragment from './isFragment';
import * as FragmentTemplate from './fragmentTemplate';
import * as FragmentFileName from './fragmentFileName';
import * as FragmentFile from './fragmentFile';
import * as FragmentGroup from './fragmentGroup';
import * as FragmentTag from './fragmentTag';
import * as FragmentTagLength from './fragmentTagLength';
import * as FragmentString from './fragmentString';
import * as Store from './store';


export const isValidFragment = (x: string) => {
	return [
		IsFragment.isFragment,
		IsFragment.isFragmentLive,
		IsFragment.isFragmentArray,
		IsFragment.isFragmentLiveArray,
		IsFragment.isFragmentList,
		IsFragment.isFragmentLiveList
	].some((f) => f(x));
};

export const getFragmentData = (content: string[]): {
	line: string | undefined,
	line_number: number,
	line_type: Enums.LineType
} => {
	let line_type = Enums.LineType.Unknown,
		line_number = 0;
	const lines = content.filter((line, idx) => isValidFragment(line) && ((line_number = idx) === idx)),
		line = lines.filter(x => x)[0];
	if (line !== undefined) {
		switch (true) {
			case IsFragment.isFragment(line): line_type = Enums.LineType.Fragment; break;
			case IsFragment.isFragmentLive(line): line_type = Enums.LineType.FragmentLive; break;
			// List must come before Array because similar regular expression
			case IsFragment.isFragmentList(line): line_type = Enums.LineType.FragmentList; break;
			case IsFragment.isFragmentLiveList(line): line_type = Enums.LineType.FragmentLiveList; break;
			case IsFragment.isFragmentArray(line): line_type = Enums.LineType.FragmentArray; break;
			case IsFragment.isFragmentLiveArray(line): line_type = Enums.LineType.FragmentLiveArray; break;
			default: line_type = Enums.LineType.Unknown;
		}
	}
	return { line: line, line_number: line_number, line_type: line_type };
};

export const _createFragment = (directory: string, fs_path: string, line: string) => {
	const new_file = FragmentFileName.fragmentFileName(FragmentGroup.fragmentGroup(line)),
		path = `${directory}${new_file}`,
		uri = vscode.Uri.parse(fs_path + new_file + '.' + Constant.EXTENSION_EEX);
	vscode.workspace.fs.stat(uri).then((_) => { }, _ => {
		vscode.window.showInformationMessage(`Creating file: ${path}`);
		vscode.workspace.fs.writeFile(uri, Buffer.from('', 'utf-8'));
	});
};

export const _createFragmentLive = (directory: string, fs_path: string, line: string) => {
	const new_file = FragmentFileName.fragmentFileName(FragmentTag.fragmentLiveTag(line)).replace(/\.html/, '_live.html'),
		path = `${directory}${new_file}`,
		uri = vscode.Uri.parse(fs_path + new_file + '.' + Constant.EXTENSION_LEEX);
	vscode.workspace.fs.stat(uri).then((_) => { }, _ => {
		vscode.window.showInformationMessage(`Creating file: ${path}`);
		vscode.workspace.fs.writeFile(uri, Buffer.from('', 'utf-8'));
	});
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
		});
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
		});
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
		});
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
		});
	});
};

const fragment_data = {
	getTag: FragmentTag.fragmentTag,
	getTagLength: FragmentTagLength.fragmentTagLength,
	getNewFragment: FragmentString.fragmentString,
	save: _createFragment
},
	fragment_array_data = {
		getTag: FragmentTag.fragmentArrayTag,
		getTagLength: FragmentTagLength.fragmentArrayTagLength,
		getNewFragment: FragmentString.fragmentArrayString,
		save: _createFragmentArray
	},
	fragment_live_data = {
		getTag: FragmentTag.fragmentLiveTag,
		getTagLength: FragmentTagLength.fragmentLiveTagLength,
		getNewFragment: FragmentString.fragmentLiveString,
		save: _createFragmentLive
	},
	fragment_live_array_data = {
		getTag: FragmentTag.fragmentLiveArrayTag,
		getTagLength: FragmentTagLength.fragmentLiveArrayTagLength,
		getNewFragment: FragmentString.fragmentLiveArrayString,
		save: _createFragmentLiveArray
	},
	fragment_live_list_data = {
		getTag: FragmentTag.fragmentLiveListTag,
		getTagLength: FragmentTagLength.fragmentLiveListTagLength,
		getNewFragment: FragmentString.fragmentLiveListString,
		save: _createFragmentLiveList
	},
	fragment_list_data = {
		getTag: FragmentTag.fragmentListTag,
		getTagLength: FragmentTagLength.fragmentListTagLength,
		getNewFragment: FragmentString.fragmentListString,
		save: _createFragmentList
	},
	fragment_unknown_data = {
		getTag: (x: string) => { },
		getTagLength: (x: string) => { },
		getNewFragment: (x: string) => { },
		save: (_directory: string, _fs_path: string, _line: string) => { },
	};

export const fragmentLineTypeData = (line_type: Enums.LineType): Interface_.ILineTypeFragmentCalls => {
	let calls = fragment_unknown_data;
	switch (line_type) {
		case Enums.LineType.Fragment: calls = fragment_data; break;
		case Enums.LineType.FragmentLive: calls = fragment_live_data; break;
		case Enums.LineType.FragmentArray: calls = fragment_array_data; break;
		case Enums.LineType.FragmentLiveArray: calls = fragment_live_array_data; break;
		case Enums.LineType.FragmentList: calls = fragment_list_data; break;
		case Enums.LineType.FragmentLiveList: calls = fragment_live_list_data; break;
		default: calls = fragment_unknown_data; break;
	}
	return calls;
};

export const isValidCreateFragment = (x: Enums.LineType) => {
	return [
		Enums.LineType.Fragment,
		Enums.LineType.FragmentArray,
		Enums.LineType.FragmentLive,
		Enums.LineType.FragmentLiveArray,
		Enums.LineType.FragmentList,
		Enums.LineType.FragmentLiveList,
	].some(y => y === x);
};

export const createReplacement = (line: string, line_type: Enums.LineType, line_number: number) => {
	const { save, getTag, getTagLength, getNewFragment } = fragmentLineTypeData(line_type),
		is_list = IsFragment.isFragmentList_LineType(line_type),
		[[tag_start, tag_end]] = Store._store_fragment_singleton[0] || [['', '']];
	Store._store_fragment_singleton.shift();
	const tag = getTag(line),
		start_line = line_number,
		start_char = is_list
			? line.indexOf(tag_start)
			: line.indexOf(tag),
		start_position = new vscode.Position(start_line, start_char),
		end_line = line_number,
		end_char = IsFragment.isFragmentList_LineType(line_type)
			? start_char + tag_start.length + tag_end.length + getTagLength(line)
			: start_char + getTagLength(line),
		end_position = new vscode.Position(end_line, end_char),
		fragment = getNewFragment(line),
		range = new vscode.Range(start_position, end_position);
	return {
		start_position: start_position,
		end_position: end_position,
		is_list: is_list,
		save: save,
		replace_range: range,
		fragment: fragment
	};
};

export const createFragmentEntity = (
	stack: Interface_.ICreateFragmentStack[],
	input_line: {
		line: string | undefined, line_number: number, line_type: Enums.LineType
	}) => {
	const { line, line_number, line_type } = input_line;
	if (line && isValidCreateFragment(line_type)) {
		const display_number = line_number + 1;
		vscode.window.showInformationMessage(`Fragment found on line number: ${display_number}`);
		const { start_position, end_position, is_list, save, replace_range, fragment } = createReplacement(line, line_type, line_number);
		stack.push({
			offset: line.length,
			line: line,
			save: save,
			is_list: is_list === true,
			start_position: start_position,
			end_position: end_position,
			fragment: fragment,
			call: (edit: vscode.TextEditorEdit) => edit.replace(replace_range, fragment)
		});
	}
};

let testing = 0;
let _active_document: vscode.TextDocument | undefined;
export const createFragment = (active_document: vscode.TextDocument) => {
	let current_line: string = "";
	const content = active_document.getText().toString().split("\n").map(x => getFragmentData([x]))
		.filter(x => x.line_type !== Enums.LineType.Unknown),
		stack: Interface_.ICreateFragmentStack[] = [];
	content.forEach(input => createFragmentEntity(stack, input));
	let offset = 0, new_offset = 0, fragment = [''];
	stack.reverse().forEach(new_edit => {
		vscode.window.activeTextEditor?.edit((edit: vscode.TextEditorEdit) => {
			if (new_edit.is_list) {
				// get the latest
				if (testing++ <= 1) {
					if ((_active_document = vscode.window.activeTextEditor?.document)) {
						new_edit.call(edit);
						createFragment(_active_document);
					}
				}
			} else {
				new_edit.call(edit);
			}
			const directory = Util.getDirectory({ active_document: active_document }),
				fs_path = Util.getDirectory({ active_document: active_document, fs: true });
			new_edit.save(directory, fs_path, new_edit.line);
		});
	});
};

export const newCreateFragmentDisposable = (context: vscode.ExtensionContext) => {
	return vscode.commands.registerCommand('runexecFlamekit.createFragment', () => {
		const active_document = vscode.window.activeTextEditor?.document;
		if (active_document) createFragment(active_document);
	});
};