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

export default {
  clearTravelDetails,
  setTravelDetails,
}