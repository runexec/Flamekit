import 'reflect-metadata';
import { container, singleton } from 'tsyringe';

let FragmentLiveListTag: { getTag: (x: string) => string };
let FileName: { fragmentLiveListFileName: (x: string) => string };

export const asArray = ({ file_name }: { file_name: string }): string[] => {
    FileName = container.resolve('fragment.FileName');
    FragmentLiveListTag = container.resolve('fragment.FragmentLiveListTag');
    const group = FragmentLiveListTag.getTag(file_name);
    let fragments: string[] | undefined;
    if (group) {
        const m = group.match(/\[(.*)\]/);
        m && (fragments = m[1].split(','));
    }
    return fragments
        ? fragments.map(file_name => FileName.fragmentLiveListFileName(file_name))
        : [];
};

@singleton()
export class Injection {
    asArray: ({ file_name }: { file_name: string }) => string[] = asArray;
}