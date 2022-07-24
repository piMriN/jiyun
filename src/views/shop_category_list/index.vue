<template>
  <div>
    <el-card>
      <el-button type="primary" size="small">新增</el-button>
      <Table :data="cateList" :cols="cols">
        <template #active>
          <el-button link type="primary" size="default">推荐商品</el-button>
          <el-switch />
          <el-button link type="primary" size="default">修改</el-button>
          <el-popconfirm title="是否要删除该商品?">
            <template #reference>
              <el-button link type="primary" size="default">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </Table>
    </el-card>
  </div>
</template>

<script setup>
import Table from '../../components/Table.vue'
import { reactive, ref } from 'vue'
import GoodsApi from '../../api/goods'
const cateList = ref([])
const cols = reactive([
  { label: '', prop: 'name' },
  { label: '', slot: 'active', align: 'right' }
])

const getCateLists = async () => {
  try {
    cateList.value = await GoodsApi.getCateList()
  } catch (error) {}
}
getCateLists()
</script>

<style scoped></style>
