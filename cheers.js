if (Meteor.isClient) {
  Meteor.startup(function () {
    // set up autocomplete
    var autocomplete = new google.maps.places.Autocomplete(
      (document.getElementById('location-input')),
      { types: ['geocode'] }
    );
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
    });
  });

  Template.task.events({
  });

  Template.googleMaps.rendered = function () {
    // Create map
    var mapOptions = {
      center: new google.maps.LatLng(40.748433, -73.985655),
      zoom:13
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

    // Connecting to Google Maps API
    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();
    service = new google.maps.places.PlacesService(map);
    infoWindow = new google.maps.InfoWindow();

    directionsDisplay.setMap(map);

    var autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById('location-input')),
        { types: ['geocode'] }
      );
      google.maps.event.addListener(autocomplete, 'place_changed', function() {
    });

    // Add listener
  };

  function get_location() {
    if (Modernizr.geolocation) {
      navigator.geolocation.getCurrentPosition(show_map);
    } else {
      // no native support; maybe try a fallback?
    }
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

// function createAutocomplete(map, input) {
//   var autocomplete = new google.maps.places.Autocomplete(input);
//   autocomplete.bindTo('bounds', map);

//   // infoWindow = new google.maps.InfoWindow();
//   var marker = new google.maps.Marker({
//     map: map,
//     anchorPoint: new google.maps.Point(0, -29)
//   });

//   google.maps.event.addListener(autocomplete, 'place_changed', function() {
//     infoWindow.close();
//     var place = autocomplete.getPlace();
//     if (!place.geometry) {
//       return;
//     }

//     // If the place has a geometry, then present it on a map.
//     if (place.geometry.viewport) {
//       map.fitBounds(place.geometry.viewport);
//     } else {
//       map.setCenter(place.geometry.location);
//       map.setZoom(17);  // Why 17? Because it looks good.
//     }

//     var location = $('#location-input').val().trim();

//     marker.setIcon(/** @type {google.maps.Icon} */({
//       url: place.icon,
//       size: new google.maps.Size(71, 71),
//       origin: new google.maps.Point(0, 0),
//       anchor: new google.maps.Point(17, 34),
//       scaledSize: new google.maps.Size(35, 35)
//     }));
//     marker.setPosition(place.geometry.location);
//     marker.setVisible(true);

//     infoWindow.setContent(formatInfoWindowText(place));
//     infoWindow.open(map, marker);
//   });
// }

