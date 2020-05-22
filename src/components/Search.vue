<template>
  <form>
    <div class="left">
      <div class="row">
        <label for="from">From:</label>
        <input
          id="from"
          ref="from"
          v-model="origin"
          type="text"
          placeholder="Start typing a name, address, or postcode to show results..."
          @keyup="handleSourceInput($event)"
        >
      </div>
      <div
        v-show="showSourceOptions"
        class="search-results row"
      >
        <location-options
          :options="sourceOptions"
          :action="selectSource"
          :selected="selectedSource"
          @click="showSourceOptions = false;"
        />
        <button
          v-show="showSourceSearchButton"
          type="button"
          @click="lookupExternalSource()"
        >
          Search for more locations...
        </button>
      </div>
      <div class="row">
        <label for="to">To:</label>
        <input
          id="to"
          ref="to"
          v-model="destination"
          type="text"
          @keyup="handleDestinationInput($event)"
        >
      </div>
      <div
        v-show="showDestinationOptions"
        class="search-results row"
      >
        <location-options
          :options="destinationOptions"
          :action="selectDestination"
          :selected="selectedDestination"
          @click="showDestinationOptions = false;"
        />
        <button
          v-show="showDestinationSearchButton"
          type="button"
          @click="lookupExternalDestination()"
        >
          Search for more locations...
        </button>
      </div>
    </div>
    
    <div class="right">
      <div class="row">
        <input
          id="roundtrip"
          v-model="isRoundTrip"
          name="roundtrip"
          type="checkbox"
        >
        <label for="roundtrip">Return Journey</label>
      </div>
      <div
        v-show="isRoundTrip"
        class="row"
      >
        <label for="timeatdest">How long is your meeting (in minutes)?</label>
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
        <label for="carrying">I'm transporting a lot of stuff</label>
      </div>
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
import LocationOptions from './LocationOptions.vue';
export default {
  components: {
    LocationOptions,
  },
  data() {
    return {
      showSourceOptions: false,
      showDestinationOptions: false,
      showSourceSearchButton: true,
      showDestinationSearchButton: true,
    };
  },
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
    sourceOptions() { return this.$store.state.sourceDetails.options; },
    selectedSource() { return this.$store.state.sourceDetails.selected; },
    destinationOptions() { return this.$store.state.destinationDetails.options; },
    selectedDestination() { return this.$store.state.destinationDetails.selected; },
  },
  methods: {
    calculate() {
      this.$store.dispatch('planTravel');
    },
    handleDestinationInput(event) {
      //do nothing if the input field is empty
      if(!this.destination) this.showDestinationOptions = false;

      //keyboard navigation
      else if(event.key == 'ArrowDown' && this.selectedDestination < (this.destinationOptions.length - 1)) this.selectDestination(this.selectedDestination + 1, false);
      else if(event.key == 'ArrowUp' && this.selectedDestination > 0) this.selectDestination(this.selectedDestination - 1, false);
      else if(event.key == 'Enter') this.showDestinationOptions = false;

      //if a character is entered, search the council location list again
      else if(this.destination.length > 2 && (event.key.length === 1 || event.key == 'Backspace')) {
        this.$store.dispatch('lookupCouncilDestination');
        this.showDestinationOptions = true;
        this.showDestinationSearchButton = true;
      }
    },
    handleSourceInput(event) {
      if(!this.origin) this.showSourceOptions = false;
      if(event.key == 'ArrowDown' && this.selectedSource < (this.sourceOptions.length - 1)) this.selectSource(this.selectedSource + 1, false);
      else if(event.key == 'ArrowUp' && this.selectedSource > 0) this.selectSource(this.selectedSource - 1, false);
      else if(event.key == 'Enter') this.showSourceOptions = false;
      else if(this.origin.length > 2 && (event.key.length === 1 || event.key == 'Backspace')) {
        this.$store.dispatch('lookupCouncilSource');
        this.showSourceOptions = true;
        this.showSourceSearchButton = true;
      }
    },
    lookupExternalDestination() {
      this.$store.dispatch('lookupDestination');
      this.showDestinationOptions = true;
      this.showDestinationSearchButton = false;
      this.$refs.to.focus(); //keep focus on the input field so that the keyboard can be used to navigate
    },
    lookupExternalSource() {
      this.$store.dispatch('lookupSource');
      this.showSourceOptions = true;
      this.showSourceSearchButton = false;
      this.$refs.from.focus();
    },
    selectDestination(key, hideOptions=true) {
      this.$store.commit('selectDestination', key);
      this.destination = this.destinationOptions[key].name;
      if(hideOptions) this.showDestinationOptions = false;
    },
    selectSource(key, hideOptions=true) {
      this.$store.commit('selectSource', key);
      this.origin = this.sourceOptions[key].name;
      if(hideOptions) this.showSourceOptions = false;
    },
  },
};
</script>

<style lang="scss">
.search-results {
  z-index: 100;
  background-color: white;
  border: 0.5px solid lightgray;
  flex-wrap: wrap;
  margin-left: 5em;
  position: absolute;
  margin-top: -0.4em;
  max-width: 44em;

  ul {
    width: 100%;
  }

  li {
    padding: 8px;
    width: 100%;
  }

  button {
    font-size: 100%;
    font-family: inherit;
    border: 0;
    padding: 8px;
    background: none;
    text-decoration: underline;
    color: darkblue;
  }

  .selected {
    background-color: #ededed;
  } 
}
</style>