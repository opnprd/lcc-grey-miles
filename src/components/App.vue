<template>
  <article id="app">
    <header>
      <p>Find the greenest way to get to your meeting</p>
      <h1>Staff Travel Options</h1>
      <img
        src="/img/lcc.png"
        width="224px"
      >
    </header>

    <div id="main">
      <section>
        <p>This tool shows you the greenest and most efficient way to make your journey. Reduce your emissions to help tackle the #ClimateEmergency.</p>
        <search-form />
      </section>
      <ol
        v-if="showModes"
        class="modes"
      >
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
  computed: {
    showModes() {
      if (this.$store.state.driving != null) return true;
      else return false;
    },
  },
  // created() {
  //   this.$store.dispatch('getCouncilLocations');
  // },
};
</script>