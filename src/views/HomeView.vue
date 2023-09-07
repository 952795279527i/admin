<template>
  <div class="home">
    <div class="leftback">
      <div class="icon">
        <img
          src="https://admins.demo.wueasy.com/assets/svg/login-main-e8ffec0c.svg"
        />
      </div>
      <img
        src="https://admins.demo.wueasy.com/assets/svg/login-bg-d5e5b25d.svg"
      />
    </div>
    <div class="login">
      <h2>登录管理信息</h2>
      <User style="width: 1em; height: 1em; margin-right: 8px" />
      <input
        type="text"
        placeholder="用户名"
        class="user"
        v-model="name"
      /><br />
      <Lock style="width: 1em; height: 1em; margin-right: 8px" />
      <input
        type="password"
        placeholder="密码"
        class="pwd"
        v-model="pwd"
      /><br />
      <input
        type="text"
        class="verify"
        placeholder="请输入验证码"
        v-model="verify"
      />
      <span class="captcha" @click="changeCode()">{{ code }}</span
      ><br />
      <button class="loginBtn" @click="login()">登录</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { getCode, getLogin } from "@/api/http";
import "element-plus/dist/index.css";
import { ElNotification } from "element-plus";
import { useRouter } from "vue-router";
const name = ref<any>();
const pwd = ref<any>();
const verify = ref<any>();
const code = ref<any>();
const router = useRouter();
onMounted(() => {
  getCode().then((ser: any) => {
    code.value = ser.msg;
  });
});
const login = () => {
  let data = {
    vercode: verify.value,
    name: name.value,
    pwd: pwd.value,
  };
  getLogin(data).then((ser: any) => {
    console.log(ser);
    if (ser.code == 0) {
      ElNotification({
        title: "登录",
        message: `登录成功`,
        type: "success",
      });
      router.push("/about");
    } else if (ser.code == 2) {
      ElNotification({
        title: "登录",
        message: `${ser.msg}`,
        type: "warning",
      });
    } else if (ser.code == 3) {
      ElNotification({
        title: "登录",
        message: `${ser.msg}`,
        type: "warning",
      });
    }
  });
};
const changeCode = () => {
  getCode().then((ser: any) => {
    code.value = ser.msg;
  });
};
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  .login {
    width: 450px;
    height: 420px;
    margin: 12% 0% 12% 10%;
    float: left;
    border: 1px solid #79bbff;
    position: relative;
    h2 {
      text-align: center;
      margin: 30px 0;
      font-family: "黑体";
    }
    .user,
    .pwd {
      width: calc(85% - 25px);
      height: 40px;
      margin: 10px 32px;
      padding-left: 25px;
    }
    svg:nth-child(2) {
      position: absolute;
      top: 111px;
      left: 38px;
    }
    svg:nth-child(5) {
      position: absolute;
      top: 175px;
      left: 38px;
    }
    .verify {
      width: calc(48% - 25px);
      height: 40px;
      margin: 10px 0 10px 32px;
      padding-left: 25px;
      outline: none;
    }
    .captcha {
      width: 120px;
      height: 40px;
      float: right;
      display: block;
      margin: 10px 32px 10px 0;
      font-size: 26px;
      border-bottom: 1px solid black;
      background-color: #fff;
      text-align: center;
      cursor: pointer;
    }
    .loginBtn {
      width: 88%;
      height: 40px;
      border: none;
      border-radius: 10px;
      background-color: #79bbff;
      margin: 20px 30px;
    }
  }
  .leftback {
    width: 800px;
    height: 100%;
    float: left;
    .icon {
      width: 700px;
      height: 100%;
      float: left;
      background-color: #d3efff;
      img {
        width: 700px;
        height: 300px;
        margin-top: 250px;
      }
    }
  }
}
</style>
