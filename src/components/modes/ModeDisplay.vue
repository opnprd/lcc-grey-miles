<template>
  <section @click="toggleView()">
    <div>
      <div v-if="viewState ==='closed'" class="open">more info</div>
      <h3>{{ mode.title }}</h3>
      <p>{{ mode.summary }}</p>
    </div>
    <slot v-if="viewState ==='open'" />
  </section>
</template>
<script>
export default {
  props: [ 'mode' ],
  data: function () {
    return {
      viewState: 'closed',
    };
  },
  methods: {
    toggleView() {
      const currentState = this.viewState;
      this.viewState = currentState === 'open' ? 'closed' : 'open';
    },
  },
};
</script>