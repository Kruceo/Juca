export const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor;

export function hasThisAttr(ele,...attributes)
{
    let isTrue = false
    attributes.forEach(each=>{if(ele.getAttribute(each))isTrue = true})

    return(isTrue)
}

export function getParentFrom(ele,pos)
{
    let par = ele
    for(let i = 0;i < pos; i++){par = par.parentElement}
    
    return par
}

export function getBase(element) {
    let cloneForBase = element.cloneNode(true)
    let i = 0

    cloneForBase.querySelectorAll('*').forEach(cloneEach => {

        if (cloneEach.getAttribute('for') || cloneEach.getAttribute('foreach')) {
            cloneEach.outerHTML = '//$NEXTCONTENT$'
            i++
            return
            //cloneEach.remove()
        }
    })
    let base = cloneForBase.outerHTML

    return base
}