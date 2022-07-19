<template>
  <div class="header-container">
    <div class="left">
      <div>
        <el-icon><ElemeFilled /></el-icon> 积云编程
      </div>
      <div class="l2">
        <el-icon @click="changeIsCollapse"><Expand /></el-icon>
        <el-icon @click="refresh"><Refresh /></el-icon>
      </div>
    </div>
    <div class="right">
      <el-tooltip effect="dark" content="全屏" placement="bottom">
        <el-icon @click="fullscreen"><FullScreen /></el-icon>
      </el-tooltip>

      <div>
        <el-avatar :size="30" :src="userinfo.avatar" />

        <el-dropdown>
          <span class="el-dropdown-link">
            {{ userinfo.username }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="xg">修改密码</el-dropdown-item>
              <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>

    <!-- 修改密码抽屉 -->
    <el-drawer v-model="drawer" title="修改密码">
      <el-form
        ref="formRef"
        :model="editPasswordFormModel"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input
            v-model="editPasswordFormModel.oldPassword"
            placeholder="请输入旧密码"
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="newPassword">
          <el-input
            v-model="editPasswordFormModel.newPassword"
            placeholder="请输入新密码"
            show-password
            type="password"
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            v-model="editPasswordFormModel.confirmPassword"
            placeholder="请输入确认密码"
            show-password
            type="password"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleSubmit">提交</el-button>
          <el-button @click="drawer = false">取消</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>
<script setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import screenfull from 'screenfull'
import { reactive, ref, computed } from 'vue'
const store = useStore()
const router = useRouter()

// 全屏
function fullscreen() {
  if (screenfull.isEnabled) {
    screenfull.toggle()
  }
  return fullscreen
}

// 页面刷新
const refresh = () => {
  window.location.reload()
}

// 退出登录
const logout = async () => {
  await store.dispatch('user/logout')
  router.push('/login')
}

// 侧边栏伸缩
const changeIsCollapse = () => {
  store.commit('menu/changeIsCollapse')
}

// 修改密码
const formRef = ref(null)
const editPasswordFormModel = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})
const drawer = ref(false)
const xg = () => {
  drawer.value = true
}

// 验证规则
const rules = {
  oldPassword: [{ required: true, trigger: 'blur', message: '旧密码不能为空' }],
  newPassword: [{ required: true, trigger: 'blur', message: '新密码不能为空' }],
  confirmPassword: [
    {
      required: true,
      trigger: 'blur',
      validator: (rule, value, callback) => {
        if (value === '') {
          callback(new Error('确认密码不能为空'))
        } else if (value !== editPasswordFormModel.newPassword) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      }
    }
  ]
}

const handleSubmit = async () => {
  try {
    await formRef.value.validate()
    drawer.value = false
  } catch (error) {
    console.log(error)
  }
}

// 用户信息
const userinfo = computed(() => {
  const { username } = store.getters.userinfo
  return {
    username,
    avatar:
      'https://ts1.cn.mm.bing.net/th/id/R-C.571b187991cf05bd7a7bf978e7977be4?rik=vUiHHNvXByOmzw&riu=http%3a%2f%2fupload.pig66.com%2ftoutiao%2f1952035-4707a60ab40ed19103c92f5da492346f&ehk=bbExMxt2qZ%2ffrWUrZzSo%2bPnvatlXe66epyleUn72xF4%3d&risl=&pid=ImgRaw&r=0'
  }
})
</script>
<style lang="scss" scoped>
.header-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-size: 20px;
  .left {
    display: flex;
    margin-left: 50px;
    width: 80%;
    .l2 {
      padding-left: 80px;
    }
  }
  .right {
    width: 8%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.el-dropdown {
  color: white;
  margin-top: 6px;
}
</style>
