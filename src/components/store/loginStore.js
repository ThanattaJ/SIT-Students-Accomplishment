import axios from "axios";
import router from '../../router/index'
// import { setConfig } from "vee-validate/dist/types/config";

// const config = {
//   headers : {
//       'Content-Type': 'application/json',
//       'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiJzdHVkZW50MDEiLCJmdWxsbmFtZSI6InN0dWRlbnQwMSIsImVtYWlsIjoic3R1ZGVudDAxQHN0LnNpdC5rbXV0dC5hYy50aCIsImRlc2NyaXB0aW9uIjoiQ1MiLCJyb2xlIjoic3R1ZGVudCIsImlhdCI6MTU2OTUwOTU1NzQxMX0.n7-qj3563sovVgYgbkPiK5ZqirMRvD2qAsGMvvvXcbg'
//   }
// }

export const loginStore = {
  state: {
    idToken: null,
    userId: null,
    userType: null,
    userName: null,
    userPass: null,
    status: " ",
    //   headers : {
    //     'Content-Type': 'application/json',
    //     'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiJzdHVkZW50MDEiLCJmdWxsbmFtZSI6InN0dWRlbnQwMSIsImVtYWlsIjoic3R1ZGVudDAxQHN0LnNpdC5rbXV0dC5hYy50aCIsImRlc2NyaXB0aW9uIjoiQ1MiLCJyb2xlIjoic3R1ZGVudCIsImlhdCI6MTU2OTUwOTU1NzQxMX0.n7-qj3563sovVgYgbkPiK5ZqirMRvD2qAsGMvvvXcbg'
    // }
    config: {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': null
      }
    }

  },
  mutations: {
    LOGIN_USER: state => { },
    authUser(state, user) {
      // (state.idToken = userData.token),
      // (state.userId = userData.id),
      (state.userName = user),
        // (state.userType = userData.type);
        console.log("username : " + state.userName)
      // state.userPass = userData.userPass;
    },

    clearAuthData(state) {
      (state.idToken = null),
        (state.userId = null),
        (state.userName = null),
        (state.userType = null),
        (state.userPass = null);
    },
    auth_success(state, token, user) {
      state.status = 'success'
      state.idToken = token
      state.username = user
    },
    auth_error(state) {
      state.status = "error";
    },
    setIdToken(state, token) {
      state.idToken = token;
      state.config.headers.Authorization = token
      console.log("gib ทำ : " + state.config.headers.Authorization);
      console.log("state token : " + state.idToken);
    },
    setConfig(state, config) {
      state.headers = config
      console.log("config : ", config)
    }
  },
  actions: {
    login: async function ({ commit }, { username, userType, pass }) {
      // console.log(
      //   "เรียก login ใน store ได้แล้ว" +
      //   username +
      //   " : " +
      //   userType +
      //   " : " +
      //   pass
      // );
      var data = {
        username: username,
        userType: userType,
        password: pass
      };
      try {
        await axios
          .post("http://localhost:7000/login", data)
          .then(res => {
        if (res.data.length > 0) {
        commit("setIdToken", res.data);
              commit("authUser", username)
              commit('auth_success', username)

              router.push('/')
            }
          })
          .catch(err => {
            console.error("error1 : " + err);
          });
      } catch (err) {
        console.error("error2 : " + err);
      }
    }
  },
  logout({ commit }, { router }) {
    commit("clearAuthData");
    router.replace("/");
  },

  getters: {
    userId(state) {
      return state.userId;
    },
    userType(state) {
      return state.userType;
    },
    userName(state) {
      return state.userName;
    },
    returnToken: state => {
      return state.idToken;
    },
    GET_CONFIG: function (state) {
      console.log("get config จากหน้า login" + state.config)
        return state.config
    }
  }
};
