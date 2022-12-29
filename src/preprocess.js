import forFlow from "./render/flow/for.js"
import foreachFlow from "./render/flow/foreach.js"
import { AsyncFunction, hasThisAttr } from "./lib.js"
import { forsCmds, watchers } from "./manager.js"


export default async function preProcess() {
    console.time('time to gen list')
    let elementPosIndex = 0
    let bodyElements = [...document.body.querySelectorAll('*')].filter(each => {
        elementPosIndex++
        each.setAttribute('key', elementPosIndex)
        let keyPosSaver = document.createElement('key' + elementPosIndex)
        each.insertAdjacentElement('beforebegin', keyPosSaver)
        keyPosSaver.style.position = 'fixed'
        return hasThisAttr(each, 'for', 'foreach')
    })

    bodyElements = bodyElements.filter((ele) => {
        let is = false
        bodyElements.forEach(each => {
            const children = [...each.querySelectorAll('[for],[foreach]')]

            children.forEach(child => {

                if (ele == child) {
                    is = true
                }
            })
        })
        return is == false

    })

    bodyElements.forEach((each) => {


        let chain = [each, ...each.querySelectorAll('[for],[foreach]')]
       
        //-----------------------------------------------------[CHILD]---------------------------------------------------------
        let cmd = '//$VARI0$\n//$NEXT0$\n'

        chain.forEach((child, index) => {

            if (child.getAttribute('for')) {
                cmd = forFlow(child, index, cmd)

                return
            }
            if (child.getAttribute('foreach')) {
                cmd = foreachFlow(child, index, cmd)
                return
            }
            else {
                cmd = null
            }

        })

        if (cmd) {

            new AsyncFunction(cmd)().then(value => {
                chain[0].outerHTML = value
            })
            // console.log(value)
            const key = chain[0].getAttribute('key')
            if (chain[0].getAttribute('watch')) watchers.push({ key: key, watch: chain[0].getAttribute('watch') ?? undefined, type: "watch" })
            
            forsCmds.push({ key: key, cmd })
        }
    })
    console.timeEnd('time to gen list')

}


