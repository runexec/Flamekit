import "reflect-metadata";
import {container} from "tsyringe";
import * as CSSI from '../css/injectable';
container.register('CSSInstance', CSSI.CSS);
