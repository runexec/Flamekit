import { singleton } from "tsyringe";

/* eslint-disable @typescript-eslint/naming-convention */
export enum LineType {
	Fragment,
	FragmentList,
	FragmentArray,
	FragmentLive,
	FragmentLiveArray,
	FragmentLiveList,
	FragmentUnknown
};

@singleton()
export class Injection {
	LineType = LineType
}