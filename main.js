//Create scale line
var scaleLineControl = new ol.control.ScaleLine();
scaleLineControl.setUnits('us');

//Set Extent
let extent = ol.proj.transformExtent(
  [-84.99,33.19,-74.91,37.62],
  'EPSG:4326', 'EPSG:3857'
);

// Build main map
const map = new ol.Map({
  title: {
    text: 'Test'
  },
	target: 'map',
  controls: [],
  interactions: [],
	//controls: ol.control.defaults({
		//attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
      		//collapsible: false
    	//})
  	//}).extend([
    	//scaleLineControl,
  	//]),
	layers: [
	  	Counties = new ol.layer.Vector({
	  		title: 'North Carolina',
	  		source: new ol.source.Vector({
	  			url: 'https://raw.githubusercontent.com/EFisher828/Hiking-GeoJSONs/main/NC%20Counties.geojson',
	  			format: new ol.format.GeoJSON()
	  		}),
	  		style: new ol.style.Style({
	  			fill: new ol.style.Fill({
	  				color: '#ebebeb'
	  			}),
	  			stroke: new ol.style.Stroke({
	  				color: '#a6a6a6'
	  			})
	  		}),
	  		zIndex: 0
	  	}),
      Roads = new ol.layer.Vector({
        title: 'Primary Roads',
        source: new ol.source.Vector({
          url: 'https://raw.githubusercontent.com/EFisher828/Hiking-GeoJSONs/main/Primary%20Roads.geojson',
          format: new ol.format.GeoJSON()
        }),
        style: new ol.style.Style({
          fill: new ol.style.Fill({
            color: '#333333'
          }),
          stroke: new ol.style.Stroke({
            color: '#333333',
            width: 0.2
          })
        }),
        zIndex: 2
      })
			],
	view: new ol.View({
		center: ol.proj.fromLonLat([-79.9000115996899,34.36925391733207]),
		zoom: 0,
		pixelRatio: 2,
		extent: extent,
	})
});

//map.on('postcompose',function(e){
    //document.querySelector('canvas').style.backgroundImage="linear-gradient(to bottom right, #4156A1 , #C3E6F5)";//#4156A1 , #C3E6F5
//});

locationsSource = new ol.source.Vector({
  url: 'https://raw.githubusercontent.com/EFisher828/Hiking-GeoJSONs/main/NC%20Parks.geojson',
    format: new ol.format.GeoJSON()
})
locationsInfo = locationsSource.getFeatures
const stateAndFederalLocations = () => {
	SFL = new ol.layer.Vector({
		title: 'SFL',
		source: locationsSource,
      style: SFLStyle,
	  	zIndex: 11,
	  	name: 'SFL'
	})
	map.addLayer(SFL)

  const overlayContainerElement = document.querySelector('.overlay-container');
	const overlayLayer = new ol.Overlay({
		element: overlayContainerElement
	})
	map.addOverlay(overlayLayer)
	const overlayFeatureName = document.getElementById('feature-name')

	map.on('click', function(e){
		map.forEachFeatureAtPixel(e.pixel, function(feature,layer){
      console.log(feature)
			overlayLayer.setPosition(undefined)
			let clickedCoordinate = e.coordinate;
			let clickedFeatureName = `<em>${feature.values_.Park}</em><br/><br/><a href="${feature.values_.URL}" target="_blank" class="mapParks">Park Info</a><br/><a href="https://forecast.weather.gov/MapClick.php?lat=${feature.values_.Latitude}&lon=${feature.values_.Longitude}" target="_blank" class="mapParks">7-Day Forecast</a>`;
			overlayLayer.setPosition(clickedCoordinate)
			overlayFeatureName.innerHTML = clickedFeatureName;

		},
		{
			layerFilter: function(layerCandidate){
				return layerCandidate.get('title') === 'SFL'
			}
		})
	})
}
stateAndFederalLocations()

let reqLocations;
let f;
let m;
let objLength;
let mountainList = []
let piedmontList = []
let coastalList = []
for(let k=0;k<10;k++){
  for(let x=0;x<3;x++){
    f = 0
    m = 0
  	if(x==0){
  		reqLocations = mountainParks
  	}else if(x==1){
  		reqLocations = piedmontParks
  	}else{
  		reqLocations = coastalParks
  	}
  	for(let i=0;i<1;i++){
  		console.log('Beep boop');
  		for(let key in reqLocations) {
        objLength = Object.keys(reqLocations).length
        try{
    			let latitude = reqLocations[key].lat
    			let longitude = reqLocations[key].lon
    			let parkName = key
    			const url = `https://api.weather.gov/gridpoints/${reqLocations[key].CWA}/${reqLocations[key].gridX},${reqLocations[key].gridY}/forecast`
    			let field = reqLocations[key].field
    			//console.log(url)

    			const xhr = new XMLHttpRequest();


    			xhr.responseType = 'json';

    			xhr.onreadystatechange = function() {
    				if(xhr.readyState === XMLHttpRequest.DONE){
              if(xhr.status === 500){
                //console.log('bleep')
              }else if(xhr.status === 200){
                //console.log('Ok')
              }
    					let name = xhr.response.properties.periods[0].name;
    					let precipWork = xhr.response.properties.periods[0].shortForecast;
    					let temperature = xhr.response.properties.periods[0].temperature;
    					let temp = xhr.response.properties.periods[0].temperature;
    					let icon = xhr.response.properties.periods[0].icon;
    					let isDaytime = xhr.response.properties.periods[0].isDaytime;


    					let precipSplit = precipWork.split(' ');
    					//console.log(precipSplit)
    					for(i = 0; i < precipSplit.length; i++){
    						word = precipSplit[i]
    						if(word === 'Rain' || word === 'Snow' || word === 'Thunderstorms' || word === 'Drizzle'){
    							result = 3//'Stay Home!'
    							break
    						} else if (word === 'Slight' || word === 'Chance' ||  word === 'Fog' || word === 'Isolated' || word === 'Patchy' || word === 'Areas' || word === 'Haze'){
    							result = 2//'Use Caution!'
    							break
    						} else if (precipWork === 'Cloudy'){
    							result = 2//'Use Caution!'
    						} else {
    							result = 1//'Hike On!'
    						}
    					}

    					if(x==0){
    						mountainList.push(result)
    					}else if(x==1){
    						piedmontList.push(result)
    					}else{
    						coastalList.push(result)
    					}
    					//renderResponse(parkName,result,latitude,longitude,precipWork,icon,isDaytime,temperature,map)
    					//areaAveragedResponse(mountainList,)
              f = f + 1
              if(k==9){
                if(mountainList.length>7 && piedmontList.length>10 && coastalList.length>15){
                  areaAveragedResponse(mountainList,piedmontList,coastalList,m)
                  m = m + 1
                }
              }
    				}
    			}

    			xhr.open("GET",url)
    			xhr.send()
        }catch{
          console.log('failwhale')
        }
  		}
  	}
  }
}

//Slideshow code courtesy of W3 Schools
let myIndex = 0;
carousel();

function carousel() {
  let i;
  let x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  myIndex++;
  if (myIndex > x.length) {myIndex = 1}
  x[myIndex-1].style.display = "block";
  setTimeout(carousel, 2000); // Change image every 2 seconds
}
