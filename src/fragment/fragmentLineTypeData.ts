/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import * as FragmentTag from './fragmentTag';
import * as FragmentTagLength from './fragmentTagLength';
import * as FragmentString from './fragmentString';
import * as IsFragment from './isFragment';
import * as Store from './store';
import * as Enums from '../enum';
import * as Interface_ from '../interface';
import * as Fragment_ from './fragment';
import * as Message from '../util/message';

export class Fragment implements Interface_.ILineTypeFragmentCalls {
	getTag: Function;
	getTagLength: Function;
	getNewFragment: Function;
	save: Function;
	Base: any;
	constructor() {
		this.getTag = FragmentTag.fragmentTag;
		this.getTagLength = FragmentTagLength.fragmentTagLength;
		this.getNewFragment = FragmentString.fragmentString;
		this.save = Fragment_.createFragment;
		this.Base = Fragment_.Fragment;
	};
};

export class FragmentArray implements Interface_.ILineTypeFragmentCalls {
	getTag: Function;
	getTagLength: Function;
	getNewFragment: Function;
	save: Function;
	Base: any;
	constructor() {
		this.getTag = FragmentTag.fragmentArrayTag;
		this.getTagLength = FragmentTagLength.fragmentArrayTagLength;
		this.getNewFragment = FragmentString.fragmentArrayString;
		this.save = Fragment_.createFragmentArray;
		this.Base = Fragment_.FragmentArray;
	};
};

export class FragmentLive implements Interface_.ILineTypeFragmentCalls {
	getTag: Function;
	getTagLength: Function;
	getNewFragment: Function;
	save: Function;
	Base: any;
	constructor() {
		this.getTag = FragmentTag.fragmentLiveTag;
		this.getTagLength = FragmentTagLength.fragmentLiveTagLength;
		this.getNewFragment = FragmentString.fragmentLiveString;
		this.save = Fragment_.createFragmentLive;
		this.Base = Fragment_.FragmentLive;
	};
};

export class FragmentLiveArray implements Interface_.ILineTypeFragmentCalls {
	getTag: Function;
	getTagLength: Function;
	getNewFragment: Function;
	save: Function;
	Base: any;
	constructor() {
		this.getTag = FragmentTag.fragmentLiveArrayTag;
		this.getTagLength = FragmentTagLength.fragmentLiveArrayTagLength;
		this.getNewFragment = FragmentString.fragmentLiveArrayString;
		this.save = Fragment_.createFragmentLiveArray;
		this.Base = Fragment_.FragmentLiveArray;
	};
};

export class FragmentList implements Interface_.ILineTypeFragmentCalls {
	getTag: Function;
	getTagLength: Function;
	getNewFragment: Function;
	save: Function;
	Base: any;
	constructor() {
		this.getTag = FragmentTag.fragmentListTag;
		this.getTagLength = FragmentTagLength.fragmentListTagLength;
		this.getNewFragment = FragmentString.fragmentListString;
		this.save = Fragment_.createFragmentList;
		this.Base = Fragment_.FragmentList;
	};
};

export class FragmentLiveList implements Interface_.ILineTypeFragmentCalls {
	getTag: Function;
	getTagLength: Function;
	getNewFragment: Function;
	save: Function;
	Base: any;
	constructor() {
		this.getTag = FragmentTag.fragmentLiveListTag;
		this.getTagLength = FragmentTagLength.fragmentLiveListTagLength;
		this.getNewFragment = FragmentString.fragmentLiveListString;
		this.save = Fragment_.createFragmentLiveList;
		this.Base = Fragment_.FragmentLiveList;
	};
};

export class FragmentUnknown implements Interface_.ILineTypeFragmentCalls {
	getTag: Function;
	getTagLength: Function;
	getNewFragment: Function;
	save: Function;
	Base: any;
	constructor() {
		this.getTag = (x: string) => { };
		this.getTagLength = (x: string) => { };
		this.getNewFragment = (x: string) => { };
		this.save = Fragment_.createUnknown;
		this.Base = Fragment_.FragmentUnknown;
	};
};

