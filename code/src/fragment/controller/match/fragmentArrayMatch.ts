import * as Constant from '../../../constant';
export const match = (x: string): string | null => (x.match(Constant.FRAGMENT_ARRAY_GROUP_REGEX) || [null, null])[1];