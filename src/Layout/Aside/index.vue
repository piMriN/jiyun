<template>
  <div>
    <el-menu unique-opened router>
      <MenuTree
        v-for="(item, i) in menuList"
        :key="i"
        :item="item"
        :i="i"
      ></MenuTree>
    </el-menu>
  </div>
</template>
<script setup>
import MenuTree from './MenuTree.vue'
import { useStore } from 'vuex'
import { filterMenus } from '@/utils/menu'
import { computed } from 'vue'
const store = useStore()

const menuList = computed(() => {
  return filterMenus(store.getters.menus)
})
</script>
<style lang="scss" scoped>
.el-menu {
  border-right: none;
}
</style>
