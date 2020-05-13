import geoCode from '../resources/geocode';
import journey from '../resources/journeys';
import searchCouncilLocations from '../resources/search';
import { UNKNOWN_DURATION } from '../constants';

async function getCouncilLocations(context) {
  const { commit } = context;
  const response = await fetch('data/council-locations.json');
  const data = await response.json();
  commit('updateCouncilLocations', data);
}

function lookupCouncilDestination(context) {
  const { state, commit } = context;
  const { destination, councilLocations } = state;
  const results = searchCouncilLocations(destination, councilLocations);
  if(results.length <= 10) commit('updateDestOptions', results);
}

function lookupCouncilSource(context) {
  const { state, commit } = context;
  const { source, councilLocations } = state;
  const results = searchCouncilLocations(source, councilLocations);
  console.log(results);
  if(results.length <= 10) commit('updateSourceOptions', results);
}

async function lookupDestination(context) {
  const { state, commit } = context;
  const { destination } = state;
  const results = await geoCode(destination);
  commit('appendDestOptions', results);
}

async function lookupSource(context) {
  const { state, commit } = context;
  const { source } = state;
  const results = await geoCode(source);
  commit('appendSourceOptions', results);
}

async function planTravel(context) {
  console.log('BEING CALLED');
  const { state, commit } = context;
  commit('clearModeDurations');
  const {
    sourceDetails: { selected: selectedSource, options: sourceOptions },
    destinationDetails: { selected: selectedDest, options: destOptions },
  } = state;
  const [ from, to ] = [ sourceOptions[selectedSource].lngLat, destOptions[selectedDest].lngLat ];
  const data = await journey(from, to);
  commit('setTravelDetails', data);
}

function storeDuration({ commit }, { mode, values = []}) {
  const sum = values.map(x => x ? x : UNKNOWN_DURATION).reduce((a, c) => a + parseFloat(c), 0);
  commit('setModeDuration', { modeName: mode, duration: sum });
}

export default {
  getCouncilLocations,
  lookupCouncilDestination,
  lookupCouncilSource,
  lookupDestination,
  lookupSource,
  planTravel,
  storeDuration,
};
