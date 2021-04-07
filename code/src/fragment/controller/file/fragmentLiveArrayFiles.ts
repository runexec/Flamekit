
import 'reflect-metadata';
import {singleton, container} from 'tsyringe';

let FileName: { fragmentLiveFileName: (x: string) => string };
let FragmentLiveArrayGroup: { getGroup: (x: string) => string };

export const asArray = ({ file_name }: { file_name: string }): string[] => {
	FileName = container.resolve('fragment.FragmentFileName');
	FragmentLiveArrayGroup = container.resolve('fragment.FragmentLiveArrayGroup');
	const group = FragmentLiveArrayGroup.getGroup(file_name),
		fragments = group ? group.split(', ') : false;
	return fragments ? fragments.map(file_name => FileName.fragmentLiveFileName(file_name)) : [];
};

@singleton()
export class Injection {
    asArray: ({ file_name }: { file_name: string }) => string[] = asArray;
}