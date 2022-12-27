let resultsunit = "";
//(H20)

window.arr.forEach(unit => {

    let resultsaaAA = "";
    //(DIV1)
    //0000H21616

    unit.text.forEach(aaAA => {

        let resultsccCC = "";
        //(DIV2)
        //000DIV2340

        unit.text.forEach(ccCC => {
            //$VARI000DIV3175$

            //$NEXT000DIV3175$

            resultsccCC += `<div id="C" style="display: flex;margin: 0 0;background-color: #888 ; font-size: 19px;" foreach="unit.text;ccCC">┗[
                ${ccCC}
              
            </div>`
        })
        //$SUB-000DIV2340$

        resultsaaAA += `<div id="A" style="display: flex;margin: 0 0;background-color: #888 ; font-size: 19px;" foreach="unit.text;aaAA">┗[
            ${aaAA}
            ${resultsbbBB}

        </div>`
    })

    let resultsbbBB = [];
    //0000H21616
    unit.text.forEach(bbBB => {
        //$VARI0000H21616$

        //$NEXT0000H21616$
        resultsbbBB += `<div id="B" style="display: flex;margin: 0 0;background-color: #888 ; font-size: 19px;" foreach="unit.text;bbBB">┗[
            ${bbBB}
            
        </div>`
    })
    //$0000H21616$

    resultsunit += `<h2 foreach="window.arr;unit" watch="window.arr.toString()" key="1">${unit.title}

        ${resultsaaAA}

        ${resultsccCC}

    </h2>`
})
//$SUB-00BODY0777$


return resultsunit