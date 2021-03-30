import * as FragmentGroup from './group';
import * as FragmentTag from './tag';
import * as FragmentFileName from '../view/fragment/fileName';

export const
	fragmentArrayFiles = ({file_name}:{file_name: string}): string[] => {
		const group = FragmentGroup.fragmentArrayGroup(file_name),
			fragments = group ? group.split(', ') : false;
		return fragments ? fragments.map(file_name => FragmentFileName.fragmentFileName(file_name)) : [];
	},

	fragmentListFiles = ({file_name}:{file_name: string}): string[] => {
		const group = FragmentTag.fragmentListTag(file_name);
		let fragments: string[] | undefined;
		if (group) {
			const m = group.match(/\[(.*)\]/);
			m && (fragments = m[1].split(', '));
		}
		return fragments ? fragments.map(file_name => FragmentFileName.fragmentListFileName(file_name)) : [];
	},

	fragmentLiveArrayFiles = ({file_name}:{file_name: string}): string[] => {
		const group = FragmentGroup.fragmentLiveArrayGroup(file_name),
			fragments = group ? group.split(', ') : false;
		return fragments ? fragments.map(file_name => FragmentFileName.fragmentLiveFileName(file_name)) : [];
	},

	fragmentLiveListFiles = ({file_name}:{file_name: string}): string[] => {
		const group = FragmentTag.fragmentLiveListTag(file_name);
		let fragments: string[] | undefined;
		if (group) {
			const m = group.match(/\[(.*)\]/);
			m && (fragments = m[1].split(', '));
		}
		return fragments ? fragments.map(file_name => FragmentFileName.fragmentLiveListFileName(file_name)) : [];
	};