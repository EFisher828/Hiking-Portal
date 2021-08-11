const SFLStyle = (feature,resolution) => {
	type = feature.values_.Type
	let imageSrc
	let setScale
	if(type=="State"){
		imageSrc = 'Green Marker.png'
		setScale = 0.3
	}else{
		imageSrc = 'Blue Marker.png'
		setScale = 0.3
	}
	//console.log(feature.values_.Type)
	style = new ol.style.Style({
			image: new ol.style.Icon(({
					anchor: [0.5,0.8],
					src: imageSrc,
					scale: setScale,
			}))
	})
	return style
}

let outlookStyle = (feature, resolution) => {
	let color = ol.color.asArray(feature.get('fill'))
	color = color.slice()
	color[3] = 0.6

	style = new ol.style.Style({
		fill: new ol.style.Fill({
			color: color
		}),
		stroke: new ol.style.Stroke({
			color: feature.get('stroke')
		}),
		text: new ol.style.Text({
			text: feature.get('LABEL'),
			font: '24px Calibri,sans-serif',
			fill: new ol.style.Fill({
				color: 'black'
			}),
			stroke: new ol.style.Stroke({
				color: 'white',
				width: 3
			})
		})
	})
	return style
}
let bigCitiesStyle = (feature, resolution) => {
	style = new ol.style.Style({
		text: new ol.style.Text({
			text: feature.get('Name'),
			font: '22px Calibri, sans-serif',
			fill: new ol.style.Fill({
				color: 'black'
			}),
			stroke: new ol.style.Stroke({
				color: 'white',
				width: 3
			}),
			overflow: true,
		})
	})
	return style
}

let mediumCitiesStyle = (feature, resolution) => {
	style = new ol.style.Style({
		text: new ol.style.Text({
			text: feature.get('Name'),
			font: '18px Calibri, sans-serif',
			fill: new ol.style.Fill({
				color: 'black'
			}),
			stroke: new ol.style.Stroke({
				color: 'white',
				width: 3
			}),
			overflow: true,
		})
	})
	return style
}

let interstateStyle = () => {
	style = new ol.style.Style({
		stroke: new ol.style.Stroke({
			color: 'red',
		})
	})
	return style
}

let smallCitiesStyle = (feature, resolution) => {
	style = new ol.style.Style({
		text: new ol.style.Text({
			text: feature.get('name'),
			font: '16px Calibri, sans-serif',
			overflow: true,
			stroke: new ol.style.Stroke({
				color: 'white',
				width: 1
			})
		}),
	})
	return style
}
let meshStyle = (feature,resolution) => {
	let color;
	if(feature.get('ID') === 0){
		/*color = ol.color.asArray('#faefdb')
		color = color.slice()
		color[3] = 0.1*/
		color = '#329316'
	}else if(feature.get('ID') === 1){
		color ='#8fa923'
	}else if(feature.get('ID') === 2){
		color ='#ecbf31'
	}else if(feature.get('ID') === 3){
		color ='#f07e29'
	}else if(feature.get('ID') === 4){
		color ='#f33d22'
	}else if(feature.get('ID') === 5){
		color ='#bd472f'
	}else if(feature.get('ID') === 6){
		color ='#87513c'
	}else if(feature.get('ID') === 7){
		color ='#804e9e'
	}else if(feature.get('ID') === 8){
		color ='#794bff'
	}else if(feature.get('ID') === 9){
		color ='#8ea5fa'
	}else if(feature.get('ID') === 10){
		color ='#99d3f7'
	}else if(feature.get('ID') === 11){
		color ='#a4fff4'
	}else if(feature.get('ID') === 12){
		color ='#e0a4ed'
	}else if(feature.get('ID') === 13){
		color ='#e0dced'
	}else if(feature.get('ID') === 14){
		color ='#e0f9ed'
	}else if(feature.get('ID') === 15){
		color ='#bef9dd'
	}else if(feature.get('ID') === 16){
		color ='#84f9c1'
	}else if(feature.get('ID') === 17){
		color ='#84c3c1'
	}else if(feature.get('ID') === 18){
		color ='#8497c1'
	}else if(feature.get('ID') === 19){
		color ='#84669f'
	}else if(feature.get('ID') === 20){
		color ='#d56dac'
	}

	style = new ol.style.Style({
		fill: new ol.style.Fill({
			color: color,
		})
	})
	return style
}
let droughtStyle = (feature,resolution) => {
	let color;
	if(feature.get('dm') === 0){
		color = ol.color.asArray('#FFFF00');
		color = color.slice();
		color[3] = 0.6;
	}else if(feature.get('dm') === 1){
		color = ol.color.asArray('#FCD37F');
		color = color.slice();
		color[3] = 0.6;
	}else if(feature.get('dm') === 2){
		color = ol.color.asArray('#FFAA00');
		color = color.slice();
		color[3] = 0.6;
	}else if(feature.get('dm') === 3){
		color = ol.color.asArray('#E60000');
		color = color.slice();
		color[3] = 0.6;
	}else if(feature.get('dm') === 4){
		color = ol.color.asArray('#730000');
		color = color.slice();
		color[3] = 0.6;
	}

	style = new ol.style.Style({
		fill: new ol.style.Fill({
			color: color
		})
	})
	return style
}

