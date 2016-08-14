var map;
var initMap = () => {
	map = new google.maps.Map(document.getElementById('festivals'), {
	  center: {lat: -34.397, lng: 150.644},
	  zoom: 8
	});
}