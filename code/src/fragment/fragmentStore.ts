import * as Message from '../util/message';

type FragmentStorageItem = [tagStart: string, tagEnd: string];

class Store {
    private store: FragmentStorageItem[] = [];
    pop : Function;
    push : Function;
    shift : Function;
    constructor() {
        this.pop = () => this.store.pop();
        this.shift = () => this.store.shift();
        this.push = (x: FragmentStorageItem) => {
            this.store.push(x);
            Message.debugInfo(`Fragment Storage Item ${x}`)
        };
    }
}

export const FragmentStore: Store = new Store();