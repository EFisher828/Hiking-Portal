
//-------------------------------//
//-------  Base GeoJSONs  -------//
//-------------------------------//

const addColoredRegions = (mountainColor,piedmontColor,coastalColor) => {
  Mountains = new ol.layer.Vector({
    	title: 'Mountains',
    	source: new ol.source.Vector({
    		url: 'https://raw.githubusercontent.com/EFisher828/Hiking-GeoJSONs/main/Mountains.geojson',
    		format: new ol.format.GeoJSON()
    	}),
    	style: new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: 'black',
          lineDash: [4],
          width: 3
        }),
    		fill: new ol.style.Fill({
    			color: mountainColor
    		}),
    		stroke: new ol.style.Stroke({
    			color: '#828282'
    		})
    	}),
    	zIndex: 1,
    	name: 'Mountains'
  })
  map.addLayer(Mountains)

  Piedmont = new ol.layer.Vector({
    	title: 'Piedmont',
    	source: new ol.source.Vector({
    		url: 'https://raw.githubusercontent.com/EFisher828/Hiking-GeoJSONs/main/Piedmont.geojson',
    		format: new ol.format.GeoJSON()
    	}),
    	style: new ol.style.Style({
    		fill: new ol.style.Fill({
    			color: piedmontColor
    		}),
    		stroke: new ol.style.Stroke({
    			color: '#828282'
    		})
    	}),
    	zIndex: 1,
    	name: 'Piedmont'
  })
  map.addLayer(Piedmont)

  coastalPlain = new ol.layer.Vector({
    	title: 'Coastal Plain',
    	source: new ol.source.Vector({
    		url: 'https://raw.githubusercontent.com/EFisher828/Hiking-GeoJSONs/main/Coastal%20Plain.geojson',
    		format: new ol.format.GeoJSON()
    	}),
    	style: new ol.style.Style({
    		fill: new ol.style.Fill({
    			color: coastalColor
    		}),
    		stroke: new ol.style.Stroke({
    			color: '#828282'
    		})
    	}),
    	zIndex: 1,
    	name: 'Coastal Plain'
  })
  map.addLayer(coastalPlain)
}

const mountainRegion = () => {
	Mountains = new ol.layer.Vector({
	  	title: 'Mountains',
	  	source: new ol.source.Vector({
	  		url: 'https://raw.githubusercontent.com/EFisher828/Hiking-GeoJSONs/main/Mountains.geojson',
	  		format: new ol.format.GeoJSON()
	  	}),
	  	style: new ol.style.Style({
	  		fill: new ol.style.Fill({
	  			color: '#dbdbdb'
	  		}),
	  		stroke: new ol.style.Stroke({
	  			color: '#a6a6a6'
	  		})
	  	}),
	  	zIndex: 1,
	  	name: 'Mountains'
	}),
	map.addLayer(Mountains)
}

const bigCitiesOn = () => {
	Cities = new ol.layer.Vector({
		title: 'Carolina Cities',
		source: new ol.source.Vector({
			url: 'https://raw.githubusercontent.com/EFisher828/geojson-store/main/Carolina-Big-Cities.geojson?token=ARFGNDXTYFRODQAMP6NV5MLAQC75Y',
	  		format: new ol.format.GeoJSON()
	  	}),
	  	style: bigCitiesStyle,
	  	zIndex: 11,
	  	name: 'bigCities'
	})
	map.addLayer(Cities)
}
const bigCitiesOff = () => {
	for(i=0;i<10;i++){
		try{
			map.getLayers().forEach(layer => {
				if (layer && layer.get('name') === 'bigCities') {
					map.removeLayer(layer);
				}
			});
		}catch{}
	}
}

//----------------------------//
//-------  WMS Layers  -------//
//----------------------------//

const radarOn = () => {
	let source = new ol.source.ImageWMS({
	    attributions: ['NOAA'],
		url: 'https://nowcoast.noaa.gov/arcgis/services/nowcoast/radar_meteo_imagery_nexrad_time/MapServer/WMSServer',
		params: {'LAYERS': '1'},
	});

	let layer = new ol.layer.Image({
	    title: 'NOAA Radar',
	    zIndex: 2,
	    visible: true,
	    source: source,
	    opacity: 0.7,
	    name: 'Radar'
	});

	map.addLayer(layer);
}

const radarOff = () => {
	for(i=0;i<10;i++){
		try{
			map.getLayers().forEach(layer => {
				if (layer && layer.get('name') === 'Radar') {
					map.removeLayer(layer);
				}
			});
		}catch{}
	}
}

//------------------------------//
//-------  Current Data  -------//
//------------------------------//

const addCurrentData = (value) =>{
	dataList = []
	let count = 1
	for(i=0;i<10;i++){
		try{
			map.getLayers().forEach(layer => {
				if (layer && layer.get('name') === 'ID') {
					map.removeLayer(layer);
				}
			});
		}catch{}
	}
	for(i=0;i<urlList.length;i++){
		let url = urlList[i]
		let geo = geoList[i]

		const xhr = new XMLHttpRequest();

		xhr.responseType = 'json';

		xhr.onreadystatechange = function(){
			if(xhr.readyState === XMLHttpRequest.DONE){
				let data = xhr.response.last_ob[`${value}`]
				//Check for null cases
				if(data === null){
				}else{
					addDataLayer('Min Temp',value,geo,data)
				}
			}
		}
		xhr.open("GET",url);
		xhr.send()
		count = count + 1
	}
	const overlayContainerElement = document.querySelector('.overlay-container');
	const overlayLayer = new ol.Overlay({
		element: overlayContainerElement
	})
	map.addOverlay(overlayLayer)
	const overlayFeatureName = document.getElementById('feature-name')

	map.on('click', function(e){
		map.forEachFeatureAtPixel(e.pixel, function(feature,layer){
			overlayLayer.setPosition(undefined)
			let clickedCoordinate = e.coordinate;
			let clickedFeatureName = 'Test'//feature.get('LABEL2');
			overlayLayer.setPosition(clickedCoordinate)
			overlayFeatureName.innerHTML = clickedFeatureName;

		},
		{
			layerFilter: function(layerCandidate){
				return layerCandidate.get('title') === 'Current Conditions'
			}
		})
	})
}
