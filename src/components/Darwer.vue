<template>
  <div>
    <el-drawer
      v-model="drawer"
      title="I am the title"
      :with-header="false"
      :z-index="99"
    >
      <span>Hi there!</span>
    </el-drawer>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
const drawer = reactive(false)
</script>

<style lang="scss" scoped></style>
