import {getBase,getParentFrom} from '../../lib.js'

export default function foreachFlow(child, index, currentCMD) {

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

