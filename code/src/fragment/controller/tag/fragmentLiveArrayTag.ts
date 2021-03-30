import * as Constant from '../../../constant';
export const getTag = (x: string): string => (x.match(Constant.FRAGMENT_LIVE_ARRAY_GROUP_REGEX) || ['',''])[1];