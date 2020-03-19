<template>
  <form>
    <div class="row">
      <label for="from">From:</label>
      <input
        id="from"
        type="text"
        value="Merrion House"
      >
    </div>
    <div class="row">
      <label for="to">To:</label>
      <input
        id="from"
        type="text"
        value="Hough Top"
      >
    </div>
    <div class="row">
      <input id="roundtrip" name="roundtrip" type="checkbox">
      <label for="roundtrip">I am going and then coming back again</label>
    </div>
    <div class="row">
      <label for="roundtriptime">Hours spent at location</label>
      <input id="roundtriptime" name="roundtrip" type="number">
    </div>
    <div class="row">
      <input id="presence" name="presence" type="checkbox">
      <label for="presence">I need to travel to the destination</label>
    </div>
    <div class="row">
      <input id="carrying" name="carrying" type="checkbox">
      <label for="carrying">I am transporting a lot of stuff</label>
    </div>
    <button @click="calculate()">Calculate</button>
  </form>
</template>
<script>
export default {
  methods: {
    calculate() {
      this.$store.dispatch('planTravel');
    },
  },
};
</script>