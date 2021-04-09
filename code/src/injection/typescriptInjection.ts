import "reflect-metadata";
import {container} from "tsyringe";
import * as TypeScriptI from '../typescript/injectable';

import * as WebpackConfigView from '../typescript/view/webpackConfigView';
container.register('typescript.WebpackConfigView',WebpackConfigView.Injection);

import * as TSConfigConfigView from '../typescript/view/tsconfigConfigView';
container.register('typescript.TSConfigConfigView', TSConfigConfigView.Injection);

container.register('TypeScriptInstance', TypeScriptI.TypeScript);