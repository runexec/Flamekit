import * as Template from './templateClass';
import * as FileName from './fileName';

export class FragmentArrayTemplate extends Template.Template {
    constructor(x: string) {
        super(x);
        this.toString = () => { return `<%= render "${FileName.fragmentFileName(x)}" %>` };
        return this;
    }
}