import 'reflect-metadata';
import { container } from 'tsyringe';

import * as Enum from '../enum';
container.register('type.LineType', Enum.Injection);