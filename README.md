# Flamekit Phoenix Development Extension

Developed and tested on Linux.

### Install

Using VSCode Marketplace or Github

### Fragments

Each fragment file is opened in a pane after creation; bottom or side depending on user config.

=!f{[a, b, c, d]} // create tags but not files
=f{[a, b, c, d]}[exe] // custom file extension

// auto convert style tag into css file
// warn when corresponding css is missing eex || leex
---

#### Fragment: `l{[]}`
#### Live Fragment: `ll{[]}`

Provided a list of names, and converted into `EEX` `render` or `LEEX` `live_component` strings,
 files are created to match the tag.

 * Creates Files
 * Creates Code

Example Document content: 

```html
<a abc="123">=l{[a, b]}</a>
```

Example Document content after save: 

```html
<a abc="123"><%= render "_a.html" %></a>
<a abc="123"><%= render "_b.html" %></a>
```

Example Documet content:

```html
<a abc="123">=ll{[a, b]}</a>
```

Example Document content after save: 

```html
<a abc="123"><%= live_component a %></a>
<a abc="123"><%= live_component b %></a>
```

