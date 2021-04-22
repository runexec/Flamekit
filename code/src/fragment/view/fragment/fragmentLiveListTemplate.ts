import 'reflect-metadata';
import { singleton, container } from 'tsyringe';
import * as TemplateClass from './templateClass';

type StorageItem = [tagStart: string, tagEnd: string];
type StoreCollection = StorageItem[];
type Storage<T extends StoreCollection> = { push: Function, pop: Function, shift: Function };
type Store = Storage<StoreCollection> & { FragmentStore: any, StoreType: any };
let Store: Store; 

export class Template extends TemplateClass.Template {
    constructor({ class_name, tag }: { class_name: string, tag: string }) {
        super({ file_name: class_name });
        Store = container.resolve('fragment.Store');
        this.toString = () => {
            const tag_start = '<' + tag + '>',
                _tag_end = '</' + tag_start.split(' ')[0].split('<')[1],
                is_missing = _tag_end && _tag_end.indexOf('>') === -1,
                tag_end = is_missing ? _tag_end + '>' : _tag_end;
            Store.FragmentStore.push([tag_start, tag_end]);
            return class_name
                .split(',')
                .map(x => {
                    const name = x.trim();
                    return `${tag_start}<%= live_component(@socket, ${name}) %>${tag_end}`;
                }).join("\n");
        };
        return this;
    }
}

@singleton()
export class Injection {
    Template = Template
}