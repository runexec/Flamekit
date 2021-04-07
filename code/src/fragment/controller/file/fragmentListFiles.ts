
import 'reflect-metadata';
import { singleton, container } from 'tsyringe';

let FragmentListTag: { getTag: (x: string) => string };
let FileName: { fragmentListFileName: (x: string) => string };

export const asArray = ({ file_name }: { file_name: string }): string[] => {
    FileName = container.resolve('fragment.FragmentFileName');
    FragmentListTag = container.resolve('fragment.FragmentListTag');
    const group = FragmentListTag.getTag(file_name);
    let fragments: string[] | undefined;
    if (group) {
        const m = group.match(/\[(.*)\]/);
        m && (fragments = m[1].split(', '));
    }
    return fragments ? fragments.map(file_name => FileName.fragmentListFileName(file_name)) : [];
};

@singleton()
export class Injection {
    asArray: ({ file_name }: { file_name: string }) => string[] = asArray;
}