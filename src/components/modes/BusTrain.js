import Base from './_Base.vue';

import BusTrain from './BusTrain.vue';

export default {
  extends: Base,
  data() {
    return {
      title: 'Bus/train',
      details: BusTrain,
    };
  },
  computed: {
    summary() { return '23 minutes by train or 28 minutes by bus (2 Metro cards are available nearby)'; },
  },
};