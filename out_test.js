//test


//test

let f = 0;

let resultsf = [];


for (f; f < 4; f++) {

    let t = 0;

    let resultst = [];



    for (t; t < 2; t++) {
        //$VARI$


        //$NEXT$
        resultst += `<header>
                ${"TESTE - " + t}
            </header>
`
    }
    let g = 0;
    let resultsg = [];
    
    for (g; g < 3; g++) {
        //$VARI$


        //$NEXT$
        resultsg += `<header>
                ${g}
            </header>
`
    }
    //$SUB-HEADER0$


    resultsf += ` <h2>
            ${f + ' + ' + f + ' = ' + (f + f)}

            ${resultst}

            ${resultsg}

        </h2>`

};

//$SUB-H22$

return resultsf