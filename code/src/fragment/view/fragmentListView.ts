import * as ViewClass from './view';
import 'reflect-metadata';
import {singleton, container} from 'tsyringe';

let FragmentListTemplate : {
    Template: new ({ file_name, tag }: {
        file_name: string, 
        tag: string
    }) => { toString: () => string }
};

let FragmentListGroup : {getGroup: (x:string) => string | undefined | null };

const Constant : Map<string, any> = container.resolve('ConstantInstance');

export class View extends ViewClass.View {
    constructor({ fragment_string }: { fragment_string: string }) {
        super({ fragment_string: fragment_string });
        FragmentListGroup = container.resolve('fragment.FragmentListGroup');
        FragmentListTemplate = container.resolve('fragment.FragmentListTemplate');
        const group = FragmentListGroup.getGroup(fragment_string),
            remove_brackets = (x: string) => x.replace(Constant.get('FRAGMENT_LISTSTRING_REMOVE_BRACKETS_REGEX'), ''),
            fragments = group ? remove_brackets(group).split(',') : false;
        this.toString = () => {
            if (fragments) {
                const tag = (fragment_string.match(Constant.get('FRAGMENT_LISTSTRING_REGEX')) || ['', ''])[1].split('>')[0];
                return fragments
                    .map(x => new FragmentListTemplate.Template({ file_name: x, tag: tag }))
                    .join('\n');
            } else { return 'fragmentListView<Failed>'; }
        }
        return this;
    }
}

@singleton()
export class Injection {
    View = View;
}