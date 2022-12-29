import { AsyncFunction } from "./lib.js"

const verificationInterval = 33; //66 ≈ 15 tps // 33 ≈ 30 tps // 16 ≈ 60 tps

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
                
                each.old = result
                regen(each.key)
            }
        })
    });
}, verificationInterval);
