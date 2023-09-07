<template>
  <div class="mainheader">
    <div style="font-size: 40px" class="svg">
      <Operation style="width: 1em; height: 1em; margin-right: 8px" />
    </div>
    <div class="avatar">
      <el-avatar> user </el-avatar>&emsp;
      <el-dropdown>
        <span class="el-dropdown-link">
          VbenAdmin<el-icon class="el-icon--right"> <arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="a">切换登录</el-dropdown-item>
            <el-dropdown-item command="e" @click="exit()" divided
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const exit = () => {
  router.push("/");
};
</script>
<style lang="scss" scoped>
.mainheader {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .svg {
    height: 60px;
    float: left;
    svg {
      margin: 10px 0;
    }
  }
  .avatar {
    float: right;
    margin: 10px;
    .el-dropdown {
      margin: 12px;
      .el-dropdown-link {
        font-family: "新宋体";
        cursor: pointer;
      }
      :focus-visible {
        outline: none !important;
      }
    }
  }
}
.demo-type {
  display: flex;
}
.demo-type > div {
  flex: 1;
  text-align: center;
}

.demo-type > div:not(:last-child) {
  border-right: 1px solid var(--el-border-color);
}
.el-header {
  --el-header-padding: 0 10px;
}
</style>
