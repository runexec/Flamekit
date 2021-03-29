import * as FragmentGroup from './group';
import * as FragmentTag from './tag';
import * as FragmentFileName from '../view/fragment/fileName';

export const
	fragmentArrayFiles = (x: string): string[] => {
		const group = FragmentGroup.fragmentArrayGroup(x),
			fragments = group ? group.split(', ') : false;
		return fragments ? fragments.map(x => FragmentFileName.fragmentFileName(x)) : [];
	},

	fragmentListFiles = (x: string): string[] => {
		const group = FragmentTag.fragmentListTag(x);
		let fragments: string[] | undefined;
		if (group) {
			const m = group.match(/\[(.*)\]/);
			m && (fragments = m[1].split(', '));
		}
		return fragments ? fragments.map(x => FragmentFileName.fragmentListFileName(x)) : [];
	},

	fragmentLiveArrayFiles = (x: string): string[] => {
		const group = FragmentGroup.fragmentLiveArrayGroup(x),
			fragments = group ? group.split(', ') : false;
		return fragments ? fragments.map(x => FragmentFileName.fragmentLiveFileName(x)) : [];
	},

	fragmentLiveListFiles = (x: string): string[] => {
		const group = FragmentTag.fragmentLiveListTag(x);
		let fragments: string[] | undefined;
		if (group) {
			const m = group.match(/\[(.*)\]/);
			m && (fragments = m[1].split(', '));
		}
		return fragments ? fragments.map(x => FragmentFileName.fragmentLiveListFileName(x)) : [];
	};