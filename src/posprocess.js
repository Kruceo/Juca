import { AsyncFunction } from "./lib.js"
import { forsCmds, watchers } from "./manager.js"

export default async function initPosProcess() {
    console.time('ff')
    document.body.querySelectorAll('*').forEach((each) => {

        let cmd = '' + each.outerHTML
        if (cmd.indexOf('{{') > 0) {
           

            while (cmd.indexOf("{{") >= 0) {
                let line = (cmd.slice(cmd.indexOf("{{") + 2, cmd.indexOf("}}")))
                cmd = cmd.replaceAll('{{' + line + '}}', '${' + line + '}')
            }
            cmd = 'return \` ' + cmd + '\`'
            forsCmds.push({key:each.getAttribute('key'),cmd})
            watchers.push({ key: each.getAttribute('key'), watch:  each.getAttribute('watch') })  //add to watch list
            new AsyncFunction(cmd)().then(result => each.outerHTML = result)
        }
        // each.outerHTML = each.innerHTML
    })
    console.timeEnd('ff')
}
