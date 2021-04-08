import 'reflect-metadata';
import { singleton, container } from 'tsyringe';

let FileName: { fragmentFileName: (x: string) => string };
let FragmentArrayGroup: { getGroup: (x: string) => string | undefined };

export const asArray = ({ file_name }: { file_name: string }): string[] => {
    FileName = container.resolve('fragment.FileName');
    FragmentArrayGroup = container.resolve('fragment.FragmentArrayGroup');
    const group = FragmentArrayGroup.getGroup(file_name),
        fragments = group ? group.split(',') : false;
    return fragments
        ? fragments.map((file_name: string) => FileName.fragmentFileName(file_name))
        : []
};

@singleton()
export class Injection {
    asArray: ({ file_name }: { file_name: string }) => string[] = asArray;
}