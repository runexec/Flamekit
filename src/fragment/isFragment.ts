/* eslint-disable @typescript-eslint/naming-convention */
import * as Enums from '../enum';
import * as FragmentMatch from './fragmentMatch';

export const 
    isFragment = (x: string) => FragmentMatch.matchFragment(x) !== null,
    isFragmentLive = (x: string) => FragmentMatch.matchFragmentLive(x) !== null,
    isFragmentArray = (x: string) => FragmentMatch.matchFragmentArray(x) !== null,
    isFragmentLiveArray = (x: string) => FragmentMatch.matchFragmentLiveArray(x) !== null,
    isFragmentList = (x: string) => FragmentMatch.matchFragmentList(x) !== null,
    isFragmentList_LineType = (x: Enums.LineType) => x === Enums.LineType.FragmentList || Enums.LineType.FragmentLiveList,
    isFragmentLiveList = (x: string) => FragmentMatch.matchFragmentLiveList(x) !== null;
