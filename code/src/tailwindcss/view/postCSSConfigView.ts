import { singleton } from 'tsyringe';
import * as ViewClass from './viewClass';
export class View extends ViewClass.View {
    constructor() {
        super();
        this.toString = () => {
            return  `
module.exports = {
    plugins: [
            require('postcss-import'),
            require('tailwindcss'),
            require('autoprefixer'),
    ]
}
`;
        }
    }
};

@singleton()
export class Injection { View = View }