import Base from './_Base.vue';

import CarClub from './CarClub.vue';

export default {
  extends: Base,
  data() {
    return {
      title: 'Car club',
      details: CarClub,
    };
  },
  computed: {
    summary() { return '22 minutes drive (20 cars at Cookridge Street)'; },
  },
};