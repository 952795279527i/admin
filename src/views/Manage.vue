<template>
  <div class="manage">
    <div class="top">
      <input
        type="text"
        placeholder="请输入角色名称进行模糊搜索"
        @keydown.enter="search()"
        v-model="search_val"
      />
      <button class="addBtn" @click="addList()">+</button>
    </div>
    <div class="foot">
      <table>
        <thead>
          <tr>
            <th>名称</th>
            <th>描述</th>
            <th>权限配置</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(i, index) in arr" :key="i.id">
            <td>{{ i.rolename }}</td>
            <td>{{ i.describe }}</td>
            <td>{{ i.powers }}</td>
            <td>
              <EditPen
                style="width: 1em; height: 1em; margin-right: 8px"
                @click="update(i)"
              />
              <Delete
                style="width: 1em; height: 1em; margin-right: 8px"
                @click="delData(i)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="modal" v-show="showModal">
    <div class="modal-content">
      <div class="head">
        <p>添加用户角色</p>
        <span @click="hide()">×</span>
      </div>
      <form>
        <span><sup>*</sup>角色名称:</span>
        <input type="text" v-model="username" /><br />
        <span>描述:</span>
        <textarea cols="60" rows="2" v-model="usertext"></textarea><br />
        <span><sup>*</sup>是否启用:</span>&emsp;
        <el-radio v-model="radio" label="1">启用</el-radio>&emsp;
        <el-radio v-model="radio" label="0">停用</el-radio><br />
        <span><sup>*</sup>权限配置:</span>
        <input class="custom-select" v-model="power" />
      </form>
      <div class="push_button">
        <button class="offBth" @click="offList()">取消</button>
        <button class="filingBtn" @click="filingList()">保存</button>
      </div>
    </div>
  </div>
  <div class="edit" v-show="editModal">
    <div class="modal-content">
      <div class="head">
        <p>编辑用户角色</p>
        <span @click="hideedit()">×</span>
      </div>
      <form>
        <span><sup>*</sup>角色名称:</span>
        <input type="text" v-model="edit_username" /><br />
        <span>描述:</span>
        <textarea cols="60" rows="2" v-model="edit_usertext"></textarea><br />
        <span><sup>*</sup>是否启用:</span>&emsp;
        <el-radio v-model="edit_radio" label="1">启用</el-radio>&emsp;
        <el-radio v-model="edit_radio" label="0">停用</el-radio><br />
        <span><sup>*</sup>权限配置:</span>
        <input class="custom-select" v-model="edit_power" />
      </form>
      <div class="push_button">
        <button class="offBth" @click="offedit()">取消</button>
        <button class="filingBtn" @click="filingedit()">保存</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import {
  getRoleslist,
  getSearchroles,
  addRoles,
  delRoles,
  upRoles,
} from "@/api/http";
import { ElMessage, ElMessageBox, ElNotification } from "element-plus";
let arr = ref<any>([]);
let showModal = ref<boolean>(false);
let editModal = ref<boolean>(false);
let search_val = ref<any>();
let username = ref<string>();
let edit_username = ref<string>();
let edit_usertext = ref<string>();
let usertext = ref<string>();
let radio = ref<string>("1");
let edit_radio = ref<string>("1");
let edit_power = ref<string>();
let power = ref<string>();
let id = ref<number>();
onMounted(() => {
  list();
});
const search = () => {
  let data = {
    rolename: search_val.value,
  };
  getSearchroles(data).then((ser: any) => {
    arr.value = ser.data.data;
  });
};
const list = () => {
  getRoleslist().then((ser: any) => {
    arr.value = ser.data.data;
  });
};
const addList = () => {
  showModal.value = true;
};
const hide = () => {
  username.value = "";
  usertext.value = "";
  power.value = "";
  radio.value = "1";

  showModal.value = false;
};
const hideedit = () => {
  edit_username.value = "";
  edit_usertext.value = "";
  edit_radio.value = "1";
  edit_power.value = "";
  editModal.value = false;
};
const offList = () => {
  showModal.value = false;
};
const filingList = () => {
  let data = {
    rolename: username.value,
    describe: usertext.value,
    powers: power.value,
    status: radio.value,
  };
  addRoles(data).then((ser: any) => {
    if (ser.code == 0) {
      ElNotification({
        title: "添加",
        message: `${ser.msg}`,
        type: "success",
      });
      list();
      hide();
    } else if (ser.code == 2) {
      ElNotification({
        title: "添加",
        message: `${ser.msg}`,
        type: "success",
      });
    }
  });
};
const delData = (i: any) => {
  let data = {
    id: i.id,
  };
  ElMessageBox.confirm("确定要删除吗，此操作无法挽回?", "操作", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
    center: true,
  })
    .then(() => {
      delRoles(data).then((ser: any) => {
        list();
      });
      ElMessage({
        type: "success",
        message: "删除已完成",
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "删除已取消",
      });
    });
};
const update = (i: any) => {
  editModal.value = true;
  id.value = i.id;
  edit_username.value = i.rolename;
  edit_usertext.value = i.describe;
  edit_power.value = i.powers;
  edit_radio.value = String(i.status);
  console.log(i);
};
const offedit = () => {
  hideedit();
};
const filingedit = () => {
  let data = {
    id: id.value,
    rolename: edit_username.value,
    describe: edit_usertext.value,
    powers: edit_power.value,
    status: edit_radio.value,
  };
  upRoles(data).then((ser: any) => {
    console.log(ser);
    if (ser.code == 0) {
      ElNotification({
        title: "修改",
        message: `${ser.msg}`,
        type: "success",
      });
      list();
      editModal.value = false;
    } else if (ser.code == 2) {
      ElNotification({
        title: "修改",
        message: `${ser.msg}`,
        type: "success",
      });
    }
  });
};
</script>

