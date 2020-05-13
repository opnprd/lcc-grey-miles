<template>
  <section
    v-if="shouldDisplay"
    @click="toggleView()"
  >
    <div>
      <div
        v-if="viewState ==='closed'"
        class="open"
      >
        more info
      </div>
      <h3>{{ title }}</h3>
      <p v-html="summary" />
      <p>£{{ cost }}</p>
      <p v-if="emissions">
        {{ emissions }}kg CO<sub>2</sub> emitted
      </p>
    </div>
    <component
      :is="details"
      v-if="viewState ==='open'"
    />
  </section>  
</template>
<style scoped>
.open {
  display: inline-block;
  float: right;
  padding-right: 1em;
  line-height: 1.5em;
}
</style>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    details: {
      type: Object,
      required: false,
      default: () => {},
    },
    summarise: {
      type: Function,
      default: () => () => null,
    },
    costFn: {
      type: Function,
      required: true,
    },
    co2Fn: {
      type: Function,
      default: () => () => 0,
    },
    displayFn: {
      type: Function,
      default: () => () => true,
    },
  },
  data: function () {
    return {
      viewState: 'closed',
    };
  },
  computed: {
    summary() {
      return this.summarise(this.$store.getters.journey);
    },
    cost() {
      return this.costFn(this.$store.getters.journey);
    },
    emissions() {
      return this.co2Fn(this.$store.getters.journey);
    },
    shouldDisplay() {
      return this.displayFn(this.$store.getters.journey);
    },
    mapsURL() {
      const {
        sourceDetails: { options: srcOptions, selected: selectedSrc },
        destinationDetails: { options: destOptions, selected: selectedDest },
      } = this.$store.state;
      const srcLngLat = srcOptions[selectedSrc].lngLat;
      const destLngLat = destOptions[selectedDest].lngLat;
      return `https://www.google.com/maps/dir/?api=1&origin=${srcLngLat[1]},${srcLngLat[0]}&destination=${destLngLat[1]},${destLngLat[0]}&travelmode=`;
    },
  },
  methods: {
    toggleView() {
      const currentState = this.viewState;
      this.viewState = currentState === 'open' ? 'closed' : 'open';
    },
  },
};
</script>