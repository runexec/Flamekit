import 'reflect-metadata';
import { singleton, container } from 'tsyringe';
import * as ViewClass from './view';

let FragmentLiveListTemplate : {Template: any};
let FragmentLiveListGroup : {getGroup: (x:string) => string | undefined | null };

const Constant : Map<string, any> = container.resolve('ConstantInstance');

export class View extends ViewClass.View {
    constructor({ fragment_string }: { fragment_string: string }) {
        super({ fragment_string: fragment_string });
        const group = FragmentLiveListGroup.getGroup(fragment_string),
            remove_brackets = (x: string) => x.replace(Constant.get('FRAGMENT_LIVE_LISTSTRING_REMOVE_BRACKETS_REGEX'), ''),
            fragments = group ? remove_brackets(group).split(',') : false;
        this.toString = () => {
            if (fragments) {
                const tag = (fragment_string.match(Constant.get('FRAGMENT_LIVE_LISTSTRING_REGEX')) || ['', ''])[1].split('>')[0];
                return fragments
                    .map(x => new FragmentLiveListTemplate.Template({ file_name: x, tag: tag })).join('\n');
            }
            else { return 'fragmentListView<Failed>'; }
        }
        return this;
    }
}

@singleton()
export class Injection {
    View = View;
}