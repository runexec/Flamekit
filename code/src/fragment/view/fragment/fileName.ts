import 'reflect-metadata';
import { singleton } from "tsyringe";

export const
    fragmentFileName = (x: string) => `_${x.trimLeft().replace(/[\],\[,\},\{]/, '')}.html`,
    fragmentListFileName = (x: string) => `_${x.trimLeft().replace(/[\],\[,\},\{]/, '')}.html`,
    fragmentLiveFileName = (x: string) => `_${x.trimLeft().replace(/[\],\[,\},\{]/, '')}_live.html`,
    fragmentLiveListFileName = (x: string) => {
        const splitter = /[A-Z][a-z]+/g;
        let component : string = '';
        x.match(splitter)?.forEach((x:string) => {
            component += x.toLocaleLowerCase() + '_';
        })
        component = component.slice(0,-1);
        return component === '' ? x : component ;
    };

@singleton()
export class Injection {
    fragmentFileName = fragmentFileName;
    fragmentListFileName = fragmentListFileName;
    fragmentLiveFileName = fragmentLiveFileName;
    fragmentLiveListFileName = fragmentLiveListFileName;
}