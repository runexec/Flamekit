import * as ViewClass from './view';
import * as Template from './fragment/template'
import * as Group from './../controller/group'
import * as Constant from '../../constant';
import * as Message from '../../util/message';

export class View extends ViewClass.View {
    constructor({ file_name }: { file_name: string }) {
        super({ file_name: file_name });
        const group = Group.FragmentListGroup.getGroup(file_name),
            remove_brackets = (x: string) => x.replace(Constant.FRAGMENT_LISTSTRING_REMOVE_BRACKETS_REGEX, ''),
            fragments = group ? remove_brackets(group).split(', ') : false;
        this.toString = () => {
            if (fragments) {
                const tag = (file_name.match(Constant.FRAGMENT_LISTSTRING_REGEX) || ['', ''])[1].split('>')[0];
                return fragments
                    .map(x => new Template.FragmentList.Template({ file_name: x, tag: tag }))
                    .join('\n');
            } else { return 'fragmentListView<Failed>'; }
        }
        return this;
    }
}