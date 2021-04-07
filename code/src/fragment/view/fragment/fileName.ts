import { singleton } from "tsyringe";

export const
    fragmentFileName = (x: string) => `_${x.trimLeft().replace(/[\],\[,\},\{]/, '')}.html`,
    fragmentListFileName = (x: string) => `_${x.trimLeft().replace(/[\],\[,\},\{]/, '')}.html`,
    fragmentLiveFileName = (x: string) => `_${x.trimLeft().replace(/[\],\[,\},\{]/, '')}_live.html`,
    fragmentLiveListFileName = (x: string) => x;

@singleton()
export class Injection {
    fragmentFileName = fragmentFileName;
    fragmentListFileName = fragmentListFileName;
    fragmentLiveFileName = fragmentLiveFileName;
    fragmentLiveListFileName = fragmentLiveListFileName;
}