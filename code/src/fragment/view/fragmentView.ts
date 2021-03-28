import * as View from './view';
import * as Template from './fragment/template'
import * as Group from './../controller/group'

export class FragmentView extends View.View {
    constructor(x: string) {
        super(x);
        this.toString = () => {
            return new Template.FragmentTemplate(Group.fragmentGroup(x)).toString();
        }
        return this;
    }
}