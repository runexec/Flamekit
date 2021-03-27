import * as View from './viewClass';
import * as Template from './fragment/template'
import * as Group from '../controller/group'

export class FragmentLiveArrayView extends View.View {
    constructor(x: string) {
        super(x);
        const group = Group.fragmentLiveArrayGroup(x),
                fragments = group ? group.split(', ') : false;
        this.toString = () => {
            return fragments ?
                fragments.map(x => new Template.FragmentLiveArrayTemplate(x)).join("\n")
                : 'fragmentArrayView<Failed>';
        };
        return this;
    }
}