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
        <li
          v-for="(mode, i) in modes"
          :key="i"
          :class="'mode' + (i + 1)"
        >
          <mode-of-transport v-bind="mode" />
        </li>
      </ol>
    </div>
  </article>
</template>
<script>
import SearchForm from './Search.vue';
import ModeOfTransport from './ModeOfTransport.vue';

export default {
  components: {
    SearchForm,
    ModeOfTransport,
  },
  props: {
    modes: {
      type: Array,
      default: () => [],
    },
    rawModes: {
      type: Array,
      default: () => [],
    },
  },
};
</script>