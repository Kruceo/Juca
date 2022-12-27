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


        let chain = [each, ...each.querySelectorAll('*')].sort((a, b) => a.parentElement == a.parentElement)

        //-----------------------------------------------------[CHILD]---------------------------------------------------------
        let cmd = '//$VARI0$\n//$NEXT0$\n'
        chain.filter(ele => {if(ele.getAttribute('foreach')){return ele}})       
          .forEach((child, index) => {
            console.log(child.id)
            
            if (child.getAttribute('for')) {
                console.warn('hererere')
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

            console.log(cmd)
            new AsyncFunction(cmd)().then(value => {


                chain[0].outerHTML = value

            })
            // console.log(value)

            if (chain[0].getAttribute('watch')) watchers.push({ key: elementPosIndex, watch: chain[0].getAttribute('watch') ?? undefined })

            forsCmds.push({ key: elementPosIndex, cmd })
        }
    })

}

function getBase(element) {
    let cloneForBase = element.cloneNode(true)
    let i = 0

    cloneForBase.querySelectorAll('*').forEach(cloneEach => {

        if (cloneEach.getAttribute('for') || cloneEach.getAttribute('foreach')) {
            cloneEach.outerHTML = '//$NEXTCONTENT$'
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
    cmd = cmd.replace("//$NEXTCONTENT$", "\$\{results" + letter + "\}\n")
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
    let _CURRENTCMD = cmd.length
    console.log(_CURRENTCMD)
    let base = ''
    let sub_waterMark = child.parentElement
    let sub_mark_index = 0
    while (sub_waterMark.tagName != 'BODY') {
        console.log(sub_mark_index)
        if (sub_waterMark.getAttribute('for') || sub_waterMark.getAttribute('foreach')) sub_mark_index++
        sub_waterMark = sub_waterMark.parentElement
    }
    sub_waterMark = sub_mark_index

    //parse for attr
    let forLines = child.getAttribute('foreach')
    console.log("#####" + forLines)
    



    let letter = forLines.split(';')[1]
    let array = forLines.split(';')[0]



    base = getBase(child)
    while (base.indexOf('{{') >= 0) {
        base = base.replace(base.slice(base.indexOf('{{'), base.indexOf('}}') + 2),
            "${" + base.slice(base.indexOf('{{') + 2, base.indexOf('}}')) + "}")
    }




    cmd = cmd.replace("//$NEXTCONTENT$", "\$\{results" + letter + "\}\n")
    base = "results" + letter + " += \`" + base + '`'


    const hash = (add) => { return (child.parentElement.tagName + ((sub_mark_index + (add ?? 0)) + "" + child.parentElement.outerHTML.length)).padStart(10, '0') }
    const subhash = (add) => { return (child.tagName + ((sub_mark_index + (add ?? 0)) + "" + child.outerHTML.length)).padStart(10, '0') }
    console.warn(hash("@") + "  " + _CURRENTCMD + "   -   " + (parseInt(hash()) - parseInt(_CURRENTCMD))  + child.id)
    if (cmd.includes(`//$SUB-${hash()}$`)) {

        cmd = cmd.replace(`//$SUB-${hash()}$`,

            '\nlet results' + letter + ' = [];\n' + "//" + hash() + "\n" +

            `${array}.forEach(${letter}=>{\n//$VARI${hash()}$\n` +

            `\n//$NEXT${hash()}$\n` + base + '\n})\n' + `//$`+hash()+'$')
    }
    else {
        console.warn("VARI | "+cmd.includes("//$VARI" + hash() + "$"))
        cmd = cmd.replace(`//$VARI${hash()}$`,
            '\nlet results' + letter + ' = "";\n' + `//(${child.tagName}${sub_mark_index})\n//${hash()}`)
        cmd = cmd.replace(`//$NEXT${hash()}$`,
            `${array}.forEach(${letter}=>{\n//$VARI${subhash(1)}$\n\n//$NEXT${subhash(1)}$\n\n` + base + '\n})\n' + `//$SUB-${hash()}$`)
    }




    if (index == 0) {
        cmd = cmd.replace(`//$VARI0$`,
            '\nlet results' + letter + ' = "";\n' + `//(${child.tagName}${sub_mark_index})\n`)
        cmd = cmd.replace(`//$NEXT0$`,
            `${array}.forEach(${letter}=>{\n//$VARI${subhash(1)}$\n\n//$NEXT${subhash(1)}$\n\n` + base + '\n})\n' + `//$SUB-${hash()}$`)

        cmd += "\n\nreturn results" + letter

    }

    cmd = cmd.replaceAll('CMD.LENGTH', ("" + (sub_mark_index + "" + cmd.length)).padStart(10, '0'))
    cmd = cmd.replaceAll('CMD.LENG+1', ("" + ((sub_mark_index + 1) + "" + cmd.length)).padStart(10, '0'))

    console.log('---------------------------------_#_-------------------------------------------------')
    return cmd
}