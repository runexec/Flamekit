# Flamekit

Phoenix Framework Utilities for VS Code / Codium

Video demo file is `demo.webm`.

Developed and tested on Linux.

### Commands

<table>
    <thead>
        <th>Command</th>
        <th>Description</th>
    </thead>
    <tbody>
        <tr>
            <td>Phoenix CSS Create</td>
            <td>
                Automatically creates and imports CSS files for 
                standard and LiveView Phoenix projects. If this
                command is called while working on a file ending
                with `.html.eex` or `.html.leex`, a corresponding
                css file will be created in `assets/css/`. All
                imports are automatically deduplicated and stored
                in `assets/css/flamekit.css`
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
                    New/Updated file: /tmp/project/assets/css/flamekit.css
                </p>
            </td>
        </tr>
        <tr>
            <td>Phoenix Fragment Create</td>
            <td>
                <b>Input trigger:</b> `{fragment_name}::eex`<br />
                On event, triggered by document input, a view fragment file is created,
                and the triggering input is replaced with `<%= render _input.html.eex %>`.
                <br />
                <b>Example:</b>
                <br />
                1. Text editor input: `... chart::eex ...`
                <br />
                <b>Output:</b>
                <br />
                New file: "/lib/example_web/hello/_chart.html.eex"
                <br />
                Input replaced: `<%= render _chart.html.eex %>`
            </td>
        </tr>
        <tr>
            <td>Phoenix Live Fragment Create</td>
            <td>
                <b>Input trigger:</b> `{fragment_name}::leex`<br />
                On event, triggered by document input, a view fragment file is created,
                and the triggering input is replaced with `<%= live_component @socket, InputNS.Input %>`.
                <br />
                <b>Example:</b>
                <br />
                1. Text editor input: `... hello::leex ...`
                <br />
                <b>Output:</b>
                <br />
                New file: "/lib/example_web/hello/hello_live.html.leex"
                <br />
                If Missing, New file: "/lib/example_web/hello/hello_live.ex"
                <br />
                Input replaced: `<%= live_component @socket, HelloLive %>`
            </td>
            </td>
        </tr>
    </tbody>
</table>
