<template>
  <mode-display :mode="this">
    <p>The council would prefer you not to use your own car (unless it is a fully electric vehicle) as it contributes the most to our emissions and contributes to congestion. Where possible - depending on your service - the following options may be available instead:</p>
    <ul class="c6-bg">
      <li class="mode2"><a href="#2">e-Bike / 30-40 minutes</a></li>
      <li class="mode3"><a href="#3">Train / 23 minutes from Leeds Railway Station</a></li>
      <li class="mode4"><a href="#4">Bus / 28 minutes from Albion Street</a></li>
      <li class="mode5"><a href="#5">CarClub / 22 minutes from Cookridge Street</a></li>
    </ul>
  </mode-display>
</template>
<script>
import ModeBase from './ModeBase.vue';

export default ({
  extends: ModeBase,
  data() {
    return {
      title: 'Self drive',
    };
  },
  computed: {
    summary() { return '22 minutes'; },
  },
});</script>