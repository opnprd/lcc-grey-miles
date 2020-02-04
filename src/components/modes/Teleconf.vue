<template>
  <mode-display :mode="this">
    <p>Save time and reduce travel emissions completely by having a virtual meeting. This option may not be practical for all services or situations. There are a variety of videoconferencing facilities available.</p>
    <ul class="grid">
      <li><a href="" class="c4-bg"><h2>Book Skype facilities</h2></a></li>
      <li><a href="" class="c4-bg"><h2>How to use the equipment</h2></a></li>
      <li><a href="" class="c4-bg"><h2>Teleconferencing training</h2></a></li>
    </ul>
  </mode-display>
</template>
<script>
import ModeBase from './ModeBase.vue';

export default ({
  extends: ModeBase,
  data() {
    return {
      title: 'Tele/videoconference',
    };
  },
  computed: {
    summary() { return 'Skype facilities at Merrion House (50 metres away)'; },
  },
});
</script>