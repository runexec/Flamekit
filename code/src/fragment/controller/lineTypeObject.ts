/* eslint-disable @typescript-eslint/naming-convention */
import * as Is from './is';
import * as Enums from '../../enum';
import * as Fragment_ from '../fragment';

export const getFragmentData = (content: string[]): {
	line: string | undefined,
	line_number: number,
	line_type: Enums.LineType
}[] => {
	let line_type = Enums.LineType.Unknown;
	return content
		.map((line, line_number) => {
			if (!Is.isValidFragment(line)) { return { line: '', line_number: -1, line_type: line_type }; }
			switch (true) {
				// List must come before Array because similar regular expression
				// Order might not matter now after Regex changes. Need to double-check
				case Is.isFragmentLiveList(line): line_type = Enums.LineType.FragmentLiveList; break;
				case Is.isFragmentLiveArray(line): line_type = Enums.LineType.FragmentLiveArray; break;
				case Is.isFragmentLive(line): line_type = Enums.LineType.FragmentLive; break;
				case Is.isFragmentList(line): line_type = Enums.LineType.FragmentList; break;
				case Is.isFragmentArray(line): line_type = Enums.LineType.FragmentArray; break;
				case Is.isFragment(line): line_type = Enums.LineType.Fragment; break;
				default: line_type = Enums.LineType.Unknown;
			}
			return { line: line, line_number: line_number, line_type: line_type };
		}).filter(x => x.line_type !== Enums.LineType.Unknown);
};

export const getLineTypeObject = (line_type: Enums.LineType): Fragment_.Fragment => {
	// Class with all the calls of Fragment
	let calls;
	switch (line_type) {
		case Enums.LineType.Fragment: calls = new Fragment_.Fragment(); break;
		case Enums.LineType.FragmentList: calls = new Fragment_.FragmentList(); break;
		case Enums.LineType.FragmentArray: calls = new Fragment_.FragmentArray(); break;
		case Enums.LineType.FragmentLive: calls = new Fragment_.FragmentLive(); break;
		case Enums.LineType.FragmentLiveArray: calls = new Fragment_.FragmentLiveArray(); break;
		case Enums.LineType.FragmentLiveList: calls = new Fragment_.FragmentLiveList(); break;
		default: calls = new Fragment_.FragmentUnknown(); break;
	}
	return calls;
};

