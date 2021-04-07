import 'reflect-metadata';
import {container, singleton} from 'tsyringe';

let Constant : Map<string, any>;

export const getTag = (x: string): string => {
    Constant = container.resolve('ConstantInstance');
    return (x.match(Constant.get('FRAGMENT_LIVE_ARRAY_GROUP_REGEX')) || ['',''])[1];
}

@singleton()
export class Injection { getTag: (x:string) => string = getTag }