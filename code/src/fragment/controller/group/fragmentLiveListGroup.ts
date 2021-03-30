import * as Constant from '../../../constant';
export const getGroup = (x: string) => (x.match(Constant.FRAGMENT_LIVE_LIST_GROUP_REGEX) || [])[1];
