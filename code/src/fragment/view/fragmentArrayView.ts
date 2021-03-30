import * as ViewClass from './view';
import * as Template from './fragment/template'
import * as Group from './../controller/group'

export class View extends ViewClass.View {
    constructor({ file_name }: { file_name: string }) {
        super({ file_name: file_name });
        const group = Group.FragmentArrayGroup.getGroup(file_name);
        const fragments = group ? group.split(', ') : false;
        this.toString = () => {
            return fragments ?
                fragments.map(x => new Template.FragmentArray.Template({ file_name: x })).join("\n")
                : 'fragmentArrayView<Failed>';
        };
        return this;
    }
}