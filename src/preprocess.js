import forFlow from "./render/flow/for.js"
import foreachFlow from "./render/flow/foreach.js"
import { AsyncFunction, hasThisAttr } from "./lib.js"
import { forsCmds, watchers } from "./manager.js"


export default async function preProcess() {
    console.time('time to gen list')
    let elementPosIndex = 0
    let bodyElements = [...document.body.querySelectorAll('*')].filter(each=>{return hasThisAttr(each,'for','foreach')})
   
    bodyElements = bodyElements.filter((ele)=>
    {
        let is = false
        bodyElements.forEach(each=>
        {
            const children = [...each.children]

            children.forEach(child=>
                {
                   if(ele == child){is = true}
                })
        })
        return !is
        
    })
    console.log(bodyElements)

    bodyElements.forEach((each) => {
        elementPosIndex++
        each.setAttribute('key', elementPosIndex)
        let keyPosSaver = document.createElement('key' + elementPosIndex)
        each.insertAdjacentElement('beforebegin', keyPosSaver)
        keyPosSaver.style.position = 'fixed'

        let chain = [each, ...each.querySelectorAll('*')].filter(ele => {
            return hasThisAttr(ele, 'for', 'foreach')
        })
        console.log(chain)
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

            if (chain[0].getAttribute('watch')) watchers.push({ key: elementPosIndex, watch: chain[0].getAttribute('watch') ?? undefined })

            forsCmds.push({ key: elementPosIndex, cmd })
        }
    })
    console.timeEnd('time to gen list')

}


