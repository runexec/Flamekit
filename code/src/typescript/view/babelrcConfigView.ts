import * as ViewClass from "./view";

export class View extends ViewClass.View {
    constructor() {
        super();
        this.toString = () => {
            return `
    "presets": [
        "@babel/preset-typescript",
`;       
        };
        return this;
    }
}
