import { singleton } from "tsyringe";
import * as ViewClass from "./viewClass";

export class View extends ViewClass.View {
    constructor() {
        super();
        this.toString = () => {
            return `
const csrf_token = document.querySelector("meta[name='csrf-token']").getAttribute("content"),
    live_socket = new LiveSocket("/live", Socket, {
        params: { _csrf_token: csrf_token },
        dom: {
            onBeforeElUpdated(from, to) {
                if (from.__x) {
                    Alpine.clone(from.__x, to);
                }
            },
        },
    });

// expose live_socket on window for web console debug logs and latency simulation:
// >> live_socket.enableDebug()
// >> live_socket.enableLatencySim(1000)  // enabled for duration of browser session
// >> live_socket.disableLatencySim()
live_socket.connect() && ((window as any).live_socket = live_socket);
`
        };
        return this;
    }
}

@singleton()
export class Injection { View = View };