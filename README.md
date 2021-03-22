# lfamekit

Phoenix Framework Utilities for VS Code / Codium

Developed and tested on Linux.

### Install

Github

VSCode Marketplace

### Commands

Each fragment file is opened in a pane after creation; bottom or side depending on user config.

<table>
    <thead>
        <th>Command</th>
        <th>Description</th>
        <th>Notes</th>
    </thead>
    <tbody>
        <tr>
            <td>Phoenix CSS Create</td>
            <td>
                Automatically creates and imports CSS files for 
                standard and LiveView Phoenix projects. If this
                command is called while working on a file ending
                with `.html.eex` or `.html.leex`, a corresponding
                CSS file will be created in `assets/css/`. All
                imports are automatically deduplicated and stored
                in `assets/css/lfamekit.css`
                <br>
                <p>
                    <b>Example:</b>
                    <br>
                    1. Active Document: /tmp/project/lib/mysite_web/live/page_live.html.leex
                    <br />
                    2. <i>run command</i>
                    <br />
                    <b>Output:</b>
                    <br />
                    New file: /tmp/project/assets/css/mysite_web/live/page_live.html.leex.css
                    <br />
                    New/Updated file: /tmp/project/assets/css/lfamekit.css
                </p>
            </td>
            <td>
                <b>Note:</b> 
                <i>Video demo file is `demo.webm`.</i>
            </td>
        </tr>
        <tr>
            <td>Phoenix Fragment Create</td>
            <td>
                <b>Save Trigger:</b> `=f{fragment_name}`
                <br />
                On event, triggered after document save, a view fragment file is created,
                and the triggering input is replaced with `&lt;%= render _input.html.eex %&gt;`.
                <br />
                <br />
                <b>Example:</b>
                <br />
                1. Active Document: `/lib/example_web/example/example.html.eex`
                <br />
                2. Text editor input: `=f{chart}`
                <br />
                3. <i>save document</i>
                <br />
                <br />
                <b>Output:</b>
                <br />
                If Missing, New file: `/lib/example_web/example/_chart.html.eex`
                <br />
                <br />
                Before: `=f{chart}`
                <br />
                After: `<%= render "_chart.html" %>`
                <br />
                <br />
                <b>Example:</b>
                <br />
                1. Active Document: `/lib/example_web/live/example/example_live.html.leex`
                <br />
                2. Text editor input: `=lf{chart}`
                <br />
                3. <i>save document</i>
                <br />
                <br />
                <b>Output:</b>
                <br />
                If Missing, New file: `/lib/example_web/live/example/_chart_live.html.leex`
                <br />
                <br />
                Before: `=f{chart}`
                <br />
                After: `<%= render "_chart.html" %>`
                <br />
                <br />
                <b>Example:</b>
                <br />
                1. Active Document: `/lib/example_web/example/live/example_live.html.leex`
                <br />
                2. Text editor input: `=lf{[red, blue, green]}`
                <br />
                3. <i>save document</i>
                <br />
                <br />
                <b>Output:</b>
                <br />
                If Missing, New file: `/lib/example_web/live/example/_red_live.html.leex`
                <br />
                If Missing, New file: `/lib/example_web/live/example/_blue_live.html.leex`
                <br />
                If Missing, New file: `/lib/example_web/live/example/_green_live.html.leex`
                <br />
                <br />
                Before: `=lf{[red, blue, green]}`
                <br />
                After: `<%= live_render "_red_live.html" %>`<br />
                After: `<%= live_render "_blue_live.html" %>`<br />
                After: `<%= live_render "_green_live.html" %>`
                <br />
                <br />
                <b>Example:</b>
                <br />
                1. Active Document: `/lib/example_web/example/example.html.eex`
                <br />
                2. Text editor input: `&lt;tag attr='xyz'&gt;=f{[red, blue, green]}&lt;/tag&gt;`
                <br />
                <br />
                <b>Output:</b>
                <br />
                If Missing, New file: `/lib/example_web/example/_red.html.eex`
                <br />
                If Missing, New file: `/lib/example_web/example/_blue.html.eex`
                <br />
                If Missing, New file: `/lib/example_web/example/_green.html.eex`
                <br />
                <br />
                Before: `&lt;tag attr='xyz'&gt;=f{[red, blue, green]}&lt;/tag&gt;`
                <br />
                After: `&lt;tag attr='xyz' &gt;&lt;%= live_render "_red.html" %&gt;&lt;/tag&gt;`<br />
                After: `&lt;tag attr='xyz'&gt;&lt;%= live_render "_blue.html" %&gt;&lt;/tag&gt;`<br />
                After: `&lt;tag attr='xyz'&gt;&lt;%= live_render "_green.html" %&gt;&lt;/tag&gt;`
                <br />
                <br />
                <b>Example:</b>
                <br />
                1. Active Document: `/lib/example_web/live/example/example_live.html.leex`
                <br />
                2. Text editor input: `&lt;tag attr='xyz'&gt;=lf{[red, blue, green]}&lt;/tag&gt;`
                <br />
                <br />
                <b>Output:</b>
                <br />
                If Missing, New file: `/lib/example_web/live/example/_red_live.html.leex`
                <br />
                If Missing, New file: `/lib/example_web/live/example/_blue_live.html.leex`
                <br />
                If Missing, New file: `/lib/example_web/live/example/_green_live.html.leex`
                <br />
                <br />
                Before: `&lt;tag attr='xyz'&gt;=lf{[red, blue, green]}&lt;/tag&gt;`
                <br />
                After: `&lt;tag attr='xyz' &gt;&lt;%= live_render "_red_live.html" %&gt;&lt;/tag&gt;`<br />
                After: `&lt;tag attr='xyz'&gt;&lt;%= live_render "_blue_live.html" %&gt;&lt;/tag&gt;`<br />
                After: `&lt;tag attr='xyz'&gt;&lt;%= live_render "_green_live.html" %&gt;&lt;/tag&gt;`
                <br />
                <br />
            </td>
            <td>                
                <b>Note:</b>
                <br />
                <i>Video demo file is `demo2.webm`.</i>
                <br />
                <b>Note:</b>
                <br /> 
                <i>Video demo file is `demo3.webm`.</i>
                <br />
                <b>Note:</b>
                <br /> 
                <i>Video demo file is `demo4.webm`.</i>
                <b>Note:</b>
                <br />
                Not to be confused with `Phoenix Create Component`
            </td>
        </tr>
        <tr>
            <td>Phoenix Component Create</td>
            <td>
                <b>Save Trigger:</b> `live_component{component_name}`
                <br />
                On event, triggered after document save, a view component file is created,
                and the triggering input is replaced with `<%= live_component @socket, InputNS.Input %>`.
                <br />
                <b>Example:</b>
                <br />
                1. Text editor input: `... live_component{hello} ...`
                <br />
                <b>Output:</b>
                <br />
                If Missing, New file: `/lib/example_web/example/live/hello_component_live.html.leex`
                <br />
                If Missing, New file: `/lib/example_web/example/live/hello_component_live.ex`
                <br />
                Input replaced: `<%= live_component @socket, HelloComponentLive %>`
            </td>
            <td>                
            </td>
        </tr>
    </tbody>
</table>
