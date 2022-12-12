
export default async function initJuca() {
    console.time('s')
    document.body.querySelectorAll('*').forEach(each => {

        
        let base = getBase(each)

        //console.log('----------------------[START]------------------------')
        let cmd = null
        if (each.getAttribute('for')) {
            let newHtml = each.getAttribute('for')
            while (newHtml.indexOf("{{") >= 0) {
                let line = (newHtml.slice(newHtml.indexOf("{{") + 2, newHtml.indexOf("}}")))
                let turner = new Function('let res = ' + line + ';return res;')
                let result = turner()
                newHtml = newHtml.replaceAll('{{' + line + '}}', result)
            }
            each.setAttribute('for', newHtml)

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

                    let newHtmls = child.getAttribute('for')

                    newHtmls = newHtmls.replaceAll('{{', '')
                    newHtmls = newHtmls.replaceAll('}}', '')
                    child.setAttribute('for', newHtmls)

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

        const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor;
        if (cmd) {
            //new syncFunction

            new AsyncFunction(cmd)().then(value => {

                each.outerHTML = value

            })
            // console.log(value)

        }
    })
    console.timeEnd('s')
}




function getBase(element) {
    let cloneForBase = element.cloneNode(true)
    let i = 0

    cloneForBase.querySelectorAll('*').forEach(cloneEach => {


        if (cloneEach.getAttribute('for') && i == 0) {
            cloneEach.outerHTML = '//$NEXTCONTENT$'
            i++
            return
            //cloneEach.remove()
        }
        if (cloneEach.getAttribute('for') && i > 0) {
            cloneEach.outerHTML = '//$NEXTCONTENT$'
            i++
            return
            //cloneEach.remove()
        }
    })

    let base = cloneForBase.outerHTML


    return base
}

