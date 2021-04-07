import 'reflect-metadata';
import {container, singleton} from 'tsyringe';

const Constant : Map<string, any> = container.resolve('ConstantInstance');

export const getGroup = (x: string) => (x.match(Constant.get('FRAGMENT_GROUP_REGEX')) || [])[1];

@singleton()
export class Injection { getGroup: (x:string) => string = getGroup }