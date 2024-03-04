async function getlatlon(d, t=0){

    ll =  fetch("https://maps.google.com/maps?q="+d+"&t=&ie=UTF8&iwloc=&output=embed")
    .then(e => {return e.text()})
    .then(async e => {

        eval(`var locdataa = ${e.match(/initEmbed\((.*?)\)/)[1]}`)
        
        if (t == 0){

            locdataa = locdataa[21][3][0]
            
            proploc = await getlatlon(`${locdataa[2][0]}, ${locdataa[2][1]}`, 1)

            ll = [locdataa[2][0], locdataa[2][1], proploc.match(/[^,]+,\s*([^,]+)$/)[0]]

            return ll
        }else{
            return locdataa[21][3][13]
        }
        
    })

    return await ll

}

function getdashdate(date){

    var now = new Date(date);
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var year = now.getFullYear()
    
    return `${year}-${month}-${day}`
    
}