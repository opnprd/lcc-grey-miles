import Vue from 'vue';

import App from './components/App.vue';
import modes from './modes';
import store from './store';

import './wireframe.scss';

new Vue({
  el: '#app',
  store,
  render: (h) => h(App, { props: { modes } }),
});
