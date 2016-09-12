var festivalMap;
var lastMarker;
var marker = [];
var previousID;

document.getElementById( 'festivals-content' ).style.display = 'none';

window.onload = function(){

	FestivalsLoad();
	IsLoggedIn();
	
}

function InitMap() {
	
	//initialize google map on festival page on load
	festivalMap = new google.maps.Map( document.getElementById( 'festivals-map' ), {
	  zoom: 8
	});


}

function FestivalsLoad() {

	//Onload, get the list of festivals from server
	GetRequest( '/getFestivals', undefined, ( status, data ) => {

		//if get request is successful, then create a google maps marker
		if ( status == 200 ){	
			//set data to festivals
			let festivals = JSON.parse( data );
			//for each of the events in festivals.
			let events = festivals.events;
			//set parent to 'festivals' id
			let parent = document.getElementById('festivals');

			for ( let beerEvent = 0; beerEvent < events.length; beerEvent++ ){
				//create necessary document elements
				let div = document.createElement( 'div' );
				let li = document.createElement( 'li' );
				let h1 = document.createElement( 'h1' );
				let p = document.createElement( 'p' );

				//setting text content of document elements
				h1.textContent = events[beerEvent].title;
				p.textContent = events[beerEvent].location;

				//append h1 and p tags to list
				li.appendChild( h1 );
				li.appendChild( p );
				//then append list item to div
				div.appendChild( li );

				if ( events[beerEvent].location != 'N/A' ) {
					//if the lat long coordinates exist, make a marker and attribute
					marker.push( CreateMarker( events[beerEvent] ) );
					div.setAttribute( "value", events[beerEvent]._id );
					div.setAttribute( "id", beerEvent );
					div.setAttribute( "onmouseover", "OpenInfoWindow( this.getAttribute( 'value' ), this.getAttribute( 'id' ) )" );
				}

				//append to 'festivals' ul
				parent.appendChild( div );
			}
		}
	});

	document.getElementById( 'festivals-content' ).style.display = 'block';	
	google.maps.event.trigger( festivalMap, 'resize' );
	festivalMap.setCenter( new google.maps.LatLng( 39.244785, -105.511852 ) );		
						
}


function OpenInfoWindow( eventID, id ) {

	if ( previousID != null ) {
		document.getElementById( previousID ).style.color = '#000000';
	}
	previousID = id;
	document.getElementById( id ).style.color = '#872d2e';

	//if someone hovers over a beer event, then this function runs
	for ( let position = 0; position < marker.length; position++ ) {
		
		if ( eventID == marker[position]._id ) {
			//if the id of the beer event being hovered over matches 
			//the marker being checked, then trigger a click event
			google.maps.event.trigger( marker[position], 'click' );
			break;
		}
	}

}

function CreateMarker( beerEvent ) {

	//create marker and set it's position and id on map
  	var marker = new google.maps.Marker({
        map: festivalMap,
        position: new google.maps.LatLng(beerEvent.latitude, beerEvent.longitude),
    });
    marker._id = beerEvent._id;

    //create content based on marker's information and then add it to the marker's 'infowindow'
    var content = "<h3>" + beerEvent.title + "</h3>" + "<p> <strong>Date:</strong> " + beerEvent.date + "</p> <p><strong>Location:</strong> " + beerEvent.location + "</p>" + "<a target='_blank' href = '" + beerEvent.url + "'> More Info </a>";
    marker.infoWindow = new google.maps.InfoWindow({
    	content: content,
    });
	
	
    google.maps.event.addListener( marker, 'click', () => {		    
    	//if marker is clicked, then show infowindow
        if (lastMarker){
        	lastMarker.infoWindow.close();		     
        }
        lastMarker = marker; 
        marker.infoWindow.open(festivalMap, marker);	
      
    });

    return marker;
    
}			  