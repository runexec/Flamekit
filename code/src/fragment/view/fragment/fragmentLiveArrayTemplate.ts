import 'reflect-metadata';
import { singleton, container } from 'tsyringe';
import * as TemplateClass from './templateClass';

let FileName: { fragmentLiveFileName: (x: string) => string };

export class Template extends TemplateClass.Template {
    constructor({ file_name }: { file_name: string }) {
        super({ file_name: file_name });
        FileName = container.resolve('fragment.FileName');
        this.toString = () => file_name.split(',').map(x => {
            return `<%= live_component(@socket, ${FileName.fragmentLiveFileName(x)}) %>`
        }).join("\n");
        return this;
    }
}

@singleton()
export class Injection {
    Template = Template
}