<template>
  <div>
    <Darwer></Darwer>
    <el-tabs v-model="activeName.tab" @tab-click="handleClick">
      <el-tab-pane
        v-for="item in tabList"
        :key="item.id"
        :label="item.label"
        :name="item.name"
      >
        <el-card>
          <!-- 第一行 -->
          <el-form :inline="true">
            <el-form-item label="关键词">
              <el-input v-model="input" placeholder="商品名称" />
            </el-form-item>
            <el-form-item label="商品分类">
              <el-select placeholder="请选择商品分类" v-model="query">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :value="item.name"
                />
              </el-select>
            </el-form-item>
            <el-form-item style="margin-left: 360px">
              <el-button type="primary" size="small">搜索</el-button>
              <el-button size="small">重置</el-button>
              <el-button size="small"
                >收起
                <el-icon class="el-icon--right"><Upload /></el-icon>
              </el-button>
            </el-form-item>
          </el-form>

          <!-- 第二行 -->
          <div class="line2">
            <div>
              <el-button type="primary" size="small">新增</el-button>
              <el-button type="danger" size="small">批量删除</el-button>
              <el-button size="small">上架</el-button>
              <el-button size="small">下架</el-button>
            </div>
            <el-icon><Refresh /></el-icon>
          </div>

          <!--表格 -->
          <Table :data="goodsList" :cols="cols">
            <template #content="{ row }">
              <div class="content">
                <img
                  :src="row.cover"
                  style="width: 50px; height: 50px; margin-top: 5px"
                  alt=""
                />
                <div class="item">
                  <p style="padding: 0px">{{ row.title }}</p>
                  <span style="color: red">￥{{ row.min_price }} </span>
                  <span style="color: #dcdfe6; margin: 0 5px">|</span>
                  <span style="font-size: 10px">￥{{ row.min_oprice }} </span>
                  <p style="color: #9ca3af; font-size: 10px">
                    分类:{{
                      row.category && row.category.name ? row.category.name : ''
                    }}
                  </p>
                  <p style="color: #9ca3af; font-size: 10px">
                    创建时间：{{ row.create_time }}
                  </p>
                </div>
              </div>
            </template>
            <template v-slot:status="{ row }">
              <el-tag
                style="padding: 0 10px"
                :type="row.status === 1 ? 'success' : 'danger'"
              >
                {{ row.status === 1 ? '仓库' : '上架' }}
              </el-tag>
            </template>
            <template #audit="{ row }">
              <span> {{ row.ischeck === 1 ? '通过' : '拒绝' }} </span>
            </template>
          </Table>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import Darwer from '../../components/Darwer.vue'
import Table from '../../components/Table.vue'
import cols from './cols'
import GoodsApi from '../../api/goods'
import { reactive, ref } from 'vue'

const activeName = reactive({
  tab: 'all',
  title: '',
  cat_id: ''
})
const tabList = reactive([
  { label: '全部', name: 'all' },
  { label: '审核中', name: 'checking' },
  { label: '出售中', name: 'saling' },
  { label: '已下架', name: 'off' },
  { label: '库存预警', name: 'min_stock' },
  { label: '回收站', name: 'delete' }
])
const input = reactive('')
const query = reactive('')
const goodsList = ref('')
const options = ref('')
const current = ref(1)

const handleClick = ({ props: { name } }) => {
  console.log(name)
  activeName.tab = name
  getGoodsList()
}

const getGoodsList = async () => {
  const { list, cates } = await GoodsApi.getGoodsList(current.value, activeName)
  goodsList.value = list
  options.value = cates
}
getGoodsList()
</script>

<style scoped lang="scss">
.line2 {
  display: flex;
  justify-content: space-between;
}
.content {
  display: flex;
  .item {
    margin-left: 5px;
  }
  img {
    border-radius: 5px;
  }
}
</style>
