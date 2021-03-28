export const
    fragmentFileName = (x: string) => `_${x.trimLeft().replace(/[\],\[,\},\{]/, '')}.html`,
    fragmentListFileName = (x: string) => `_${x.trimLeft().replace(/[\],\[,\},\{]/, '')}.html`,
    fragmentLiveFileName = (x: string) => `_${x.trimLeft().replace(/[\],\[,\},\{]/, '')}_live.html`,
    fragmentLiveListFileName = (x: string) => x;