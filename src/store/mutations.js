function clearTravelDetails(state) {
  state.cycling = null;
  state.driving = null;
  state.walking = null;
  state.publicTransport = null;
}

function selectDestination(state, update) {
  state.destinationDetails.selected = update;
}

function selectSource(state, update) {
  state.sourceDetails.selected = update;
}

function setTravelDetails(state, update) {
  const { driving, cycling, walking, bus, train } = update;
  state.cycling = cycling;
  state.driving = driving;
  state.walking = walking;
  state.bus = bus;
  state.train = train;
}

function updateCarrying(state, update) {
  state.carrying = update;
}

function updateDestination(state, update) {
  state.destination = update;
}

function updateDestOptions(state, update) {
  state.destinationDetails.options = update;
  state.destinationDetails.selected = 0;
}

function updateIsRoundTrip(state, update) {
  state.isRoundTrip = update;
}

function updatePresenceRequired(state, update) {
  state.presenceRequired = update;
}

function updateSource(state, update) {
  state.source = update;
}

function updateSourceOptions(state, update) {
  state.sourceDetails.options = update;
  state.sourceDetails.selected = 0;
}

function updateTimeAtDest(state, update) {
  state.timeAtDest = Number(update);
}

export default {
  clearTravelDetails,
  selectDestination,
  selectSource,
  setTravelDetails,
  updateCarrying,
  updateDestination,
  updateDestOptions,
  updateIsRoundTrip,
  updatePresenceRequired,
  updateSource,
  updateSourceOptions,
  updateTimeAtDest,
  
};