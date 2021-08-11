let marker;
let markers;

const colorDecider = (value) => {
	let regionColor
	if(value > 0.5 && value <= 1.5){
		color = '#74ed82'
		return color
	}else if(value > 1.5 && value <=2.5){
		color = "#f7f179"
		return color
	}else{
		color = "#f79779"
		return color
	}
}
const areaAveragedResponse = (mountainList,piedmontList,coastalList,m) => {
	if(m==0){
		let mtnSum = 0
		for(let i=0;i<mountainList.length;i++){
			mtnSum += parseInt( mountainList[i], 10 );
		}
		let mountainAvg = mtnSum/mountainList.length
		let mountainColor = colorDecider(mountainAvg)

		let pdmSum = 0
		for(let i=0;i<piedmontList.length;i++){
			pdmSum += parseInt( piedmontList[i], 10 );
		}
		let piedmontAvg = pdmSum/piedmontList.length
		let piedmontColor = colorDecider(piedmontAvg)

		let cstSum = 0
		for(let i=0;i<coastalList.length;i++){
			cstSum += parseInt( coastalList[i], 10 );
		}
		let coastalAvg = cstSum/coastalList.length
		console.log(mountainAvg)
		let coastalColor = colorDecider(coastalAvg)

		addColoredRegions(mountainColor,piedmontColor,coastalColor)
	}
}
const renderResponse = (parkName,result,latitude,longitude,precipWork,icon,isDaytime,temperature,map) =>{
	let diurnalTemp;
	if (isDaytime === true) {
		diurnalTemp = 'High'
	} else if (isDaytime === false){
		diurnalTemp = 'Low'
	}
	if(result === "Hike On!"){
		markers = new ol.layer.Vector({
			source: new ol.source.Vector(),
		  	style: new ol.style.Style({
		    	image: new ol.style.Icon({
		      	src: 'Go.png'
		    	})
		  	}),
		  	zIndex: 2,
		  	title: 'Park Markers'
		});
		map.addLayer(markers);

		marker = new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat([longitude, latitude])));
		markers.getSource().addFeature(marker);
	} else if(result === "Stay Home!") {
		markers = new ol.layer.Vector({
			source: new ol.source.Vector(),
		  	style: new ol.style.Style({
		    	image: new ol.style.Icon({
		      	src: 'Stop.png'
		    	})
		  	}),
		  	zIndex: 2,
		  	title: 'Park Markers'
		});
		map.addLayer(markers);

		marker = new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat([longitude, latitude])));
		markers.getSource().addFeature(marker);
	} else {
		markers = new ol.layer.Vector({
			source: new ol.source.Vector(),
		  	style: new ol.style.Style({
		    	image: new ol.style.Icon({
		      	src: 'Caution.png'
		    	})
		  	}),
		  	zIndex: 2,
		  	title: 'Park Markers'
		});
		map.addLayer(markers);

		marker = new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat([longitude, latitude])));
		markers.getSource().addFeature(marker);
	}
}
