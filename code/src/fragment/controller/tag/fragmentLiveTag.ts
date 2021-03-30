import * as Constant from '../../../constant';
export const getTag = (x: string): string => (x.match(Constant.FRAGMENT_LIVE_REGEX) || [''])[0];