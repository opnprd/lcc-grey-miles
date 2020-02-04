import Base from './_Base.vue';

import Taxi from './Taxi.vue';

export default {
  extends: Base,
  data() {
    return {
      title: 'Taxi',
      details: Taxi,
    };
  },
  computed: {
    summary() {
      return '22 minutes (Arrow Taxis)';
    },
  },
};