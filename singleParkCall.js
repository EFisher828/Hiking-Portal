let responseDiv = document.getElementById("selectedOption");
let submit = document.querySelector('#submit');

//Iterate through locations, want function assigned to locations[key].status to return result variable
collectConditions = () => {
	let e = document.getElementById("parks");
	let park = e.value
	console.log(park)
	const url = `https://api.weather.gov/gridpoints/${locations[park].CWA}/${locations[park].gridX},${locations[park].gridY}/forecast`
	let field = locations[park].field
	let latitude = locations[park].lat
	let longitude = locations[park].lon
	console.log(url)

	const xhr = new XMLHttpRequest();


	xhr.responseType = 'json';

	xhr.onreadystatechange = function() {
		if(xhr.readyState === XMLHttpRequest.DONE){
			let name = xhr.response.properties.periods[0].name;
			let precipWork = xhr.response.properties.periods[0].shortForecast;
			let temperature = xhr.response.properties.periods[0].temperature;
			let icon = xhr.response.properties.periods[0].icon;
			let isDaytime = xhr.response.properties.periods[0].isDaytime;


			let precipSplit = precipWork.split(' ');
			//console.log(precipSplit)
			for(i = 0; i < precipSplit.length; i++){
				word = precipSplit[i]
				if(word === 'Rain' || word === 'Snow' || word === 'Thunderstorms'){
					result = 'Bad Weather, Stay Home!'
					break
				} else if (word === 'Slight' || word === 'Chance' ||  word === 'Fog' || word === 'Isolated' || word === 'Scattered'){
					result = 'Potential for Poor Hiking Weather!'
					break
				} else {
					result = 'Great Weather, Hike On!'
				}
			}
			renderResponseForm(result,park,precipWork,name,icon,temperature,isDaytime,responseDiv,latitude,longitude)
			//console.log(result)
		}
	}

	xhr.open("GET",url)
	xhr.send()
}
collectConditions()
