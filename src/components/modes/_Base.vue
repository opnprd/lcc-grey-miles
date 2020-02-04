<template>
  <section @click="toggleView()">
    <div>
      <div v-if="viewState ==='closed'" class="open">more info</div>
      <h3>{{ title }}</h3>
      <p>{{ summary }}</p>
    </div>
    <component :is="details" v-if="viewState ==='open'" />
  </section>  
</template>
<script>
export default {
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