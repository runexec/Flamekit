import * as TemplateClass from './templateClass';
import * as FileName from './fileName';

export class Template extends TemplateClass.Template {
    constructor({ file_name }: { file_name: string }) {
        super({ file_name: file_name });
        this.toString = () => file_name.split(',').map(x => {
            return `<%= render "${FileName.fragmentLiveFileName(x)}" %>`
        }).join("\n");
        return this;
    }
}