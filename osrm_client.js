// Bachelorthesis - Stefan Thiele @TUB

//requires
const geolib = require('geolib');
const request = require('request');

// POI geojson from Berlin and Brandenburg
 var obj = require('./json/POI_20190507.json');

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

    // Route from A to POI
    routeToPoi: function (fromCoordinates, toCoordinates, callback){

        var baseUrl = 'http://localhost:5000/';
        var urlPath = 'route/v1/driving/' + fromCoordinates + ';' + toCoordinates + '?alternatives=3&steps=true';
        
        request(baseUrl + urlPath, { json : true }, (err, res, body) => {

            if(err) {
                return console.log('POI ERROR:', err);
            }
            
            console.log('OSRM:', baseUrl + urlPath);
            callback(body);

        });
    },

    // VBB API: routing from POI to B
    routeToB: function (fromCoordinates, toCoordinates, callback) {
        
        var baseUrl = 'http://demo.hafas.de/openapi/vbb-proxy/trip?';
        var fromLat = 'originCoordLat=';
        var fromLatCoords = fromCoordinates[1];
        var fromLong = 'originCoordLong=';
        var fromLongCoords = fromCoordinates[0];
        var destLat = 'destCoordLat=';
        var destLatCoords = toCoordinates[1];
        var destLong = 'destCoordLong=';
        var destLongCoords = toCoordinates[0];
        var accessId = ';format=json;accessId=bosch-Thiele-4035-900f-29403c078264';
        var poly = 'poly=1;'

        // sets the departure date for the search (default: server date)
        // var date = '20190611';

        // sets the departure time for the search (default: server time)
        // var time = '13:05:56';


        request(baseUrl + poly + fromLat + fromLatCoords + ';' + fromLong + fromLongCoords + ';' + destLat + destLatCoords + ';' + destLong + destLongCoords + accessId, { json : true}, (err, res, body) => {

            if(err) {
                return console.log('VBB ERROR:',err);
            }
            console.log('VBB URL:', baseUrl + poly + fromLat + fromLatCoords + ';' + fromLong + fromLongCoords + ';' + destLat + destLatCoords + ';' + destLong + destLongCoords + accessId);
            callback(body);

        });
    }
};