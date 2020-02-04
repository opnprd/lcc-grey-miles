import Vue from 'vue';

import App from './components/App.vue';
import modes from './modes';

new Vue({
  el: '#app',
  data: {
    journey: {
      source: 'Merrion House',
    },
  },
  render: (h) => h(App, { props: { modes } }),
});
