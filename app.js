// Bachelorthesis - Stefan Thiele @TUB

//requires
var osrm_client = require('./osrm_client');

// POI geojson from Berlin and Brandenburg
// relativen pfad angeben
var obj = require("/Users/ths2be/Desktop/BA/service/POI_20190507.json");

// new array with all POI coordinates
var features = Object.values(obj)[4];
var formattedArray = features.map(obj => {
    var x = [];
    x = obj.geometry.coordinates;
    return x;
});

// swap array entries to right geo coordinates for OSRM
var arrayLength = formattedArray.length;
for (var i = arrayLength; i--;) {
    var tmp = formattedArray[i][0];
    formattedArray[i][0] = formattedArray[i][1];
    formattedArray[i][1] = tmp; 
};


osrm_client.closestPOI([25,5]);

// callback: hier geht es dann weiter mit  der bvg
function resultCallback (body) {
    console.log('BVG starts here');    
};

osrm_client.routeToPoi('13.388860,52.517037','13.397634,52.529407', resultCallback);