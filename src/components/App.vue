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
      <p
        v-if="sortedModes.length !== 0"
        class="note"
      >
        The modes of transport are shown below in order of CO2 emissions (lowest to highest).
      </p>
      <ol
        v-if="sortedModes.length !== 0"
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
        return [...this.modes].sort((a, b) => { 
          const diff = a.co2Fn(j).value - b.co2Fn(j).value;
          if (diff !== 0) return diff;
          else return (a.timeFn(j)[0] | 0) - (b.timeFn(j)[0] | 0);  //if the emissions are the same, sort by shortest time.
        });
      }
    },
  },
};
</script>

<style>
p.note {
  text-align: center;
  color: darkgreen;
  padding-bottom: 0;
}
</style>
