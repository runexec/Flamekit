import 'reflect-metadata';
import { singleton, container } from 'tsyringe';
import * as TemplateClass from './templateClass';

let FileName: { fragmentLiveFileName: (x: string) => string };

export class Template extends TemplateClass.Template {
    constructor({ file_name }: { file_name: string }) {
        FileName = container.resolve('fragment.FileName');
        super({ file_name: file_name });
        this.toString = () => { return `<%= render "${FileName.fragmentLiveFileName(file_name)}" %>`; }
        return this;
    }
}


@singleton()
export class Injection {
    Template = Template;
}