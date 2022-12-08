
console.log('oi')
let max = (await import('./out_test')).array
for(let t = 0;t < (await import('./out_test.js')).array.length;t ++)
{
    console.log(t)
}
