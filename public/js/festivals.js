var festivalMap;
var lastMarker;
var marker = [];

var InitMap = () => {
	//initialize google map on festival page on load
	festivalMap = new google.maps.Map(document.getElementById('festivals-map'), {
	  center: {lat: 39.244785, lng: -105.511852},
	  zoom: 8
	});
}

var FestivalsReady = () =>{
	//onload, this function is ran
	GetRequest('/getFestivals', undefined, (status, festivals)=>{
		if(status == 200){
			//if get request is successful, then create a google maps marker
			//for each of the events in festivals.
			let events = festivals.events;

			for(let beerEvent = 0; beerEvent < events.length; beerEvent++){
				let parent = document.getElementById('festivals')
				let li = document.createElement('li');
				let h1 = document.createElement('h1');
				let p = document.createElement('p');

				h1.textContent = events[beerEvent].title;
				p.textContent = events[beerEvent].location;

				//append h1 and p tags to list
				li.appendChild(h1);
				li.appendChild(p);

				if(events[beerEvent].location != 'N/A'){
					//if the lat long coordinates exist, make a marker.
					marker.push(CreateMarker(events[beerEvent]));
					li.setAttribute("value", events[beerEvent]._id);
					li.setAttribute("onmouseover", "OpenInfoWindow(this.getAttribute('value'))");
				}

				//append to 'festivals' ul
				parent.appendChild(li);
			}
		}
	});
}


var OpenInfoWindow = (eventID) =>{
	//if someone hovers over a beer event, then this function runs
	for(let position = 0; position < marker.length; position++){
		if(eventID == marker[position]._id){
			//if the id of the beer event being hovered over matches 
			//the marker being checked, then trigger a click event
			google.maps.event.trigger(marker[position], 'click');
			break;
		}
	}
}

var CreateMarker = (beerEvent) =>{

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
	
	
    google.maps.event.addListener(marker, 'click', function(){		    
    	//if marker is clicked, then show infowindow
        if(lastMarker){
        	lastMarker.infoWindow.close();		     
        }
        lastMarker = marker; 
        marker.infoWindow.open(festivalMap, marker);	
      
    });

    return marker;
}			  