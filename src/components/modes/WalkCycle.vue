<template>
  <mode-display :mode="this">
    <p></p>
    <!--<iframe src="https://fourpointmapping.sustrans.org.uk/westyorkshirecyclemap/westyorkshire.html" width="100%" height="300px"></iframe>-->
    <ul class="grid">
      <li><a href="" class="c7-bg"><h2>e-Bike</h2><p>Borrow an e-Bike from Merrion House</p></a></li>
      <li><a href="https://www.cyclecityconnect.co.uk/journey-planner/" class="c7-bg"><h2>Plan your cycle journey</h2><p>City Connect</p></a></li>
      <li><a href="https://github.com/odileeds/west-yorkshire-mapping/blob/master/data/leeds/leeds-amenities-bicycle_parking.geojson" class="c2-bg"><h2>Cycle parking facilities</h2></a></li>
      <li><a href="http://walkit.com/?city=leeds&from=Merrion+Street&fuid=&to=&tuid=&rta=&direct=0" class="c3-bg"><h2>Walking directions</h2><p>Walkit</p></a></li>
      <li><a href="https://www.google.com/maps/dir/Merrion+House,+Merrion+Way,+Leeds+LS2+8PD/Hough+Top,+Leeds/@53.7978393,-1.6290147,13z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x48795c1c9367fd93:0xe92b938ab9b454f3!2m2!1d-1.5449067!2d53.8026793!1m5!1m1!1s0x48795f44cabb111d:0x7280a679a7a7329f!2m2!1d-1.6431878!2d53.7978499!3e2" class="c14-bg"><h2>Walking directions</h2><p>Google Directions</p></a></li>
    </ul>
  </mode-display>
</template>
<script>
import ModeBase from './ModeBase.vue';
export default {
  extends: ModeBase,
  data() {
    return { title: 'Walk/cycle' };
  },
  computed: {
    summary() { return '30-40 minutes by bike (2 ebikes nearby at Merrion House)'; },
  },
};
</script>