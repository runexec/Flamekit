import * as Constant from '../constant';
export const
    fragmentTag = (x: string) => (x.match(Constant.FRAGMENT_REGEX) || [''])[0],
    fragmentLiveTag = (x: string) => (x.match(Constant.FRAGMENT_LIVE_REGEX) || [''])[0],
    fragmentArrayTag = (x: string) => (x.match(Constant.FRAGMENT_ARRAY_REGEX) || [''])[0],
    fragmentLiveArrayTag = (x: string) => (x.match(Constant.FRAGMENT_LIVE_ARRAY_REGEX) || [''])[0],
    fragmentListTag = (x: string) => (x.match(Constant.FRAGMENT_LIST_GROUP_REGEX) || [''])[0],
    fragmentLiveListTag = (x: string) => (x.match(Constant.FRAGMENT_LIVE_LIST_GROUP_REGEX) || [''])[0];