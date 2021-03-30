import * as Constant from '../../../constant';
export const geTag = (x: string): string => (x.match(Constant.FRAGMENT_REGEX) || [''])[0];