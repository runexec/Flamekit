import * as assert from 'assert';
import { LineType } from '../../enum';

describe('Enum', () => {
    it('Fragment', () => assert.ok("undefined" != typeof LineType.Fragment));
    it('FragmentArray', () => assert.ok("undefined" != typeof LineType.FragmentArray));
    it('FragmentLive', () => assert.ok("undefined" != typeof LineType.FragmentLive));
    it('FragmentLiveArray', () => assert.ok("undefined" != typeof LineType.FragmentLiveArray));
    it('FragmentLiveList', () => assert.ok("undefined" != typeof LineType.FragmentLiveList));
    it('FragmentUnknown', () => assert.ok("undefined" != typeof LineType.FragmentUnknown));
});