async function getPublicTransport(from, to) {
  return {
    distance: { value: 100, unit: 'km' },
    time: { value: 30, unit: 'minutes' },
  };
}

function geoCode(from, to) {
  //todo - add call to openrouteservice geocoding API
  return [[8.681495,49.41461], [8.687872,49.420318]];
}

async function getOtherMethod(from, to, profileName) {
  const key = '5b3ce3597851110001cf6248104657ec14464cc68a8aaaf62a878b74';

  let [fromCoords, toCoords] = geoCode(from, to);
  const response = await fetch(`https://api.openrouteservice.org/v2/directions/${profileName}?api_key=${key}&start=${fromCoords.toString()}&end=${toCoords.toString()}`);
  let journeyData = await response.json();
  let summary = journeyData.features[0].properties.summary;
  return {
    distance: { value: summary.distance / 1000, unit: 'km' },
    time: { value: summary.duration / 60, unit: 'minutes' },
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
    getOtherMethod(from, to, 'driving-car'), // mode names for the openrouteservice api - could perhaps be in modes.js file
    getOtherMethod(from, to, 'cycling-regular'),
    getOtherMethod(from, to, 'foot-walking'),
  ]);

  return {
    publicTransport,
    driving,
    cycling,
    walking,
  };
}
