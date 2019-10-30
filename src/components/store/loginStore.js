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
    SET_LOGIN_STATUS({ commit }, loginStatus) {
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
      console.log("data : " , data)
      try {
        console.log("เข้า try LOGIN")
        await axios
          // .post(pathName + "/login", data)
          // .post("http://localhost:7000/login", data,
          //   {
          //     headers: {
          //       'Content-Type': 'application/json'
          //     }
          //   })
          .post(pathName + "/login", data,{
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(res => {
            console.log("res : ",res.data)
            if (res.data.status == 200) {
              commit("SET_ALL_LOGIN_DATA", { token: res.data.token, username: username });
              commit("SET_LOGIN_STATUS", true);
              if(userType === 'st.sit.kmutt.ac.th'){
                localStorage.setItem('user_role', 'student');
              }else{
                localStorage.setItem('user_role', 'lecturer');
                if(res.data.isAdmin){
                  localStorage.setItem('isAdmin', true);
                }else{
                  localStorage.setItem('isAdmin', false);
                }
              }
              localStorage.setItem('Authen_token', res.data.token);
              localStorage.setItem('usernameSIT', username);
              localStorage.setItem('loginStatus', true);
              if(res.data.isAdmin){
                router.push('/course')
                location.reload()
              }
              else{
                router.push('/student')
                location.reload()
              }
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
      localStorage.clear()
      router.push("/");
      location.reload()
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