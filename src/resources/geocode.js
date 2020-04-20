export default async function geoCode(location) {
  if(!location) throw new Error('No location supplied');
  else {
    const key = '5b3ce3597851110001cf6248104657ec14464cc68a8aaaf62a878b74';
    const response = await fetch(`https://api.openrouteservice.org/geocode/search?api_key=${key}&text=${encodeURIComponent(location)}&boundary.circle.lon=-1.548&boundary.circle.lat=53.801&boundary.circle.radius=30&boundary.country=GB`);
    const data = await response.json();
    const { features: [ ...results ]} = data;
    const condensedResults = results.map(({ geometry: { coordinates }, properties: { label } }) => {
      let i = /,\s?[eE]ngland/.exec(label).index;
      let shortLabel = label.substring(0, i);
      return { name: shortLabel, lngLat: coordinates };
    });
    return condensedResults;
  }
}
