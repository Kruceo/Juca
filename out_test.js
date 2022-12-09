//test


//test

let i = 0;

let resultsi = [];


for(i;i< window.array.length ;i++){
   
let d = 0;

let resultsd = [];



for(d;d < array[i].stars;d++){
//$VARI$
   

//$NEXT$
resultsd += `<img id="star" src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png" alt="">
`
}
//$SUB-IMG0$


resultsi += ` <div id="box">
                <div class="img-box">
                    <img src="${array[i].photo}" alt="">
                </div>
                <div class="txt-box">
                    <p>
                        ${array[i].name}
                    </p>

                    <h3>
                        A vista no pix:
                    </h3>
                    <h1>
                        R$${array[i].price.toFixed(2)}
                    </h1>
                    ${resultsd}

                    <div id="cart">
                        <img src="https://cdn-icons-png.flaticon.com/512/4379/4379575.png" alt="">
                    </div>
                </div>


            </div>`

};

//$SUB-DIV2$

return resultsi