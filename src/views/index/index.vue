<template>
  <div>
    <!-- 第一行 -->
    <el-row :gutter="20">
      <el-col v-for="(item, index) in panelsList" :key="index" :span="6">
        <el-card shadow="hover">
          <template #header>
            <div class="one">
              <span class="title"> {{ item.title }} </span>
              <el-tag :type="item.unitColor" effect="plain">
                {{ item.unit }}
              </el-tag>
            </div>
          </template>
          <span class="one-title"> {{ item.value }} </span>
          <el-divider></el-divider>
          <div class="one-footer">
            <span> {{ item.subTitle }} </span>
            <span> {{ item.subValue }} </span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 第二行 -->
    <el-row :gutter="20" style="margin: 20px 0">
      <el-col v-for="(item, index) in List" :key="index" :span="3">
        <el-card shadow="hover" @click="toViews(item.path)">
          <div class="two-flex">
            <el-icon>
              <component :is="item.icon" :color="item.color"></component>
            </el-icon>
            <span class="title"> {{ item.title }} </span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 第三行 -->
    <el-row :gutter="20" style="margin: 20px 0">
      <el-col :span="12" class="left">
        <el-card>
          <template #header>
            <span class="title"> 订单统计</span>
            <div class="check-tag">
              <el-check-tag
                :checked="echartType === 'month'"
                @click="changeEchartType('month')"
                >近1个月</el-check-tag
              >
              <el-check-tag
                :checked="echartType === 'week'"
                @click="changeEchartType('week')"
                >近1周</el-check-tag
              >
              <el-check-tag
                :checked="echartType === 'hour'"
                @click="changeEchartType('hour')"
                >近24小时</el-check-tag
              >
            </div>
          </template>
          <div id="echarts"></div>
        </el-card>
      </el-col>
      <el-col :span="12" class="right">
        <el-card>
          <template #header>
            <div class="right-top">
              <span>店铺及商品提示</span>
              <el-tag class="ml-2" effect="plain" type="danger"
                >店铺及商品提示</el-tag
              >
            </div>
          </template>
          <el-row :gutter="20">
            <el-col v-for="(item, index) in goodsList" :key="index" :span="6">
              <el-card
                shadow="hover"
                style="background-color: #f6f6f6; font-size: 14px"
              >
                <div class="right-botton">
                  <span> {{ item.label }} </span>
                  <span style="margin-top: 10px"> {{ item.value }} </span>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
        <el-card style="margin-top: 20px">
          <template #header>
            <div class="right-top">
              <span>交易提示</span>
              <el-tag class="ml-2" effect="plain" type="danger"
                >需要立即处理的交易订单
              </el-tag>
            </div>
          </template>
          <el-row :gutter="20">
            <el-col v-for="(item, index) in orderList" :key="index" :span="6">
              <el-card
                shadow="hover"
                style="background-color: #f6f6f6; font-size: 14px"
              >
                <div class="right-botton">
                  <span> {{ item.label }} </span>
                  <span style="margin-top: 10px"> {{ item.value }} </span>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import UserApi from '../../api/user'
import List from './List'
import { nextTick, ref } from 'vue'
import * as echarts from 'echarts'
import { useRouter } from 'vue-router'
const router = useRouter()
const echartType = ref('week')
const panelsList = ref('')
const goodsList = ref('')
const orderList = ref('')
const echartLoading = ref(null)
const getstatistics = async () => {
  try {
    const { panels } = await UserApi.statistics1()
    const { goods, order } = await UserApi.statistics2()
    const { x, y } = await UserApi.statistics3({ type: echartType.value })
    goodsList.value = goods
    orderList.value = order
    panelsList.value = panels
    nextTick(() => {
      generateEcharts(x, y)
    })
  } catch (error) {}
}

getstatistics()

const changeEchartType = async (type) => {
  try {
    echartLoading.value.showLoading()
    echartType.value = type
    await getstatistics()
  } catch (error) {}
  echartLoading.value.hideLoading()
}
const toViews = (path) => {
  router.push(path)
}
const generateEcharts = (x, y) => {
  const chartDom = document.querySelector('#echarts')
  const myChart = echarts.init(chartDom)
  echartLoading.value = myChart
  const option = {
    xAxis: {
      type: 'category',
      data: x
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: y,
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  }
  option && myChart.setOption(option)
}
</script>

<style lang="scss" scoped>
.one {
  display: flex;
  justify-content: space-between;
}
.one-title {
  font-size: 30px;
  font-weight: 900;
  color: #6b7280;
}
.one-footer {
  display: flex;
  justify-content: space-between;
  color: #6b7280;
}
.two-flex {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  .title {
    margin-top: 10px;
  }
}
.left {
  ::v-deep(.el-card) {
    .el-card__header {
      display: flex;
      justify-content: space-between;
      background: #f9fafb;
      height: 50px;
      align-items: center;

      .title {
        font-size: 15px;
      }

      .check-tag {
        .el-check-tag {
          margin-right: 8px;
        }
      }
    }
  }
}
.right {
  .right-top {
    display: flex;
    justify-content: space-between;
  }
  .right-botton {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
}
#echarts {
  height: 300px;
  width: 600px;
}
</style>
