import * as Template from './templateClass';
import * as FragmentFileName from './fileName';

export class FragmentTemplate extends Template.Template {
    constructor(x: string) { 
        super(x);
        this.toString = () => { return `<%= render "${FragmentFileName.fragmentFileName(x)}" %>`; }
        return this;
    }
}