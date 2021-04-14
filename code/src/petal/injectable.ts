import {singleton} from 'tsyringe';
import * as vscode from 'vscode';
import * as Create from './controller/create';

@singleton()
export class Injection {
    init: ({ context }: { context: vscode.ExtensionContext; }) => void;
    constructor(){
        this.init = Create.init;
    }
}

export default Injection;