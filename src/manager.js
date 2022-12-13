import { AsyncFunction } from "./lib"

export let forsCmds = []

export function regen(element) {
    let key = null
    if (typeof (element) == 'object') key = element.getAttribute('key')
    else {
        key = element
    }
    forsCmds.forEach(each => {
        if (each.elementPosIndex == key) {
            let selector = document.body.querySelectorAll('[key="' + key + '"]')
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
