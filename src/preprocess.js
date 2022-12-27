import { AsyncFunction, hasThisAttr, getParentFrom } from "./lib.js"
import { forsCmds, watchers } from "./manager.js"


export default async function preProcess() {
    let elementPosIndex = 0
    document.body.querySelectorAll('*').forEach((each) => {
        if (!hasThisAttr(each, 'foreach', 'for')) return

        elementPosIndex++
        each.setAttribute('key', elementPosIndex)
        let keyPosSaver = document.createElement('key' + elementPosIndex)
        each.insertAdjacentElement('beforebegin', keyPosSaver)
        keyPosSaver.style.position = 'fixed'

        let chain = [each, ...each.querySelectorAll('*')].filter(ele => {
            return hasThisAttr(ele, 'for', 'foreach')
        })

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
    //parse for att

    let sub_waterMark = child.parentElement
    let sub_mark_index = [0,1]
    while (sub_waterMark.tagName != 'BODY') {
        console.log(sub_mark_index)
        if (sub_waterMark.getAttribute('for') || sub_waterMark.getAttribute('foreach')) sub_mark_index[0]++
        if(sub_mark_index[0] <= 0) sub_mark_index[1] ++ 
        sub_waterMark = sub_waterMark.parentElement
    }
    sub_waterMark = sub_mark_index

    let forLines = child.getAttribute('for')
    forLines = forLines.replaceAll('{{', '')
    forLines = forLines.replaceAll('}}', '')
   
    let letter = forLines.split(';')[2]
    let max = forLines.split(';')[1]
    let init = forLines.split(';')[0]
    

    base = getBase(child)
    while (base.indexOf('{{') >= 0) {
        base = base.replace(base.slice(base.indexOf('{{'), base.indexOf('}}') + 2),
            "${" + base.slice(base.indexOf('{{') + 2, base.indexOf('}}')) + "}")
    }
    cmd = cmd.replace("//$NEXTCONTENT$", "\$\{results" + letter + "\}\n")
    base = "results" + letter + " += \`" + base + '\n`'

    cmd = cmd.replace('//$RESULTVAR$', '//test\n')

    const hash = (add) => {
         return (((sub_mark_index[0] + (add ?? 0)) + "|" + getParentFrom(child,sub_mark_index[1]).outerHTML.length)).padStart(20, '_') 
        }
    const subhash = (add) => { return ( ((sub_mark_index[0] + (add ?? 0)) + "|" + child.outerHTML.length)).padStart(20, '_') }
    console.log(hash("#"), subhash(1), letter)
    if (cmd.includes(`//$SUB-${hash()}$`)) {

        cmd = cmd.replace(`//$SUB-${hash()}$`,

            '\nlet results' + letter + ' = [];\n' + "//" + hash() + "\n" +

            `for(let ${letter} = ${init};${letter} < ${max};${letter}++){\n//$VARI${subhash(1)}$\n` + `\n//$NEXT${subhash(1)}$\n` + base + '\n}\n' + `//$SUB-` + hash() + '$')
    }
    else {
        cmd = cmd.replace(`//$VARI${hash()}$`,
            '\nlet results' + letter + ' = "";\n' + `//(${child.tagName}${sub_mark_index})\n//${hash()}`)
        cmd = cmd.replace(`//$NEXT${hash()}$`,
            `for(let ${letter} = ${init};${letter} < ${max};${letter}++){\n//$VARI${subhash(1)}$\n\n//$NEXT${subhash(1)}$\n\n` + base + '\n}\n' + `//$SUB-${hash()}$`)
    }

    if (index == 0) {
        cmd = cmd.replace(`//$VARI0$`,
            '\nlet results' + letter + ' = "";\n' + `//(${child.tagName}${sub_mark_index})\n`)
        cmd = cmd.replace(`//$NEXT0$`,
            `for(let ${letter} = ${init};${letter} < ${max};${letter}++){\n//$VARI${subhash(1)}$\n\n//$NEXT${subhash(1)}$\n\n` + base + '\n}\n' + `//$SUB-${hash()}$`)

        cmd += "\nreturn results" + letter

    }

    return cmd
}

function foreachFlow(child, index, currentCMD) {

    let cmd = currentCMD
    let base = ''
    let sub_waterMark = child.parentElement
    let sub_mark_index = [0,1]
    while (sub_waterMark.tagName != 'BODY') {
        if (sub_waterMark.getAttribute('for') || sub_waterMark.getAttribute('foreach')) sub_mark_index[0]++
        if(sub_mark_index[0] <= 0) sub_mark_index[1] ++ 
        sub_waterMark = sub_waterMark.parentElement
    }
    sub_waterMark = sub_mark_index

    //parse for attr
    let forLines = child.getAttribute('foreach')
    


    let letter = forLines.split(';')[1]
    let array = forLines.split(';')[0]

    base = getBase(child)
    while (base.indexOf('{{') >= 0) {
        base = base.replace(base.slice(base.indexOf('{{'), base.indexOf('}}') + 2),
            "${" + base.slice(base.indexOf('{{') + 2, base.indexOf('}}')) + "}")
    }

    cmd = cmd.replace("//$NEXTCONTENT$", "\$\{results" + letter + "\}\n")
    base = "results" + letter + " += \`" + base + '`'

    const hash = (add) => {
        return (((sub_mark_index[0] + (add ?? 0)) + "|" + getParentFrom(child,sub_mark_index[1]).outerHTML.length)).padStart(20, '_') 
       }
    const subhash = (add) => { return ( ((sub_mark_index[0] + (add ?? 0)) + "|" + child.outerHTML.length)).padStart(20, '_') }

    if (cmd.includes(`//$SUB-${hash()}$`)) {

        cmd = cmd.replace(`//$SUB-${hash()}$`,

            '\nlet results' + letter + ' = [];\n' + "//" + hash() + "\n" +

            `${array}.forEach(${letter}=>{\n//$VARI${subhash()}$\n` +

            `\n//$NEXT${subhash()}$\n` + base + '\n})\n' + `//$SUB-` + hash() + '$')
    }
    else {
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

        cmd += "\nreturn results" + letter

    }

    return cmd
}

