import preProcess from "./src/preprocess.js"
import posProcess from "./src/posprocess.js"
import { maskOff, maskOn } from "./src/maskStyle.js"
maskOn()
export default async function init() {
    
    
    await preProcess() //fors and whiles derived
    await posProcess() //static looks 
    maskOff()
    console.log(document.querySelectorAll('[orig-for]'))
}