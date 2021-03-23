/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/semi */
import { triggerAsyncId } from 'node:async_hooks';
import * as vscode from 'vscode'
import * as Message from '../util/message';

export const document = () => {
    const editor = vscode.window.activeTextEditor;        
    editor && editor.edit((e) => {
        const text = editor.document.getText();
        const m = text.match(/<\/\S+>=l\{\[(.*)\]\}<\/\S+>/) || [];
        Message.info(m[0] || 'nothing matched');
        Message.info(text);
    })
};