<template>
  <section>
    <p>Walking and cycling are healthy, cheap and carbon neutral. You can claim 20 pence per mile for journeys on your own bike, or there are e-bikes to borrow from some city centre locations.</p>
    <!--<iframe src="https://fourpointmapping.sustrans.org.uk/westyorkshirecyclemap/westyorkshire.html" width="100%" height="300px"></iframe>-->
    <ul class="grid">
      <li>
        <a>
          <h3>e-Bike</h3>
          <p>Borrow an e-Bike from Merrion House</p>
        </a>
      </li>
      <li>
        <a
          target="_blank"
          :href="$parent.mapsURL + 'walking'"
        >
          <h3>Directions</h3>
          <p>Get walking or cycling directions from Google Maps</p>
        </a>
      </li>
      <li>
        <a
          target="_blank"
          href="https://www.cyclecityconnect.co.uk/journey-planner/"
        >
          <h3>Plan your cycle journey</h3>
          <p>Use City Connect to plan your route</p>
        </a>
      </li>
      <li>
        <a
          target="_blank"
          href="https://github.com/odileeds/west-yorkshire-mapping/blob/master/data/leeds/leeds-amenities-bicycle_parking.geojson"
        >
          <h3>Cycle parking facilities</h3>
          <p>A map of cycle parking facilities all over Leeds</p>
        </a>
      </li>
    </ul>
  </section>
</template>
