console.log()
let prefix = "{{", sufix = "}}"
let superficie = []
let fors = []

document.body.querySelectorAll('*').forEach((each) => {



    console.log('------------' + each.tagName + '------------')
    let layers = []

    if (each.parentElement.tagName == "BODY") {
        layers.push(each)

        each.querySelectorAll('*').forEach(child => {

            layers.push(child)
            if (child.getAttribute('for')) {
                fors.push(child)
            }
        })

        superficie.push(layers)
        console.log(layers)
        console.log(fors)
        console.log('------------end------------\n\n')
    }
    return

    if (each.tagName == 'FOR') {

        for (let i = 0; i < length; i++) {

        }
        for (let y = layers.length - 1; y >= 0; y--) {
            console.log('->' + y)
            let newHtml = '' + layers[y].outerHTML
            let oldHtml = '' + newHtml
            while (newHtml.indexOf(prefix) >= 0) {
                if (newHtml.includes(sufix)) {
                    let line = (newHtml.slice(newHtml.indexOf(prefix) + 2, newHtml.indexOf(sufix)))
                    let turner = new Function('let ' + letter + ' = ' + i + '; let res = ' + line + ';return res')
                    let result = turner()
                    newHtml = newHtml.replaceAll(prefix + '' + line + '' + sufix, result)
                }
            }
            layers[y].outerHTML = newHtml
        }


    }
})

console.log(superficie)
superficie.forEach(each => {
    console.log("##=>" + each[0].tagName)
    if (each[0].tagName == "FOR") {

    }

    processForAlternative2(each)
})


function processArray(Html_tree) {
    for (let y = Html_tree.length - 1; y >= 0; y--) {
        console.log('->' + y)
        let newHtml = '' + Html_tree[y].outerHTML
        let oldHtml = '' + newHtml
        while (newHtml.indexOf(prefix) >= 0) {
            if (newHtml.includes(sufix)) {
                let line = (newHtml.slice(newHtml.indexOf(prefix) + 2, newHtml.indexOf(sufix)))
                let turner = new Function('let f9e2af' + ' = ' + 1 + '; let res = ' + line + ';return res')
                let result = turner()
                newHtml = newHtml.replaceAll(prefix + '' + line + '' + sufix, result)
            }
        }
        console.log(newHtml)
        Html_tree[y].outerHTML = newHtml
    }
    console.log('-----------------------------------------------')
}

function processFor(Html_tree) {
    let securityWhile = 0
    for (let y = Html_tree.length - 1; y >= 0; y--) {

        let length = Html_tree[y].getAttribute('length') ?? "1"
        let letter = Html_tree[y].getAttribute('letter') ?? "i"
        let add = Html_tree[y].getAttribute('add') ?? 1
        let newHtml = '' + Html_tree[y].outerHTML
        let oldHtml = '' + newHtml
        for (let forIndex = 0; forIndex < length; forIndex++) {
            console.log('-y:' + y + ', -f:' + forIndex)
            let lastSufixIndex = -2
            while (newHtml.indexOf(prefix, lastSufixIndex) >= 0) {

                try {

                    let line = (newHtml.slice(newHtml.indexOf(prefix, lastSufixIndex) + 2, newHtml.indexOf(sufix, lastSufixIndex)))
                    let turner = new Function('let ' + letter + ' = ' + forIndex + '; let res = (' + line + ');return res')
                    let result = turner()
                    console.log("=====>" + prefix + '' + line + '' + sufix)
                    console.log("=====>" + turner)
                    console.log("=====>" + result)
                    console.log("=====>" + lastSufixIndex)
                    newHtml = newHtml.replaceAll(prefix + '' + line + '' + sufix, result)
                    lastSufixIndex = newHtml.indexOf(sufix, lastSufixIndex)
                } catch (error) {
                    console.warn('PASSED')
                }


                console.log("#$" + newHtml.indexOf(prefix))
                securityWhile++
                if (securityWhile > 128) {
                    console.error('SECURITY WHILE BREAK')
                    break
                }

            }
            console.log(newHtml)

            let fff = document.createElement('ass')
            //fff.outerHTML += ''+newHtml
            // Html_tree[y].append(fff)   



        }

    }
    console.log('\n\n\n\n\n-----------------------------------------------\n\n\n')

}



