import * as assert from 'assert';
import * as FragmentListView from '../../../../fragment/view/fragmentListView';

const new_view = (x:string) => new FragmentListView.View({ fragment_string: x }).toString();

describe('Fragment / View / fragmentListView.ts ', () => {
    let test_view = '<a hello="world">=l{[abc, 123]}</a>';
    let test = new_view(test_view);
    let should_match = 
        "<a hello=\"world\"><%= render \"_abc.html\" %></a>\n" +
        "<a hello=\"world\"><%= render \"_123.html\" %></a>";
    it(test_view, () => assert.strictEqual(test, should_match));
});