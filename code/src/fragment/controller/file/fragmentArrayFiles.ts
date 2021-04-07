import 'reflect-metadata';
import { singleton, container } from 'tsyringe';

const FileName: {
    fragmentFileName: (x: string) => string
} = container.resolve('fragment.FileName');

const FragmentArrayGroup: {
    getGroup: (x: string) => string
} = container.resolve('fragement.FragmentArrayGroup');

export const asArray = ({ file_name }: { file_name: string }): string[] => {
    const group = FragmentArrayGroup.getGroup(file_name),
        fragments = group ? group.split(', ') : false;
    return fragments
        ? fragments.map((file_name: string) => FileName.fragmentFileName(file_name))
        : []
};


@singleton()
export class Injection {
    asArray: ({ file_name }: { file_name: string }) => string[] = asArray;
}