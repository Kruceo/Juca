import { AsyncFunction } from "./lib.js"

export let forsCmds = []

export let watchers = []

export function regen(element) {
    let key = null
    if (typeof (element) == 'object') key = element.getAttribute('key')
    else {
        key = element
    }
    forsCmds.forEach(each => {
        if (each.key == key) {
            let selector = document.body.querySelectorAll('[key="' + key + '"]')
            console.log(selector)
            selector.forEach((el, index) => {
                if (index == selector.length - 1) {
                    new AsyncFunction(each.cmd)().then(result => el.outerHTML = result)
                }
                else {
                    el.remove()
                }
            })
        }
    })

}

setInterval(() => {
    watchers.forEach(each => {

        if (!each.watch) return
        
        new AsyncFunction('return ' + each.watch)().then(result => {
            if (result != each.old) {
                each.old = result
                regen(each.key)
            }
        })
    });
}, 33.3);
