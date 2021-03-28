import * as Template from './templateClass';
import * as FileName from '../../controller/fileName';

export class FragmentArrayTemplate extends Template.Template {
    constructor(x: string) {
        super(x);
        this.toString = () => { return `<%= render "${FileName.fragmentFileName(x)}" %>` };
        return this;
    }
}