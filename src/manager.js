import { AsyncFunction } from "./lib.js"

const verificationInterval = 33; //66 ≈ 15 tps // 33 ≈ 30 tps // 16 ≈ 60 tps

export let forsCmds = []

export let watchers = []

export function regen(element, cmd) {
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
            console.warn('key' + key)
            new AsyncFunction(cmd ?? each.cmd)().then(result => document.body.querySelector('key' + key).insertAdjacentHTML('beforebegin', result))
        }
    })
}


export function initWatcher(){
    setInterval(() => {
        watchers.forEach(same => {

            if (!same.watch) return
            const type = (same.type == 'watch' ? 'same.old !=' : '')
            const line = 'return { result:(' + type + ' ' + same.watch + '), value: ' + same.watch + '}'

            let comparator = (new AsyncFunction('same', line))
            comparator(same).then(result => {
                if (result.result) {
                    same.old = result.value
                    console.log(result)
                    regen(same.key)
                }
                else if (same.type == 'if') {
                    regen(same.key, 'return ""')
                }
            })
        });
    }, verificationInterval);
}
