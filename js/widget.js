var tld = document.querySelector("#tld")
var tlocationd = document.querySelector("#tlocationd")
var tldatedate = document.querySelector("#tldatedate")
var tldateday = document.querySelector("#tldateday")

var tldloader = document.querySelector("#tldloader")







var today = new Date()
strt = new Date(alinm[0][1]).getTime()
endt = new Date(alinm[0][2]).getTime()
    

tssa = setInterval(() => {
    cuurtime = new Date()
    timeld.innerHTML = cuurtime.toLocaleTimeString()
    tldloader.style.width = `${100-(endt-cuurtime.getTime())*100/(endt-strt)}%`
},1000)


tldatedate.value = getdashdate(today)
tldateday.innerHTML = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][today.getDay()]
document.querySelector("#currdate").innerHTML = today.toDateString().slice(3)





function opendatepicker(elm){
    document.querySelector("#tldatedate").showPicker()
}

function changedatelm(){

    elm = document.querySelector("#tldatedate")
    listallmuhu(elm.value)
    document.querySelector("#allmupopup").style.display = ''
    tldatedate.value = getdashdate(today)

}

function showpopup(){
    return
}

async function updatelocation(){

    A = await getlatlon(`${document.querySelector("#tlocationd").value}`)
    document.querySelector("#tlocationd").value = ""
    console.log(A)
    localStorage.setItem("latlon", JSON.stringify(A))
    processor()
}


function listallmuhu(date){
    document.querySelector('#lisofdes').innerHTML = `The below list of muhurats for ${new Date(date).toDateString().slice(3)}`
    data = muhurat(date, A[0], A[1])[0].filter(e => getdashdate(e[1]) == date)
    document.querySelector("#listallmuhurat").innerHTML = `<tr><th>Name</th><th>Start</th><th>End</th></tr>`
    for(var i = 0; i < data.length; i++){

        ci = data[i][1].toLocaleTimeString().split(/:|\s/)
        ci = ('0' + ci[0]).slice(-2) + ':' + ci[1] + " " + ci[3]

        cf = data[i][2].toLocaleTimeString().split(/:|\s/)
        cf = ('0' + cf[0]).slice(-2) + ':' + cf[1] + " " + cf[3]

        document.querySelector("#listallmuhurat").innerHTML += `<tr><td>${data[i][0]}</td><td>${ci}</td><td>${cf}</td></tr>`
    }

}
