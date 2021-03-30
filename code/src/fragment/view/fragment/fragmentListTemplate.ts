import * as Store from '../../store/store';
import * as Template from './templateClass';
import * as FragmentFileName from './fileName';

export class FragmentListTemplate extends Template.Template {
    constructor(x: string, tag: string) {
        super();
        this.toString = () => {
            const tag_start = '<' + tag + '>',
            _tag_end = '</' + tag_start.split(' ')[0].split('<')[1],
            is_missing =_tag_end && _tag_end.indexOf('>') === -1,
            tag_end = is_missing ? _tag_end + '>' : _tag_end;
            Store.FragmentStore.push([tag_start, tag_end]);
            return `${tag_start}<%= render "${FragmentFileName.fragmentListFileName(x)}" %>${tag_end}`;
        };
        return this;
    }
}