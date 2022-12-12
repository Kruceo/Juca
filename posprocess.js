export default async function initPosProcess() {
    console.time('ff')
    document.body.querySelectorAll('*').forEach((each) => {

        //each.innerHTML = ''
        let newHtml = '' + each.outerHTML
        while (newHtml.indexOf("{{") >= 0) {
            let line = (newHtml.slice(newHtml.indexOf("{{") + 2, newHtml.indexOf("}}")))
            //console.log("##"+newHtml.indexOf("${"))
            let turner = new Function('let res = ' + line + ';return res')
            let result = turner()
            //console.log(result)
            newHtml = newHtml.replaceAll('{{' + line + '}}', result)
            //console.log(newHtml)

        }

        each.outerHTML = newHtml + '\n\n'
        // each.outerHTML = each.innerHTML
    })
}
console.timeEnd('ff')