import { AsyncFunction } from "./lib.js"
import { forsCmds, watchers } from "./manager.js"

let elementPosIndex = 0
export default async function preProcess() {

    document.body.querySelectorAll('*').forEach((each) => {
        elementPosIndex++
        console.log(each.parentElement)
        each.setAttribute('key', elementPosIndex)
        let keyPosSaver = document.createElement('key' + elementPosIndex)
        each.insertAdjacentElement('beforebegin', keyPosSaver)
        keyPosSaver.style.position = 'fixed'


        let chain = [each, ...each.querySelectorAll('*')]

        //-----------------------------------------------------[CHILD]---------------------------------------------------------
        let cmd = '//$VARI$\n//$NEXT$\n'
        chain.forEach((child, index) => {

            if (child.getAttribute('for')) {
                console.warn('hererere')
                cmd = forFlow(child, index, cmd)
                console.log(cmd)
                return
            }
            if (child.getAttribute('foreach')) {
                cmd = foreachFlow(child, index, cmd)
                console.log(cmd)
                return
            }
            else {
                cmd = null
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

            if (chain[0].getAttribute('watch')) watchers.push({ key: elementPosIndex, watch: chain[0].getAttribute('watch') ?? undefined })

            forsCmds.push({ key: elementPosIndex, cmd })
        }
    })

}

function getBase(element,tag) {
    let cloneForBase = element.cloneNode(true)
    let i = 0

    cloneForBase.querySelectorAll('*').forEach(cloneEach => {

        if (cloneEach.getAttribute('for') || cloneEach.getAttribute('foreach')) {
            cloneEach.outerHTML = tag??'//$CONTENT$'
            i++
            return
            //cloneEach.remove()
        }
    })
    let base = cloneForBase.outerHTML

    return base
}

function forFlow(child, index, currentCMD) {
    let cmd = currentCMD
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
    cmd = cmd.replace("//$CONTENT$", "\$\{results" + letter + "\}\n")
    base = "results" + letter + " += \`" + base + '\n`'

    cmd = cmd.replace('//$RESULTVAR$', '//test\n')

    let sub_waterMark = child.parentElement
    let sub_mark_index = 0
    while (sub_waterMark.tagName != 'BODY') {
        sub_waterMark = sub_waterMark.parentElement
        sub_mark_index++
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
    return cmd
}

function foreachFlow(child, index, currentCMD) {
    let cmd = currentCMD
    let base = ''
    let sub_waterMark = child.parentElement
    let sub_mark_index = 0
    while (sub_waterMark.tagName != 'BODY') {

        if (sub_waterMark.getAttribute('for') || sub_waterMark.getAttribute('foreach')) sub_mark_index++
        sub_waterMark = sub_waterMark.parentElement
    }
    sub_waterMark = sub_mark_index


    const _CONTENT = `//$CONTENT${sub_waterMark}`


    //parse for attr
    let forLines = child.getAttribute('foreach')
    console.log("#####" + forLines)
    //end of parse for
    let letter = forLines.split(';')[1]
    let array = forLines.split(';')[0]

    child.removeAttribute('foreach')
    base = getBase(child,_CONTENT)
    while (base.indexOf('{{') >= 0) {
        base = base.replace(base.slice(base.indexOf('{{'), base.indexOf('}}') + 2),
            "${" + base.slice(base.indexOf('{{') + 2, base.indexOf('}}')) + "}")
    }
    cmd = cmd.replace(_CONTENT, "\$\{results" + letter + "\}\n")
    base = "results" + letter + " += \`" + base + '`'

    cmd = cmd.replace('//$RESULTVAR$', '//test\n')


    console.warn('here')
    if (cmd.includes(`//$SUB-${sub_waterMark}$`)) {

        cmd = cmd.replace(`//$SUB-${sub_waterMark}$`,

            '\nlet results' + letter + ' = [];\n' +
            `${array}.forEach(${letter}=>{\n//$VARI$\n   ` +
            '//$NEXT$\n' + base + '\n})\n' + `//$SUB-${sub_waterMark-1}$`)
    }
    else {
        cmd = cmd.replace('//$VARI$',
            '\nlet results' + letter + ' = [];\n')
        cmd = cmd.replace("//$NEXT$",
            `${array}.forEach(${letter}=>{\n//$VARI$\n   ` +
            '\n\n//$NEXT$\n' + base + '\n})\n' + `//$SUB-${sub_waterMark-1}$`)
    }
    if (index == 0) {
        cmd += "return results" + letter
        cmd = '//$RESULTVAR$\n\n' + cmd
    }
    return cmd
}