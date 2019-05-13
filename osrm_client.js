//requires
var geolib = require('geolib');

// POI geojson from Berlin and Brandenburg
var obj = require('./POI_20190507.json');

// new array with all POI coordinates
var features = Object.values(obj)[4];
var formattedArray = features.map(obj => {
    var x = [];
    x = obj.geometry.coordinates;
    return x;
});
console.log(formattedArray);
//13.2774765, 52.5974537

module.exports = {
    
    // find closest POI to start A
    closestPOI: function  (fromA){
        var testCoords = [[5,5], [10.2,19.6], [60, 10]];

        // POI array
        var pois = formattedArray;

        var distFromCurrent = function(coordinates) {
            return {
                coordinates: coordinates, dist: geolib.getDistance(fromA, coordinates)
            };
        }

        var closest = pois.map(distFromCurrent).sort(function(a,b)  {
            return a.dist - b.dist
        })[0];

        console.log("Closest: " + closest.coordinates[0] + ", " + closest.coordinates[1]);
        return closest;
    },

    // route from A to POI
    routeToPoi: function (fromCoordinates, toCoordinates, callback){
        var baseUrl = 'http://router.project-osrm.org/';
        var urlPath = 'route/v1/driving/' + fromCoordinates + ';' + toCoordinates + '?alternatives=3';
        const request = require('request');
        request(baseUrl + urlPath, {
        json : true
        }, (err, res, body) => {
            if(err) {return console.log(err);}
            callback(body);
            console.log(body);
        });
    }
};