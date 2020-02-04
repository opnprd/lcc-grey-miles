<template>
  <article>
    <header class="c6-bg">
      <p class="b1-bg">Towards a lower emissions city</p>
      <h1>Leeds Council Staff Travel Options</h1>
    </header>

    <div id="main">
      <div class="main c6-bg">
        <p class="intro">Can you make your journey cleaner? Move up Leeds City Council's travel hierarchy to reduce your emissions and help tackle the #ClimateEmergency</p>
        <search-form />
      </div>
      <ol class="c6-bg">
        <li id="1" class="mode1">
          <mode-tele-conf />
        </li>
        <li id="2" class="mode2">
          <mode-walk-cycle />
        </li>
        <li id="3" class="mode3">
          <mode-bus-train />  
        </li>
        <li id="4" class="mode4">
          <mode-pool-vehicle />
        </li>
        <li id="5" class="mode5">
          <mode-car-club />
        </li>
        <li id="6" class="mode6">
          <mode-taxi />
        </li>
        <li id="7" class="mode7">
          <mode-self-drive />
        </li>
      </ol>
    </div>
  </article>
</template>
<script>
import SearchForm from './Search.vue';
import modes from './modes';

export default {
  components: {
    SearchForm,
    ...modes,
  },
};
</script>