function appendDestOptions(state, update) {
  state.destinationDetails.options = state.destinationDetails.options.concat(update);
}

function appendSourceOptions(state, update) {
  state.sourceDetails.options = state.sourceDetails.options.concat(update);
}

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

function clearModeDurations(state) {
  state.durations = {};
  state.maxDuration = null;
}

function setModeDuration(state, { modeName, duration }) {
  state.durations[modeName] = duration;
  state.maxDuration = Object.values(state.durations).reduce((p, c) => Math.max(p, c), 0);
}

function setTravelDetails(state, update) {
  const { driving, cycling, walking, publicTransport } = update;
  state.cycling = cycling;
  state.driving = driving;
  state.walking = walking;
  state.publicTransport = publicTransport;
}

function updateCarrying(state, update) {
  state.carrying = update;
}

function updateCouncilLocations(state, update) {
  state.councilLocations = update;
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
  state.timeAtDest = parseFloat(update);
}

export default {
  appendDestOptions,
  appendSourceOptions,
  clearModeDurations,
  clearTravelDetails,
  selectDestination,
  selectSource,
  setModeDuration,
  setTravelDetails,
  updateCarrying,
  updateCouncilLocations,
  updateDestination,
  updateDestOptions,
  updateIsRoundTrip,
  updatePresenceRequired,
  updateSource,
  updateSourceOptions,
  updateTimeAtDest,
  
};