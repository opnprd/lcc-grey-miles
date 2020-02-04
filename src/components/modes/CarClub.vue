<template>
  <mode-display :mode="this">
    <p>Car clubs are the cleanest way of travelling in a private vehicle because the are ultra-low emission and they encourage journeys to be shorter. The prices are around &pound;5.20 per hour or &pound;41.95 daily. The car will need to be returned to its location.</p>
    <ul class="grid">
      <li><a href="https://www.enterprisecarclub.co.uk/gb/en/programs/regions/north-east-england/leeds.html" class="c2-bg"><h2>CarClub</h2></a></li>
    </ul>
  </mode-display>
</template>
<script>
import ModeBase from './ModeBase.vue';

export default {
  extends: ModeBase,
  data() {
    return {
      title: 'Car club',
    };
  },
  computed: {
    summary() { return '22 minutes drive (20 cars at Cookridge Street)'; },
  },
};
</script>
