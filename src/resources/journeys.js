/* eslint-disable no-undef */

function getPublicTransport(origin, destination, method) {
  return new Promise((resolve, reject) => {
    const [from, to] = [new google.maps.LatLng(origin[1], origin[0]), new google.maps.LatLng(destination[1], destination[0])];
    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
      origins: [ from ],
      destinations: [ to ],
      travelMode: 'TRANSIT',
      transitOptions: { modes: [ method ] },
      unitSystem: google.maps.UnitSystem.METRIC,
    }, (results, status) => {
      if (status == 'OK') {
        const { rows: [ { elements: [ { distance: { value: dist }, duration: { value: time } } ] } ] } = results;
        resolve({
          distance: { value: (dist / 1000).toFixed(2), unit: 'km' },
          time: { value: (time / 60).toFixed(1), unit: 'minutes' },
        });
      } else reject(status);
    });
  });
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
    bus,
    train,
    driving,
    cycling,
    walking,
  ] = await Promise.all([
    getPublicTransport(from, to, 'BUS'),
    getPublicTransport(from, to, 'RAIL'),
    queryOpenRouteService(from, to, 'driving-car'),
    queryOpenRouteService(from, to, 'cycling-road'),
    queryOpenRouteService(from, to, 'foot-walking'),
  ]);

  return {
    bus,
    train,
    driving,
    cycling,
    walking,
  };
}
