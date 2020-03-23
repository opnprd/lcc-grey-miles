<template>
  <form>
    <div class="row">
      <label for="from">From:</label>
      <input
        id="from"
        v-model="origin"
        type="text"
      >
    </div>
    <div class="row">
      <label for="to">To:</label>
      <input
        id="to"
        v-model="destination"
        type="text"
      >
    </div>
    <div class="row">
      <input
        id="roundtrip"
        v-model="isRoundTrip"
        name="roundtrip"
        type="checkbox"
      >
      <label for="roundtrip">I am going and then coming back again</label>
    </div>
    <div class="row">
      <label for="timeatdest">Minutes spent at location</label>
      <input
        id="timeatdest"
        v-model="timeAtDest"
        name="timeAtDest"
        type="number"
      >
    </div>
    <div class="row">
      <input
        id="presence"
        v-model="presenceRequired"
        name="presence"
        type="checkbox"
      >
      <label for="presence">I need to travel to the destination</label>
    </div>
    <div class="row">
      <input
        id="carrying"
        v-model="carrying"
        name="carrying"
        type="checkbox"
      >
      <label for="carrying">I am transporting a lot of stuff</label>
    </div>
    <button
      type="button"
      @click="calculate()"
    >
      Calculate
    </button>
  </form>
</template>
<script>
export default {
  computed: {
    origin: {
      get() { return this.$store.state.source; },
      set(value) { this.$store.commit('updateSource', value); },
    },
    destination: {
      get() { return this.$store.state.destination; },
      set(value) { this.$store.commit('updateDestination', value); },
    },
    isRoundTrip: {
      get() { return this.$store.state.isRoundTrip; },
      set(value) { this.$store.commit('updateIsRoundTrip', value); },
    },
    timeAtDest: {
      get() { return this.$store.state.timeAtDest; },
      set(value) { this.$store.commit('updateTimeAtDest', value); },
    },
    presenceRequired: {
      get() { return this.$store.state.presenceRequired; },
      set(value) { this.$store.commit('updatePresenceRequired', value); },
    },
    carrying: {
      get() { return this.$store.state.carrying; },
      set(value) { this.$store.commit('updateCarrying', value); },
    },
  },
  methods: {
    calculate() {
      this.$store.dispatch('planTravel');
    },
  },
};
</script>