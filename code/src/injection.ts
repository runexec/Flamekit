import "reflect-metadata";
import {injectable, container} from "tsyringe";

import * as ConstantI from './constant';
container.register('ConstantInstance', ConstantI.Injection);

import * as AlpineI from './alpine/injectable';
container.register('AlpineInstance', AlpineI.Alpine);

import * as CSSI from './css/injectable';
container.register('CSSInstance', CSSI.CSS);

import * as FragmentI from './fragment/injectable';
container.register('FragmentInstance', FragmentI.Fragment);

import * as PETAL from './petal/injectable';
container.register('PETALInstance', PETAL.PETAL);

import * as TypeScriptI from './typescript/injectable';
container.register('TypeScriptInstance', TypeScriptI.TypeScript);

import * as TailwindCSSI from './tailwindcss/injectable';
container.register('TailwindCSSInstance', TailwindCSSI.TailwindCSS);