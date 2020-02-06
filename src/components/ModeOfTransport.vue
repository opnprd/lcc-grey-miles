<template>
  <section @click="toggleView()">
    <div>
      <div v-if="viewState ==='closed'" class="open">more info</div>
      <h3>{{ title }}</h3>
      <p>{{ summary }}</p>
      <p>£{{ cost }}</p>
    </div>
    <component :is="details" v-if="viewState ==='open'" />
  </section>  
</template>
<style scoped>
.open {
  display: inline-block;
  float: right;
  padding-right: 1em;
  line-height: 1.5em;
}
</style>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    details: {
      type: Object,
      required: false,
      default: () => {},
    },
    summarise: {
      type: Function,
      default: () => () => null,
    },
    costFn: {
      type: Function,
      required: true,
    },
  },
  data: function () {
    return {
      viewState: 'closed',
    };
  },
  computed: {
    summary() {
      // Ultimately this should wire up to a vuex store...
      return this.summarise(this.$root.journey);
    },
    cost() {
      return this.costFn(this.$root.journey);
    },
  },
  methods: {
    toggleView() {
      const currentState = this.viewState;
      this.viewState = currentState === 'open' ? 'closed' : 'open';
    },
  },
};
</script>