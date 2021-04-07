import 'reflect-metadata';
import {container, singleton} from 'tsyringe';

const Constant : Map<string, any> = container.resolve('ConstantInstance');

export const getTag = (x: string): string => (x.match(Constant.get('FRAGMENT_REGEX')) || [''])[0];

@singleton()
export class Injection { getTag: (x:string) => string = getTag }