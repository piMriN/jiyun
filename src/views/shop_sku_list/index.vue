<template>
  <div>
    <el-card>
      <el-button type="primary" size="small">新增</el-button>
      <el-button type="danger" size="small"> 批量删除</el-button>
      <Table :data="skusList" :cols="cols">
        <template #status="{ row }">
          <el-switch v-model="row.status" />
        </template>

        <template #active>
          <el-button link type="primary" size="small">修改</el-button>
          <el-popconfirm title="是否要删除该商品?">
            <template #reference>
              <el-button link type="primary" size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </Table>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import Table from '../../components/Table.vue'
import GoodsApi from '../../api/goods'
const current = ref(1)

const cols = reactive([
  { type: 'selection', width: '55' },
  { label: '规格名称', prop: 'name' },
  { label: '规格值', prop: 'default' },
  { label: '排序', prop: 'order' },
  { label: '状态', slot: 'status' },
  { label: '操作', slot: 'active' }
])
const skusList = ref([])
const getShopSkuList = async () => {
  try {
    const res = await GoodsApi.getSkusList(current.value)
    skusList.value = res.list
    console.log(res, 'res')
  } catch (error) {}
}
getShopSkuList()
</script>

<style scoped></style>
