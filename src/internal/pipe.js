export default function pipe(element)
{
    if(element.getAttribute('pipe')){

        let attribute = element.getAttribute('pipe')
        console.log(attribute)

        element.addEventListener('input',(e)=>
        {
            const same = e.target
            new Function('same',attribute)(same)

            console.log(window.myForm)
        }
        
        )}
}