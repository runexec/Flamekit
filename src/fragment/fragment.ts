/* eslint-disable curly */
/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import * as __C from '../constants';
import { LineType } from '../enums';
import * as Util from '../util/util';
import { ICreateFragmentStack, ILineTypeFragmentCalls } from '../interfaces';

// just one user, so this is okay.
const _store_fragment_singleton: [tagStart: string, tagEnd: string][] = [];

export const fragmentFile = (x: string) => `_${x.trimLeft()}.html`,
	fragmentTemplate = (x: string) => `<%= render "${fragmentFile(x)}" %>`,
	fragmentLiveFile = (x: string) => `_${x.trimLeft()}_live.html`,
	fragmentLiveTemplate = (x: string) => `<%= render "${fragmentLiveFile(x)}" %>`,
	fragmentListFile = (x: string) => `_${x.trimLeft().replace(/[\],\[,\},\{]/, '')}.html`,
	fragmentListTemplate = (x: string, tag: string) => {
		const tagStart = '<' + tag + '>',
			tagEnd = '</' + tagStart.split(' ')[0].split('<')[1] + '>';
		_store_fragment_singleton.push([tagStart, tagEnd]);
		return `${tagStart}<%= render "${fragmentListFile(x)}" %>${tagEnd}`;
	},
	fragmentLiveListTemplate = (x: string, tag: string) => {
		const tagStart = '<' + tag + '>',
			tagEnd = '</' + tagStart.split(' ')[0].split('<')[1] + '>';
		_store_fragment_singleton.push([tagStart, tagEnd]);
		return `${tagStart}<%= live_render "${fragmentListFile(x).replace(/\.html/, '')}" %>${tagEnd}`;
	};

export const matchFragment = (x: string): string | null => (x.match(__C.FRAGMENT_REGEX) || [null])[0],
	matchFragmentLive = (x: string): string | null => (x.match(__C.FRAGMENT_LIVE_REGEX) || [null])[0],
	matchFragmentArray = (x: string): string | null => (x.match(__C.FRAGMENT_ARRAY_GROUP_REGEX) || [null, null])[1],
	matchFragmentLiveArray = (x: string): string | null => (x.match(__C.FRAGMENT_LIVE_ARRAY_GROUP_REGEX) || [null, null])[1],
	matchFragmentList = (x: string): string | null => (x.match(__C.FRAGMENT_LIST_GROUP_REGEX) || [null, null])[1],
	matchFragmentLiveList = (x: string): string | null => (x.match(__C.FRAGMENT_LIVE_LIST_GROUP_REGEX) || [null, null])[1];

export const isFragment = (x: string) => matchFragment(x) !== null,
	isFragmentLive = (x: string) => matchFragmentLive(x) !== null,
	isFragmentArray = (x: string) => matchFragmentArray(x) !== null,
	isFragmentLiveArray = (x: string) => matchFragmentLiveArray(x) !== null,
	isFragmentList = (x: string) => matchFragmentList(x) !== null,
	isFragmentList_LineType = (x: LineType) => x === LineType.FragmentList || LineType.FragmentLiveList,
	isFragmentLiveList = (x: string) => matchFragmentLiveList(x) !== null;

export const fragmentGroup = (x: string) => (x.match(__C.FRAGMENT_GROUP_REGEX) || [])[1],
	fragmentLiveGroup = (x: string) => (x.match(__C.FRAGMENT_LIVE_GROUP_REGEX) || [])[1],
	fragmentArrayGroup = (x: string) => (x.match(__C.FRAGMENT_ARRAY_GROUP_REGEX) || [])[1],
	fragmentLiveArrayGroup = (x: string) => (x.match(__C.FRAGMENT_LIVE_ARRAY_GROUP_REGEX) || [])[1],
	fragmentListGroup = (x: string) => (x.match(__C.FRAGMENT_LIST_GROUP_REGEX) || [])[1],
	fragmentLiveListGroup = (x: string) => (x.match(__C.FRAGMENT_LIVE_LIST_GROUP_REGEX) || [])[1];

export const fragmentTag = (x: string) => (x.match(__C.FRAGMENT_REGEX) || [''])[0],
	fragmentLiveTag = (x: string) => (x.match(__C.FRAGMENT_LIVE_REGEX) || [''])[0],
	fragmentArrayTag = (x: string) => (x.match(__C.FRAGMENT_ARRAY_REGEX) || [''])[0],
	fragmentLiveArrayTag = (x: string) => (x.match(__C.FRAGMENT_LIVE_ARRAY_REGEX) || [''])[0],
	fragmentListTag = (x: string) => (x.match(__C.FRAGMENT_LIST_GROUP_REGEX) || [''])[0],
	fragmentLiveListTag = (x: string) => (x.match(__C.FRAGMENT_LIVE_LIST_GROUP_REGEX) || [''])[0];

