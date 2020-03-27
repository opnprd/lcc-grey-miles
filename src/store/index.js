import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  mutations,
  state: {
    source: 'Merrion House',
    sourceDetails: {
      selected: null, // Index to option. Defaults to 0 when search done.
      options: [], // Array of { name: string, latLng: array }
    },
    destination: 'Hough Top',
    destinationDetails: {
      selected: null, // Index to option. Defaults to 0 when search done.
      options: [], // Array of { name: string, latLng: array }
    },
    isRoundTrip: false,
    timeAtDest: 60,
    presenceRequired: false,
    carrying: false,
    publicTransport: null,
    driving: null,
    cycling: null,
    walking: null,
  },
  getters: {
    journey: (state) => {
      // Journey needs to return isRoundTrip, etc
      const { source, destination, publicTransport, driving, cycling, walking } = state;
      return { source, destination, publicTransport, driving, cycling, walking };
    },
  },
});
