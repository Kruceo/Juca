import preProcess from "./preprocess"
import posProcess from "./posprocess"

export default async function init() {
    await preProcess() //fors and whiles derived
    await posProcess() //static looks
}