let warningsStyle = (feature,resolution) => {
	let color;
	let stroke;
	if(feature.get('event') === 'Flood Warning'){
		color = ol.color.asArray('#00FF00');
		color = color.slice();
		color[3] = 0.6;
		stroke = '#4a4a4a'
	}else if(feature.get('event') === 'Tornado Warning'){
		color = ol.color.asArray('#FF0000');
		color = color.slice();
		color[3] = 0.6;
		stroke = '#4a4a4a'
	}else if(feature.get('event') === 'Severe Thunderstorm Warning'){
		color = ol.color.asArray('#FFA500');
		color = color.slice();
		color[3] = 0.6;
		stroke = '#4a4a4a'
	}else if(feature.get('event') === 'Flash Flood Warning'){
		color = ol.color.asArray('#8B0000');
		color = color.slice();
		color[3] = 0.6;
		stroke = '#4a4a4a'
	}else if(feature.get('event') === 'Flood Advisory'){
		color = ol.color.asArray('#00FF7F');
		color = color.slice();
		color[3] = 0;
		stroke = '#4a4a4a'
	}else if(feature.get('event') === 'Special Weather Statement'){
		color = ol.color.asArray('#FFE4B5');
		color = color.slice();
		color[3] = 0;
		stroke = color
	}else if(feature.get('event') === 'Freeze Warning'){
		color = ol.color.asArray('#483D8B');
		color = color.slice();
		color[3] = 0;
		stroke = '#4a4a4a'
	}else if(feature.get('event') === 'Hard Freeze Warning'){
		color = ol.color.asArray('#9400D3');
		color = color.slice();
		color[3] = 0;
		stroke = '#4a4a4a'
	}else if(feature.get('event') === 'Wind Chill Advisory'){
		color = ol.color.asArray('#AFEEEE');
		color = color.slice();
		color[3] = 0;
		stroke = '#4a4a4a'
	}else if(feature.get('event') === 'Winter Weather Advisory'){
		color = ol.color.asArray('#7B68EE');
		color = color.slice();
		color[3] = 0;
		stroke = '#4a4a4a'
	}else if(feature.get('event') === 'Tropical Storm Warning'){
		color = ol.color.asArray('#7B68EE');
		color = color.slice();
		color[3] = 0;
		stroke = '#B22222'
	}
	style = new ol.style.Style({
		fill: new ol.style.Fill({
			color: color
		}),
		stroke: new ol.style.Stroke({
			color: stroke
		})
	})
	return style
}
