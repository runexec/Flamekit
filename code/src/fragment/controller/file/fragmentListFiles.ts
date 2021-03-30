import * as Tag from '../tag';
import * as FileName from '../../view/fragment/fileName';

export const asArray = ({ file_name }: { file_name: string }): string[] => {
    const group = Tag.FragmentListTag.getTag(file_name);
    let fragments: string[] | undefined;
    if (group) {
        const m = group.match(/\[(.*)\]/);
        m && (fragments = m[1].split(', '));
    }
    return fragments ? fragments.map(file_name => FileName.fragmentListFileName(file_name)) : [];
};