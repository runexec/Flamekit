/* eslint-disable @typescript-eslint/naming-convention */
import * as Enums from '../enum';
import {
    matchFragment,
    matchFragmentLive,
    matchFragmentArray,
    matchFragmentLiveArray,
    matchFragmentList,
    matchFragmentLiveList
} from './matchFragment';

export const 
    isFragment = (x: string) => matchFragment(x) !== null,
    isFragmentLive = (x: string) => matchFragmentLive(x) !== null,
    isFragmentArray = (x: string) => matchFragmentArray(x) !== null,
    isFragmentLiveArray = (x: string) => matchFragmentLiveArray(x) !== null,
    isFragmentList = (x: string) => matchFragmentList(x) !== null,
    isFragmentList_LineType = (x: Enums.LineType) => x === Enums.LineType.FragmentList || Enums.LineType.FragmentLiveList,
    isFragmentLiveList = (x: string) => matchFragmentLiveList(x) !== null;
