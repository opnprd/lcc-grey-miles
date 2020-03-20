export default async function geoCode(location) {
  if(!location) throw new Error('No location supplied');
  else {
    const key = '5b3ce3597851110001cf6248104657ec14464cc68a8aaaf62a878b74';
    const response = await fetch(`https://api.openrouteservice.org/geocode/search?api_key=${key}&text=${encodeURIComponent(location)}&boundary.circle.lon=-1.548&boundary.circle.lat=53.801&boundary.circle.radius=30&boundary.country=GB`);
    const results = await response.json();
    // Only take 1st result from the search for now - should allow user to choose from results
    const { features: [{geometry: { coordinates: [lon, lat] }}]} = results;
    console.log([lon,lat]);
    return [lon, lat];
  }
}
