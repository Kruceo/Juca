console.time('f')
document.body.querySelectorAll('*')
.forEach((each)=>
{
    if(each.getAttribute('for'))
    {
    
    }
    console.log(each)
})
console.timeEnd('f')