/* eslint-disable @typescript-eslint/naming-convention */
import { container, singleton } from 'tsyringe';

let LineTypeInjection = container.resolve('type.LineType') as {
    LineType: { [k: string]: number },
};

type LineTypeNumber = number;

type Matching = { match: (x: string) => boolean };

const FragmentMatch: Matching = container.resolve('fragment.FragmentMatch');
const FragmentListMatch: Matching = container.resolve('fragment.FragmentListMatch');
const FragmentArrayMatch: Matching = container.resolve('fragment.FragmentArrayMatch');
const FragmentLiveMatch: Matching = container.resolve('fragment.FragmentLiveMatch');
const FragmentLiveListMatch: Matching = container.resolve('fragment.FragmentLiveListMatch');
const FragmentLiveArrayMatch: Matching = container.resolve('fragment.FragmentLiveArrayMatch');

export const
    isFragment = (x: string) => FragmentMatch.match(x) !== null,
    isFragmentList = (x: string) => FragmentListMatch.match(x) !== null,
    isFragmentArray = (x: string) => FragmentArrayMatch.match(x) !== null,
    isFragmentLive = (x: string) => FragmentLiveMatch.match(x) !== null,
    isFragmentLiveArray = (x: string) => FragmentLiveArrayMatch.match(x) !== null,
    isFragmentLiveList = (x: string) => FragmentLiveListMatch.match(x) !== null,
    isFragmentListLineType = (x: LineTypeNumber) => {
        return x === LineTypeInjection.LineType.FragmentList
            || LineTypeInjection.LineType.FragmentLiveList;
    };

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

export const isValidCreateFragment = (x: LineTypeNumber) => {
    return [
        LineTypeInjection.LineType.Fragment,
        LineTypeInjection.LineType.FragmentArray,
        LineTypeInjection.LineType.FragmentLive,
        LineTypeInjection.LineType.FragmentLiveArray,
        LineTypeInjection.LineType.FragmentList,
        LineTypeInjection.LineType.FragmentLiveList
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