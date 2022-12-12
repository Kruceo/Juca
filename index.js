import preProcess from "./preprocess.js"
import posProcess from "./posprocess.js"

export default async function init() {
    await preProcess() //fors and whiles derived
    await posProcess() //static looks 

    console.log(document.querySelectorAll('[orig-for]'))
}