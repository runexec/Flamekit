import "reflect-metadata";
import {container} from "tsyringe";
import * as ConstantI from '../constant';
container.register('ConstantInstance', ConstantI.Injection);