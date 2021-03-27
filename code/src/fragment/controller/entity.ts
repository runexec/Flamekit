import * as vscode from 'vscode';
import * as Enums from '../../enum';
import * as Is from './is';
import * as Message from '../../util/message';
import * as Store from '../store/store';
import * as Interface_ from '../../interface'
import * as LineTypeObject from './lineTypeObject';

export const createFragmentEntity = (
	input_line: Interface_.ICreateFragmentLine
) => {
	const { line, line_number, line_type } = input_line;
	if (line && Is.isValidCreateFragment(line_type)) {
		const display_number = line_number + 1;
		Message.info(`Fragment found on line number: ${display_number}`);
		const replacement = createTextReplacement(line, line_type, line_number);
		return replacement;
	}
};

const createTextReplacement = (line: string, line_type: Enums.LineType, line_number: number) => {
	const { Base, save, getTag, getNewFragment } = LineTypeObject.getLineTypeObject(line_type),
		is_list = Is.isFragmentListLineType(line_type),
		// `tag_start` and `tag_end` only used if List
		[[tag_start, _tag_end]] = Store.FragmentStore.shift() || [['', '']],
		tag = getTag(line),
		fragment = getNewFragment(line),
		start_line = line_number,
		start_char = Math.max(0, line.indexOf(is_list ? tag_start : tag)),
		start_position = new vscode.Position(start_line, start_char),
		end_line = line_number,
		end_char = Math.max(0, line.length - (is_list ? start_char : tag.length)),
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
		call: (edit: vscode.TextEditorEdit) => {
			edit.replace(replace_range, fragment);
		}
	};
};