import 'reflect-metadata';
import {container} from 'tsyringe';

const Constant : Map<string, any> = container.resolve('ConstantInstance');

export const match = (x: string): string | null => (x.match(Constant.get('FRAGMENT_LIST_GROUP_REGEX')) || [null, null])[1];