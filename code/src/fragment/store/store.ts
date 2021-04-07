import 'reflect-metadata';
import { singleton, container } from 'tsyringe';

const Message: { debugInfo: (x: string) => void } = container.resolve('Util.Message.debugInfo');

type FragmentStorageItem = [tagStart: string, tagEnd: string];

class Store {
    private store: FragmentStorageItem[] = [];
    pop = () => this.store.pop();
    shift = () => this.store.shift();
    push = (x: FragmentStorageItem) => {
        this.store.push(x);
        Message.debugInfo(`Fragment Storage Item ${x}`)
    };
}

export const FragmentStore: Store = new Store();

@singleton()
export class Injection {
    StoreType = typeof Store;
    FragmentStore: Store = FragmentStore;
}