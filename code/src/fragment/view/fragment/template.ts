/* eslint-disable @typescript-eslint/naming-convention */
import * as FragmentFileName from '../../controller/fileName';
import * as Store from '../../store/store';

export const
    fragmentTemplate = (x: string) => `<%= render "${FragmentFileName.fragmentFileName(x)}" %>`,
    
    fragmentLiveTemplate = (x: string) => `<%= render "${FragmentFileName.fragmentLiveFileName(x)}" %>`,
    
    fragmentListTemplate = (x: string, tag: string) => {
        const tag_start = '<' + tag + '>',
        _tag_end = '</' + tag_start.split(' ')[0].split('<')[1],
        is_missing =_tag_end && _tag_end.indexOf('>') === -1,
        tag_end = is_missing ? _tag_end + '>' : _tag_end;
        Store.FragmentStore.push([tag_start, tag_end]);
        return `${tag_start}<%= render "${FragmentFileName.fragmentListFileName(x)}" %>${tag_end}`;
    },
    
    fragmentLiveListTemplate = (x: string, tag: string) => {
        const tag_start = '<' + tag + '>',
            _tag_end = '</' + tag_start.split(' ')[0].split('<')[1],
            is_missing =_tag_end && _tag_end.indexOf('>') === -1,
            tag_end = is_missing ? _tag_end + '>' : _tag_end;
        Store.FragmentStore.push([tag_start, tag_end]);
        return `${tag_start}<%= live_component ${FragmentFileName.fragmentLiveListFileName(x).replace(/\.html/, '')} %>${tag_end}`;
    };