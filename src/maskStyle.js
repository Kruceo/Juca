export function maskOn()
{
    console.log(document.body.style)
    document.querySelector('body').setAttribute('style','display:none;')
}
export function maskOff()
{
    console.log(document.body.style)
    document.querySelector('body').removeAttribute('style')
}