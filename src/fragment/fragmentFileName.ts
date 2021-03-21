export const
    fragmentFileName = (x: string) => `_${x.trimLeft()}.html`,
    fragmentLiveFileName = (x: string) => `_${x.trimLeft()}_live.html`,
    fragmentListFileName = (x: string) => `_${x.trimLeft().replace(/[\],\[,\},\{]/, '')}.html`;