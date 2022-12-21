import { AsyncFunction } from "./lib.js"

export function conditional(element)
{
    if(element.getAttribute('if'))
    {
        let cmd = 'return '+element.getAttribute('if')

        if(new AsyncFunction(cmd) != true)
        {
            element.remove()
        }

    }
}