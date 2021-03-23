import * as Constant from '../constant';
export const
    fragmentGroup = (x: string) => (x.match(Constant.FRAGMENT_GROUP_REGEX) || [])[1],
    fragmentLiveGroup = (x: string) => (x.match(Constant.FRAGMENT_LIVE_GROUP_REGEX) || [])[1],
    fragmentArrayGroup = (x: string) => (x.match(Constant.FRAGMENT_ARRAY_GROUP_REGEX) || [])[1],
    fragmentLiveArrayGroup = (x: string) => (x.match(Constant.FRAGMENT_LIVE_ARRAY_GROUP_REGEX) || [])[1],
    fragmentListGroup = (x: string) => (x.match(Constant.FRAGMENT_LIST_GROUP_REGEX) || [])[1],
    fragmentLiveListGroup = (x: string) => (x.match(Constant.FRAGMENT_LIVE_LIST_GROUP_REGEX) || [])[1];