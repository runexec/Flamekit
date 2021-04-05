import 'reflect-metadata';
import {singleton, container} from 'tsyringe';
import * as Message from '../../util/message';

@singleton()
class Injection {
    info : (message:string) => void;
    debugInfo : (message:string) => void;
    constructor() {
        this.info = Message.info;
        this.debugInfo = Message.debugInfo;
    }
}

container.register('Util.Message', Injection);

@singleton()
class InfoInjection {
    info : (message:string) => void;    
    constructor() {
        this.info = Message.info;        
    }
}

container.register('Util.Message.info', InfoInjection);

@singleton()
class DebugInfoInjection {
    debugInfo : (message:string) => void;    
    constructor() {
        this.debugInfo = Message.debugInfo;        
    }
}

container.register('Util.Message.debugInfo', DebugInfoInjection);