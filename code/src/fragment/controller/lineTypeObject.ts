/* eslint-disable @typescript-eslint/naming-convention */
import * as Enums from '../../enum';
import * as Fragment_ from '../fragment';
import 'reflect-metadata';
import { singleton, container } from 'tsyringe';

const Is: { 
	isFragmentListLineType: (x: Enums.LineType) => boolean, 
	isFragmentLiveList: (x:string) => boolean,
	isFragmentLiveArray: (x:string) => boolean,
	isFragmentLive: (x:string) => boolean,
	isFragment: (x:string) => boolean,
	isFragmentArray: (x:string) => boolean,
	isFragmentList: (x:string) => boolean
	isValidFragment: (x:string) => boolean
} = container.resolve('fragment.Is');

export const getFragmentData = ({ content }: { content: string[] }): {
	line: string | undefined,
	line_number: number,
	line_type: Enums.LineType
}[] => {
	let line_type = Enums.LineType.FragmentUnknown;
	return content.map((line, line_number) => {
		switch (true) {
			case (!Is.isValidFragment(line)): line_type = Enums.LineType.FragmentUnknown; break;
			// List must come before Array because similar regular expression
			// Order might not matter now after Regex changes. Need to double-check
			case Is.isFragmentLiveList(line): line_type = Enums.LineType.FragmentLiveList; break;
			case Is.isFragmentLiveArray(line): line_type = Enums.LineType.FragmentLiveArray; break;
			case Is.isFragmentLive(line): line_type = Enums.LineType.FragmentLive; break;
			case Is.isFragmentList(line): line_type = Enums.LineType.FragmentList; break;
			case Is.isFragmentArray(line): line_type = Enums.LineType.FragmentArray; break;
			case Is.isFragment(line): line_type = Enums.LineType.Fragment; break;
			default: line_type = Enums.LineType.FragmentUnknown;
		}
		return { line: line, line_number: line_number, line_type: line_type };
	}).filter(x => x.line_type !== Enums.LineType.FragmentUnknown);
};

export const getLineTypeObject = (line_type: Enums.LineType) => {
	switch (line_type) {
		case Enums.LineType.Fragment: return Fragment_.Fragment; break;
		case Enums.LineType.FragmentList: return Fragment_.FragmentList; break;
		case Enums.LineType.FragmentArray: return Fragment_.FragmentArray; break;
		case Enums.LineType.FragmentLive: return Fragment_.FragmentLive; break;
		case Enums.LineType.FragmentLiveArray: return Fragment_.FragmentLiveArray; break;
		case Enums.LineType.FragmentLiveList: return Fragment_.FragmentLiveList; break;
		default: return Fragment_.FragmentUnknown;
	}
};

@singleton()
export class Injection {
	getFragmentData = getFragmentData;
	getLineTypeObject = getLineTypeObject;
}