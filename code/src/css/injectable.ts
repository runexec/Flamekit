import {injectable} from 'tsyringe';
import * as vscode from 'vscode';
import * as Create from './controller/create';

@injectable()
export class CreateCSS {
    init: ({ context }: { context?: vscode.ExtensionContext | undefined; }) => void;
    constructor(){
        this.init = Create.init;
    }
}

export default CreateCSS;