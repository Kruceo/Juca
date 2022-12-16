(async function anonymous(
    ) {
    //test
    
    
    //test
    
    let i = 0;
    
    let resultsi = [];
    
    
    for(i;i< (window.filter.length) ;i++){
       
    let l = 0;
    
    let resultsl = [];
    
    
    
    for(l;l < window.filter[i].types.length;l++){
    //$VARI$
       
    
    //$NEXT$
    resultsl += `<h1>
                                ${(window.filter[i].types[l].type.name)}
                            </h1>
    `
    }
    //$SUB-H10$
    
    
    resultsi += ` <div id="box" watch="window.filter.length" style="background: linear-gradient(45deg, ${ (window.colors[window.filter[i].types[0].type.name])+' 20% ,'+(window.colors[    (   window.filter[i].types[1] ? window.filter[i].types[1] : 0    ) ]  )+ ' 120%' });" key="8">
                    <p> ${ window.filter[i].id}</p>
                    <div class="img-box">
                        <img src="${ window.filter[i].sprites.other['official-artwork'].front_default }" alt="">
                    </div>
                    <div class="txt-box">
    
                        <p>
                            ${ window.filter[i].name }
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
    })