function processForAlternative(Html_tree) {
    let securityWhile = 0
    let createdElements = []
    for (let y = 0; y < Html_tree.length; y++) {
        let length = Html_tree[y].getAttribute('length') ?? 1
        let letter = Html_tree[y].getAttribute('letter') ?? "i"
        let add = Html_tree[y].getAttribute('add') ?? 1
        console.log(length, letter, add)
        let clone = Html_tree[y]


        let originalHTML = ' ' + clone.outerHTML
        let newHTML = ' ' + clone.outerHTML

        console.log("\n\n__________________________")

        let finalOuterHTML = ''
        for (let forIndex = 0; forIndex < length; forIndex++) {

            while (newHTML.indexOf(prefix) >= 0) {
                if (newHTML.includes(sufix)) {
                    let line = (newHTML.slice(newHTML.indexOf(prefix) + 2, newHTML.indexOf(sufix)))
                    let turner = new Function('let ' + letter + ' = ' + forIndex + '; let res = ' + line + ';return res')
                    let result = turner()
                    console.log("1 $ " + line)
                    console.log("2 $ " + turner.toString().replaceAll('\n', ''))
                    console.log("3 $ " + result)
                    newHTML = newHTML.replaceAll(prefix + '' + line + '' + sufix, result)
                    securityWhile++
                    if (securityWhile > 50) { break }
                }
            }

            finalOuterHTML += newHTML + '\n'
            newHTML = '' + originalHTML
            console.log(finalOuterHTML)

        }
        clone.outerHTML = finalOuterHTML
        console.log("\n\n") // let oldHtml = '' + newHtml


        // createdElements.push(newHtml)
    }



}





function processForAlternative2(Html_tree) {
    let securityWhile = 0
    let createdElements = []
    let trail = []
    let length = Html_tree[0].getAttribute('length') ?? 1
    let letter = Html_tree[0].getAttribute('letter') ?? "i"
    let add = Html_tree[0].getAttribute('add') ?? 1
    console.log(length, letter, add)
    let clone = Html_tree[0]
    let originalHTML = ' ' + clone.outerHTML
    let newHTML = ' ' + clone.outerHTML

    for (let index = 0; index < Html_tree.length; index++) {
        
        let oldInnerHTML = ' ####  '+Html_tree[index].innerHTML
       
        Html_tree[index].innerHTML = "@12344321@"
        
        let textOuter = ''+ Html_tree[index].outerHTML    
        while (textOuter.indexOf(prefix) >= 0) {
            if (textOuter.includes(sufix)) {
                let line = (textOuter.slice(text.indexOf(prefix) + 2, text.indexOf(sufix)))
                let turner = new Function('let ' + letter + ' = ' + 0 + '; let res = ' + line + ';return res')
                let result = turner()
                console.log("---")
                console.log("1 $ " + line)
                console.log("2 $ " + turner.toString().replaceAll('\n', ''))
                console.log("3 $ " + result)
                console.log("---")
                textOuter = textOuter.replaceAll(prefix + '' + line + '' + sufix, result)
              
                securityWhile++
                if (securityWhile > 50) { break }
            }
        };
        let outerHTML = textOuter
       
        Html_tree[index].innerHTML = 'ssss'
        
       
        console.log('% '+Html_tree[index].outerHTML)
        
        //process inner text (Just text, not elements)
       
        Html_tree[index].childNodes.forEach((each)=>
        {
            
            if(each.nodeType == 3)
            {
                
                let textInner = ''+ each.textContent    
                while (textInner.indexOf(prefix) >= 0) {
                    if (textInner.includes(sufix)) {
                        let line = (textInner.slice(text.indexOf(prefix) + 2, text.indexOf(sufix)))
                        let turner = new Function('let ' + letter + ' = ' + 0 + '; let res = ' + line + ';return res')
                        let result = turner()
                        console.log("1 $ " + line)
                        console.log("2 $ " + turner.toString().replaceAll('\n', ''))
                        console.log("3 $ " + result)
                        textInner = textInner.replaceAll(prefix + '' + line + '' + sufix, result)
                        each.textContent = textInner
                        securityWhile++
                        if (securityWhile > 50) { break }
                    }
                }
                
            }
        })
        let innerHTML = Html_tree[index].innerHTML
        Html_tree[index].innerHTML = oldInnerHTML
        Html_tree[index].outerHTML = text
        console.log('% '+Html_tree[index].outerHTML)
    }


    return
    let finalOuterHTML = ''
    for (let forIndex = 0; forIndex < length; forIndex++) {

        while (newHTML.indexOf(prefix) >= 0) {
            if (newHTML.includes(sufix)) {
                let line = (newHTML.slice(newHTML.indexOf(prefix) + 2, newHTML.indexOf(sufix)))
                let turner = new Function('let ' + letter + ' = ' + forIndex + '; let res = ' + line + ';return res')
                let result = turner()
                console.log("1 $ " + line)
                console.log("2 $ " + turner.toString().replaceAll('\n', ''))
                console.log("3 $ " + result)
                newHTML = newHTML.replaceAll(prefix + '' + line + '' + sufix, result)
                securityWhile++
                if (securityWhile > 50) { break }
            }
        }
        finalOuterHTML += newHTML + '\n'
        newHTML = '' + originalHTML
        console.log(finalOuterHTML)

    }
    clone.outerHTML = finalOuterHTML
    console.log("\n\n") // let oldHtml = '' + newHtml


    // createdElements.push(newHtml)




    //console.log(createdElements)
}