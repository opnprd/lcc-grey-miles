<template>
  <section>
    <popup-table
      v-if="popupOpen"
      title="Metrocard Booking Info"
      :table-data="metroCardInfo"
      @close="popupOpen = false;"
    />
    <p>Public transport is a low carbon option for your travel. Metrocards are available to borrow and use free of charge from most council building receptions. The travel time shown above is based on leaving now, and is a best-case scenario which may use the bus, train, or both. Use the Google Maps link below for full details.</p>
    <ul class="grid">
      <li>
        <a
          target="_blank"
          :href="$parent.mapsURL + 'transit'"
        >
          <h3>Plan your journey</h3>
          <p>Get directions using Google Maps</p>
        </a>
      </li>
      <li>
        <a
          target="_blank"
          href="https://planner.wymetro.com/lts/#/travelInfo"
        >
          <h3>Public transport journey planner</h3>
          <p>WY Metro</p>
        </a>
      </li>
      <li>
        <a @click="popupOpen = true;">
          <h3>Access a council Metro Card</h3>
          <p>Find out where Metrocards are located and how you can book one</p>
        </a>
      </li>
      <!-- <li>
        <a>
          <h3>No Metro Card nearby?</h3>
          <p>Find out how to request that your department gets a Metro card for bus and train travel within West Yorkshire.</p>
        </a>
      </li> -->
    </ul>
  </section>
</template>

<script>
import PopupTable from '../PopupTable.vue';
import metroCardInfo from '../../data/metrocard-info.json';

export default {
  components: {
    PopupTable,
  },
  data() {
    return {
      metroCardInfo,
      popupOpen: false,
    };
  },
};
</script>