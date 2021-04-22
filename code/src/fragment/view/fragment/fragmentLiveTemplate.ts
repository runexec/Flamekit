import 'reflect-metadata';
import { singleton } from 'tsyringe';
import * as TemplateClass from './templateClass';

export class Template extends TemplateClass.Template {
    constructor({ class_name }: { class_name: string }) {
        super({ file_name: class_name });
        this.toString = () => { return `<%= live_component(@socket, ${class_name}) %>`; }
        return this;
    }
}


@singleton()
export class Injection {
    Template = Template;
}