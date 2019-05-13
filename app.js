// Bachelorthesis - Stefan Thiele @TUB

//requires
var osrm_client = require('./osrm_client');

// predefined routes
var routeA = require('./RoutesA.json');
var routeB = require('./RoutesB.json');

// get all coordinates from A and put them into a new array
var allRouteA = Object.values(routeA)[0];
var aList = allRouteA.map(routeA => {
    var x = [];
    x = routeA.coordinates;
    return x;
});

console.log('From A: ' + aList[0]);

// TODO: für jede aList[i] den nächsten POI finden
var findPoiToA = osrm_client.closestPOI(aList[0]);
var nearestPoiToA = findPoiToA.coordinates[0] + "," + findPoiToA.coordinates[1];
console.log('To POI: ' + nearestPoiToA);

// callback: hier geht es dann weiter mit  der bvg
function resultCallback (body) {
    console.log('BVG starts here');    
};

// TODO: von jedem POI zum aList[i] routen
osrm_client.routeToPoi(aList[0],nearestPoiToA, resultCallback);

//osrm_client.routeToB('var_von_POI', 'var_zum_B', 'callback_was_danach_mit_der_route_getan_werden_soll');