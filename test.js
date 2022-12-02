console.log()
let prefix = "{{", sufix = "}}"
let superficie = []

document.body.querySelectorAll('*').forEach((each) => {
    const length = each.getAttribute('length') ?? "1"
    const letter = each.getAttribute('letter') ?? "i"
    //console.log(length)
    const add = each.getAttribute('add') ?? 1
    const child = each.innerHTML;

    let original = '' + child
    //each.innerHTML = ''


    console.log('------------' + each.tagName + '------------')
    let layers = []

    if (each.parentElement.tagName == "BODY") {
        layers.push(each)

        each.querySelectorAll('*').forEach(child => {

            layers.push(child)
        })

        superficie.push(layers)
        console.log(layers)
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
superficie.forEach(each => process(each))


function process(Html_tree) {
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