import "reflect-metadata";
import {container} from "tsyringe";
import * as FragmentI from '../fragment/injectable';
container.register('FragmentInstance', FragmentI.Fragment);