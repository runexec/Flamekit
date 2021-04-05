import "reflect-metadata";
import {container} from "tsyringe";
import * as TypeScriptI from '../typescript/injectable';
container.register('TypeScriptInstance', TypeScriptI.TypeScript);