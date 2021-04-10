# Flamekit
##### *Build websites faster with Flamekit Phoenix Framework Development extension for VSCode.*
---- 


Flamekit is a VSCode extension that provides PETAL stack with Phoenix aware code and file generation. 

Developed from scratch and tested on Linux. 

----

* [Install](https://github.com/runexec/Flamekit#install)
* [Tutorial](https://github.com/runexec/Flamekit#tutorial)
* [Commands](https://github.com/runexec/Flamekit#commands)
  * [Phoenix Setup Petal](https://github.com/runexec/Flamekit#command-phoenix-setup-petal)
  * [Phoenix Create CSS](https://github.com/runexec/Flamekit#command-phoenix-create-css)
* [Fragments](https://github.com/runexec/Flamekit#fragments)
  * [AlpineJS](https://github.com/runexec/Flamekit#alpinejs)
  * [TailwindCSS](https://github.com/runexec/Flamekit#tailwindcss)
  

### Install

Using VSCode Marketplace or Github

### Tutorial

##### Create a Phoenix project:

`$ mix phx.new example --live --no-ecto --no-dashboard`

##### Open in VSCode / VSCodium:

`$ code ./example/`

##### Create a new file:

*Workspace Filepath:* `lib/example_web/live/helloworld.html.leex`

##### Add a Fragment to new file

*File content:* 
```
<div class="p-2 m-2">=ll{[Hello, World, MyExample]}</div>
```

##### Save

Files are created and the active document contents are changed *after* the document has been saved.

*Files Created:*
```
        new file:   assets/css/example_web/live/hellworld.html.leex.css
        new file:   assets/css/flamekit.index.css
        new file:   lib/example_web/live/hello.ex
        new file:   lib/example_web/live/my_example.ex
        new file:   lib/example_web/live/world.ex
```

*File contents:*
```
<div class="p-2 m-2"><%= live_component Hello %></div>
<div class="p-2 m-2"><%= live_component World %></div>
<div class="p-2 m-2"><%= live_component MyExample %></div>
```

Save the document again to keep the changes.

---

### Commands

#### Command: `Phoenix Setup PETAL`

Automatically installs and configures PETAL stack. Will either update existing files after making
a backup (ie. `/\.(js|ts|css|scss)\.bak$/`), or create new ones.

-----

#### Command: `Phoenix Create CSS`

Automatically creates and imports CSS files for standard and LiveView Phoenix projects. If this
command is called while working on a file ending with `.html.eex` or `.html.leex`, a corresponding
css file will be created in `assets/css/`. All imports are automatically deduplicated and stored
in `assets/css/flamekit.css`.

###### Example Document:
                
```
/tmp/project/lib/mysite_web/live/page_live.html.leex
```

###### Run Command Results:

```
New file: /tmp/project/assets/css/mysite_web/live/page_live.html.leex.css
New/Updated file: /tmp/project/assets/css/flamekit.css
```

### Fragments

<video controls width="800" height="600" autoplay="false">
    <source src="https://github.com/runexec/Flamekit/blob/main/media/fragments.webm?raw=true" type="video/webm">

[Fragments Video](https://github.com/runexec/Flamekit/blob/main/media/fragments.webm?raw=true)

</video>

Fragments are text patterns that trigger file or project altering events after a document has been saved. 
Limitations being that only one Fragment per-line may exist.

Provided names, convert into `EEX` `render` or `LEEX` `live_component` strings, and create files 
to match the tag. The files produced will match the names provided, and result in new files being placed 
in `assets/css/` and the parent document directory with their relative associated paths.

 * Creates Files
 * Creates Code
 
###### Example Document: 

`example_web/hello/hello_world.html.eex`

###### Example Document content: 

```html
Without tags

=f{[hello, world]}

With tags

<a abc="123">=l{[hello, world]}</a>

Live

<div class="number">=ll{[one_component]}</div>
```

###### Example Document content after save: 

```html
Without tags

<!-- Phoenix Create CSS Command: created assets/css/example_web/hello/_hello.html.eex.css -->
<!-- created example_web/hello/_hello.html.eex -->
<%= render "_hello.html" %>
<!-- Phoenix Create CSS Command: created assets/css/example_web/hello/_world.html.eex.css -->
<!-- created example_web/hello/_world.html.eex -->
<%= render "_world.html" %>

With tags

<!-- Phoenix Create CSS Command: created assets/css/example_web/hello/_hello.html.eex.css -->
<!-- created example_web/hello/_hello.html.eex -->
<a abc="123"><%= render "_hello.html" %></a>
<!-- Phoenix Create CSS Command: created assets/css/example_web/hello/_world.html.eex.css -->
<!-- created example_web/hello/_world.html.eex -->
<a abc="123"><%= render "_world.html" %></a>

Live

<!-- Phoenix Craete CSS Command: created assets/css/example_web/live/one_component.ex.css -->
<!-- created example_web/live/one_component.ex -->
<div class="number"><%= live_component @socket, OneComponent %></div>
```

###### Usage Patterns:
```html
# Fragment

=f{hello}
=f{[red, yello, blue]}

# Fragment Live 

=lf{world}
=lf{[bird, dog, duck, cat]}

# Fragment List

<tag x="x" y="y" z="z">=l{[hello, world, one, two]}</tag>

# Fragment List Don't Do : Will expand `div` instead of `span`

<div><span class="dont-do-this">=l{[will, be, div]}</span></div>

# Fragment List Okay:

<div>
    <span class="do-this">=l{[will, be, span]}</span>
</div>

# Fragment Live List

<tag liveExample="true">=ll{[a, b]}</tag>

```

##### Fragment: `=f{}`
##### Fragment Array: `=f{[]}`
##### Fragment List: `=l{[]}`
##### Fragment Live: `=lf{}`
##### Fragment Live Array: `=lf{[]}`
##### Fragment Live List: `=ll{[]}`

------

### AlpineJS

AlpineJS triggers are appl* [Command: Phoenix Setup Petal](https://github.com/runexec/Flamekit#command-phoenix-setup-petal)
* [Command: Phoenix Create CSS](https://github.com/runexec/Flamekit#command-phoenix-create-css)ied within `JS` and `TS` documents.

##### Install: `=setupAlpine`

<video controls width="800" height="600" autoplay="false">
    <source src="https://github.com/runexec/Flamekit/blob/main/media/setupAlpine.webm?raw=true" type="video/webm">

[setupAlpine Video](https://github.com/runexec/Flamekit/blob/main/media/setupAlpine.webm?raw=true)

</video>

An `import` for AlpineJS is added to the document, along with `LiveView` compatability code.
A terminal is then opened, and the `alpinejs` `npm` package is installed.

*NOTE: Places `imports` at top of active document, and deletes the input of `=setupAlpine`. Place at bottom.*

 * Creates Files
 * Creates Code
  
###### Example Document: 

```app.js```

###### Example Document content:

```js
// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import "../css/app.scss";

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import deps with the dep name or local files with a relative path, for example:
//
//     import {Socket} from "phoenix"
//     import socket from "./socket"
//
import "phoenix_html";
import topbar from "topbar";

// Show progress bar on live navigation and form submits
topbar.config({barColors: {0: "#29d"}, shadowColor: "rgba(0, 0, 0, .3)"});
window.addEventListener("phx:page-loading-start", info => topbar.show());
window.addEventListener("phx:page-loading-stop", info => topbar.hide());

=setupAlpine

```

###### Example Document content after save:

```js
import Alpine from 'alpinejs';
import { Socket } from "phoenix";
import { LiveSocket } from "phoenix_live_view";
// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import "../css/app.scss";

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import deps with the dep name or local files with a relative path, for example:
//
//     import {Socket} from "phoenix"
//     import socket from "./socket"
//
import "phoenix_html";
import topbar from "topbar";

// Show progress bar on live navigation and form submits
topbar.config({barColors: {0: "#29d"}, shadowColor: "rgba(0, 0, 0, .3)"});
window.addEventListener("phx:page-loading-start", info => topbar.show());
window.addEventListener("phx:page-loading-stop", info => topbar.hide());

const csrf_token = document.querySelector("meta[name='csrf-token']").getAttribute("content"),
    live_socket = new live_socket("/live", Socket, {
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
live_socket.connect() && (window.live_socket = live_socket);
```

----------

### TailwindCSS

TailwindCSS triggers are applied within `CSS` and `SCSS` documents.

##### Install: `=setupTW`

<video controls width="800" height="600">
    <source src="https://github.com/runexec/Flamekit/blob/main/media/setupTW.webm?raw=true" type="video/webm">

[setupTW Video](https://github.com/runexec/Flamekit/blob/main/media/setupTW.webm?raw=true)

</video>


An `import` for TailwindCSS is added to the document, and a terminal is then opened. The terminal will 
execute commands to create (~ WARNING: overwrites ~) configurations for `postcss.config.js`, and 
`tailwind.config.js`. The Webpack configuration is updated, not  overwritten, at `webpack.config.js`. The
 terminal will then execute `npm install` for all required packages.

*NOTE: Places `imports` at top of active document, and deletes the input of `=setupTW`*

 * Creates Files
 * Creates Code
  
###### Example Document: 

```app.css```

###### Example Document content:

```css
=setupTW
```

###### Example Document content after save:

```css
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

```

------

### TypeScript

TypeScript triggers are applied within `JS` and `TS` documents.

##### Install: `=setupTS`

Adds TypeScript to `assets/webpack.config.js`, installs via `npm`, changes Webpack to `app.ts`,
and finally adds `ts-loader` for `.ts` files.

 * Creates Code
  
-----
// ? TODO: check for mix project file and add to activation check
// ? !=f{[a, b, c, d]} // create tags but not files
// ? =f{[a, b, c, d]}[exe] // custom file extension
// ? =of{[]} open fragment in pane for single fragment 
// ? Each fragment file is opened in a pane after creation; bottom or side depending on user config.
// ? auto convert style tag into css file
// ? warn when corresponding css is missing eex || leex
// ???? key across ????
?? before: =x{[one, two, three, four]} 
?? after: {one: one, two: two, three: three, four: four}