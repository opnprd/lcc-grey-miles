import Base from './_Base.vue';

import SelfDrive from './SelfDrive.vue';

export default ({
  extends: Base,
  data() {
    return {
      title: 'Self drive',
      details: SelfDrive,
    };
  },
  computed: {
    summary() { return '22 minutes'; },
  },
});