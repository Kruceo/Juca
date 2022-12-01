document.querySelectorAll('for').forEach((each) => {
    const length = each.getAttribute('length')
    const letter = each.getAttribute('letter')
    console.log(length)
    const add = each.getAttribute('add') ?? 1
    const child = each.children;


    for (let i = 0; i < length; i++) {
        let newHtml = '' + child[0].outerHTML
        

        while (newHtml.indexOf("${") >=0) {
            let line = (newHtml.slice(newHtml.indexOf("${") + 2, newHtml.indexOf("}")))
            console.log("##"+newHtml.indexOf("${"))
            let turner = new Function('let ' + letter + ' = ' + i + '; let res = ' + line + ';return res')
            let result = turner()
            console.log(result)
            newHtml = newHtml.replaceAll('${' + line + '}', result)
            console.log(newHtml)
            
        }
        

        each.innerHTML += newHtml + '\n\n'
        // console.log(i)
    }
})