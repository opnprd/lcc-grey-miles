// const { parallel } = require('gulp');
const axios = require('axios');
const { writeFile } = require('fs');
const { convertBNG } = require('./lib/convert-bng');
const { parseCSV } = require('./lib/parse-csv');
const { locationFilter } = require('./lib/location-filter');

async function getLatestData() {
  const pkgResponse = await axios.get('https://datamillnorth.org/api/action/package_show?id=council-land-and-building-assets');
  let { result: { resources } } = pkgResponse.data;
  // const latest = resources.filter(el => el.format === 'csv').map(entry => {
  //     entry.created = new Date(entry.created);
  //     return entry;
  // }).sort((a, b) => b.created - a.created)[0];
  const latest = resources.filter(el => (new Date(el.created)).getFullYear() === 2019)[0];  //temp fix - force it to use the 2019 version
  const response = await axios({ method: 'get', url: latest.url, responseType: 'stream' });
  return response.data;
}

const saveJson = (data, path) => {
  writeFile(path, JSON.stringify(data), err => {
    if(err) console.log(err);
    return;
  });
};

async function getCouncilLocations() {
  const dataStream = await getLatestData();
  const data = await parseCSV(dataStream);
  const processed = data.filter(locationFilter).map(entry => {
    const [lon, lat] = convertBNG(entry.Easting, entry.Northing);
    return {
        name: entry.Name,
        addr: entry['Address, Incl Postcode'],
        lngLat: [lon, lat],
    };
  });
  saveJson(processed, 'src/data/council-locations.json');
}

module.exports = {
  default: getCouncilLocations,
};
