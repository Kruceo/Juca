export const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor;

export function hasThisAttr(ele,...attributes)
{
    let isTrue = false
    attributes.forEach(each=>{if(ele.getAttribute(each))isTrue = true})

    return(isTrue)
}
