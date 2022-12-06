document.body.querySelectorAll('*').forEach(each => {
    if (each.parentElement.tagName != "BODY") { console.log('dif'); return };

    let base = getBase(each)
    let processedBaseReturn = ''
    console.log(base)
    console.log('-------------------------------------------------')
    let cmd = '//$VARI$\n\n//$NEXT$'
    if (each.getAttribute('for')) {
        cmd = cmd.replace('//$VARI$', 'let i = 0;\nlet resultsI = [];\n')
        cmd = cmd.replace("//$NEXT$", `for(i;i<10;i++){\n   \n//$VARI$\n\n`)

        while (base.indexOf('{{') >= 0) {
            base = base.replace(base.slice(base.indexOf('{{'), base.indexOf('}}') + 2),
                "${" + base.slice(base.indexOf('{{') + 2, base.indexOf('}}')) + "}")
        }
        cmd += "\n//$NEXT$\n\n\n"
        base = "resultsI[i] += \`" + base + '\`'
        processedBaseReturn = base



        cmd += base
        cmd += "\n\n};"
    }
    console.log(cmd)
    
    each.querySelectorAll('*').forEach((child) => {
        base = getBase(child)
        if (child.getAttribute('for')) {
            while (base.indexOf('{{') >= 0) {
                base = base.replace(base.slice(base.indexOf('{{'), base.indexOf('}}') + 2),
                    "${" + base.slice(base.indexOf('{{') + 2, base.indexOf('}}')) + "}")
            }
            base = "resultsF += \`" + base + '\n\n\`'

            cmd = cmd.replace('//$VARI$', 'let f = 0;\nlet resultsF = [];\n//$VARI$')
            cmd = cmd.replace("//$NEXT$", `for(f;f<10;f++){\n   `+base + '\n\n//$NEXT$\n}')
            cmd = cmd.replace("//$NEXTCONTENT$", "\$\{resultsF\}")
            
            

        }
    })
   // cmd += processedBaseReturn
   
    console.log(cmd)
})





function getBase(element) {
    let cloneForBase = element.cloneNode(true)
    cloneForBase.querySelectorAll('*').forEach(cloneEach => {
        if (cloneEach.getAttribute('for')) {
            cloneEach.outerHTML = '//$NEXTCONTENT$'
            //cloneEach.remove()
        }
    })

    let base = cloneForBase.outerHTML



    return base
}