<template>
  <div>
    <el-table :data="data" style="width: 100%">
      <el-table-column
        v-for="(item, index) in cols"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :align="item.align"
        :type="item.type"
      >
        <template v-if="item.slot" v-slot="{ row, $index, column }">
          <slot :column="column" :index="$index" :row="row" :name="item.slot">
          </slot>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup>
import { defineProps } from 'vue'

defineProps({
  data: {
    type: Array,
    default: () => [],
    required: true
  },
  cols: {
    type: Array,
    default: () => [],
    required: true
  }
})
</script>
<style lang="scss" scoped></style>
