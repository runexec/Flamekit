import 'reflect-metadata';
import {container} from 'tsyringe';
import * as TemplateClass from './templateClass';

let FileName : { fragmentFileName: (x: string) => string };

export class Template extends TemplateClass.Template {
    FileName = container.resolve('fragment.FileName');
    constructor({ file_name }: { file_name: string }) {
        super({ file_name: file_name });
        this.toString = () => file_name.split(',').map(x => {
            return `<%= render "${FileName.fragmentFileName(x)}" %>`;
        }).join("\n");
        return this;
    }
}