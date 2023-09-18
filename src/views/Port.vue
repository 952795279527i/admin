<template>
  <div class="prot">
    <button class="btn" @click="appear()">按下</button>
  </div>
  <div class="conversion">
    <el-form :model="form" label-width="120px">
      <el-form-item label="姓名">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          action="https://47.94.4.201/index.php/index/upload/uploadimg"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="form.nickname" />
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.resource">
          <el-radio label="0" />
          <el-radio label="1" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-date-picker v-model="form.date" type="date"></el-date-picker>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="form.phoneNumber" />
      </el-form-item>
      <el-form-item label="入职日期">
        <el-date-picker v-model="form.dates" type="date"></el-date-picker>
      </el-form-item>
      <el-form-item label="电子邮箱">
        <el-input v-model="form.email" type="email"></el-input>
      </el-form-item>
      <el-form-item label="个人介绍">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { getHeaders, upLoadimg, mycenter } from "@/api/http";
import { Plus } from "@element-plus/icons-vue";
import type { UploadProps } from "element-plus";
import md5 from "js-md5";
const imageUrl = ref<any>("");
const dataurl = ref<any>("");
const form = reactive({
  name: "",
  type: [],
  resource: "",
  desc: "",
  date: "",
  dates: "",
  email: "",
  nickname: "",
  phoneNumber: ref<Number>(),
});
const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!);
  const fileReader = new FileReader();
  fileReader.onload = () => {
    imageUrl.value = fileReader.result;
    let data = {
      imgurl: imageUrl.value,
    };
    upLoadimg(data).then((ser: any) => {
      console.log(ser.data.url);
      dataurl.value = ser.data.url;
    });
  };
  fileReader.readAsDataURL(uploadFile.raw!);
};
let userid = 100;
const onSubmit = () => {
  let data = {
    name: form.name,
    userid: userid++,
    img: dataurl.value,
    sex: form.resource,
    iphone: form.phoneNumber,
  };
  mycenter(data).then((ser: any) => {
    console.log(ser);
  });
};
const appear = () => {
  let names = "appear";
  let roles = "前端";
  let str = "nbsp123ok";
  let password = md5(names + roles + str + "1111");
  let data = {
    name: names,
    role: roles,
    sign: password,
  };
  getHeaders(data).then((ser) => {
    console.log(ser, 111);
  });
};
</script>
<style lang="scss" scoped>
.prot {
  width: 20%;
  float: left;
  .btn {
    width: 100px;
    height: 40px;
  }
}

.conversion {
  float: left;
  width: 800px;
  height: 800px;
}
</style>
<style>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
