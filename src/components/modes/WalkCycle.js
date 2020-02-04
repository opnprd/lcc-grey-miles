import Base from './_Base.vue';

import WalkCycle from './WalkCycle.vue';

export default {
  extends: Base,
  data() {
    return {
      title: 'Walk/cycle',
      details: WalkCycle,
    };
  },
  computed: {
    summary() { return '30-40 minutes by bike (2 ebikes nearby at Merrion House)'; },
  },
};