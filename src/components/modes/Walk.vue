<template>
  <section>
    <p>Walking is healthy, cheap and carbon neutral. This may not be realistic in all situations.</p>
    <!--<iframe src="https://fourpointmapping.sustrans.org.uk/westyorkshirecyclemap/westyorkshire.html" width="100%" height="300px"></iframe>-->
    <ul class="grid">
      <li>
        <a
          target="_blank"
          :href="$parent.mapsURL + 'walking'"
        >
          <h3>Directions</h3>
          <p>Get walking directions from Google Maps</p>
        </a>
      </li>
    </ul>
  </section>
</template>
