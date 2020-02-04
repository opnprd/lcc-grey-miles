import Base from './_Base.vue';

import Teleconf from './Teleconf.vue';

export default ({
  extends: Base,
  data() {
    return {
      title: 'Tele/videoconference',
      details: Teleconf,
    };
  },
  computed: {
    summary() { return 'Skype facilities at Merrion House (50 metres away)'; },
  },
});