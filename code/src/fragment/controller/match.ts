import * as Constant from '../../constant';
export const
    fragment = (x: string): string | null => (x.match(Constant.FRAGMENT_REGEX) || [null])[0],
    fragmentArray = (x: string): string | null => (x.match(Constant.FRAGMENT_ARRAY_GROUP_REGEX) || [null, null])[1],
    fragmentList = (x: string): string | null => (x.match(Constant.FRAGMENT_LIST_GROUP_REGEX) || [null, null])[1],
    fragmentLive = (x: string): string | null => (x.match(Constant.FRAGMENT_LIVE_REGEX) || [null])[0],
    fragmentLiveArray = (x: string): string | null => (x.match(Constant.FRAGMENT_LIVE_ARRAY_GROUP_REGEX) || [null, null])[1],
    fragmentLiveList = (x: string): string | null => (x.match(Constant.FRAGMENT_LIVE_LIST_GROUP_REGEX) || [null, null])[1];