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

    // // osrm map matching 
    // mapmatching: function (polyline, callback) {

    //     var baseUrl = 'http://localhost:5000/match/v1/driving/';
    //     var urlPath = polyline
    //     var props = '?steps=true&overview=full&annotations=true'

    //     request(baseUrl + urlPath + props, { json : true }, (err, res, body) => {
            
    //         if(err) {
    //             return console.log('MATCHING ERROR:', err);
    //         }
            
    //         console.log('Match:', baseUrl + urlPath + props);
    //         callback(body);

    //     });
    // },

    // // http://localhost:5000/match/v1/driving/?steps=true&overview=full&annotations=true&geometries=geojson&gaps=ignore&tidy=false&radiuses=20;20;20;20;20;20;20;20;20;20;20;20;20;20;20;20;20;20;20;20;20;20;20;20;20;20;20;20;20;20;20;20;20;20;20;20;20;20;20;20;20;20;20;20&timestamps=1514794935;1514794937;1514794938;1514794939;1514794941;1514794943;1514794946;1514794947;1514794949;1514794950;1514794952;1514794955;1514794957;1514794958;1514794959;1514794961;1514794962;1514794964;1514794965;1514794967;1514794968;1514794969;1514794972;1514794975;1514794976;1514794978;1514794981;1514794982;1514794984;1514794986;1514794989;1514794992;1514794994;1514794995;1514794997;1514794998;1514794999;1514795001;1514795017;1514795018;1514795021;1514795023;1514795025;1514795027


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
        var accessId = ';';
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