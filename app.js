// Bachelorthesis - Stefan Thiele @TUB

//requires
var osrm_client = require('./osrm_client');
var geojson = require('geojson');
var fs = require('fs');

// predefined routes
var routeStart = require('./json/Routes_Start.json');
var routeEnd = require('./json/Routes_End.json');

// get all coordinates from A and put them into a new array
var allRouteA = Object.values(routeStart)[0];
var aList = allRouteA.map(routeStart => {
    var a = [];
    a = routeStart.coordinates;
    return a;
});

// get all destination coordinates from B and put them into a new array
var allRouteB = Object.values(routeEnd)[0];
var bList = allRouteB.map(routeEnd => {
    var b = [];
    b = routeEnd.coordinates;
    return b;
});

// variables have to be change for each route
var routeStartCoord = aList[2];
var routeEndCoord = bList[2];

var findPoiToA = osrm_client.closestPOI(routeStartCoord);
var nearestPoiToA = findPoiToA.coordinates[0] + "," + findPoiToA.coordinates[1];
var parsePoiToA = JSON.parse('[' + nearestPoiToA + ']');
console.log(routeStartCoord);
console.log(routeEndCoord);
console.log('next POI to A:' + parsePoiToA);

// routing from Start to POI
osrm_client.routeToPoi(routeStartCoord,parsePoiToA, resultRouteFromAToPoi);
// routing from A to POI and parse some geojson
function resultRouteFromAToPoi (body) {

    osrm_client.routeToB(parsePoiToA,routeEndCoord, resultRouteFromPoiToB);

    var value = Object.values(body)[1];
    var arrayForParsingIntoGeoJSON = [];
    var steps = value.map(value => {
        return value.legs[0].steps;
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
    fs.writeFile("./json/Route1.json", json, (err) => {
        if (err) {
            console.error(err);
            return;
        };
    });

};

// vbb routing from POI to destination and parse some geojson
function resultRouteFromPoiToB (body) {

    var trip = Object.values(body)[0];
    trip = trip[0].LegList.Leg;

    var arrayWithAllLegs = [];

    for (let i = 0; i < trip.length; i++) {
        
        if (trip[i].type == "WALK") {
                        
            var lngOrigin = trip[i].Origin.lon;
            var latOrigin = trip[i].Origin.lat;

            arrayWithAllLegs.push([lngOrigin,latOrigin]); 
            
            var lngDestination = trip[i].Destination.lon;
            var latDestination = trip[i].Destination.lat;

            arrayWithAllLegs.push([lngDestination,latDestination]);

        } else {
            
            var x = trip[i].PolylineGroup.polylineDesc[0].crd;

            for (let j = 0; j < x.length; j++) {

                var spliced = x.splice(0,2);
                var lngStop = spliced[0];
                var latStop = spliced[1];

                arrayWithAllLegs.push([lngStop,latStop]);                    
            }
        }

    }

    // generate object for parsing
    var obj = [
        {
            line: arrayWithAllLegs
        }
    ];

    // parse into geojson
    var x = geojson.parse(obj, {
        'LineString': 'line'
    });

    test = JSON.stringify(x);
    fs.writeFile("./json/Route2.json", test, (err) => {
        if (err) {
            console.error(err);
            return;
        };
    });
};