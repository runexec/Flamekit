import * as ViewClass from './view';
import * as Template from './fragment/template'
import * as Group from './../controller/group'

export class View extends ViewClass.View {
    constructor({ fragment_string }: { fragment_string: string }) {
        super({ fragment_string: fragment_string });
        const group = Group.FragmentArrayGroup.getGroup(fragment_string);
        const fragments = group ? group.split(', ') : false;
        this.toString = () => {
            return fragments ?
                fragments.map(x => new Template.FragmentArray.Template({ file_name: x })).join("\n")
                : 'fragmentArrayView<Failed>';
        };
        return this;
    }
}