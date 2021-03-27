import * as View from './viewClass';
import * as Template from './fragment/template'
import * as Group from './../controller/group'
import * as Constant from '../../constant';

export class FragmentListView extends View.View {
    constructor(x: string) {
        super(x);
        const group = Group.fragmentListGroup(x),
            remove_brackets = (x: string) => x.replace(Constant.FRAGMENT_LISTSTRING_REMOVE_BRACKETS_REGEX, ''),
            fragments = group ? remove_brackets(group).split(', ') : false;
        if (fragments) {
            const tag = (x.match(Constant.FRAGMENT_LISTSTRING_REGEX) || ['', ''])[1].split('>')[0];
            return fragments.map(x => new Template.FragmentListTemplate(x, tag)).join('\n');
        } else { this.toString = () => 'fragmentListView<Failed>'; }
        return this;
    }
}