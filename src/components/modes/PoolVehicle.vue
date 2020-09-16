<template>
  <section>
    <p>
      <span class="note">We are working to develop the availability of low carbon electric pool
        vehicles from some locations, but this facility is not yet available. When
        it is,</span> you’ll need to complete a driver assessment before your first use
      (contact Fleet Services at XXXX). This <span class="note">will</span> be an excellent option if you
      need to use these vehicles regularly.
    </p>
    <!--
      <p>
      We have low carbon electric pool vehicles available to book from some
      locations. You’ll need to complete a driver assessment before your first
      use (contact Fleet Services at XXXX). This is an excellent option if you
      need to use these vehicles regularly.
    </p> -->
    <ul class="grid">
      <li>
        <a
          target="_blank"
          :href="$parent.mapsURL + 'driving'"
        >
          <h3>Directions</h3>
          <p>Get driving directions from Google Maps</p>
        </a>
      </li>
      <li>
        <a>
          <h3>Hire a vehicle</h3>
          <p>Check availability and booking</p>
        </a>
      </li>
      <li>
        <a>
          <h3>Book a driver assessment</h3>
          <p>
            If you haven't used a pool vehicle before, you'll need to do this
            before your first use.
          </p>
        </a>
      </li>
      <li>
        <a>
          <h3>More Info</h3>
          <p>Find out more about the pool vehicle scheme on our website</p>
        </a>
      </li>
    </ul>
  </section>
</template>
