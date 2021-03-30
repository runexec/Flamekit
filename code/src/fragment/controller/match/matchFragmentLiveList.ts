import * as Constant from '../../../constant';
export const match = (x: string): string | null => (x.match(Constant.FRAGMENT_LIVE_LIST_GROUP_REGEX) || [null, null])[1];