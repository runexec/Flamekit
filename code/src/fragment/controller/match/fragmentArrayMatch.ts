import 'reflect-metadata';
import { container, singleton } from 'tsyringe';

let Constant: Map<string, any>;

export const match = (x: string): string | null => {
    Constant = container.resolve('ConstantInstance');
    return (x.match(Constant.get('FRAGMENT_ARRAY_GROUP_REGEX')) || [null, null])[1];
}

@singleton()
export class Injection { match: (x: string) => string | null = match }