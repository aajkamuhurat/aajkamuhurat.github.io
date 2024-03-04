async function processor(){


    colors = ["#F2C8CA", "#A5CC65", "#B6ADF4", "#F0B32A", "#77B4F2"]
    //     = [ Red     ,   Green  ,   Purpul ,   Yellow ,    Blue  ]

    try {
        if(localStorage.getItem("latlon") == null){
            A = await getlatlon("my location")
            localStorage.setItem("latlon", JSON.stringify(A))
        }else{
            A = JSON.parse(localStorage.getItem("latlon"))
        }
    }catch{
        A = await getlatlon("313001")
    }

    mdat = muhurat(new Date(), A[0], A[1])
    curr = new Date().getTime()

    alinm = []

    count = 0

    document.querySelector("#listallmuhurat").innerHTML = "<tr><th>Name</th><th>Start</th><th>End</th></tr>"

    for(var i = 0; i < mdat[0].length; i++){
        mdattime = mdat[0][i][2].getTime()
    
        if (curr < mdattime){
            
            mdat[0][i][1].toLocaleTimeString().split(" ")
            alinm.push(mdat[0][i])
            if(count >= 1 && count <= 5){
                console.log(count)
                elm = document.querySelector(`.upcomu:nth-child(${(count)}) > div`)
                elm.style.backgroundColor = alinm[count][5]
                elm.innerHTML =  `
                <span><img src="${alinm[count][6]}" /></span>
                <strong>${alinm[count][0]}</strong>
                `
                elm.innerHTML = `
                <span>${alinm[count][1].toLocaleTimeString()} <br> ${alinm[count][2].toLocaleTimeString()}</span>
                <strong>${alinm[count][0]}</strong>
                `
                elm.style.color = "black"
            }
            count += 1
            setTimeout(() => {
                location.reload()
            }, mdattime - curr)
        }

    }

    

    console.log(alinm)

    
    document.querySelector("#currmu").innerHTML = alinm[0][0]
    document.querySelector("#tldloader").style.backgroundColor = alinm[0][5]
    document.querySelector("#currmumean").innerHTML = alinm[0][4]
    document.querySelector("#currmutime").innerHTML = `${alinm[0][1].toLocaleTimeString()} - ${alinm[0][2].toLocaleTimeString()}`
    document.querySelector("#currmutime").style.backgroundColor = ""
    document.querySelector("#tlocationd").placeholder = A[2]


    return alinm = alinm

}

processor()





