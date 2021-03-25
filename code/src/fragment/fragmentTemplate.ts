/* eslint-disable @typescript-eslint/naming-convention */
import * as FragmentFileName from './fragmentFileName';
import * as Store from './fragmentStore';
import * as Message from '../util/message';

export const
    fragmentTemplate = (x: string) => `<%= render "${FragmentFileName.fragmentFileName(x)}" %>`,
    
    fragmentLiveTemplate = (x: string) => `<%= render "${FragmentFileName.fragmentLiveFileName(x)}" %>`,
    
    fragmentListTemplate = (x: string, tag: string) => {
        const tag_start = '<' + tag + '>',
            tag_end = '</' + tag_start.split(' ')[0].split('<')[1];
        Store.FragmentStore.push([tag_start, tag_end]);
        return `${tag_start}<%= render "${FragmentFileName.fragmentListFileName(x)}" %>${tag_end}`;
    },
    
    fragmentLiveListTemplate = (x: string, tag: string) => {
        const tag_start = '<' + tag + '>',
            tag_end = '</' + tag_start.split(' ')[0].split('<')[1] + '>';
        Store.FragmentStore.push([tag_start, tag_end]);
        return `${tag_start}<%= live_component "${FragmentFileName.fragmentLiveListFileName(x).replace(/\.html/, '')}" %>${tag_end}`;
    };