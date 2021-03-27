/* eslint-disable @typescript-eslint/naming-convention */
import * as Enums from '../../enum';
import * as FragmentMatch from './match';

export const
    isFragment = (x: string) => FragmentMatch.fragment(x) !== null,
    isFragmentList = (x: string) => FragmentMatch.fragmentList(x) !== null,
    isFragmentArray = (x: string) => FragmentMatch.fragmentArray(x) !== null,
    isFragmentLive = (x: string) => FragmentMatch.fragmentLive(x) !== null,
    isFragmentLiveArray = (x: string) => FragmentMatch.fragmentLiveArray(x) !== null,
    isFragmentLiveList = (x: string) => FragmentMatch.fragmentLiveList(x) !== null,
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
        Enums.LineType.FragmentLiveList,
    ].some(y => y === x);
};