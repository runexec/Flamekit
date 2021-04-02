import * as ViewClass from "./view";

export class View extends ViewClass.View {
    replaces: [string, string][];
    constructor() {
        super();
        this.toString = () => {
            return this.replaces.toString();
        };
        this.replaces = [
            [
                `'app': glob.sync('./vendor/**/*.js').concat(['./js/app.js'])`,
                `'app': glob.sync('./vendor/**/*.js').concat(['./js/app.ts'])`
            ],
            [
                `rules: [`,

`rules: [
      {
        test: /\\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader'
        }
      },`
            ]
        ];
        return this;
    }

    getReplace() { return this.replaces; }
}
