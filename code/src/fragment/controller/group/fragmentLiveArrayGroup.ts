import 'reflect-metadata';
import {container} from 'tsyringe';

const Constant : Map<string, any> = container.resolve('ConstantInstance');

export const getGroup = (x: string) => (x.match(Constant.get('FRAGMENT_LIVE_ARRAY_GROUP_REGEX')) || [])[1];
