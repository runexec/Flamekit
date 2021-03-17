# Flamekit

Phoenix Framework Utilities for VS Code / Codium

Developed and tested on Linux.

Video demo file is `demo.webm`.

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
    </tbody>
</table>
