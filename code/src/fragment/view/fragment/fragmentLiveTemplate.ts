import * as Template from './templateClass';
import * as FragmentFileName from '../../controller/fileName';

export class FragmentLiveTemplate extends Template.Template {
    constructor(x: string) { 
        super();
        this.toString = () => { return `<%= render "${FragmentFileName.fragmentLiveFileName(x)}" %>`; }
        return this;
    }
}