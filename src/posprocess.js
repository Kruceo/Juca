import pipe from "./internal/pipe.js"
import { AsyncFunction } from "./lib.js"
import { forsCmds, watchers } from "./manager.js"
import { resolve } from "./render/single/element.js"

export default async function initPosProcess() {
    console.time('ff')
    document.body.querySelectorAll('*').forEach((each) => {
            let cmd = resolve(each)
            if(!each.getAttribute('if')||!each.getAttribute('watch')||!each.getAttribute('pipe'))return
            forsCmds.push({key:each.getAttribute('key'),cmd})
            watchers.push({ key: each.getAttribute('key'), watch:  each.getAttribute('watch'),type:'watch' })  //add to watch list
            watchers.push({ key: each.getAttribute('key'), watch:  each.getAttribute('if'),type:'if' })  //add to watch list
            pipe(each)
        })
        // each.outerHTML = each.innerHTML
    }
    console.timeEnd('ff')

