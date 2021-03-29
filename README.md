# Flamekit
##### *Build websites faster with Flamekit Phoenix Framework Development extension for VSCode.*
---- 



### Install
Developed and tested on Linux.
Using VSCode Marketplace or Github

---

### Fragments

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

<!-- created assets/css/example_web/hello/_hello.html.eex.css -->
<!-- created example_web/hello/_hello.html.eex -->
<%= render "_hello.html" %>
<!-- created assets/css/example_web/hello/_world.html.eex.css -->
<!-- created example_web/hello/_world.html.eex -->
<%= render "_world.html" %>

With tags

<!-- created assets/css/example_web/hello/_hello.html.eex.css -->
<!-- created example_web/hello/_hello.html.eex -->
<a abc="123"><%= render "_hello.html" %></a>
<!-- created assets/css/example_web/hello/_world.html.eex.css -->
<!-- created example_web/hello/_world.html.eex -->
<a abc="123"><%= render "_world.html" %></a>

Live

<!-- created assets/css/example_web/live/one_component.ex.css -->
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

---

### AlpineJS

AlpineJS triggers are applied within `JS` and `TS` documents. An `import` for AlpineJS is added to the document,
 along with `LiveView` compatability code. A terminal is then opened, and the `alpinejs` `npm` package is installed.

##### Install: `=setupAlpine`

###### Example Document: 

```app.js```

###### Example Document content:

```js
=setup.alpine
// connect if there are any LiveViews on the page
liveSocket.connect()
```

###### Example Document content after save:

```js
import Alpine from 'alpinejs';
...
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
// connect if there are any LiveViews on the page
liveSocket.connect()
```

----------

### TailwindCSS

TailwindCSS triggers are applied within `CSS` and `SCSS` documents.

##### Install: `=setupTW`

An `import` for TailwindCSS is added to the document, and a terminal is then opened. The terminal will 
execute commands to create (~ WARNING: overwrites ~) configurations for `postcss.config.js`, and 
`tailwind.config.js`. The Webpack configuration is updated, not  overwritten, at `webpack.config.js`. The
 terminal will then execute `npm install` for all required packages.

*NOTE: Places `imports` at top of active document, and deletes the input of `=setupTW`*

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


// maybe absinthe support
// inject module name on new file (based on path, defmodule My.Path)
// install PETAL
// !=f{[a, b, c, d]} // create tags but not files
// =f{[a, b, c, d]}[exe] // custom file extension
// open fragment in pane
// Each fragment file is opened in a pane after creation; bottom or side depending on user config.
// auto convert style tag into css file
// warn when corresponding css is missing eex || leex