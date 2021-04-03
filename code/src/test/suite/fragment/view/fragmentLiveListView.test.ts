import * as assert from 'assert';
import * as FragmentLiveListView from '../../../../fragment/view/fragmentLiveListView';

const new_view = (x:string) => new FragmentLiveListView.View({ fragment_string: x }).toString();

describe('Fragment / View / fragmentLiveListView.ts ', () => {
    let test_view = '<a hello="world">=ll{[One, Two]}</a>';
    let test = new_view(test_view);
    let should_match = 
        "<a hello=\"world\"><%= live_component One %></a>\n" +
        "<a hello=\"world\"><%= live_component Two %></a>";
    it(test_view, () => assert.strictEqual(test, should_match));
});