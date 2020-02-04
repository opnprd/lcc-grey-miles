import Vue from 'vue';

import App from './components/App.vue';
import modes from './modes';

new Vue({
  el: '#app',
  data: {
    journey: {
      source: 'Merrion House',
      destination: 'Hough Top',
      time: {
        drive: 22,
        bus: 28,
        train: 23,
      },
    },
  },
  render: (h) => h(App, { props: { modes } }),
});
