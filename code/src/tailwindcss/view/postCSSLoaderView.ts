import * as ViewClass from './viewClass';
export class View extends ViewClass.View {
    constructor() {
        super();
        this.toString = () => {
            return "'css-loader',\n'postcss-loader',\n";
        }
    }
};