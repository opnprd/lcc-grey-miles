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
    destination: 'Hough Top',
    isRoundTrip: false,
    roundTripTime: null,
    presenceRequired: false,
    carrying: false,
    publicTransport: null,
    driving: null,
    cycling: null,
    walking: null,
  },
  getters: {
    journey: (state) => {
      const { source, destination, publicTransport, driving, cycling, walking } = state;
      return { source, destination, publicTransport, driving, cycling, walking };
    },
  },
});
