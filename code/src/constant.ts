import "reflect-metadata"
import { injectable } from 'tsyringe';

export const constants = {
	DEBUG_MODE: true,
	FLAMEKIT_INDEX: 'flamekit.index.css',
	EXTENSION_EX: 'ex',
	EXTENSION_EEX: 'eex',
	EXTENSION_LEEX: 'leex',
	EXTENSION_EEX_REGEX: /\S+\.eex/,
	EXTENSION_LEEX_REGEX: /\S+\.leex/,
	EXTENSION_REGEX: /\S+\.(eex|leex)/,
	FRAGMENT_REGEX: /=f\{\S+\}/,
	FRAGMENT_GROUP_REGEX: /=f\{(\S+)\}/,
	FRAGMENT_ARRAY_REGEX: /=f\{\[.*?\]\}/,
	FRAGMENT_ARRAY_GROUP_REGEX: /=f\{\[(.*?)\]\}/,
	FRAGMENT_LIST_GROUP_REGEX: />(=l\{\[.*?\]\})<\//,
	FRAGMENT_LISTSTRING_REGEX: /<(.*?)>=l/,
	FRAGMENT_LISTSTRING_REMOVE_BRACKETS_REGEX: /((=l)|(\{\[)|(\]\}))/g,
	FRAGMENT_LIVE_REGEX: /=lf\{\S+\}/,
	FRAGMENT_LIVE_GROUP_REGEX: /=lf\{(\S+)\}/,
	FRAGMENT_LIVE_ARRAY_REGEX: /=lf\{\[.*?\]\}/,
	FRAGMENT_LIVE_ARRAY_GROUP_REGEX: /=lf\{\[(.*?)\]\}/,
	FRAGMENT_LIVE_LIST_GROUP_REGEX: />(=ll\{\[.*?\]\})<\//,
	FRAGMENT_LIVE_LISTSTRING_REGEX: /<(.*?)>=ll/,
	FRAGMENT_LIVE_LISTSTRING_REMOVE_BRACKETS_REGEX: /((=ll)|(\{\[)|(\]\}))/g
};

@injectable()
export class Injection extends Map {
	constructor() {
		super();
		const ks = Object.keys(constants);
		const vs = Object.values(constants);
		ks.forEach((k, i) => this.set(k, vs[i]));				
	}	
}

export default Injection;