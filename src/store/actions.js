import geoCode from '../resources/geocode';
import journey from '../resources/journeys';

async function getCouncilLocations(context) {
  const { commit } = context;
  const response = await fetch('data/council-locations.json');
  const data = await response.json();
  commit('updateCouncilLocations', data);
}

async function lookupDestination(context) {
  const { state, commit } = context;
  const { destination } = state;
  const results = await geoCode(destination);
  commit('updateDestOptions', results);
}

async function lookupSource(context) {
  const { state, commit } = context;
  const { source } = state;
  const results = await geoCode(source);
  commit('updateSourceOptions', results);
}

async function planTravel(context) {
  console.log('BEING CALLED');
  const { state, commit } = context;
  const {
    sourceDetails: { selected: selectedSource, options: sourceOptions },
    destinationDetails: { selected: selectedDest, options: destOptions },
  } = state;
  const [ from, to ] = [ sourceOptions[selectedSource].latLng, destOptions[selectedDest].latLng ];
  const data = await journey(from, to);
  commit('setTravelDetails', data);
}

export default {
  getCouncilLocations,
  lookupDestination,
  lookupSource,
  planTravel,
};
