import * as ViewClass from "./view";

export class View extends ViewClass.View {
    replaces:string;
    constructor() {
        super();
        this.toString = () => {
            return `'app': glob.sync('./vendor/**/*.js').concat(['./js/app.ts'])`
        };
        this.replaces = `'app': glob.sync('./vendor/**/*.js').concat(['./js/app.js'])`;
        return this;
    }

    getReplace() { return this.replaces; }
}
