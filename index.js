import preProcess from "./src/preprocess.js"
import posProcess from "./src/posprocess.js"
import { initWatcher } from "./src/manager.js"
export default async function init() {

    await preProcess() //fors and whiles derived
    await posProcess() //static looks 
    await initWatcher()
}