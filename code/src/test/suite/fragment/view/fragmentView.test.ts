/*
import * as assert from 'assert';
import * as FragmentView from '../../src/fragment/view/fragmentView';

const new_view = (x: string) => new FragmentView.View({ fragment_string: x }).toString();

describe('Fragment / View / fragmentView.ts ', () => {
    let test_view = '=f{abc}';
    let test = new_view(test_view);
    let should_match = '<%= render "_abc.html" %>';
    it(test_view, () => assert.strictEqual(test, should_match));
});
*/