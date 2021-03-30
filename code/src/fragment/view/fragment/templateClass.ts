/* eslint-disable @typescript-eslint/naming-convention */
export class Template extends String {
    constructor({ file_name }: { file_name: string }) { super(file_name); return this; }
}