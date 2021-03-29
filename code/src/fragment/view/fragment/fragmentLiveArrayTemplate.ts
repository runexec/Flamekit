import * as Template from './templateClass';
import * as FileName from './fileName';

export class FragmentLiveArrayTemplate extends Template.Template {
    constructor(x: string) {
        super(x);
        this.toString = () => { return `<%= render "${FileName.fragmentLiveFileName(x)}" %>` };
        return this;
    }
}