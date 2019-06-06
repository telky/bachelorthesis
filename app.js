// Bachelorthesis - Stefan Thiele @TUB

//requires
var osrm_client = require('./osrm_client');
var geojson = require('geojson');
var fs = require('fs');

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
// console.log(parsePoiToA);

// routing from Start to POI
osrm_client.routeToPoi(aList[0],parsePoiToA, resultRouteFromAToPoi);

// routing from A to POI and parse some geojson
function resultRouteFromAToPoi (body) {

    osrm_client.routeToB(aList[0],bList[0], resultRouteFromPoiToB);

    var test = Object.values(body)[1];
    var arrayForParsingIntoGeoJSON = [];
    var steps = test.map(body => {
        return body.legs[0].steps;
    });

    steps = steps[0];
    
    // find all nodes 
    for (let i = 0; i < steps.length; i++) {
        var element = steps[i];
        
        //name of each street
        //var name = element.name;

        var lng = element.intersections[0].location[0];
        var lat = element.intersections[0].location[1];

        arrayForParsingIntoGeoJSON.push([lng,lat]);
    }

    // POI
    var lngPoint = findPoiToA.coordinates[0];
    var latPoint = findPoiToA.coordinates[1];
    console.log(lngPoint);
    console.log(latPoint);

    // generate object for parsing
    var obj = [
        {
            x: latPoint,
            y: lngPoint,
            "marker-color": "#0ba802",
            "marker-size": "medium",
            "marker-symbol": "parking"
        },
        {
            line: arrayForParsingIntoGeoJSON,
            "stroke": "#000000",
            "stroke-width": 5,
            "stroke-opacity": 1,
            "name": "driving"
        }
    ];

    // parse into geojson
    var x = geojson.parse(obj, {
        'Point': ['x', 'y'],
        'LineString': 'line'
    });

    var json = JSON.stringify(x);
    fs.writeFile("./driving.json", json, (err) => {
        if (err) {
            console.error(err);
            return;
        };
        console.log("File has been created");
    });

};

// vbb routing from POI to destination and parse some geojson
function resultRouteFromPoiToB (body) {
    console.log('Routing vom POI zu B!');
    // console.log(body);   

};

// geojson mapping