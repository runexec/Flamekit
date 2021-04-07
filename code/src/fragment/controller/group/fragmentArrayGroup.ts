import 'reflect-metadata';
import { singleton, container } from 'tsyringe';

let Constant: Map<string, any>;

export const getGroup = (x: string) => {
    Constant = container.resolve('ConstantInstance');
    return (x.match(Constant.get('FRAGMENT_ARRAY_GROUP_REGEX')) || [])[1]
};

@singleton()
export class Injection { getGroup: (x: string) => string = getGroup }