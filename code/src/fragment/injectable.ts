import {injectable} from 'tsyringe';
import * as vscode from 'vscode';
import * as Create from './controller/create';

@injectable()
export class Fragment {
    init: ({ context }: { context?: vscode.ExtensionContext | undefined; }) => void;
    constructor(){
        this.init = Create.init;
    }
}

export default Fragment;