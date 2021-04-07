import 'reflect-metadata';
import {container, singleton} from 'tsyringe';

const Constant : Map<string, any> = container.resolve('ConstantInstance');

export const match = (x: string): string | null => (x.match(Constant.get('FRAGMENT_LIVE_REGEX')) || [null])[0];

@singleton()
export class Injection { match: (x:string) => string | null = match }