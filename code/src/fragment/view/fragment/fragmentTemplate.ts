import * as Template from './templateClass';
import * as FragmentFileName from '../../controller/fileName';

export class FragmentTemplate extends Template.Template {
    constructor(x: string) { 
        super();
        this.toString = () => { return `<%= render "${FragmentFileName.fragmentFileName(x)}" %>`; }
        return this;
    }
}