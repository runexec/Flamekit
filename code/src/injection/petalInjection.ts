import "reflect-metadata";
import {container} from "tsyringe";
import * as PETAL from '../petal/injectable';
container.register('PETALInstance', PETAL.PETAL);