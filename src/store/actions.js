/* eslint-disable no-unused-vars */
import journey from '../resources/journeys';

async function lookupSource(context) {
  const { state, commit } = context;
  const { source } = state;
  // TODO add new commits
}

async function lookupDestination(context) {
  const { state, commit } = context;
  const { destination } = state;

}

async function planTravel(context) {
  console.log('BEING CALLED');
  const { state, commit } = context;
  const { source, destination } = state;
  const data = await journey(source, destination);
  commit('setTravelDetails', data);
}

export default {
  lookupDestination,
  lookupSource,
  planTravel,
};
