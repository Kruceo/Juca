let i = 0;
let resultsI = [];


for (i; i < 3; i++) {

    let f = 0;
    let resultsf = [];
    let t = 0;
    let resultst = [];
    //$VARI$


    for (f; f < 3; f++) {
        resultsf += `<h2>
            ${f + '' + i}
            </h2>

`

        for (t; t < 3; t++) {
            resultst += `<h3>rafola</h3>

`

            //$NEXT$
        }
    }


    resultsI += ` <div>
        ${"etiopia - " + array[i]}
        ${results + f}${results + t}
        
        <h1>
            ${i}
        </h1>
    </div>`

}; return resultsI