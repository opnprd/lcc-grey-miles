<template>
  <section>
    <p>Public transport is a low carbon option for your travel. Metrocards are available to borrow and use free of charge from most council building receptions. </p>
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
        <a>
          <h3>Access a council Metro Card</h3>
        </a>
      </li>
      <li>
        <a>
          <h3>No Metro Card nearby?</h3>
          <p>Find out how to request that your department gets a Metro card for bus and train travel within West Yorkshire.</p>
        </a>
      </li>
    </ul>
  </section>
</template>