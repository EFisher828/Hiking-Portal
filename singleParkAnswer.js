const renderResponseForm = (result,park,precipWork,name,icon,temperature,isDaytime,responseDiv,latitude,longitude) => {
	let diurnalTemp = ''
	if (isDaytime === true) {
		diurnalTemp = 'High'
	} else if (isDaytime === false){
		diurnalTemp = 'Low'
	}
	responseDiv.innerHTML = `
	<h3>${park}</h3>
	<h5><u>${name}</u></h5>
	<img src="${icon}" />
	<p><b>${diurnalTemp}:</b> ${temperature}&#176;F</p>
	<p>${result}</p>
	<p>${precipWork}</p>
	<a href="https://forecast.weather.gov/MapClick.php?lat=${latitude}&lon=${longitude}" target="_blank">Read the extended forecast</a>`;
}

const displaySuggestions = (event) => {
  event.preventDefault();
  while(responseDiv.firstChild){
    responseDiv.removeChild(responseDiv	.firstChild);
  };
  collectConditions();
}

submit.addEventListener('click', displaySuggestions);
