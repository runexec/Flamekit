import 'reflect-metadata';
import { singleton } from 'tsyringe';

let FragmentLiveListTag: { getTag: (x: string) => string };
let FileName: { fragmentLiveListFileName: (x: string) => string };

export const asArray = ({ file_name }: { file_name: string }): string[] => {
    const group = FragmentLiveListTag.getTag(file_name);
    let fragments: string[] | undefined;
    if (group) {
        const m = group.match(/\[(.*)\]/);
        m && (fragments = m[1].split(', '));
    }
    return fragments
        ? fragments.map(file_name => FileName.fragmentLiveListFileName(file_name))
        : [];
};

@singleton()
export class Injection {
    asArray: ({ file_name }: { file_name: string }) => string[] = asArray;
}