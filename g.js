let i = 0;
let resultsI = [];


for (i; i < 10; i++) {

    let f = 0;
    let resultsF = [];
    //$VARI$


    for (f; f < 10; f++) {
        resultsF += `<rr for="0,5,f">
            ${f + '' + i}

        </rr>

`

        //$NEXT$
    }


    resultsI[i] += `<div for="0,2,i">
        ${"etiopia - " + i}
        ${resultsF}
        <h1>
            ${i}
        </h1>
    </div>`

};