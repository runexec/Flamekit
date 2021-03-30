/* eslint-disable @typescript-eslint/naming-convention */
import * as Enums from '../../enum';
import * as Match from './match';

export const
    isFragment = (x: string) => Match.MatchFragment.match(x) !== null,
    isFragmentList = (x: string) => Match.MatchFragmentList.match(x) !== null,
    isFragmentArray = (x: string) => Match.MatchFragmentArray.match(x) !== null,
    isFragmentLive = (x: string) => Match.MatchFragmentLive.match(x) !== null,
    isFragmentLiveArray = (x: string) => Match.MatchFragmentLiveArray.match(x) !== null,
    isFragmentLiveList = (x: string) => Match.MatchFragmentLiveList.match(x) !== null,
    isFragmentListLineType = (x: Enums.LineType) => x === Enums.LineType.FragmentList || Enums.LineType.FragmentLiveList;

export const isValidFragment = (x: string) => {
    return [
        isFragment,
        isFragmentLive,
        isFragmentArray,
        isFragmentLiveArray,
        isFragmentList,
        isFragmentLiveList
    ].some(f => f(x));
};

export const isValidCreateFragment = (x: Enums.LineType) => {
    return [
        Enums.LineType.Fragment,
        Enums.LineType.FragmentArray,
        Enums.LineType.FragmentLive,
        Enums.LineType.FragmentLiveArray,
        Enums.LineType.FragmentList,
        Enums.LineType.FragmentLiveList
    ].some(y => y === x);
};