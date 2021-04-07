import 'reflect-metadata';
import {container, singleton} from 'tsyringe';

const Constant : Map<string, any> = container.resolve('ConstantInstance');

export const match = (x: string): string | null => (x.match(Constant.get('FRAGMENT_LIVE_ARRAY_GROUP_REGEX')) || [null, null])[1];

@singleton()
export class Injection { match: (x:string) => string | null = match }