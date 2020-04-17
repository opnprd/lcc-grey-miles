const { parallel } = require('gulp');

async function getCouncilLocations() {
  // place code for council location download task here
  // Get latest csv file
  // Filter by type including office - exclude places with no location and freehold vacant or leased out
  // Store in src/data directory
}

module.exports = {
  default: parallel(getCouncilLocations),
  getCouncilLocations,
};
