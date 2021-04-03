import * as assert from 'assert';
import * as FragmentLiveArrayView from '../../../../fragment/view/fragmentLiveArrayView';

const new_view = (x:string) => new FragmentLiveArrayView.View({ fragment_string: x }).toString();

describe('Fragment / View / fragmentLiveArrayView.ts ', () => {
    let test_view = '=lf{[abc, 123]}';
    let test = new_view(test_view);
    let should_match = "<%= render \"_abc_live.html\" %>\n<%= render \"_123_live.html\" %>";
    it(test_view, () => assert.strictEqual(test, should_match));
});