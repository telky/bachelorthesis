//requires
const geolib = require('geolib');
const request = require('request');

// POI geojson from Berlin and Brandenburg
var obj = require('./POI_20190507.json');

// get all coordinates from POI and put them into a new array
var features = Object.values(obj)[4];
var poiList = features.map(obj => {
    var x = [];
    x = obj.geometry.coordinates;
    return x;
});

module.exports = {
    
    // find closest POI to start A
    closestPOI: function  (fromA){

        // POI array
        var pois = poiList;

        var distFromCurrent = function(coordinates) {
            return {
                coordinates: coordinates, dist: geolib.getDistance(fromA, coordinates)
            };
        }

        var closest = pois.map(distFromCurrent).sort(function(a,b)  {
            return a.dist - b.dist
        })[0];

        return closest;
    },

    // route from A to POI
    routeToPoi: function (fromCoordinates, toCoordinates, callback){

        var baseUrl = 'http://localhost:5000/';
        var urlPath = 'route/v1/driving/' + fromCoordinates + ';' + toCoordinates + '?alternatives=3';
        
        request(baseUrl + urlPath, { json : true }, (err, res, body) => {

            if(err) {
                return console.log(err);
            }

            callback(body);
            console.log(body);
        });
    },

    // TODO route from POI to B, VBB endpoint
    routeToB: function (fromCoordinates, toCoordinates, callback) {
        
        var baseUrl = '';
        var urlPath = '';
        request(baseUrl + urlPath, { json : true}, (err, res, body) => {

            if(err) {
                return console.log(err);
            }

            callback(body);
            //console.log(body);
        });
    }
};