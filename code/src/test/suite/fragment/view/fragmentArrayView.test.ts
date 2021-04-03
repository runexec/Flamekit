import * as assert from 'assert';
import * as FragmentArrayView from '../../../../fragment/view/fragmentArrayView';

const new_view = (x:string) => new FragmentArrayView.View({ fragment_string: x }).toString();

describe('Fragment / View / fragmentArrayView.ts ', () => {
    let test_view = '=f{[abc, 123]}';
    let test = new_view(test_view);
    let should_match = "<%= render \"_abc.html\" %>\n<%= render \"_123.html\" %>";
    it(test_view, () => assert.strictEqual(test, should_match));
});