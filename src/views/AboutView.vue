<template>
  <div class="box">
    <el-container>
      <el-aside width="200px"><Header /></el-aside>
      <el-container>
        <el-header><MainHeader /></el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import Header from "../components/Header.vue";
import MainHeader from "../views/MainHeader.vue";
import { useRouter } from "vue-router";
const router = useRouter();
router.beforeEach((to: any, from: any, next: any) => {
  const isLogged = "已登录";
  if (to.meta.requiresAuth && !isLogged) {
    alert("请先登录");
    next("/");
  } else {
    next();
  }
});
</script>
<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100vh;

  .el-aside {
    background-color: #545c64;
    float: left;
    height: 100vh;
  }

  .el-header {
    float: left;
    background-color: #fff;
    border-bottom: 1px solid #ccc;
  }

  .el-main {
    background-color: #eff3f6;
  }
}
</style>
