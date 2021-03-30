import * as ViewClass from './view';
import * as Template from './fragment/template'
import * as Group from '../controller/group'

export class View extends ViewClass.View {
    constructor({ file_names }: { file_names: string }) {
        super({ file_name: file_names });
        const group = Group.FragmentLiveArrayGroup.getGroup(file_names),
            fragments = group ? group.split(', ') : false;
        this.toString = () => {
            return fragments ?
                fragments.map(x => new Template.FragmentLiveArray.Template({ file_name: x })).join("\n")
                : 'fragmentArrayView<Failed>';
        };
        return this;
    }
}