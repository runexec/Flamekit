import 'reflect-metadata';
import { singleton } from "tsyringe";

const treatment = (x:string) => {
    return x.trim().replace(/[\],\[,\},\{]/, '').toLowerCase();
}

export const
    fragmentFileName = (x: string) => `_${treatment(x)}.html`,
    fragmentListFileName = (x: string) => `_${treatment(x)}.html`,
    fragmentLiveFileName = (x: string) => x.trim(),
    fragmentLiveListFileName = (x: string) => {
        const name = x.trim();
        const splitter = /[A-Z][a-z0-9]+/g;
        let component : string = '';
        name.match(splitter)?.forEach((x:string) => {
            component += x.toLocaleLowerCase() + '_';
        })
        component = component.slice(0,-1);
        return component === '' ? name : component;
    };

@singleton()
export class Injection {
    fragmentFileName = fragmentFileName;
    fragmentListFileName = fragmentListFileName;
    fragmentLiveFileName = fragmentLiveFileName;
    fragmentLiveListFileName = fragmentLiveListFileName;
}