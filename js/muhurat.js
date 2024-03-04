function muhurat (date, latitude, longitude){

    var date = new Date(date);
    var date2 = new Date(date.getTime() + 86400000)

    var daynum = date.getDay()

    var meanntodo = {
        "Amrit": {
            "activities": ["Highly auspicious", "Best to begin new work"],
            "meaning": "Amrit choghadiya is the time under influence of the moon. It's regarded as a very auspicious time in Hindu Astrology.",
            "color" : "#67eba9",
            "img" : ""
        },
        "Shubh": {
            "activities": ["Auspicious", "Best time for determining marriage dates"],
            "meaning": "Shubh Choghadiya is the time under influence of Jupiter. It's regarded as a good time to conduct ceremonies especially marriage ceremony.",
            "color" : "#67eba9",
            "img" : ""
        },
        "Labh": {
            "activities": ["Auspicious", "Best to start studying a new course or skill"],
            "meaning": "Labh Choghadiya is the time under influence of Mercury. It's an auspicious & fruitful time to start any new learning or acquiring a new skill or to start education or a course.",
            "color" : "#67eba9",
            "img" : ""
        },
        "Char": {
            "activities": ["Good", "Best time to travel"],
            "meaning": "Char Choghadiya I'd associated with the planet Venus. Char also known as Chancal is considered an auspicious time. Since Venus is the planet of movement, this muhurat helps in determining the best time to travel.",
            "color" : "#B6ADF4",
            "img" : ""
        },
        "Udveg": {
            "activities": ["Has adverse effects", "Beneficial in government related matters"],
            "meaning": "Udveg choghadiya is the time under the influence of Sun. It's advisable to avoid auspicious work or new starts during Udveg. \n However, it's considered beneficial for government related jobs.",
            "color" : "#F2C8CA",
            "img" : ""
        },
        "Kaal": {
            "activities": ["Avoid doing auspicious work", "Wealth accumulation work can be performed"],
            "meaning": "Kaal Choghadiya is associated with plannet Saturn. Most auspicious work should be done during this time. However, One can perform such work which is expected to result in accumulation of wealth or related to it.",
            "color" : "#F2C8CA",
            "img" : ""
        },
        "Rog": {
            "activities": ["Avoid any auspicious work", "Recommended for the purpose of defeating the enemy"],
            "meaning": "Rog Choghadiya is associated with Mars. Marks is considered to have negative energy as per Hindu Vedic Astrology. However, Rog Choghadiya is often recommended at the time of War, or if one wants to defeat their enemy.",
            "color" : "#F2C8CA",
            "img" : ""
        }
    }
        
    var dayname = ["Udveg","Char","Labh","Amrit","Kaal","Shubh","Rog"]
    var nightname = ["Shubh","Amrit","Char","Rog","Kaal","Labh","Udveg"]
    
    _d1 = Suntime(date, latitude, longitude)
    _d2 = Suntime(date2, latitude, longitude)
    var sunrise = _d1.sunrise
    var sunset = _d1.sunset
    var sunrise2 = _d2.sunrise

    console.log(sunrise, sunset)
    
    var daylength = (sunset - sunrise)/8
    var nightlength = (sunrise2 - sunset)/8
    
    var mode = 0
    
    var obj = []
    var rh = 1

    for (let i = 0; i < 8; i++) {
    
        if (mode == 0){
            var cnamestart = daynum*3
            var startTime = new Date(sunrise.getTime() + i * daylength);
            var endTime = new Date(startTime.getTime() + daylength);
            var cname = dayname
        }else {
            var cnamestart = daynum*2
            var startTime = new Date(sunset.getTime() + i * nightlength);
            var endTime = new Date(startTime.getTime() + nightlength);
            var cname = nightname
        }
    
        _cname = cname[(cnamestart + i)%cname.length]
        obj.push([
            _cname,
            startTime,
            endTime, 
            meanntodo[_cname].activities,
            meanntodo[_cname].meaning, 
            meanntodo[_cname].color,
            meanntodo[_cname].img
        ])

        if(i == 7 && mode == 0){

            obj[date.getDay()+1][0] += "/Rahu"
            mode = 1;
            i = -1;

        }

    }

    if (date.getTime() < sunrise.getTime()){
        previous = muhurat (date.getTime() - 12*60*60*1000, latitude, longitude) // It can be improved as I am calling the whole previous day muhurats
        obj = previous[0].concat(obj)
        console.log(obj)
    }

    rahu = sunset.getTime() - sunrise.getTime()
    rahd = rahu/8
    raht = sunrise.getTime() + (rahd*(date.getDay()+1))

    return ([obj, raht])

}


//main("2023-09-17",latitude,longitude)