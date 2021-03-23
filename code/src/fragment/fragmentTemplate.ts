/* eslint-disable @typescript-eslint/naming-convention */
import * as FragmentFileName from './fragmentFileName';
import * as Store from './store';
import * as Message from '../util/message';

export const
    fragmentTemplate = (x: string) => `<%= render "${FragmentFileName.fragmentFileName(x)}" %>`,
    
    fragmentLiveTemplate = (x: string) => `<%= render "${FragmentFileName.fragmentLiveFileName(x)}" %>`,
    
    fragmentListTemplate = (x: string, tag: string) => {
        const tag_start = '<' + tag + '>',
            tag_end = '</' + (tag_start.match(/^<(\S+)/) || [])[1] + '>';
        Store._store_fragment_singleton.push([tag_start, tag_end]);
        Message.info('start ' + tag_start);
        Message.info('end' + tag_end);
        return `${tag_start}<%= render "${FragmentFileName.fragmentListFileName(x)}" %>${tag_end}`;
    },
    
    fragmentLiveListTemplate = (x: string, tag: string) => {
        const tag_start = '<' + tag + '>',
            tag_end = '</' + tag_start.split(' ')[0].split('<')[1] + '>';
        Store._store_fragment_singleton.push([tag_start, tag_end]);
        return `${tag_start}<%= live_render "${FragmentFileName.fragmentListFileName(x).replace(/\.html/, '')}" %>${tag_end}`;
    };