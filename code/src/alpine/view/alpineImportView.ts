import { singleton } from "tsyringe";
import * as ViewClass from "./viewClass";

export class View extends ViewClass.View {
    constructor() {
        super();
        this.toString = () => {
            return `
import Alpine from 'alpinejs';
import Socket from "phoenix";
import LiveSocket from "phoenix_live_view";
`;
        }
        return this;
    }
}

@singleton()
export class Injection { View = View };