function setTravelDetails(state, update) {
  const { driving, cycling, walking, publicTransport } = update;
  state.cycling = cycling;
  state.driving = driving;
  state.walking = walking;
  state.publicTransport = publicTransport;
}

function clearTravelDetails(state) {
  state.cycling = null;
  state.driving = null;
  state.walking = null;
  state.publicTransport = null;
}

function updateSource(state, update) {
  console.log('triggered');
  state.source = update;
}

function updateDestination(state, update) {
  state.destination = update;
}

function updateIsRoundTrip(state, update) {
  state.isRoundTrip = update;
}

function updateRoundTripTime(state, update) {
  state.timeAtDest = update;
}

function updatePresenceRequired(state, update) {
  state.presenceRequired = update;
}

function updateCarrying(state, update) {
  state.carrying = update;
}

export default {
  clearTravelDetails,
  setTravelDetails,
  updateSource,
  updateDestination,
  updateIsRoundTrip,
  updateRoundTripTime,
  updatePresenceRequired,
  updateCarrying,
};