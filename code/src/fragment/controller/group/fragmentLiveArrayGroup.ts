import * as Constant from '../../../constant';
export const getGroup = (x: string) => (x.match(Constant.FRAGMENT_LIVE_ARRAY_GROUP_REGEX) || [])[1];
