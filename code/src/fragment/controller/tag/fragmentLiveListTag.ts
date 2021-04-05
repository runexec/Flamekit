import 'reflect-metadata';
import {container} from 'tsyringe';

const Constant : Map<string, any> = container.resolve('ConstantInstance');

export const getTag = (x: string): string => (x.match(Constant.get('FRAGMENT_LIVE_LIST_GROUP_REGEX')) || ['',''])[1];