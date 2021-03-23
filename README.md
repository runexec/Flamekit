# Flamekit Phoenix Development Extension

Developed and tested on Linux.

### Install

Using VSCode Marketplace or Github

---

### Fragments

Fragments are text patterns that trigger file or project altering events after a document has been saved.

##### Fragment List: `=l{[]}`
##### Live Fragment List: `=ll{[]}`

Provided a list of names, convert into `EEX` `render` or `LEEX` `live_component` strings, and create files 
to match the tag. The files produced will match the names provided, and result in new files being placed 
in `assets/css/` and the parent document directory with their relative associated paths.

Pattern: 
```html
<tag x="x" y="y" z="z">=l{[hello, world, one, two]}</tag>
```

 * Creates Files
 * Creates Code


Example Document: 

`example_web/hello/hello_world.html.eex`

Example Document content: 

```html
Without tags

=f{[hello, world]}

With tags

<a abc="123">=l{[hello, world]}</a>

Live

<div class="number">=ll{[one_component]}</div>
```

Example Document content after save: 

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

----------

// !=f{[a, b, c, d]} // create tags but not files
// =f{[a, b, c, d]}[exe] // custom file extension
// open fragment in pane
// Each fragment file is opened in a pane after creation; bottom or side depending on user config.
// auto convert style tag into css file
// warn when corresponding css is missing eex || leex