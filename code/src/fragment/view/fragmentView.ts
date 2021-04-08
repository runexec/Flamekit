import 'reflect-metadata';
import { singleton, container } from 'tsyringe';
import * as ViewClass from './view';

let FragmentTemplate : {Template: any};
let FragmentGroup : {getGroup: (x:string) => string | undefined | null };

export class View extends ViewClass.View {
    constructor({ fragment_string }: { fragment_string: string }) {
        super({ fragment_string: fragment_string });
        FragmentTemplate = container.resolve('fragment.FragmentTemplate');
        FragmentGroup = container.resolve('fragment.FragmentGroup');
        this.toString = () => {
            const template =
                new FragmentTemplate.Template({
                    file_name: FragmentGroup.getGroup(fragment_string)
                }).toString();
            return template;
        }
        return this;
    }
}

@singleton()
export class Injection {
    View = View;
}