
document.querySelectorAll('for').forEach((each) => {
    const length = each.getAttribute('length')??"1"
    const letter = each.getAttribute('letter')??"i"
    console.log(length)
    const add = each.getAttribute('add') ?? 1
    const child = each.innerHTML;

    let original = '' + child
    each.innerHTML = ''
    for (let i = 0; i < length; i++) {
        let newHtml = '' + original
        
        while (newHtml.indexOf("{{") >=0) {
            let line = (newHtml.slice(newHtml.indexOf("{{") + 2, newHtml.indexOf("}}")))
            //console.log("##"+newHtml.indexOf("${"))
            let turner = new Function('let ' + letter + ' = ' + i + '; let res = ' + line + ';return res')
            let result = turner()
            //console.log(result)
            newHtml = newHtml.replaceAll('{{' + line + '}}', result)
            //console.log(newHtml)
            
        }

       
        each.innerHTML += newHtml + '\n\n'
        // console.log(i)
    }
    each.outerHTML = each.innerHTML
})