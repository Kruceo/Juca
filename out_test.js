//test


//test

let i = 0;

let resultsi = [];


for (i; i < (window.array.length); i++) {

    let l = 0;

    let resultsl = [];


    for (l; l < window.array[i].types.length; l++) {
        //$VARI$


        //$NEXT$
        resultsl += `<h1>
                            ${(window.array[i].types[l].type.name)}
                        </h1>
`
    }
    //$SUB-H10$


    resultsi += ` <div id="box" key="7">
                <p> ${window.array[i].id}</p>
                <div class="img-box">
                    <img src="${window.array[i].sprites.other['official-artwork'].front_default}" alt="">
                </div>
                <div class="txt-box">

                    <p>
                        ${window.array[i].name}
                    </p>

                    <h3>
                        Types:
                    </h3>
                    <div id="types">
                        ${resultsl}

                    </div>
                </div>
            </div>`

};

//$SUB-DIV3$

return resultsi