<template>
  <div class="popup">
    <div>
      <h1 v-if="title">
        {{ title }}
      </h1>
      <div
        class="close"
        @click="$emit('close')"
      >
        <p>close</p>
      </div>
      <table>
        <tr>
          <th
            v-for="(header, i) in headers"
            :key="i"
          >
            {{ header }}
          </th>
        </tr>
        <tr
          v-for="(row, rowIdx) in tableData"
          :key="rowIdx"
        >
          <td
            v-for="(col, colIdx) in headers"
            :key="colIdx"
          >
            <ul v-if="Array.isArray(row[col])">
              <li
                v-for="(item, i) in row[col]"
                :key="i"
              >
                {{ item }}
              </li>
            </ul>
            <template v-else>
              {{ row[col] }}
            </template>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: () => '',
    },
    tableData: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    headers() {
      if (!this.tableData.length) return [];
      else return Object.keys(this.tableData[0]);
    },
  },
};
</script>

<style lang="scss">
.popup {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 1;
  height: 100%;
  width: 100%;
  background-color: rgba(160,160,160,0.75);
  padding: 0 1em;
  overflow: scroll;

  > div {
    position: relative;
    padding: 2em 1em;
    background-color: white;
    margin: 2em auto;
    border-radius: 1em;
    max-width: 50em;
    overflow-y: scroll;
  }

  .close {
    position: absolute;
    top: 1.5em;
    right: 1em;
    color: blue;
    text-decoration: underline; 
    cursor: pointer;
  }

  h1 {
    font-size: 2em;
    padding-bottom: 1em;
  }

  th {
    font-weight: bold;
  }

  th, td {
    line-height: 20px;
    border: 1px solid lightgray;
    padding: 0.5em;
    vertical-align: middle;
  }

  ul {
    padding-left: 1em;
  }
  li {
    list-style-type: disc;
    padding-bottom: 0.25em;
  }
}

</style>