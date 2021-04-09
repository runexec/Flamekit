import "reflect-metadata";
import {container} from "tsyringe";
import * as PETAL from '../petal/injectable';

import * as AppView from '../petal/view/appView';
container.register('petal.AppView', AppView.Injection);

container.register('PETALInstance', PETAL.PETAL);