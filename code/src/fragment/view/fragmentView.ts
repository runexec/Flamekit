import * as ViewClass from './view';
import * as Template from './fragment/template'
import * as Group from './../controller/group'

export class View extends ViewClass.View {
    constructor({ fragment_string }: { fragment_string: string }) {
        super({ fragment_string: fragment_string });
        this.toString = () => {
            const template =
                new Template.Fragment.Template({
                    file_name: Group.FragmentGroup.getGroup(fragment_string)
                }).toString();
            return template;
        }
        return this;
    }
}