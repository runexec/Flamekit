import "reflect-metadata";
import {container} from "tsyringe";

import * as AppView from '../petal/view/appView';
container.register('petal.AppView', AppView.Injection);

import * as PETAL from '../petal/injectable';
container.register('PETALInstance', PETAL.Injection);