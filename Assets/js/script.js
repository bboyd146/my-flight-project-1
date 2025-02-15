// Grabbing ids of elements to insert data
var alarmSet = $('#pastAlarms');
var currentW = $('#weather-tab');
var headerTitle = $('#subtitle');
var songEl = $('#music');
var removeBtn = $('#remove');
// modal ids
var amSet = $('#am');
var pmSet = $('#pm');
var addTBtn = $('#add-time');
var userHrs = $("#hours").val().trim();
console.log(userHrs)
var userMins = $('#minutes').val().trim();
var setAP = userHrs + ":" + userMins + " " + amOrpm;
var amOrpm = $('input[name="foobar"]:checked').parent('label').text().trim();


// Var to display current date and time
let momentHead = moment().format("dddd, MMMM Do YYYY, h:mm A");
var momentAlarm = moment().format("h:mm A");
var momentWeathr = "dddd, MMMM Do YYYY";
var currentHr = parseInt(moment().format('h hh'));
console.log(currentHr);
var currentMn = parseInt(moment().format('m mm'));
console.log(currentMn);

// var a = parseInt(userHrs);
// var b = parseInt(userMins)
// console.log(a);
// console.log(b);
moment();


// inserting moment in elements
headerTitle.text(momentHead);

const alarms = [];
var savedTimes = localStorage.getItem('Saved Alarms');

if (savedTimes !== null) {
    console.log('Test')
    alarms.push(...JSON.parse(savedTimes));
}

function checkAlarm () {
    if (momentAlarm === setAP) {
        $('#music').trigger('play');
    }
}

setInterval(checkAlarm, 60000);
checkAlarm();




console.log(momentAlarm);
// console.log(setAP)
displaySavedAlarms();



// Event Listener
addTBtn.on('click', writeAlarms)

function writeAlarms() {

    var userHrs = $("#hours").val().trim();
    var userMins = $('#minutes').val().trim();
    var amOrpm = $('input[name="foobar"]:checked').parent('label').text().trim();
    var setAP = userHrs + ":" + userMins + " " + amOrpm;
    alarms.push(setAP);
    console.log(setAP)

    localStorage.setItem('Saved Alarms', JSON.stringify(alarms));

    displaySavedAlarms();
    checkAlarm();
}



function displaySavedAlarms() {
    alarmSet.empty();
    for (let i = 0; i < alarms.length; i++) {
        var alarmLi = $('<div>');
        var alarmSpan = $('<span>');
        var alarmBtn = $('<button>');
        alarmLi.addClass('m-auto p-auto');
        alarmLi.attr('id', 'alarm-div');
        alarmSpan.addClass('tag is-danger is-large');
        alarmBtn.addClass('delete');
        alarmBtn.attr('id', 'remove');



        alarmLi.append(alarms[i]);
        alarmSpan.append(alarmBtn);
        alarmLi.append(alarmSpan);
        alarmSet.append(alarmLi);
    }

    var a = parseInt($('#minutes').val());
    var b = parseInt($('#hours').val());
    console.log(a);
    console.log(b);

    if (b === currentHr && a === currentMn) {
        console.log('it worked');
        $('#music').trigger("play");
        // $('#music').get(0).play();
        StopAlarm();
    }
}


// Remove set alarm function
$('button').on('click', function () {
    if (this.id == 'remove') {
        console.log('clicked');
        $('#alarm-div').remove();
        localStorage.removeItem('Saved Alarms').includes(alarms, 0);
    }
})

// var a = parseInt($('#minutes').val());
// var b = parseInt($('#hours').val());
// console.log(a);
// console.log(b);

// if (b === currentHr && a === currentMn) {
//     console.log('it worked');
//     // songEl.play();
//     $('#music').trigger('play');
//     // $('#music').get(0).play();
//     StopAlarm();
// };
function StopAlarm() {
    var stopSong = $('<button>');
    stopSong.addClass('button is-danger is-large is-fullwidth is-rounded is-focused');
    stopSong.attr('id', 'stop-song');
    stopSong.text('STOP ALARM');
    alarmSet.append(stopSong);

    $('#stop-song').click(function () {
        if (this.id == 'stop-song') {
            $('#music').trigger('pause');
        }

    });
}

// code for stop alarm button
{/* <button class="button is-danger is-large is-fullwidth is-rounded is-focused">STOP ALARM</button> */ }


