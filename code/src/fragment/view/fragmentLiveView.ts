import * as ViewClass from './view';
import * as Template from './fragment/template'
import * as Group from '../controller/group'

export class View extends ViewClass.View {
    constructor({ file_name }: { file_name: string }) {
        super({ file_name: file_name });
        this.toString = () => {
            const template =
                new Template.FragmentLive.Template({
                    file_name: Group.FragmentLiveGroup.getGroup(file_name)
                }).toString();
            return template;
        };
        return this;
    }
}