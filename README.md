# Flamekit

Phoenix Framework Utilities for VS Code / Codium

Developed and tested on Linux.

### Commands

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
            <td>
                <b>Note:</b> 
                <i>Video demo file is `demo.webm`.</i>
            </td>
        </tr>
        <tr>
            <td>Phoenix Fragment Create</td>
            <td>
                <b>Input trigger:</b> `fragment{fragment_name}`
                <br />
                On event, triggered by document input, a view fragment file is created,
                and the triggering input is replaced with `<%= render _input.html.eex %>`.
                <br />
                <b>Example:</b>
                <br />
                1. Active Document: `/lib/example_web/example/example.html.eex`
                <br />
                2. Text editor input: `fragment{chart}`
                <br />
                <b>Output:</b>
                <br />
                If Missing, New file: `/lib/example_web/example/_chart.html.eex`
                <br />
                If Missing, New file: `/lib/example_web/example/chart.ex`
                <br />
                Input replaced: `<%= render "_chart.html" %>`
            </td>
            <td>                
                <b>Note:</b> 
                <i>Video demo file is `demo2.webm`.</i>
            </td>
        </tr>
        <td>Phoenix Live Fragment Create</td>
            <td>
                <b>Input trigger:</b> `live_fragment{live_fragment_name}`
                <br />
                On event, triggered by document input, a view fragment file is created,
                and the triggering input is replaced with `<%= live_render @conn, InputNS.Input, session: %{} %>`.
                <br />
                <b>Example:</b>
                <br />
                1. Active Document: `/lib/example_web/live/example/example_live.html.leex`
                <br />
                2. Text editor input: `... live_fragment{chart} ...`
                <br />
                <b>Output:</b>
                <br />
                If Missing, New file: `/lib/example_web/live/example/_chart_live.html.leex`
                <br />
                If Missing, New file: `/lib/example_web/live/example/chart_live.ex`
                <br />
                Input replaced: `<%= live_render @conn, ChartLive, session: %{} %>`
            </td>
            <td>                
                <b>Note:</b> <i>All trigger scans are performed `onkeyup` to RegEx focus line.</i>
                <br />
                <b>Note:</b> <i>Input is detected anywhere within the document.</i>
            </td>
        </tr>
        <tr>
            <td>Phoenix Live Component Create</td>
            <td>
                <b>Input trigger:</b> `live_component{component_name}`
                <br />
                On event, triggered by document input, a view component file is created,
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
                <b>Note:</b> <i>All trigger scans are performed `onkeyup` to RegEx focus line.</i>
                <br />
                <b>Note:</b> <i>Input is detected anywhere within the document.</i>
            </td>
        </tr>
    </tbody>
</table>
