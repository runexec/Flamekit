import * as Constant from '../constant';
export const
    matchFragment = (x: string): string | null => (x.match(Constant.FRAGMENT_REGEX) || [null])[0],
    matchFragmentArray = (x: string): string | null => (x.match(Constant.FRAGMENT_ARRAY_GROUP_REGEX) || [null, null])[1],
    matchFragmentList = (x: string): string | null => (x.match(Constant.FRAGMENT_LIST_GROUP_REGEX) || [null, null])[1],
    matchFragmentLive = (x: string): string | null => (x.match(Constant.FRAGMENT_LIVE_REGEX) || [null])[0],
    matchFragmentLiveArray = (x: string): string | null => (x.match(Constant.FRAGMENT_LIVE_ARRAY_GROUP_REGEX) || [null, null])[1],
    matchFragmentLiveList = (x: string): string | null => (x.match(Constant.FRAGMENT_LIVE_LIST_GROUP_REGEX) || [null, null])[1];