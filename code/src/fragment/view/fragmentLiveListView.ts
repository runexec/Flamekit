import * as ViewClass from './view';
import * as Template from './fragment/template'
import * as Group from '../controller/group'
import * as Constant from '../../constant';

export class View extends ViewClass.View {
    constructor({ file_name }: { file_name: string }) {
        super({ file_name: file_name });
        const group = Group.FragmentLiveListGroup.getGroup(file_name),
            remove_brackets = (x: string) => x.replace(Constant.FRAGMENT_LIVE_LISTSTRING_REMOVE_BRACKETS_REGEX, ''),
            fragments = group ? remove_brackets(group).split(', ') : false;
        this.toString = () => {
            if (fragments) {
                const tag = (file_name.match(Constant.FRAGMENT_LIVE_LISTSTRING_REGEX) || ['', ''])[1].split('>')[0];
                return fragments
                    .map(x => new Template.FragmentLiveList.Template({ file_name: x, tag: tag })).join('\n');
            }
            else { return 'fragmentListView<Failed>'; }
        }
        return this;
    }
}