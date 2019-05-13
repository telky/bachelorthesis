// Bachelorthesis - Stefan Thiele @TUB

//requires
var osrm_client = require('./osrm_client');

// swap array entries to right geo coordinates for OSRM
/* var arrayLength = formattedArray.length;
for (var i = arrayLength; i--;) {
    var tmp = formattedArray[i][0];
    formattedArray[i][0] = formattedArray[i][1];
    formattedArray[i][1] = tmp; 
}; */

var nearestPoiToA = osrm_client.closestPOI([13.454132,52.557986]);

// callback: hier geht es dann weiter mit  der bvg
function resultCallback (body) {
    console.log('BVG starts here');    
};

//osrm_client.routeToPoi('13.388860,52.517037','13.397634,52.529407', resultCallback);
osrm_client.routeToPoi(nearestPoiToA,'13.397634,52.529407', resultCallback);