// Google maps reference documentation: https://developers.google.com/maps/documentation/javascript/reference

// Initialize a Google Map and return the object
function initializeMap() 
{
	var mapOptions = {
		center: new google.maps.LatLng(36.843611, 10.197424), // Where to position the center of the map
		zoom: 12, // Zoom value from 0 to 21
		mapTypeId: google.maps.MapTypeId.ROADMAP // Type of the map ROADMAP, SATELLITE, HYBRID, TERRAIN
	};

	// Create and return the Map obeject with the canvas element (get it by id) and the options.
	return new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
}

// return object marker and added ut on the map at the location as specified in the paramaters
function addMarker(location, map) {

	return  new google.maps.Marker({
		position: location,
		map: map
	});
}

function addInfoWindow(contentString) {
	return new google.maps.InfoWindow({
	    content: contentString
	});
}

// When DOM is ready...
$(document).ready(function() {
	// Initialize map and save the returned object as map
	var map = initializeMap(),
		
		// Get INSAT position
		insat = new google.maps.LatLng(36.843611, 10.197424),
		// Create INSAT Marker
		marker = addMarker(insat, map),

		// Set the content string for the info window
		contentString = '<div id="content">'+
    'L\'insat ou (L\'institut nationale des sciences appliquées et des technologies!!!'+
    '</div>',

    	// Create info window for insat with the content string
		infoWindow = addInfoWindow(contentString);

	// windowIsOpen indicates whether the info window is open or not
    var windowIsOpen = false;
    // Add event listner for clicks on the marker
    google.maps.event.addListener(marker, 'click', function() {
    	if(windowIsOpen)
  		{
  			infoWindow.close();
  		}
  		else
  		{
  			infoWindow.open(map,marker);
  		}

  		// if closed => open if open => closed
  		windowIsOpen = !windowIsOpen;
	});

    // Get maps modal container
	var $mapsModalContainer = $('#maps-modal-container'),
		// Get maps modal reveal button
		$mapsModalReveal = $mapsModalContainer.find('#maps-modal-reveal');

	// When user clicks on the reveal button
	$mapsModalReveal.on('click',function() {
		// If not already revealed
		if (! $mapsModalContainer.hasClass('revealed'))	
		{
			// Add the class revealed to the container
			$mapsModalContainer.addClass('revealed');
		}
		else
		{
			// Remove the class revealed from the container
			$mapsModalContainer.removeClass('revealed');
		}
	});

	// When the user clicks on the modal box
	$mapsModalContainer.find('#maps-modal-box').on('click', function(e) {
		// if they clicked on the box only and not any other element in the box
		if (this === e.target) {
			// Remove the class revealed
			$mapsModalContainer.removeClass('revealed');
		}
	});

});