export const fragmentTagLength = (x: string) => fragmentTag(x).length,
	fragmentLiveTagLength = (x: string) => fragmentLiveTag(x).length,
	fragmentArrayTagLength = (x: string) => fragmentArrayTag(x).length,
	fragmentLiveArrayTagLength = (x: string) => fragmentLiveArrayTag(x).length,
	fragmentListTagLength = (x: string) => fragmentListTag(x).length,
	fragmentLiveListTagLength = (x: string) => fragmentLiveListTag(x).length;

export const fragmentString = (x: string) => fragmentTemplate(fragmentGroup(x)),
	fragmentLiveString = (x: string) => fragmentLiveTemplate(fragmentLiveGroup(x)),
	fragmentArrayString = (x: string) => {
		const group = fragmentArrayGroup(x);
		const fragments = group ? group.split(', ') : false;
		return fragments ? fragments.map(x => fragmentTemplate(x)).join("\n") : "";
	},

	fragmentListString = (x: string) => {
		const group = fragmentListGroup(x),
			remove_brackets = (x: string) => x.replace(__C.FRAGMENT_LISTSTRING_REMOVE_BRACKETS_REGEX, ''),
			fragments = group ? remove_brackets(group).split(', ') : false;
		if (fragments) {
			const tag = (x.match(__C.FRAGMENT_LISTSTRING_REGEX) || ['', ''])[1].split('>')[0];
			return fragments.map(x => fragmentListTemplate(x, tag)).join('\n');
		}
		return '';
	},
	fragmentLiveListString = (x: string) => {
		const group = fragmentLiveListGroup(x),
			remove_brackets = (x: string) => x.replace(__C.FRAGMENT_LIVE_LISTSTRING_REMOVE_BRACKETS_REGEX, ''),
			fragments = group ? remove_brackets(group).split(', ') : false;
		if (fragments) {
			const tag = (x.match(__C.FRAGMENT_LIVE_LISTSTRING_REGEX) || ['', ''])[1].split('>')[0];
			return fragments.map(x => fragmentLiveListTemplate(x, tag)).join('\n');
		}
		return '';
	},
	fragmentLiveArrayString = (x: string) => {
		const group = fragmentLiveArrayGroup(x);
		const fragments = group ? group.split(', ') : false;
		return fragments ? fragments.map(x => fragmentLiveTemplate(x)).join("\n") : "";
	},
	fragmentArrayFiles = (x: string): string[] => {
		const group = fragmentArrayGroup(x),
			fragments = group ? group.split(', ') : false;
		return fragments ? fragments.map(x => fragmentFile(x)) : [];
	},
	fragmentLiveArrayFiles = (x: string): string[] => {
		const group = fragmentLiveArrayGroup(x),
			fragments = group ? group.split(', ') : false;
		return fragments ? fragments.map(x => fragmentLiveFile(x)) : [];
	},
	fragmentListFiles = (x: string): string[] => {
		const group = fragmentListGroup(x);
		let fragments: string[] | undefined;
		if (group) {
			const m = group.match(/\[(.*)\]/);
			m && (fragments = m[1].split(', '));
		}
		return fragments ? fragments.map(x => fragmentListFile(x)) : [];
	},
	fragmentLiveListFiles = (x: string): string[] => {
		const group = fragmentLiveListGroup(x),
			fragments = group ? group.split(', ') : false;
		return fragments ? fragments.map(x => fragmentLiveFile(x)) : [];
	};

export const isValidFragment = (x: string) => {
	return [
		isFragment,
		isFragmentLive,
		isFragmentArray,
		isFragmentLiveArray,
		isFragmentList,
		isFragmentLiveList
	].some((f) => f(x));
};

