async function getPublicTransport(origin, destination) {
  const api = 'https://maps.googleapis.com/maps/api/distancematrix/json';
  const key = 'AIzaSyCCoZtWMbRLwnFrW--yD_bfDf4gkJRt3Mg';
  const response = await fetch(`${api}?units=metric&mode=transit&origins=${origin.toString()}&destinations=${destination.toString()}&key=${key}`);
  const data = await response.json();
  const { rows: { elements: [ { duration: { value: time }, distance: { value: dist } } ] } } = data;
  return {
    distance: { value: (dist / 1000).toFixed(2), unit: 'km' },
    time: { value: (time / 60).toFixed(1), unit: 'minutes' },
  };
}

async function queryOpenRouteService(origin, destination, profileName) {
  const api = 'https://api.openrouteservice.org/v2/directions/';
  const key = '5b3ce3597851110001cf6248104657ec14464cc68a8aaaf62a878b74';
  const response = await fetch(`${api}${profileName}?api_key=${key}&start=${origin.toString()}&end=${destination.toString()}`);
  let journeyData = await response.json();
  // Grab summary via destructuring assignment
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/
  const { features: [ { properties: { summary: { distance, duration } } } ] } = journeyData;
  return {
    distance: { value: (distance / 1000).toFixed(2), unit: 'km' },
    time: { value: (duration / 60).toFixed(1), unit: 'minutes' },
  };
}

export default async function(from, to) {
  const [
    publicTransport,
    driving,
    cycling,
    walking,
  ] = await Promise.all([
    getPublicTransport(from, to),
    queryOpenRouteService(from, to, 'driving-car'), // mode names for the openrouteservice api - could perhaps be in modes.js file
    queryOpenRouteService(from, to, 'cycling-road'),
    queryOpenRouteService(from, to, 'foot-walking'),
  ]);

  return {
    publicTransport,
    driving,
    cycling,
    walking,
  };
}
