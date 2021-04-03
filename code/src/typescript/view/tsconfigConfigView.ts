import * as ViewClass from "./view";

export class View extends ViewClass.View {
    constructor() {
        super();
        this.toString = () => {
            return `{
    "include": ["js/**/*"]
}`;
        };
        return this;
    }
}