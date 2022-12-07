document.body.querySelectorAll('*').forEach(each => {
    if (each.parentElement.tagName != "BODY") { console.log('dif'); return };

    let base = getBase(each)
    
   
    console.log('----------------------[START]------------------------')
    let cmd = '//$VARI$\n\n//$NEXT$'
    if (each.getAttribute('for')) {
       
        let letter = each.getAttribute('for').split(';')[2]

        each.removeAttribute('for')
        base = getBase(each)
        cmd = cmd.replace('//$VARI$', 'let '+letter+' = 0;\nlet resultsI = [];\n')
        cmd = cmd.replace("//$NEXT$", `for(${letter};${letter}<3;${letter}++){\n   \n//$VARI$\n\n`)

        while (base.indexOf('{{') >= 0) {
            base = base.replace(base.slice(base.indexOf('{{'), base.indexOf('}}') + 2),
                "${" + base.slice(base.indexOf('{{') + 2, base.indexOf('}}')) + "}")
        }
        cmd += "\n//$NEXT$\n\n\n"
        base = "resultsI += \` " + base + '\`'
    



        cmd += base
        cmd += "\n\n};return resultsI"
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
            base = "results"+letter+" += \`" + base + '\n\n\`'

            cmd = cmd.replace('//$VARI$', 'let '+letter+' = 0;\nlet results'+letter+' = [];\n//$VARI$')
            cmd = cmd.replace("//$NEXT$", `for(${letter};${letter}<3;${letter}++){\n   `+base + '\n\n//$NEXT$\n}')
            cmd = cmd.replace("//$NEXTCONTENT$", "\$\{results"+letter+"\}\n")
            
            
            console.log(cmd)
        }
    })
   // cmd += processedBaseReturn
    console.log('----------------[RESULT]-----------------')
    console.log(new Function(cmd)())
    each.outerHTML += (new Function(cmd)())
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