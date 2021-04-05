import 'reflect-metadata';
import {container} from 'tsyringe';

const Constant : Map<string, any> = container.resolve('ConstantInstance');

export const geTag = (x: string): string => (x.match(Constant.get('FRAGMENT_REGEX')) || [''])[0];