const weather = [];
console.log(weather)
var userCities = localStorage.getItem('Saved City');
console.log(userCities)
if (userCities !== null) {
    console.log('Test')
    weather.push(...JSON.parse(userCities));
}


// Function to search for city weather based on weather
$('#add-city').on('click', function () {
    var cityInput = $('#cityset').val();
    console.log(cityInput)
    localStorage.setItem('Saved City', JSON.stringify(weather));
    var article = document.createElement("article")
    article.classList.add("tile", "is-child", "notification", "is-info")
    article.setAttribute("id", "weather-content")
    var currentCity = document.createElement("h3")
    currentCity.classList.add("title")
    currentCity.innerText = $('#cityset').val();
    var root = document.getElementById("weather-tab")
    root.appendChild(article)
    article.appendChild(currentCity)
    setWeather($('#cityset').val())
    weather.push(cityInput);
})


//function to display the current weather and forecast
function render(data3) {
    var currentDate = document.createElement("span")
    currentDate.innerText = moment.unix(data3.date).format(momentWeathr)
    var currentWeather = document.createElement("p")
    currentWeather.innerText = "temp: " + data3.temp + " ˚F"
    var root = document.getElementById("weather-content")
    root.appendChild(currentDate)
    root.appendChild(currentWeather)
}

var weatherKey = "259bd6474c5faa56865476f0e7617266";
//Weather API
function setWeather(x) {
    var weatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + x + "&units=imperial&appid=" + weatherKey + "";
    fetch(weatherAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var lon = data.coord.lon;
            var lat = data.coord.lat;
            console.log({ lon, lat });
            var dataWeatherAPI = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=minutely,hourly,alerts&appid=" + weatherKey + "";
            fetch(dataWeatherAPI)
                .then(function (response) {
                    return response.json();
                })

                .then(function (data2) {
                    console.log(data2);

                    for (let index = 0; index < 5; index++) {
                        var day = data2.daily[index];
                        var obj = {
                            temp: day.temp.day,
                            date: day.dt
                        }
                        render(obj)
                    }
                })
        })
}

// //Deezer API - Track
// fetch("https://deezerdevs-deezer.p.rapidapi.com/track/1109737", {
//     "method": "GET",
//     "headers": {
//         "x-rapidapi-key": "Ut55yncQpLmshFtmNkz05x0K4gZ7p1lfFWzjsnuN3hmhNoFgqU",
//         "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
//     }
// })
//     .then(function (response) {
//         return response.json()
//     })
//     .then(function (data) {
//         console.log(data);
//     })

//Deezer API - Playlist
fetch("https://deezerdevs-deezer.p.rapidapi.com/playlist/1699332611", {
    "method": "GET",
    "headers": {
        "x-rapidapi-key": "fc59fffe7fmshcb89d5a6a9a2b0dp186e8bjsna0d4d2f97c64",
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
    }
})
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        console.log(data);
        console.log(data.tracks.data[0].preview)
        for (var i = 0; i < data.tracks.data.length; i++) {
            var src = data.tracks.data;
            var randSrc = Math.floor(Math.random() * src.length);
            var song = src[randSrc].preview;
            // console.log(song)
            $('#src').attr('src', song);
            // console.log(src)
        }
    })
// code for stop alarm button
{/* <button class="button is-danger is-large is-fullwidth is-rounded is-focused">STOP ALARM</button> */ }

//Show Alarm Modal
var modal1 = $("#alarm-modal");

$("#setAlarm").on("click", function () {
    modal1.show();
});
$(".delete").on("click", function () {
    modal1.hide();
});

// Show City Modal
var modal2 = $("#city-modal");

$("#setCity").on("click", function () {
    modal2.show();
});
$(".delete").on("click", function () {
    modal2.hide();
});


// Show About Us Modal
var modal3 = $("#about-us-modal");

$("#aboutUs").on("click", function () {
    modal3.show();
});
$(".delete").on("click", function () {
    modal3.hide();
});


// $('#remove').click(function () {
//     if (this.id == 'remove') {
//         $('#alarm-div').remove();
//     }
// });
// })




// Burger icon 
$('.navbar-burger').click(function () {
    $('#navbarMenuHeroA, .navbar-burger').toggleClass('is-active');
});