import 'reflect-metadata';
import {container, singleton} from 'tsyringe';

let Constant : Map<string, any>;

export const getGroup = (x: string) => {
    Constant = container.resolve('ConstantInstance'); 
    return (x.match(Constant.get('FRAGMENT_LIST_GROUP_REGEX')) || [])[1];
}


@singleton()
export class Injection { getGroup: (x:string) => string = getGroup }