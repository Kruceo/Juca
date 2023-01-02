import { AsyncFunction } from "../../lib.js"

export function resolve(element) {
    let cmd = '' + element.outerHTML
    if (cmd.indexOf('{{') > 0) {
        while (cmd.indexOf("{{") >= 0) {
            let line = (cmd.slice(cmd.indexOf("{{") + 2, cmd.indexOf("}}")))
            cmd = cmd.replaceAll('{{' + line + '}}', '${' + line + '}')
        }
        cmd = 'return \` ' + cmd + '\`'
        new AsyncFunction(cmd)().then(result => element.outerHTML = result)
        return cmd
    }
}