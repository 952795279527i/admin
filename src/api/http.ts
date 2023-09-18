
// import http from '@/api/api';
// export const getCode = () => {
//     return http.get('/index.php/index/index/getcode');
//   };
import axios from 'axios'
import {get,post} from '@/api/api'
// import { InternalAxiosRequestConfig } from 'axios';
axios.interceptors.request.use(config => {
  // 为请求头添加x-access-token字段为服务端返回的token
  config.headers['strheader'] = '0000'
  // return config是固定用法 必须有返回值
  return config
})
export const getCode = () => {
    return new Promise((resolve, reject) => {
        get("/index.php/index/index/getcode")
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
};

export const getLogin = (data:any) => {
    return new Promise((resolve, reject) => {
        post("/index.php/index/index/login",data)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
};

export const getRoleslist = () => {
  return new Promise((resolve, reject) => {
      get("/index.php/index/role/getroleslist")
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
};

export const getSearchroles = (data:any) => {
  return new Promise((resolve, reject) => {
      post("/index.php/index/role/getsearchroles",data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
};

export const addRoles = (data:any) => {
  return new Promise((resolve, reject) => {
      post("/index.php/index/role/addroles",data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
};

export const delRoles = (data:any) => {
  return new Promise((resolve, reject) => {
      post("/index.php/index/role/delroles",data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
};

export const upRoles = (data:any) => {
  return new Promise((resolve, reject) => {
      post("/index.php/index/role/uproles",data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
};
export const getHeaders = (data: any) => {
  return new Promise((resolve, reject) => {
    post("/index.php/index/callcenter/getheaders", data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const upLoadimg = (data:any) => {
  return new Promise((resolve, reject) => {
      post("/index.php/index/upload/uploadimg",data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
};

export const mycenter = (data:any) => {
  return new Promise((resolve, reject) => {
      post("/index.php/index/index/mycenter",data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
};