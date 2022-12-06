 document.body.querySelectorAll('*').forEach(each => {
     if (each.parentElement.tagName != "BODY") { console.log('dif'); return };
     let text = each.outerHTML
     console.log(text)
     let cmd = '//$NEXT$'
     if (each.getAttribute('for')) {
         cmd = cmd.replace('//$NEXT$', 'let i = 0;\nlet resultsI = [];\n')
         cmd += `
    for(i;i<10;i++)
    {
        resultsI[i] = "<${each.tagName.toLowerCase()}>"
        //$FUNC$
        //$NEXT$
        resultsI[i] += "</${each.tagName.toLowerCase()}>"
    };`
       each.childNodes.forEach((childNode) => {
           if (childNode.nodeType == 3) {
               let txt = childNode.textContent
               console.log(txt)
               cmd = cmd.replace("//$FUNC$", '\n\nresultsI[i] += ' + (txt.slice(txt.indexOf('{{') + 2, txt.indexOf('}}'))))
           }
       })
   }
   each.querySelectorAll('*').forEach((child) => {
       if (child.getAttribute('for')) {
         cmd = cmd.replace('//$NEXT$', 'let f = 0;\nlet resultsF = [];\n' +
               `for(f;f<10;f++){
                resultsI[i] += "<${child.tagName.toLowerCase()}>"
                //$FUNC$
                //$NEXT$
                resultsI[i] += "</${child.tagName.toLowerCase()}>"
                 };`)
             child.childNodes.forEach((childNode) => {
                 if (childNode.nodeType == 3) {
                     let txt = childNode.textContent
                     console.log(txt)
                     cmd = cmd.replace("//$FUNC$", '\n\n resultsI[i] += ' + (txt.slice(txt.indexOf('{{') + 2, txt.indexOf('}}'))))
                 }
             })
         }
     })
     console.log(cmd)
 })



    