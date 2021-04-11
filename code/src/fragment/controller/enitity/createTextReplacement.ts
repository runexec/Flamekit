import * as vscode from 'vscode';
import * as Enums from '../../../enum';
import 'reflect-metadata';
import { singleton, container } from 'tsyringe';

interface FragmentLine {
	line: string | undefined,
	line_number: number,
	line_type: Enums.LineType
}

let Is: { isFragmentListLineType: (x: Enums.LineType) => boolean };
let LineTypeObject: { getFragmentData: Function, getLineTypeObject: Function };

type StorageItem = [tagStart: string, tagEnd: string];
type StoreCollection = StorageItem[];
type Storage<T extends StoreCollection> = { push: Function, pop: Function, shift: Function };
type Store = Storage<StoreCollection> & { FragmentStore: any, StoreType: any };
let Store: Store;

export const create = ({ line, line_type, line_number }: FragmentLine) => {
	if (line === undefined) throw ' :::: >> Line can\'t be undefined ';
	Store = container.resolve('fragment.Store');
	Is = container.resolve('fragment.Is');
	LineTypeObject = container.resolve('fragment.LineTypeObject');
	const LTO = LineTypeObject.getLineTypeObject(line_type),
		is_list = Is.isFragmentListLineType(line_type),
		// `tag_start` and `tag_end` only used if List
		[[tag_start, _tag_end]] = Store.FragmentStore.shift() || [['', '']],
		tag = LTO.getTag(line),
		fragment = LTO.getNewFragment(line),
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
		Base: LTO.Base,
		save: LTO.save,
		is_list: is_list === true,
		start_position: start_position,
		end_position: end_position,
		fragment: fragment,
		call: (edit: vscode.TextEditorEdit) => {
			edit.replace(replace_range, fragment);
		}
	};
};

@singleton()
export class Injection {
	create: ({ line, line_type, line_number }: FragmentLine) => void = create;
}