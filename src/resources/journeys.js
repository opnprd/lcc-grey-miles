/* eslint-disable no-undef */

function getModeDetails(origin, destination, mode, params = {}) {
  return new Promise((resolve, reject) => {
    const [from, to] = [new google.maps.LatLng(origin[1], origin[0]), new google.maps.LatLng(destination[1], destination[0])];
    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
      origins: [ from ],
      destinations: [ to ],
      travelMode: mode,
      unitSystem: google.maps.UnitSystem.METRIC,
      ...params,
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

export default async function(from, to) {
  const [
    publicTransport,
    driving,
    cycling,
    walking,
  ] = await Promise.all([
    getModeDetails(from, to, 'TRANSIT', { transitOptions: { modes: ['BUS', 'RAIL'] } }),
    getModeDetails(from, to, 'DRIVING'),
    getModeDetails(from, to, 'BICYCLING'),
    getModeDetails(from, to, 'WALKING'),
  ]);

  return {
    publicTransport,
    driving,
    cycling,
    walking,
  };
}
