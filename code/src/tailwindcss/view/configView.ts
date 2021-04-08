import { singleton } from 'tsyringe';
import * as ViewClass from './viewClass';
export class View extends ViewClass.View {
    constructor() {
        super();
        this.toString = () => {
            return `
module.exports = {
  purge: [
    '../lib/**/*.ex',
    '../lib/**/*.leex',
    '../lib/**/*.eex',
    './js/**/*.js'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
`;
        }
    }
};

@singleton()
export class Injection { View = View }