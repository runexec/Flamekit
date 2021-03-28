import * as Template from './templateClass';
import * as FragmentFileName from '../../controller/fileName';

export class FragmentLiveTemplate extends Template.Template {
    constructor(x: string) { 
        super(x);
        this.toString = () => { return `<%= render "${FragmentFileName.fragmentLiveFileName(x)}" %>`; }
        return this;
    }
}