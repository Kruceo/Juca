import { AsyncFunction } from "./lib.js"
import { forsCmds, watchers } from "./manager.js"

let elementPosIndex = 0
export default async function initJuca() {
    console.time('s')
    document.body.querySelectorAll('*').forEach(each => {

        elementPosIndex ++
        let keyComment = document.createElement('key'+elementPosIndex)
        each.setAttribute('key',elementPosIndex)
        each.parentElement.append(keyComment)
        let base = getBase(each)

        //console.log('----------------------[START]------------------------')
        let cmd = null
        if (each.getAttribute('for')) {

            

            //parse for attribute
            let forLines = each.getAttribute('for')
            forLines = forLines.replaceAll('{{', '')
            forLines = forLines.replaceAll('}}', '')
            each.setAttribute('for', forLines)
            //end of parse for attr

           

            cmd = '//$RESULTVAR$\n//$VARI$\n\n//$NEXT$'
            let letter = each.getAttribute('for').split(';')[2]
            let max = each.getAttribute('for').split(';')[1]
            let init = each.getAttribute('for').split(';')[0]

            

            each.removeAttribute('for')
            base = getBase(each)
            cmd = cmd.replace('//$RESULTVAR$', '//test\n')
            cmd = cmd.replace('//$VARI$', 'let ' + letter + ' = ' + init + ';\n' +
                '\nlet results' + letter + ' = [];\n')
            cmd = cmd.replace("//$NEXT$", `for(${letter};${letter}< ${max} ;${letter}++){\n   \n//$VARI$\n\n`)

            while (base.indexOf('{{') >= 0) {
                base = base.replace(base.slice(base.indexOf('{{'), base.indexOf('}}') + 2),
                    "${" + base.slice(base.indexOf('{{') + 2, base.indexOf('}}')) + "}")
            }
            cmd += "\n//$NEXT$\n\n\n"
            base = "results" + letter + " += \` " + base + '\`'
        
            cmd += base
            cmd += "\n\n};"
            cmd += `\n\n//$SUB-${each.tagName + each.childElementCount}$\n\n`
            cmd += "return results" + letter
            cmd = '//$RESULTVAR$\n\n' + cmd
            //-----------------------------------------------------[CHILD]---------------------------------------------------------
            each.querySelectorAll('*').forEach((child) => {
                if (child.getAttribute('for')) {

                    

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

                    if (cmd.includes(`//$SUB-${child.tagName + child.childElementCount}$`)) {

                        cmd = cmd.replace(`//$SUB-${child.tagName + child.childElementCount}$`,
                            'let ' + letter + ' = 0;\n' +
                            '\nlet results' + letter + ' = [];\n' +
                            `for(${letter};${letter} < ${max};${letter}++){\n//$VARI$\n   ` +
                            '\n\n//$NEXT$\n' + base + '\n}\n' + `//$SUB-${child.tagName + child.childElementCount}$`)
                    }
                    else {
                        cmd = cmd.replace('//$VARI$', 'let ' + letter + ' = ' + init + ';\n' +
                            '\nlet results' + letter + ' = [];\n')
                        cmd = cmd.replace("//$NEXT$",
                            `for(${letter};${letter} < ${max};${letter}++){\n//$VARI$\n   ` +
                            '\n\n//$NEXT$\n' + base + '\n}\n' + `//$SUB-${child.tagName + child.childElementCount}$`)
                    }
                }
            })
        }

        
        if (cmd) {
            //new syncFunction
            //console.log(cmd)
            new AsyncFunction(cmd)().then(value => {

                each.outerHTML = value
                
            })
            // console.log(value)
            
            watchers.push({key:elementPosIndex,watch:each.getAttribute('watch')??undefined})
            forsCmds.push({key:elementPosIndex,cmd})
            

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

