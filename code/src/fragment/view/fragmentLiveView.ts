import * as View from './viewClass';
import * as Template from './fragment/template'
import * as Group from '../controller/group'

export class FragmentLiveView extends View.View {
    constructor(x: string) {
        super(x);
        this.toString = () => {
            return new Template.FragmentLiveTemplate(Group.fragmentLiveGroup(x)).toString();
        }
        return this;
    }
}