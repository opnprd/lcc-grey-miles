import Vue from 'vue';

import App from './components/App.vue';
import modes from './modes';
import store from './store';

import './wireframe.scss';

new Vue({
  el: '#app',
  store,
  created() { store.dispatch('getCouncilLocations'); },
  render: (h) => h(App, { props: { modes } }),
});
