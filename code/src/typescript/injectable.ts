import {injectable} from 'tsyringe';
import * as vscode from 'vscode';
import * as Create from './controller/create';

@injectable()
export class TypeScript {
    init: ({ context }: { context: vscode.ExtensionContext; }) => void;
    constructor(){
        this.init = Create.init;
    }
}

export default TypeScript;