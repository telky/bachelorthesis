//js with all functions

//requires
var geolib = require('geolib');

module.exports = {
    
    closestPOI: function  (current){
        var coords = [[5,5], [10.2,19.6], [60, 10]];

        var distFromCurrent = function(coord) {
            return {
                coord: coord, dist: geolib.getDistance(current, coord)
            };
        }

        var closest = coords.map(distFromCurrent).sort(function(a,b)  {
            return a.dist - b.dist
        })[0];

        console.log("Closest: " + closest.coord[0] + ", " + closest.coord[1]);
        return closest;
    },

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