<style lang="scss" scoped>
.manage {
  width: 100%;
  height: 100%;
  .top {
    width: 100%;
    height: 60px;
    background-color: #fff;
    border-bottom: 1px solid #ccc;
    input {
      float: left;
      width: 220px;
      height: 30px;
      margin: 13px;
      outline: none;
    }
    .addBtn {
      width: 35px;
      height: 35px;
      margin: 12px;
      border: none;
      float: left;
      font-size: 24px;
      background-color: #409eff;
      color: #fff;
    }
  }
  .foot {
    width: 100%;
    height: calc(100% - 61px);
    background-color: #fff;

    table {
      width: 100%;
      text-align: center;
      border-collapse: collapse;

      thead {
        height: 50px;
        border-bottom: 1px solid #ccc;
      }
      tbody {
        tr {
          height: 45px;
          border-bottom: 1px solid #ccc;
        }
        tr:nth-child(even) {
          background-color: #f0f0f0;
        }

        tr:nth-child(odd) {
          background-color: #ffffff;
        }
      }
    }
  }
}
.modal,
.edit {
  display: flex;
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  width: 550px;
  height: 500px;
  .head {
    width: 100%;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #eeeeee;
    p {
      font-size: 17px;
      float: left;
      margin-left: 20px;
    }
    span {
      float: right;
      font-size: 18px;
      color: #909399;
      margin-right: 20px;
      cursor: pointer;
    }
  }
  form {
    text-align: left;
    height: 380px;
    span {
      width: 120px;
      height: 30px;
      text-align: right;
      display: inline-block;
      sup {
        color: #f66c80;
      }
    }
    input {
      margin: 25px 0;
    }
    .custom-select {
      width: 350px;
      height: 30px;
      border: 2px solid #ebedf1;
      float: right;
      outline: none;
      margin: 0px;
      margin-right: 60px;
    }
    .el-checkbox {
      width: 89%;
      height: 40px;
      line-height: 40px;
      padding-left: 40px;
    }
  }
  .push_button {
    width: 100%;
    height: 60px;
    border-top: 1px solid #eeeeee;
    line-height: 60px;
    .offBth,
    .filingBtn {
      width: 100px;
      height: 35px;
    }
    .filingBtn {
      background-color: #409eff;
      color: #fff;
      border: none;
    }
    .offBth {
      background-color: #fff;
      border: 1px solid #ccc;
      margin: 0 10px 0 160px;
    }
  }
}

.open-modal {
  padding: 10px 20px;
  background-color: #2878e2;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
</style>
