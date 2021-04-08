import "reflect-metadata";
import {singleton, container} from "tsyringe";
import * as AlpineImportView from '../alpine/view/alpineImportView';

@singleton()
class AlpineImportViewInstance extends AlpineImportView.View {}

container.register('Alpine.AlpineImportView', AlpineImportViewInstance);

import * as LiveSocketView from '../alpine/view/liveSocketView';

@singleton()
class LiveSocketViewInstance extends LiveSocketView.View {}

container.register('Alpine.LiveSocketView', LiveSocketViewInstance);

import * as AlpineI from '../alpine/injectable';
container.register('AlpineInstance', AlpineI.Alpine);