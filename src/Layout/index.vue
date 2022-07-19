<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '250px'">
        <Aside></Aside>
      </el-aside>
      <el-main><Main></Main></el-main>
    </el-container>
  </el-container>
</template>
<script setup>
import Main from './Main'
import Header from './Header'
import Aside from './Aside'
import { useStore } from 'vuex'
import { computed } from 'vue'
const store = useStore()
const isCollapse = computed(() => {
  return store.getters.isCollapse
})
</script>
<style lang="scss" scoped>
.el-header {
  background-color: #4338ca;
  padding: 0;
}
.el-main {
  padding: 0;
}
.el-container {
  height: 100%;
}
</style>
