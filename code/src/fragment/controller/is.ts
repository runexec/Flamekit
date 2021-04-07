/* eslint-disable @typescript-eslint/naming-convention */
import { singleton } from 'tsyringe';
import * as Enums from '../../enum';
import * as Match from './match';

export const
    isFragment = (x: string) => Match.FragmentMatch.match(x) !== null,
    isFragmentList = (x: string) => Match.FragmentListMatch.match(x) !== null,
    isFragmentArray = (x: string) => Match.FragmentArrayMatch.match(x) !== null,
    isFragmentLive = (x: string) => Match.FragmentLiveMatch.match(x) !== null,
    isFragmentLiveArray = (x: string) => Match.FragmentLiveArrayMatch.match(x) !== null,
    isFragmentLiveList = (x: string) => Match.FragmentLiveListMatch.match(x) !== null,
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

@singleton()
export class Injection {
    isValidFragment = isValidFragment;
    isValidCreateFragment = isValidCreateFragment;
    isFragment = isFragment;
    isFragmentLive = isFragmentLive;
    isFragmentArray = isFragmentArray;
    isFragmentLiveArray = isFragmentLiveArray;
    isFragmentList = isFragmentList;
    isFragmentLiveList = isFragmentLiveList;
    isFragmentListLineType = isFragmentListLineType;
}