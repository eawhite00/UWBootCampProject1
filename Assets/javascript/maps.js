var map, infoWindow;

function initMap() {
    // This sets the starting location at Seattle, just in case geolaction doesn't work.
    var seattle = { lat: 47.6, lng: -122.3 };
    // The map is displayed
    map = new google.maps.Map(
        document.getElementById('map'), { zoom: 7, center: seattle });

    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('You are here!');
        infoWindow.open(map);
        map.setCenter(pos);

        }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {    
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

}