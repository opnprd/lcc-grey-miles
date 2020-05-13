<template>
  <section>
    <p>Walking and cycling are healthy, cheap and carbon neutral. You can claim 20 pence per mile for journeys on your own bike, or there are e-bikes to borrow from some city centre locations.</p>
    <!--<iframe src="https://fourpointmapping.sustrans.org.uk/westyorkshirecyclemap/westyorkshire.html" width="100%" height="300px"></iframe>-->
    <ul class="grid">
      <li><a href=""><h2>e-Bike</h2><p>Borrow an e-Bike from Merrion House</p></a></li>
      <li><a :href="$parent.mapsURL + 'walking'"><h2>Directions</h2><p>Google Maps</p></a></li>
      <li><a href="https://www.cyclecityconnect.co.uk/journey-planner/"><h2>Plan your cycle journey</h2><p>City Connect</p></a></li>
      <li><a href="https://github.com/odileeds/west-yorkshire-mapping/blob/master/data/leeds/leeds-amenities-bicycle_parking.geojson"><h2>Map of cycle parking facilities</h2></a></li>
    </ul>
  </section>
</template>
