import * as FragmentFile from './fragmentFileName';
import * as Store from './store';
export const
    fragmentTemplate = (x: string) => `<%= render "${FragmentFile.fragmentFileName(x)}" %>`,
    fragmentLiveTemplate = (x: string) => `<%= render "${FragmentFile.fragmentLiveFileName(x)}" %>`,
    fragmentListTemplate = (x: string, tag: string) => {
        const tagStart = '<' + tag + '>',
            tagEnd = '</' + tagStart.split(' ')[0].split('<')[1] + '>';
        Store._store_fragment_singleton.push([tagStart, tagEnd]);
        return `${tagStart}<%= render "${FragmentFile.fragmentListFileName(x)}" %>${tagEnd}`;
    },
    fragmentLiveListTemplate = (x: string, tag: string) => {
        const tagStart = '<' + tag + '>',
            tagEnd = '</' + tagStart.split(' ')[0].split('<')[1] + '>';
        Store._store_fragment_singleton.push([tagStart, tagEnd]);
        return `${tagStart}<%= live_render "${FragmentFile.fragmentListFileName(x).replace(/\.html/, '')}" %>${tagEnd}`;
    };