const isValidFragment = (x: string) => {
	return [
		IsFragment.isFragment,
		IsFragment.isFragmentLive,
		IsFragment.isFragmentArray,
		IsFragment.isFragmentLiveArray,
		IsFragment.isFragmentList,
		IsFragment.isFragmentLiveList
	].some(f => f(x));
};

const isValidCreateFragment = (x: Enums.LineType) => {
	return [
		Enums.LineType.Fragment,
		Enums.LineType.FragmentArray,
		Enums.LineType.FragmentLive,
		Enums.LineType.FragmentLiveArray,
		Enums.LineType.FragmentList,
		Enums.LineType.FragmentLiveList,
	].some(y => y === x);
};

export const getFragmentData = (content: string[]): {
	line: string | undefined,
	line_number: number,
	line_type: Enums.LineType
}[] => {
	let line_type = Enums.LineType.Unknown;
	return content
		.map((line, line_number) => {
			if (!isValidFragment(line)) { return { line: '', line_number: -1, line_type: line_type }; }
			switch (true) {
				case IsFragment.isFragment(line): line_type = Enums.LineType.Fragment; break;
				case IsFragment.isFragmentLive(line): line_type = Enums.LineType.FragmentLive; break;
				// List must come before Array because similar regular expression
				// Order might not matter now after Regex changes. Need to double-check
				case IsFragment.isFragmentList(line): line_type = Enums.LineType.FragmentList; break;
				case IsFragment.isFragmentLiveList(line): line_type = Enums.LineType.FragmentLiveList; break;
				case IsFragment.isFragmentArray(line): line_type = Enums.LineType.FragmentArray; break;
				case IsFragment.isFragmentLiveArray(line): line_type = Enums.LineType.FragmentLiveArray; break;
				default: line_type = Enums.LineType.Unknown;
			}
			return { line: line, line_number: line_number, line_type: line_type };
		}).filter(x => x.line_type !== Enums.LineType.Unknown);
};

export const createTextReplacement = (line: string, line_type: Enums.LineType, line_number: number) => {
	const { Base, save, getTag, getTagLength, getNewFragment } = fragmentLineTypeData(line_type),
		is_list = IsFragment.isFragmentList_LineType(line_type),
		[[tag_start, tag_end]] = Store._store_fragment_singleton.shift() || [['', '']];
	const tag = getTag(line),
		fragment = getNewFragment(line),
		start_line = line_number,
		start_char = is_list
			? line.indexOf(tag_start)
			: line.indexOf(tag),
		start_position = new vscode.Position(start_line, start_char),
		end_line = line_number,
		end_char = IsFragment.isFragmentList_LineType(line_type)
			? start_char + tag_end.length + getTagLength(line)
			: start_char + getTagLength(line),
		end_position = new vscode.Position(end_line, end_char),
		replace_range = new vscode.Range(start_position, end_position);
	return {
		offset: line.length,
		line: line,
		line_type: line_type,
		line_number: line_number,
		save: save,
		Base: Base,
		is_list: is_list === true,
		start_position: start_position,
		end_position: end_position,
		fragment: fragment,
		call: (edit: vscode.TextEditorEdit) => edit.replace(replace_range, fragment)
	};
};

export const createFragmentEntity = (
	input_line: Interface_.ICreateFragmentLine
) => {
	const { line, line_number, line_type } = input_line;
	if (line && isValidCreateFragment(line_type)) {
		const display_number = line_number + 1;
		Message.info(`Fragment found on line number: ${display_number}`);
		const replacement = createTextReplacement(line, line_type, line_number);
		return replacement;
	}
};

export const fragmentLineTypeData = (line_type: Enums.LineType): Interface_.ILineTypeFragmentCalls => {
	let calls;
	switch (line_type) {
		case Enums.LineType.Fragment: calls = new Fragment(); break;
		case Enums.LineType.FragmentLive: calls = new FragmentLive(); break;
		case Enums.LineType.FragmentArray: calls = new FragmentArray(); break;
		case Enums.LineType.FragmentLiveArray: calls = new FragmentLiveArray(); break;
		case Enums.LineType.FragmentList: calls = new FragmentList(); break;
		case Enums.LineType.FragmentLiveList: calls = new FragmentLiveList(); break;
		default: calls = new FragmentUnknown(); break;
	}
	return calls;
};

