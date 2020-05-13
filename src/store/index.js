import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  mutations,
  state: {
    source: '',
    sourceDetails: {
      selected: null, // Index to option. Defaults to 0 when search done.
      options: [], // Array of { name: string, lngLat: array, addr: string } - addr only for council locations
    },
    destination: '',
    destinationDetails: {
      selected: null, // Index to option. Defaults to 0 when search done.
      options: [], // Array of { name: string, lngLat: array, addr: string } - addr only for council locations
    },
    councilLocations: [],
    isRoundTrip: false,
    timeAtDest: 60,
    presenceRequired: false,
    carrying: false,
    bus: null,
    train: null,
    driving: null,
    cycling: null,
    walking: null,
  },
  getters: {
    journey: (state) => {
      const { source, destination, isRoundTrip, timeAtDest, presenceRequired, carrying, bus, train, driving, cycling, walking } = state;
      return { source, destination, isRoundTrip, timeAtDest, presenceRequired, carrying, bus, train, driving, cycling, walking };
    },
  },
});
