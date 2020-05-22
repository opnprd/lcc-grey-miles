<template>
  <article id="app">
    <header>
      <div id="header-content">
        <div>
          <p>Find the greenest way to get to your meeting</p>
          <h1>Staff Travel Options</h1>
        </div>
        <img
          src="img/lcc.png"
          width="224px"
          alt="Leeds City Council logo"
        >
      </div>
    </header>

    <div id="main">
      <section>
        <p>This tool shows you the greenest and most efficient way to make your journey. Reduce your emissions to help tackle the #ClimateEmergency.</p>
        <search-form />
      </section>
      <ol
        v-if="sortedModes.length != 0"
        class="modes"
      >
        <li
          v-for="(mode, i) in sortedModes"
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
  computed: {
    sortedModes() {
      if (!this.$store.state.driving) return [];
      else {
        const j = this.$store.getters.journey;
        return [...this.modes].sort((a, b) => a.co2Fn(j) - b.co2Fn(j));
      }
    },
  },
  // created() {
  //   this.$store.dispatch('getCouncilLocations');
  // },
};
</script>
