import {singleton} from 'tsyringe';
import * as vscode from 'vscode';
import * as Create from './controller/create';

@singleton()
export class Fragment {
    init: ({ context }: { 
        context?: vscode.ExtensionContext | undefined; 
    }) => void = Create.init;
}

export default Fragment;