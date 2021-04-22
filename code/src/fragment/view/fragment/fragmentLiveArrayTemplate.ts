import 'reflect-metadata';
import { singleton } from 'tsyringe';
import * as TemplateClass from './templateClass';

export class Template extends TemplateClass.Template {
    constructor({ class_name }: { class_name: string }) {
        super({ file_name: class_name });
        this.toString = () => class_name.split(',').map(x => {
            return `<%= live_component(@socket, ${x}) %>`
        }).join("\n");
        return this;
    }
}

@singleton()
export class Injection {
    Template = Template
}