import 'reflect-metadata';
import {singleton} from 'tsyringe';
import * as vscode from 'vscode';
import * as Create from './controller/create';


@singleton()
export class Alpine {
    init: ({ context }: { context?: vscode.ExtensionContext | undefined; }) => void;
    constructor(){
        this.init = Create.init;
    }
}

export default Alpine;