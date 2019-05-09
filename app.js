// Bachelorthesis - Stefan Thiele @TUB

// POI geojson from Berlin and Brandenburg
var obj = require("/Users/ths2be/Desktop/BA/service/POI_20190507.json");
var features = Object.values(obj)[4];

// new array with all POI coordinates
var formattedArray = features.map(obj => {
    var x = {};
    x[obj.geometry.coordinates] = obj.value;
    return x;
});


console.log(formattedArray);

// BE call
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var xmlhttp = new XMLHttpRequest();
var be = 'http://www.google.de';
var bvg = '';
xmlhttp.open('GET', be, true);
xmlhttp.onreadystatechange = function(response) {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        console.log('Bingo');
    } else {
        console.log('Something went wrong! MÖP!');
    }
};
xmlhttp.send();