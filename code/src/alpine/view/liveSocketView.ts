import * as ViewClass from "./view";

export class View extends ViewClass.View {
    constructor() {
        super();
        this.toString = () => {
            return `
let liveSocket = new LiveSocket("/live", Socket, {
    params: { _csrf_token: csrfToken },
    dom: {
        onBeforeElUpdated(from, to) {
            if (from.__x) {
                Alpine.clone(from.__x, to);
            }
        },
    },
});
`
        };
        return this;
    }
}

