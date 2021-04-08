import 'reflect-metadata';
import { singleton, container } from 'tsyringe';
import * as ViewClass from './view';

let FragmentArrayTemplate : {Template: any};
let FragmentArrayGroup : {getGroup: (x:string) => string | undefined | null };

export class View extends ViewClass.View {
    constructor({ fragment_string }: { fragment_string: string }) {
        super({ fragment_string: fragment_string });
        FragmentArrayGroup = container.resolve('fragment.FragmentArrayGroup');
        FragmentArrayTemplate = container.resolve('fragment.FragmentArrayTemplate');
        const group = FragmentArrayGroup.getGroup(fragment_string);
        const fragments = group ? group.split(',') : false;
        this.toString = () => {
            return fragments ?
                fragments.map(x => new FragmentArrayTemplate.Template({ file_name: x })).join("\n")
                : 'fragmentArrayView<Failed>';
        };
        return this;
    }
}

@singleton()
export class Injection {
    View = View;
}