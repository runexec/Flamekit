import * as FragmentTag from './fragmentTag';
export const
    fragmentTagLength = (x: string) => FragmentTag.fragmentTag(x).length,
    fragmentLiveTagLength = (x: string) => FragmentTag.fragmentLiveTag(x).length,
    fragmentArrayTagLength = (x: string) => FragmentTag.fragmentArrayTag(x).length,
    fragmentLiveArrayTagLength = (x: string) => FragmentTag.fragmentLiveArrayTag(x).length,
    fragmentListTagLength = (x: string) => FragmentTag.fragmentListTag(x).length,
    fragmentLiveListTagLength = (x: string) => FragmentTag.fragmentLiveListTag(x).length;