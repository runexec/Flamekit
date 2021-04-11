/* eslint-disable @typescript-eslint/naming-convention */
import 'reflect-metadata';
import { singleton, container } from 'tsyringe';

type Fragmenting = new (directory: string, fs_path: string, line: string) => {
	save: Function,
	getTag: (file_name: string) => string,
	getNewFragment: (file_name: string) => string,
	Base: any
};

type LineType = number;

export interface FragmentLine {
	line: string | undefined,
	line_number: number,
	line_type: LineType
}

let LineTypeInjection: { LineType: { [k: string]: number } };

let Is: {
	isFragmentListLineType: (x: LineType) => boolean,
	isFragmentLiveList: (x: string) => boolean,
	isFragmentLiveArray: (x: string) => boolean,
	isFragmentLive: (x: string) => boolean,
	isFragment: (x: string) => boolean,
	isFragmentArray: (x: string) => boolean,
	isFragmentList: (x: string) => boolean,
	isValidFragment: (x: string) => boolean
};

export const getFragmentData = ({ content }: { content: string[] }): FragmentLine[] => {
	LineTypeInjection = container.resolve('type.LineType');
	Is = container.resolve('fragment.Is');
	let line_type = LineTypeInjection.LineType.FragmentUnknown;
	return content.map((line, line_number) => {
		switch (true) {
			case (!Is.isValidFragment(line)): line_type = LineTypeInjection.LineType.FragmentUnknown; break;
			// List must come before Array because similar regular expression
			case Is.isFragmentLiveList(line): line_type = LineTypeInjection.LineType.FragmentLiveList; break;
			case Is.isFragmentLiveArray(line): line_type = LineTypeInjection.LineType.FragmentLiveArray; break;
			case Is.isFragmentLive(line): line_type = LineTypeInjection.LineType.FragmentLive; break;
			case Is.isFragmentList(line): line_type = LineTypeInjection.LineType.FragmentList; break;
			case Is.isFragmentArray(line): line_type = LineTypeInjection.LineType.FragmentArray; break;
			case Is.isFragment(line): line_type = LineTypeInjection.LineType.Fragment; break;
			default: line_type = LineTypeInjection.LineType.FragmentUnknown;
		}
		return { line: line, line_number: line_number, line_type: line_type };
	}).filter(x => x.line_type !== LineTypeInjection.LineType.FragmentUnknown);
};

let FragmentTypes: {
	Fragment: Fragmenting,
	FragmentList: Fragmenting,
	FragmentArray: Fragmenting,
	FragmentLive: Fragmenting,
	FragmentLiveList: Fragmenting,
	FragmentLiveArray: Fragmenting,
	FragmentUnknown: Fragmenting
};

export const getLineTypeObject = (line_type: LineType) => {
	LineTypeInjection = container.resolve('type.LineType');
	FragmentTypes = container.resolve('Fragment');
	switch (line_type) {
		case LineTypeInjection.LineType.Fragment: return FragmentTypes.Fragment;
		case LineTypeInjection.LineType.FragmentList: return FragmentTypes.FragmentList;
		case LineTypeInjection.LineType.FragmentArray: return FragmentTypes.FragmentArray;
		case LineTypeInjection.LineType.FragmentLive: return FragmentTypes.FragmentLive;
		case LineTypeInjection.LineType.FragmentLiveArray: return FragmentTypes.FragmentLiveArray;
		case LineTypeInjection.LineType.FragmentLiveList: return FragmentTypes.FragmentLiveList;
		default: return FragmentTypes.FragmentUnknown;
	}
};

@singleton()
export class Injection {
	getFragmentData = getFragmentData;
	getLineTypeObject = getLineTypeObject;
}