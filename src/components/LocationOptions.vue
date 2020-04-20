<template>
  <ul
    v-if="options.length > 0"
    class="results"
  >
    <li
      v-for="(o, i) in options"
      :key="i"
      :class="{ selected: (selected == i) }"
      @click="action(i)"
    >
      {{ o.name }}
      <span v-if="o.addr"> ({{ o.addr }})</span>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    action: {
      default: () => (i) => console.error(`Unimplemented action click ${i}`),
      type: Function,
    },
    options: {
      default: () => [],
      type: Array,
    },
    selected: {
      default: () => null,
      type: Number,
    },
  },
};
</script>
<style scoped>
/* Todo - style properly, hide after selection etc */
/* ul {
  margin: 5px 0px;
  width: min(100%, max-content);
  border: 1px dashed black;
}
li {
  padding: 4px 10px;
  font-size: 0.8em;
}
.selected {
  background-color: lightgray;
} */

</style>