import 'reflect-metadata';
import { singleton, container } from 'tsyringe';
import * as ViewClass from './view';

let FragmentLiveTemplate: {
    Template: new ({ class_name }: {
        class_name: string
    }) => { toString: () => string }
};

let FragmentLiveGroup: { getGroup: (x: string) => string };

export class View extends ViewClass.View {
    constructor({ fragment_string }: { fragment_string: string }) {
        super({ fragment_string: fragment_string });
        FragmentLiveTemplate = container.resolve('fragment.FragmentLiveTemplate');
        FragmentLiveGroup = container.resolve('fragment.FragmentLiveGroup');
        this.toString = () => {
            const template =
                new FragmentLiveTemplate.Template({
                    class_name: FragmentLiveGroup.getGroup(fragment_string)
                }).toString();
            return template;
        };
        return this;
    }
}

@singleton()
export class Injection {
    View = View;
}