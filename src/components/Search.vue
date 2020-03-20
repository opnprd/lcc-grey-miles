<template>
  <form>
    <div class="row">
      <label for="from">From:</label>
      <input
        id="from"
        type="text"
        v-model="origin"
      >
    </div>
    <div class="row">
      <label for="to">To:</label>
      <input
        id="to"
        type="text"
        v-model="destination"
      >
    </div>
    <div class="row">
      <input id="roundtrip" name="roundtrip" type="checkbox" v-model="isRoundTrip">
      <label for="roundtrip">I am going and then coming back again</label>
    </div>
    <div class="row">
      <label for="roundtriptime">Hours spent at location</label>
      <input id="roundtriptime" name="roundtrip" type="number" v-model="roundTripTime">
    </div>
    <div class="row">
      <input id="presence" name="presence" type="checkbox" v-model="presenceRequired">
      <label for="presence">I need to travel to the destination</label>
    </div>
    <div class="row">
      <input id="carrying" name="carrying" type="checkbox" v-model="carrying">
      <label for="carrying">I am transporting a lot of stuff</label>
    </div>
    <button type="button" @click="calculate()">Calculate</button>
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
    roundTripTime: {
      get() { return this.$store.state.roundTripTime; },
      set(value) { this.$store.commit('updateRoundTripTime', value); },
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