import 'reflect-metadata';
import { singleton, container } from 'tsyringe';

let FileName: { fragmentFileName: (x: string) => string };
let FragmentArrayGroup: { getGroup: (x: string) => string };

export const asArray = ({ file_name }: { file_name: string }): string[] => {
    FileName = container.resolve('fragment.FragmentFileName');
    FragmentArrayGroup = container.resolve('fragement.FragmentArrayGroup');
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