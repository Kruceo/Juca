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
            selector.forEach((el) => {
                el.remove()
            })
            new AsyncFunction(each.cmd)().then(result => document.body.querySelector('key'+key).insertAdjacentHTML('beforebegin',result))
        }
    })

}

setInterval(() => {
    watchers.forEach(each => {
       
        if (!each.watch) return
        
        new AsyncFunction('return ' + each.watch)().then(result => {
            
            if (result != each.old) {
                console.log(each)
                each.old = result
                regen(each.key)
            }
        })
    });
}, 60);
