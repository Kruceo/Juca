import { AsyncFunction } from "./lib.js"
import { forsCmds, watchers } from "./manager.js"

let elementPosIndex = 0
export default async function initJuca() {

    document.body.querySelectorAll('*').forEach((each) => {
        elementPosIndex++
        console.log(each.parentElement)
        each.setAttribute('key', elementPosIndex)
        let keyPosSaver = document.createElement('key' + elementPosIndex)
        each.insertAdjacentElement('beforebegin', keyPosSaver)
        keyPosSaver.style.position = 'fixed'
        if(!each.getAttribute('for'))return

       

        let chain = [each, ...each.querySelectorAll('*')]

        //-----------------------------------------------------[CHILD]---------------------------------------------------------
        let cmd = '//$VARI$\n//$NEXT$\n'
        chain.forEach((child,index) => {
            
            if (child.getAttribute('for')) {

                let base = ''
                //parse for attr
                let forLines = child.getAttribute('for')
                forLines = forLines.replaceAll('{{', '')
                forLines = forLines.replaceAll('}}', '')
                child.setAttribute('for', forLines)
                //end of parse for



                let letter = child.getAttribute('for').split(';')[2]
                let max = child.getAttribute('for').split(';')[1]
                let init = child.getAttribute('for').split(';')[0]

                child.removeAttribute('for')
                base = getBase(child)
                while (base.indexOf('{{') >= 0) {
                    base = base.replace(base.slice(base.indexOf('{{'), base.indexOf('}}') + 2),
                        "${" + base.slice(base.indexOf('{{') + 2, base.indexOf('}}')) + "}")
                }
                cmd = cmd.replace("//$NEXTCONTENT$", "\$\{results" + letter + "\}\n")
                base = "results" + letter + " += \`" + base + '\n`'

                cmd = cmd.replace('//$RESULTVAR$', '//test\n')

                let sub_waterMark = child.parentElement 
                let sub_mark_index = 0
                while(sub_waterMark.tagName != 'BODY')
                {
                    sub_waterMark = sub_waterMark.parentElement
                    sub_mark_index ++
                }
                sub_waterMark = sub_mark_index
                if (cmd.includes(`//$SUB-${sub_waterMark}$`)) {

                    cmd = cmd.replace(`//$SUB-${sub_waterMark}$`,
                        'let ' + letter + ' = 0;\n' +
                        '\nlet results' + letter + ' = [];\n' +
                        `for(${letter};${letter} < ${max};${letter}++){\n//$VARI$\n   ` +
                        '\n\n//$NEXT$\n' + base + '\n}\n' + `//$SUB-${sub_waterMark}$`)
                }
                else {
                    cmd = cmd.replace('//$VARI$', 'let ' + letter + ' = ' + init + ';\n' +
                        '\nlet results' + letter + ' = [];\n')
                    cmd = cmd.replace("//$NEXT$",
                        `for(${letter};${letter} < ${max};${letter}++){\n//$VARI$\n   ` +
                        '\n\n//$NEXT$\n' + base + '\n}\n' + `//$SUB-${sub_waterMark}$`)
                }
                if (index == 0) {
                    cmd += "return results" + letter
                    cmd = '//$RESULTVAR$\n\n' + cmd
                }
            }


            
        })

        if (cmd) {
            //new syncFunction
            //console.log(cmd)
            new AsyncFunction(cmd)().then(value => {

                console.log(cmd)
                chain[0].outerHTML = value

            })
            // console.log(value)

            if(chain[0].getAttribute('watch'))watchers.push({ key: elementPosIndex, watch: chain[0].getAttribute('watch') ?? undefined })
            
            forsCmds.push({ key: elementPosIndex, cmd })


        }


       
    })
    console.timeEnd('s')
}

function getBase(element) {
    let cloneForBase = element.cloneNode(true)
    let i = 0

    cloneForBase.querySelectorAll('*').forEach(cloneEach => {


        if (cloneEach.getAttribute('for')) {
            cloneEach.outerHTML = '//$NEXTCONTENT$'
            i++
            return
            //cloneEach.remove()
        }

    })

    let base = cloneForBase.outerHTML


    return base
}

