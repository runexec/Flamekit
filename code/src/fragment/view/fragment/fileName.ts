import 'reflect-metadata';
import { singleton } from "tsyringe";

export const
    fragmentFileName = (x: string) => `_${x.trim().replace(/[\],\[,\},\{]/, '')}.html`,
    fragmentListFileName = (x: string) => `_${x.trim().replace(/[\],\[,\},\{]/, '')}.html`,
    fragmentLiveFileName = (x: string) => `_${x.trim().replace(/[\],\[,\},\{]/, '')}_live.html`,
    fragmentLiveListFileName = (x: string) => {
        const name = x.trim();
        const splitter = /[A-Z][a-z]+/g;
        let component : string = '';
        name.match(splitter)?.forEach((x:string) => {
            component += x.toLowerCase() + '_';
        })
        component = component.slice(0,-1);
        return component === '' ? name : component ;
    };

@singleton()
export class Injection {
    fragmentFileName = fragmentFileName;
    fragmentListFileName = fragmentListFileName;
    fragmentLiveFileName = fragmentLiveFileName;
    fragmentLiveListFileName = fragmentLiveListFileName;
}