export const getFragmentData = (content: string[]): {
	line: string | undefined,
	line_number: number,
	line_type: LineType
} => {
	let line_type = LineType.Unknown,
		line_number = 0;
	const lines = content.filter((line, idx) => isValidFragment(line) && ((line_number = idx) === idx)),
		line = lines.filter(x => x !== undefined)[0];
	if (line !== undefined) {
		switch (true) {
			case isFragment(line): line_type = LineType.Fragment; break;
			case isFragmentLive(line): line_type = LineType.FragmentLive; break;
			// List must come before Array because similar regular expression
			case isFragmentList(line): line_type = LineType.FragmentList; break;
			case isFragmentLiveList(line): line_type = LineType.FragmentLiveList; break;
			case isFragmentArray(line): line_type = LineType.FragmentArray; break;
			case isFragmentLiveArray(line): line_type = LineType.FragmentLiveArray; break;
			default: line_type = LineType.Unknown;
		}
	}
	return { line: line, line_number: line_number, line_type: line_type };
};

export const _createFragment = (directory: string, fs_path: string, line: string) => {
	const new_file = fragmentFile(fragmentGroup(line)),
		path = `${directory}${new_file}`,
		uri = vscode.Uri.parse(fs_path + new_file + '.' + __C.EXTENSION_EEX);
	vscode.workspace.fs.stat(uri).then((_) => { }, _ => {
		vscode.window.showInformationMessage(`Creating file: ${path}`);
		vscode.workspace.fs.writeFile(uri, Buffer.from('', 'utf-8'));
	});
};

export const _createFragmentLive = (directory: string, fs_path: string, line: string) => {
	const new_file = fragmentFile(fragmentLiveGroup(line)).replace(/\.html/, '_live.html'),
		path = `${directory}${new_file}`,
		uri = vscode.Uri.parse(fs_path + new_file + '.' + __C.EXTENSION_LEEX);
	vscode.workspace.fs.stat(uri).then((_) => { }, _ => {
		vscode.window.showInformationMessage(`Creating file: ${path}`);
		vscode.workspace.fs.writeFile(uri, Buffer.from('', 'utf-8'));
	});
};

export const _createFragmentArray = (directory: string, fs_path: string, line: string) => {
	const new_files = fragmentArrayFiles(line),
		paths = new_files.map(x => `${directory}${x}`),
		uris = new_files.map(x => vscode.Uri.parse(fs_path + x + '.' + __C.EXTENSION_EEX));
	uris.forEach((uri, idx) => {
		const fp = paths[idx];
		vscode.workspace.fs.stat(uri).then((_) => { }, _ => {
			vscode.window.showInformationMessage(`Creating file: ${fp}`);
			vscode.workspace.fs.writeFile(uri, Buffer.from('', 'utf-8'));
		});
	});
};

export const _createFragmentLiveArray = (directory: string, fs_path: string, line: string) => {
	const new_files = fragmentLiveArrayFiles(line),
		paths = new_files.map(x => `${directory}${x.replace(/\.html/, '_live.html')}`),
		uris = new_files.map(x => vscode.Uri.parse(fs_path + x + '.' + __C.EXTENSION_LEEX));
	uris.forEach((uri, idx) => {
		const fp = paths[idx];
		vscode.workspace.fs.stat(uri).then((_) => { }, _ => {
			vscode.window.showInformationMessage(`Creating file: ${fp}`);
			vscode.workspace.fs.writeFile(uri, Buffer.from('', 'utf-8'));
		});
	});
};

export const _createFragmentList = (directory: string, fs_path: string, line: string) => {
	const new_files = fragmentListFiles(line),
		paths = new_files.map(x => `${directory}${x})}`),
		uris = new_files.map(x => vscode.Uri.parse(fs_path + x + '.' + __C.EXTENSION_EEX));
	uris.forEach((uri, idx) => {
		const fp = paths[idx];
		vscode.workspace.fs.stat(uri).then((_) => { }, _ => {
			vscode.window.showInformationMessage(`Creating file: ${fp}`);
			vscode.workspace.fs.writeFile(uri, Buffer.from('', 'utf-8'));
		});
	});
};

export const _createFragmentLiveList = (directory: string, fs_path: string, line: string) => {
	const new_files = fragmentLiveListFiles(line),
		paths = new_files.map(x => `${directory}${x.replace(/\.html/, '_live.html')}`),
		uris = new_files.map(x => vscode.Uri.parse(fs_path + x + '.' + __C.EXTENSION_LEEX));
	uris.forEach((uri, idx) => {
		const fp = paths[idx];
		vscode.workspace.fs.stat(uri).then((_) => { }, _ => {
			vscode.window.showInformationMessage(`Creating file: ${fp}`);
			vscode.workspace.fs.writeFile(uri, Buffer.from('', 'utf-8'));
		});
	});
};

