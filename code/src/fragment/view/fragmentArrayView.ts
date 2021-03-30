import * as View from './view';
import * as Template from './fragment/template'
import * as Group from './../controller/group'

export class FragmentArrayView extends View.View {
    constructor(x: string) {
        super(x);
        const group = Group.fragmentArrayGroup(x);
        const fragments = group ? group.split(', ') : false;
        this.toString = () => {
            return fragments ?
                fragments.map(x => new Template.FragmentTemplate(x)).join("\n")
                : 'fragmentArrayView<Failed>';
        };
        return this;
    }
}