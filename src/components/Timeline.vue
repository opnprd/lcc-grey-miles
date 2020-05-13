<template>
  <section class="timeline">
    <ol>
      <li
        v-for="(segment, idx) in segments"
        :key="idx"
        :style="segment.style"
        :class="segment.class"
      >
        <span class="marker" />
        <p class="value">
          {{ segment.duration }}
        </p>
      </li>
      <li class="end">
        <span class="marker" />
      </li>
    </ol>
  </section>
</template>
<script>
import { mapState } from 'vuex';
import { formatTime } from '../utils/formatTime.js';
import { UNKNOWN_DURATION } from '../constants';

export default {
  props: {
    values: {
      type: Array,
      required: true,
    },
  },
  computed: {
    segments() {
      return this.values.map(x => ({
        duration: x ? formatTime(x) : '',
        style: `width: ${parseInt(100 * (x || UNKNOWN_DURATION)/this.maxDuration)}%;`,
        class: x ? undefined : 'unknown',
      }));
    },
    ...mapState([
      'maxDuration',
    ]),
  },
};
</script>
<style lang="scss" scoped>
$line-weight: 6px;
$marker-size: 26px;
.timeline {
  height: 4em;
  margin: 17px 20px;
  padding-top: 1em;
  ol {
    display: flex;
    list-style: none;
    padding: 0;
    > li {
      border-bottom: $line-weight solid black;
      position: relative;
      &.unknown {
        border-bottom-style: dotted;
      }
      &.end {
        border-bottom-style: none;
      }
      p {
        position: absolute;
        display: block;
        width: 100%;
        text-align: center;
        &.value {
          top: 0.5em;
          font-size: 1.5em;
        }
        &.title {
          top: 2.5em;
        }
      }
      .marker {
        box-sizing: border-box;
        width: $marker-size;
        height: $marker-size;
        border-radius: $marker-size/2;
        display: block;
        border: $line-weight solid black;
        background: white;
        position: absolute; 
        top: -#{((($marker-size - $line-weight)/2))};
        left: -#{(($marker-size/2))};
      }
    }
  }
}
</style>