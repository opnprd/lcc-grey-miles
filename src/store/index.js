import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    source: 'Merrion House',
    destination: 'Hough Top',
    time: {
      drive: 22,
      bus: 28,
      train: 23,
    },
  },
  getters: {
    journey: (state) => {
      const { source, destination, time } = state;
      return { source, destination, time };
    },
  },
});
