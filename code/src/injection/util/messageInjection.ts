import 'reflect-metadata';
import { singleton, container } from 'tsyringe';
import * as Message from '../../util/message';

@singleton()
class Injection {
    info: (message: string) => void = Message.info;
    debugInfo: (message: string) => void = Message.debugInfo;
}

container.register('Util.Message', Injection);

@singleton()
class InfoInjection {
    info: (message: string) => void = Message.info;
}

container.register('Util.Message.info', InfoInjection);

@singleton()
class DebugInfoInjection {
    debugInfo: (message: string) => void = Message.debugInfo;
}

container.register('Util.Message.debugInfo', DebugInfoInjection);