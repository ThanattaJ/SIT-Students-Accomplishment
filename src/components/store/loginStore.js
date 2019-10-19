import axios from "axios";
import router from '../../router/index'
export const loginStore = {
  state: {
    loginStatus: null,
    username: null,
    config: {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': null
      }
    }
  },
  //----------------------------------------------------------------------------------------------------------------------------------------------------------------
  actions: {
    SET_LOGIN_STATUS({commit}, loginStatus){
      commit("SET_LOGIN_STATUS", loginStatus)
    },
    SET_ALL_LOGIN_DATA({ commit }, { token, username }) {
      commit("SET_ALL_LOGIN_DATA", { token: token, username: username });
    },
    LOGIN: async function ({ commit, rootState }, { username, userType, pass }) {
      var data = {
        username: username,
        userType: userType,
        password: pass
      };
      var pathName = rootState.pathStore.pathName
      console.log("rootState : " + pathName)
      try {
        console.log("เข้า try LOGIN")
        await axios
          // .post(pathName + "/login", data)
          .post("http://localhost:7000" + "/login", data)
          // .post("https://www.sit-acc.nruf.in.th/login", data)
          .then(res => {
            if (res.data.length > 0) {
              commit("SET_ALL_LOGIN_DATA", { token: res.data, username: username });
              commit("SET_LOGIN_STATUS", true);
              localStorage.setItem('Authen_token', res.data);
              localStorage.setItem('usernameSIT', username);
              localStorage.setItem('loginStatus', true);
              router.push('/student')
            }
          })
          .catch(err => {
            console.error("login_error : " + err);
          });
      } catch (err) {
        console.error("login_error : " + err);
      }
    },
    LOGOUT({ commit }) {
      commit("SET_ALL_LOGIN_DATA", { token: null, username: null });
      localStorage.setItem('Authen_token', null);
      localStorage.setItem('usernameSIT', null);
      localStorage.setItem('loginStatus', null);
      router.push("/");
    }
  },
  //----------------------------------------------------------------------------------------------------------------------------------------------------------------
  mutations: {
    SET_ALL_LOGIN_DATA(state, { token, username }) {
      state.config.headers.Authorization = token
      state.username = username
    },
    SET_LOGIN_STATUS(state, loginStatus) {
      state.loginStatus = loginStatus
    }
  },
  //----------------------------------------------------------------------------------------------------------------------------------------------------------------
  getters: {
    GET_USERNAME(state) {
      return state.username;
    },
    GET_CONFIG: function (state) {
      console.log("get config จากหน้า login" + state.config)
      return state.config
    },
    GET_LOGIN_STATUS(state) {
      return state.loginStatus
    }
  }
}
//=======================================================================================================================================

// import axios from "axios";
// import router from '../../router/index'
// // import { setConfig } from "vee-validate/dist/types/config";
// export const loginStore = {
//   state: {
//     idToken: null,
//     userId: null,
//     userType: null,
//     username: null,
//     userPass: null,
//     status: " ",
//     config: {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': null
//       }
//     }

//   },
//   actions: {
//     login: async function ({ commit, rootState }, { username, userType, pass }) {
//       var data = {
//         username: username,
//         userType: userType,
//         password: pass
//       };
//       var pathName = rootState.pathStore.pathName
//       console.log("rootState : " + pathName)
//       try {
//         await axios
//           .post(pathName + "/login", data)
//           // .post("https://www.sit-acc.nruf.in.th/login", data)
//           .then(res => {
//             if (res.data.length > 0) {
//               commit("setIdToken", res.data);
//               // commit("authUser", username)
//               // commit('auth_success', username)
//               localStorage.setItem('Authen_token', res.data);
//               router.push('/student')
//             }
//           })
//           .catch(err => {
//             commit('auth_error ', err)
//             console.error("error1 : " + err);
//           });
//       } catch (err) {
//         console.error("error2 : " + err);
//       }
//     },
//     logout({ commit }, { router }) {
//       commit("clearAuthData");
//       router.replace("/login");
//     },
//     setIdToken({ commit }, token) {
//       commit("setIdToken", token);
//     }
//   },
//   mutations: {
//     LOGIN_USER: state => { },
//     authUser(state, user) {
//       // (state.idToken = userData.token),
//       // (state.userId = userData.id),
//       (state.username = user),
//         // (state.userType = userData.type);
//         console.log("username : " + state.username)
//       // state.userPass = userData.userPass;
//     },
//     clearAuthData(state) {
//       (state.idToken = null),
//         (state.userId = null),
//         (state.username = null),
//         (state.userType = null),
//         (state.userPass = null);
//     },
//     auth_success(state, token, user) {
//       state.status = 'success'
//       state.idToken = token
//       state.username = user
//       console.log("success :", user + token)
//     },
//     auth_error(state) {
//       state.status = "error";
//     },
//     setIdToken(state, token) {
//       console.log("setIdToken : " + token)
//       state.idToken = token;
//       state.config.headers.Authorization = token
//     },
//     setConfig(state, config) {
//       state.headers = config
//       console.log("config : ", config)
//     }
//   },

//   getters: {
//     userId(state) {
//       return state.userId;
//     },
//     userType(state) {
//       return state.userType;
//     },
//     username(state) {
//       return state.username;
//     },
//     returnToken: state => {
//       return state.idToken;
//     },
//     GET_CONFIG: function (state) {
//       console.log("get config จากหน้า login" + state.config)
//       return state.config
//     }
//   }
// }