export const fragment_data = {
	getTag: fragmentTag,
	getTagLength: fragmentTagLength,
	getNewFragment: fragmentString,
	save: _createFragment
},
	fragment_array_data = {
		getTag: fragmentArrayTag,
		getTagLength: fragmentArrayTagLength,
		getNewFragment: fragmentArrayString,
		save: _createFragmentArray
	},
	fragment_live_data = {
		getTag: fragmentLiveTag,
		getTagLength: fragmentLiveTagLength,
		getNewFragment: fragmentLiveString,
		save: _createFragmentLive
	},
	fragment_live_array_data = {
		getTag: fragmentLiveArrayTag,
		getTagLength: fragmentLiveArrayTagLength,
		getNewFragment: fragmentLiveArrayString,
		save: _createFragmentLiveArray
	},
	fragment_live_list_data = {
		getTag: fragmentLiveListTag,
		getTagLength: fragmentLiveListTagLength,
		getNewFragment: fragmentLiveListString,
		save: _createFragmentLiveList
	},
	fragment_list_data = {
		getTag: fragmentListTag,
		getTagLength: fragmentListTagLength,
		getNewFragment: fragmentListString,
		save: _createFragmentList
	},
	fragment_unknown_data = {
		getTag: (x: string) => { },
		getTagLength: (x: string) => { },
		getNewFragment: (x: string) => { },
		save: (_directory: string, _fs_path: string, _line: string) => { },
	};

export const fragmentLineTypeData = (line_type: LineType): ILineTypeFragmentCalls => {
	let calls = fragment_unknown_data;
	switch (line_type) {
		case LineType.Fragment: calls = fragment_data; break;
		case LineType.FragmentLive: calls = fragment_live_data; break;
		case LineType.FragmentArray: calls = fragment_array_data; break;
		case LineType.FragmentLiveArray: calls = fragment_live_array_data; break;
		case LineType.FragmentList: calls = fragment_list_data; break;
		case LineType.FragmentLiveList: calls = fragment_live_list_data; break;
		default: calls = fragment_unknown_data; break;
	}
	return calls;
};

export const isValidCreateFragment = (x: LineType) => {
	return [
		LineType.Fragment,
		LineType.FragmentArray,
		LineType.FragmentLive,
		LineType.FragmentLiveArray,
		LineType.FragmentList,
		LineType.FragmentLiveList,
	].some(y => y === x);
};

export const _createFragmentEntity = (
	stack: ICreateFragmentStack[],
	input_line: {
		line: string | undefined, line_number: number, line_type: LineType
	}) => {
	const { line, line_number, line_type } = input_line;
	if (line && isValidCreateFragment(line_type)) {
		const display_number = line_number + 1;
		vscode.window.showInformationMessage(`Fragment found on line number: ${display_number}`);
		const { save, getTag, getTagLength, getNewFragment } = fragmentLineTypeData(line_type),
			is_list = isFragmentList_LineType(line_type),
			[[tag_start, tag_end]] = _store_fragment_singleton[0] || [['', '']];
		_store_fragment_singleton.shift();
		const tag = getTag(line),
			start_line = line_number,
			start_char = is_list
				? line.indexOf(tag_start)
				: line.indexOf(tag),
			start_position = new vscode.Position(start_line, start_char),
			end_line = line_number,
			end_char = isFragmentList_LineType(line_type)
				? start_char + tag_start.length + tag_end.length + getTagLength(line)
				: start_char + getTagLength(line),
			end_position = new vscode.Position(end_line, end_char),
			fragment = getNewFragment(line),
			replace_range = new vscode.Range(start_position, end_position);
		stack.push({
			line: line,
			save: save,
			is_list: is_list === true,
			start_position: start_position,
			fragment: fragment,
			call: (edit: vscode.TextEditorEdit) => edit.replace(replace_range, fragment)
		});
	}
};

export const createFragment = (active_document: vscode.TextDocument) => {
	let current_line: string = "";
	const content = active_document.getText().toString().split("\n").map(x => getFragmentData([x]))
		.filter(x => x.line_type !== LineType.Unknown),
		stack: ICreateFragmentStack[] = [];
	content.forEach(input => _createFragmentEntity(stack, input));
	let offset = 0, new_offset = 0, fragment = [''];
	stack.reverse().forEach(new_edit => {
		vscode.window.activeTextEditor?.edit((edit: vscode.TextEditorEdit) => {
			if (new_edit.is_list) {
				//TODO:
				//fragment = new_edit.fragment.split("\n");
				//new_offset = fragment.length;
				//TODO:
				new_edit.call(edit);
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