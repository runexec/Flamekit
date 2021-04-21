import { singleton } from "tsyringe";
import * as ViewClass from "./viewClass";

export class View extends ViewClass.View {
    constructor() {
        super();
        this.toString = () => {
            return `
{
    "include": ["js/**/*"],
    "exclude": ["js/loadjs.js"],
    "compilerOptions": {
        "allowJs": true,
        "sourceMap": true,
        "moduleResolution": "node",
        "outDir": "/tmp/",
    },
    
}`;
        };
        return this;
    }
}

@singleton()
export class Injection { View = View }