import { AsyncFunction } from "./lib.js"

export default async function initPosProcess() {
    console.time('ff')
    document.body.querySelectorAll('*').forEach((each) => {

        let cmd = '' + each.outerHTML
        while (cmd.indexOf("{{") >= 0) {
            let line = (cmd.slice(cmd.indexOf("{{") + 2, cmd.indexOf("}}")))
            cmd = cmd.replaceAll('{{' + line + '}}', '${' + line + '}')
        }
        new AsyncFunction('return ` ' + cmd + '`')().then(result => each.outerHTML = result)
        // each.outerHTML = each.innerHTML
    })
}
console.timeEnd('ff')