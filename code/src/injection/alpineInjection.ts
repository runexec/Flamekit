import "reflect-metadata";
import {container} from "tsyringe";

import * as AlpineImportView from '../alpine/view/alpineImportView';
container.register('alpine.AlpineImportView', AlpineImportView.Injection);

import * as LiveSocketView from '../alpine/view/liveSocketView';
container.register('alpine.LiveSocketView', LiveSocketView.Injection);

import * as AlpineI from '../alpine/injectable';
container.register('AlpineInstance', AlpineI.Alpine);