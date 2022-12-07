document.body.querySelectorAll('*').forEach(each => {

    if (each.parentElement.tagName != "BODY") { console.log('dif'); return };

    let base = getBase(each)


    console.log('----------------------[START]------------------------')
    let cmd = '//$RESULTVAR$\n//$VARI$\n\n//$NEXT$'
    if (each.getAttribute('for')) {

        let letter = each.getAttribute('for').split(';')[2]

        each.removeAttribute('for')
        base = getBase(each)
        cmd = cmd.replace('//$RESULTVAR$', '//test\n')
        cmd = cmd.replace('//$VARI$', 'let ' + letter + ' = 0;\n' +
            '\nlet results' + letter + ' = [];\n')
        cmd = cmd.replace("//$NEXT$", `for(${letter};${letter}<3;${letter}++){\n   \n//$VARI$\n\n`)

        while (base.indexOf('{{') >= 0) {
            base = base.replace(base.slice(base.indexOf('{{'), base.indexOf('}}') + 2),
                "${" + base.slice(base.indexOf('{{') + 2, base.indexOf('}}')) + "}")
        }
        cmd += "\n//$NEXT$\n\n\n"
        base = "results" + letter + " += \` " + base + '\`'


        cmd += base
        cmd += "\n\n};return results" + letter
        cmd = '//$RESULTVAR$\n\n' + cmd
    }


    each.querySelectorAll('*').forEach((child) => {

        if (child.getAttribute('for')) {

            let letter = child.getAttribute('for').split(';')[2]
            child.removeAttribute('for')
            base = getBase(child)
            while (base.indexOf('{{') >= 0) {
                base = base.replace(base.slice(base.indexOf('{{'), base.indexOf('}}') + 2),
                    "${" + base.slice(base.indexOf('{{') + 2, base.indexOf('}}')) + "}")
            }
            cmd = cmd.replace("//$NEXTCONTENT$", "\$\{results" + letter + "\}\n")
            base = "results" + letter + " += \`" + base + '\n`'

            cmd = cmd.replace('//$RESULTVAR$', '//test\n')
            cmd = cmd.replace('//$VARI$', 'let ' + letter + ' = 0;\n' +
                '\nlet results' + letter + ' = [];\n')
            cmd = cmd.replace("//$NEXT$", `for(${letter};${letter}<3;${letter}++){\n//$VARI$\n   ` + '\n\n//$NEXT$\n'+ base +'}')


            cmd = '//$RESULTVAR$\n' + cmd
            console.log(cmd)
            return
        }
    })
    // cmd += processedBaseReturn
    console.log('----------------[RESULT]-----------------')
    // console.log(new Function(cmd)())
    each.outerHTML += (new Function(cmd)())
})





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