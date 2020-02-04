import Base from './_Base.vue';

import PoolVehicle from './PoolVehicle.vue';

export default {
  extends: Base,
  data() {
    return {
      title: 'Pool vehicle',
      details: PoolVehicle,
    };
  },
  computed: {
    summary() { return '22 minutes drive (needs booking in advance)'; },
  },
};