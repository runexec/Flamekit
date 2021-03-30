import * as Store from '../../store/store';
import * as TemplateClass from './templateClass';
import * as FragmentFileName from './fileName';

export class Template extends TemplateClass.Template {
    constructor({ file_name, tag }: { file_name: string, tag: string }) {
        super({ file_name: file_name });
        this.toString = () => {
            const tag_start = '<' + tag + '>',
                _tag_end = '</' + tag_start.split(' ')[0].split('<')[1],
                is_missing = _tag_end && _tag_end.indexOf('>') === -1,
                tag_end = is_missing ? _tag_end + '>' : _tag_end;
            Store.FragmentStore.push([tag_start, tag_end]);
            return `${tag_start}<%= render "${FragmentFileName.fragmentListFileName(file_name)}" %>${tag_end}`;
        };
        return this;
    }
}