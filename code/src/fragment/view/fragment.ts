/* eslint-disable @typescript-eslint/naming-convention */
import * as Constant from '../../constant';
import * as FragmentTemplate from './fragment/template';
import * as FragmentGroup from '../controller/group';

export const
    fragmentView = (x: string) => { return FragmentTemplate.fragmentTemplate(FragmentGroup.fragmentGroup(x)) },

    fragmentArrayView = (x: string) => {
        const group = FragmentGroup.fragmentArrayGroup(x);
        const fragments = group ? group.split(', ') : false;
        return fragments ?
            fragments.map(x => FragmentTemplate.fragmentTemplate(x)).join("\n")
            : 'fragmentArrayString<Failed>';
    },

    fragmentListView = (x: string) => {
        const group = FragmentGroup.fragmentListGroup(x),
            remove_brackets = (x: string) => x.replace(Constant.FRAGMENT_LISTSTRING_REMOVE_BRACKETS_REGEX, ''),
            fragments = group ? remove_brackets(group).split(', ') : false;
        if (fragments) {
            const tag = (x.match(Constant.FRAGMENT_LISTSTRING_REGEX) || ['', ''])[1].split('>')[0];
            return fragments.map(x => FragmentTemplate.fragmentListTemplate(x, tag)).join('\n');
        }
        return 'fragmentListString<Failed>';
    },

    fragmentLiveView = (x: string) => { return FragmentTemplate.fragmentLiveTemplate(FragmentGroup.fragmentLiveGroup(x)) },

    fragmentLiveArrayView = (x: string) => {
        const group = FragmentGroup.fragmentLiveArrayGroup(x),
            fragments = group ? group.split(', ') : false;
        return fragments ?
            fragments.map(x => FragmentTemplate.fragmentLiveTemplate(x)).join("\n")
            : 'fragmentLiveArrayString<Failed>';
    },

    fragmentLiveListView = (x: string) => {
        const group = FragmentGroup.fragmentLiveListGroup(x),
            remove_brackets = (x: string) => x.replace(Constant.FRAGMENT_LIVE_LISTSTRING_REMOVE_BRACKETS_REGEX, ''),
            fragments = group ? remove_brackets(group).split(', ') : false;
        if (fragments) {
            const tag = (x.match(Constant.FRAGMENT_LIVE_LISTSTRING_REGEX) || ['', ''])[1].split('>')[0];
            return fragments.map(x => FragmentTemplate.fragmentLiveListTemplate(x, tag)).join('\n');
        }
        return 'fragmentLiveListString<Failed>';
    };