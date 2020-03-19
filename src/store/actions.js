import journey from '../resources/journeys';

async function planTravel(context) {
  console.log('BEING CALLED');
  const { state, commit } = context;
  const { source, destination } = state;
  const data = await journey(source, destination);
  commit('setTravelDetails', data);
}

export default {
  planTravel,
};
