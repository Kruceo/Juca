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