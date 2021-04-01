import * as ViewClass from "./view";

export class View extends ViewClass.View {
    constructor() {
        super();
        this.toString = () => {
            return `
import Alpine from 'alpinejs';
import { Socket } from "phoenix";
import { LiveSocket } from "phoenix_live_view";
`;
        }
        return this;
    }
}