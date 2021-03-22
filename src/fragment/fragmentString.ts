/* eslint-disable @typescript-eslint/naming-convention */
import * as Constant from '../constant';
import * as FragmentTemplate from './fragmentTemplate';
import * as FragmentGroup from './fragmentGroup';

export const
    fragmentString = (x: string) =>
        FragmentTemplate.fragmentTemplate(FragmentGroup.fragmentGroup(x)),

    fragmentLiveString = (x: string) =>
        FragmentTemplate.fragmentLiveTemplate(FragmentGroup.fragmentLiveGroup(x)),

    fragmentArrayString = (x: string) => {
        const group = FragmentGroup.fragmentArrayGroup(x);
        const fragments = group ? group.split(', ') : false;
        return fragments ? fragments.map(x => FragmentTemplate.fragmentTemplate(x)).join("\n") : "";
    },

    fragmentListString = (x: string) => {
        const group = FragmentGroup.fragmentListGroup(x),
            remove_brackets = (x: string) => x.replace(Constant.FRAGMENT_LISTSTRING_REMOVE_BRACKETS_REGEX, ''),
            fragments = group ? remove_brackets(group).split(', ') : false;
        if (fragments) {
            const tag = (x.match(Constant.FRAGMENT_LISTSTRING_REGEX) || ['', ''])[1].split('>')[0];
            return fragments.map(x => FragmentTemplate.fragmentListTemplate(x, tag)).join('\n');
        }
        return '';
    },

    fragmentLiveListString = (x: string) => {
        const group = FragmentGroup.fragmentLiveListGroup(x),
            remove_brackets = (x: string) => x.replace(Constant.FRAGMENT_LIVE_LISTSTRING_REMOVE_BRACKETS_REGEX, ''),
            fragments = group ? remove_brackets(group).split(', ') : false;
        if (fragments) {
            const tag = (x.match(Constant.FRAGMENT_LIVE_LISTSTRING_REGEX) || ['', ''])[1].split('>')[0];
            return fragments.map(x => FragmentTemplate.fragmentLiveListTemplate(x, tag)).join('\n');
        }
        return '';
    },

    fragmentLiveArrayString = (x: string) => {
        const group = FragmentGroup.fragmentLiveArrayGroup(x);
        const fragments = group ? group.split(', ') : false;
        return fragments ? fragments.map(x => FragmentTemplate.fragmentLiveTemplate(x)).join("\n") : "";
    };