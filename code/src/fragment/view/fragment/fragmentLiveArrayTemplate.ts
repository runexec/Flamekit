import * as Template from './templateClass';
import * as FileName from '../../controller/fileName';

export class FragmentLiveArrayTemplate extends Template.Template {
    constructor(x: string) {
        super();
        this.toString = () => { return `<%= render "${FileName.fragmentLiveFileName(x)}" %>` };
        return this;
    }
}