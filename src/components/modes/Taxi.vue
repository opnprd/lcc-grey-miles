<template>
  <mode-display :mode="this" />
</template>
<script>
import ModeBase from './ModeBase.vue';

export default {
  extends: ModeBase,
  data() {
    return {
      title: 'Taxi',
    };
  },
  computed: {
    summary() {
      return '22 minutes (Arrow Taxis)';
    },
  },
};
</script>