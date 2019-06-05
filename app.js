// Bachelorthesis - Stefan Thiele @TUB

//requires
var osrm_client = require('./osrm_client');
var geojson = require('geojson');

// predefined routes
var routeA = require('./RoutesA.json');
var routeB = require('./RoutesB.json');

// get all coordinates from A and put them into a new array
var allRouteA = Object.values(routeA)[0];
var aList = allRouteA.map(routeA => {
    var a = [];
    a = routeA.coordinates;
    return a;
});

// get all destination coordinates from B and put them into a new array
var allRouteB = Object.values(routeB)[0];
var bList = allRouteB.map(routeB => {
    var b = [];
    b = routeB.coordinates;
    return b;
});

var findPoiToA = osrm_client.closestPOI(aList[0]);
var nearestPoiToA = findPoiToA.coordinates[0] + "," + findPoiToA.coordinates[1];
var parsePoiToA = JSON.parse('[' + nearestPoiToA + ']');
console.log(parsePoiToA);

// routing from Start to POI
osrm_client.routeToPoi(aList[0],parsePoiToA, resultRouteFromAToPoi);

// routing from POI to Destination and parse some geojson
function resultRouteFromAToPoi (body) {

    osrm_client.routeToB(aList[0],bList[0], resultRouteFromPoiToB);

    var test = Object.values(body)[1];

    var steps = test.map(body => {
        return body.legs[0].steps;
    });

    console.log(steps[0]);


    for (let i = 0; i < steps.length; i++) {
        var element = steps[i];
        var name = element[i].name;
        var coords = element[i].intersections[0].location;
        console.log(name);        
        console.log(coords);
    }
    // geojson.parse();
};

// vbb routing and parse some geojson
function resultRouteFromPoiToB (body) {
    console.log('Routing vom POI zu B!');
    // console.log(body);   

};

// geojson mapping