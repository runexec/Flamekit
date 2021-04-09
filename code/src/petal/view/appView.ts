import { singleton } from 'tsyringe';
import * as ViewClass from './viewClass';
export class View extends ViewClass.View {
    constructor() {
        super();
        this.toString = () => { return `
import "../css/app.scss";
import "phoenix_html";
import topbar from "topbar";

// Show progress bar on live navigation and form submits
topbar.config({barColors: {0: "#29d"}, shadowColor: "rgba(0, 0, 0, .3)"});
window.addEventListener("phx:page-loading-start", info => topbar.show());
window.addEventListener("phx:page-loading-stop", info => topbar.hide());
`;
        };
    }
}

@singleton()
export class Injection { View = View }