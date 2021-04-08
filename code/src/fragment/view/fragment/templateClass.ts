/* eslint-disable @typescript-eslint/naming-convention */
import 'reflect-metadata';
import { singleton } from "tsyringe";

export class Template extends String {
    constructor({ file_name }: { file_name: string }) { super(file_name); return this; }
}

@singleton()
export class Injection {
    Template = Template;
}