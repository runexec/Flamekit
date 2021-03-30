import * as Constant from '../../../constant';
export const match = (x: string): string | null => (x.match(Constant.FRAGMENT_REGEX) || [null])[0];