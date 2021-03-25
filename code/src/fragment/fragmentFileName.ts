export const
    fragmentFileName = (x: string) => `_${x.trimLeft()}.html`,
    fragmentListFileName = (x: string) => `_${x.trimLeft().replace(/[\],\[,\},\{]/, '')}.html`,
    fragmentLiveFileName = (x: string) => `_${x.trimLeft()}_live.html`,
    fragmentLiveListFileName = (x: string) => `${x.trimLeft().replace(/[\],\[,\},\{]/, '')}.ex`;