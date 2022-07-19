<template>
  <TagsView></TagsView>
  <div class="main">
    <router-view></router-view>
  </div>
</template>
<script setup>
import TagsView from '../../components/TagsView.vue'
</script>
<style lang="scss" scoped>
.main {
  margin-top: 50px;
}
</style>
