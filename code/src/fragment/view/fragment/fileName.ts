import 'reflect-metadata';
import { singleton } from "tsyringe";

const pascalToSnake = (x:string) => {
    const name = x.trim();
    const splitter = /[A-Z][a-z0-9]+/g;
    let component : string = '';
    name.match(splitter)?.forEach((x:string) => {
        component += x.toLocaleLowerCase() + '_';
    })
    component = component.slice(0,-1);
    return component === '' ? name : component;
};

const treatment = (x:string) => {
    return x.trim().replace(/[\],\[,\},\{]/, '').toLocaleLowerCase();
}

const treated = (x: string) => `_${treatment(x)}.html`;

export const
    fragmentFileName = treated,
    fragmentListFileName = treated,
    fragmentLiveFileName = pascalToSnake,
    fragmentLiveListFileName = pascalToSnake;


@singleton()
export class Injection {
    fragmentFileName = fragmentFileName;
    fragmentListFileName = fragmentListFileName;
    fragmentLiveFileName = fragmentLiveFileName;
    fragmentLiveListFileName = fragmentLiveListFileName;
}