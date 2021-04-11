/*
import * as assert from 'assert';
import * as FragmentLiveView from '../../src/fragment/view/fragmentLiveView';

const new_view = (x:string) => new FragmentLiveView.View({ fragment_string: x }).toString();

describe('Fragment / View / fragmentLiveView.ts ', () => {
    let test_view = '=lf{abc}';
    let test = new_view(test_view);
    let should_match = '<%= render "_abc_live.html" %>';
    it(test_view, () => assert.strictEqual(test, should_match));
});
*/