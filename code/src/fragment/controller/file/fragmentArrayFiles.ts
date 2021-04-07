import * as Group from '../group';
import * as FileName from '../../view/fragment/fileName';
import 'reflect-metadata';
import {singleton} from 'tsyringe';

export const asArray = ({ file_name }: { file_name: string }): string[] => {
    const group = Group.FragmentArrayGroup.getGroup(file_name),
        fragments = group ? group.split(', ') : false;
    return fragments ? fragments.map(file_name => FileName.fragmentFileName(file_name)) : [];
};


@singleton()
export class Injection {
    asArray: ({ file_name }: { file_name: string }) => string[] = asArray;
}