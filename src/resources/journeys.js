import geocode from './geocode';

async function getPublicTransport(origin, destination) {
  return {
    distance: { value: 100, unit: 'km' },
    time: { value: 30, unit: 'minutes' },
  };
}

async function queryOpenRouteService(origin, destination, profileName) {
  const key = '5b3ce3597851110001cf6248104657ec14464cc68a8aaaf62a878b74';
  const response = await fetch(`https://api.openrouteservice.org/v2/directions/${profileName}?api_key=${key}&start=${origin.toString()}&end=${destination.toString()}`);
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
  // Call once per query, rather than every time
  let [fromCoords, toCoords] = await Promise.all([from, to].map(geocode));

  const [
    publicTransport,
    driving,
    cycling,
    walking,
  ] = await Promise.all([
    getPublicTransport(fromCoords, toCoords),
    queryOpenRouteService(fromCoords, toCoords, 'driving-car'), // mode names for the openrouteservice api - could perhaps be in modes.js file
    queryOpenRouteService(fromCoords, toCoords, 'cycling-road'),
    queryOpenRouteService(fromCoords, toCoords, 'foot-walking'),
  ]);

  return {
    publicTransport,
    driving,
    cycling,
    walking,
  };
}
