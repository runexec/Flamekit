import 'reflect-metadata';
import { singleton, container } from 'tsyringe';
import * as ViewClass from './view';

let FragmentLiveArrayTemplate : {Template: any};
let FragmentLiveArrayGroup : {getGroup: (x:string) => string | undefined | null };

export class View extends ViewClass.View {
    constructor({ fragment_string }: { fragment_string: string }) {
        super({ fragment_string: fragment_string });
        FragmentLiveArrayGroup = container.resolve('fragment.FragmentLiveArrayGroup');
        FragmentLiveArrayTemplate = container.resolve('fragment.FragmentLiveArrayTemplate');
        const group = FragmentLiveArrayGroup.getGroup(fragment_string),
            fragments = group ? group.split(',') : false;
        this.toString = () => {
            return fragments ?
                fragments.map(x => new FragmentLiveArrayTemplate.Template({ file_name: x })).join("\n")
                : 'fragmentArrayView<Failed>';
        };
        return this;
    }
}

@singleton()
export class Injection {
    View = View;
}