import * as ViewClass from './viewClass';
export class View extends ViewClass.View {
    constructor() {
        super();
        this.toString = () => {
            return `
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
` + "\n";
        }
    }
};