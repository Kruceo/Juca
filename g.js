let i = 0;
let resultsI = [];

for (i; i < 10; i++) {
    resultsI[i] = "<div>"


    resultsI[i] += "etiopia - " + i
    let f = 0;
    let resultsF = [];
    for (f; f < 10; f++) {
        resultsI[i] += "<rr>"


        resultsI[i] += "gggg " + f + i
        //$NEXT$
        resultsI[i] += "</rr>"
    };
    resultsI[i] += "</div>"
};
console.log(resultsI[4])