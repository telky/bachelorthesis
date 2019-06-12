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

var findPoiToA = osrm_client.closestPOI(aList[0]);
var nearestPoiToA = findPoiToA.coordinates[0] + "," + findPoiToA.coordinates[1];
var parsePoiToA = JSON.parse('[' + nearestPoiToA + ']');
// console.log(parsePoiToA);

// routing from Start to POI
osrm_client.routeToPoi(aList[0],parsePoiToA, resultRouteFromAToPoi);

// routing from A to POI and parse some geojson
function resultRouteFromAToPoi (body) {

    osrm_client.routeToB(aList[0],bList[0], resultRouteFromPoiToB);

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
        // const trips = trip[i];
        
        if (trip[i].type == "WALK") {
                        
            var lngOrigin = trip[i].Origin.lon;
            var latOrigin = trip[i].Origin.lat;

            arrayWithAllLegs.push([lngOrigin,latOrigin]); 
            
            var lngDestination = trip[i].Destination.lon;
            var latDestination = trip[i].Destination.lat;

            arrayWithAllLegs.push([lngDestination,latDestination]);

        } else {
            
            var x = trip[i].Stops.Stop;

            for (let j = 0; j < x.length; j++) {

                var lngStop = x[j].lon;
                var latStop = x[j].lat;

                arrayWithAllLegs.push([lngStop,latStop]);
                
            }
        }
    }

    // generate object for parsing
    var obj = [
        // {
        //     line: array,
        //     "marker-color": "#0ba802",
        //     "marker-size": "medium",
        //     "marker-symbol": "parking"
        // },
        {
            line: arrayWithAllLegs,
            "stroke": "#FF6767",
            "stroke-width": 5,
            "stroke-opacity": 1,
            "name": "vbb"
        }
    ];

    // parse into geojson
    var x = geojson.parse(obj, {
        'LineString': 'line'
    });

    var json = JSON.stringify(x);
    fs.writeFile("./json/Route2.json", json, (err) => {
        if (err) {
            console.error(err);
            return;
        };
    });
};

// geojson mapping