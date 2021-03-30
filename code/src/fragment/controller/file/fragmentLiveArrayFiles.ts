import * as Group from '../group';
import * as FileName from '../../view/fragment/fileName';

export const asArray = ({ file_name }: { file_name: string }): string[] => {
	const group = Group.fragmentLiveArrayGroup(file_name),
		fragments = group ? group.split(', ') : false;
	return fragments ? fragments.map(file_name => FileName.fragmentLiveFileName(file_name)) : [];
};