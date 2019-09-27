import axios from "axios";
import router from '../../router/index'

export const loginStore = {
  state: {
    idToken: null,
    userId: null,
    userType: null,
    userName: null,
    userPass: null,
    status: " "
  },
  mutations: {
    LOGIN_USER: state => {},
    authUser(state, userData) {
      (state.idToken = userData.token),
        (state.userId = userData.id),
        (state.userName = userData.userName),
        (state.userType = userData.type);
      state.userPass = userData.userPass;
    },

    clearAuthData(state) {
      (state.idToken = null),
        (state.userId = null),
        (state.userName = null),
        (state.userType = null),
        (state.userPass = null);
    },
    auth_success(state) {
      state.userName = "student01";
      state.userType = "st.sit.ac.th";
      state.userPass = "Fxig08";
      state.status = "success";
    },
    auth_error(state) {
      state.status = "error";
    },
    setIdToken(state, token) {
      state.idToken = token;
      console.log("state token : " + state.idToken);
    }
  },
  actions: {
    login: async function({ commit }, { username, userType, pass }) {
      console.log(
        "เรียก login ใน store ได้แล้ว" +
          username +
          " : " +
          userType +
          " : " +
          pass
      );
      var data = {
        username: username,
        userType: userType,
        password: pass
      };
      try {
        await axios
          .post("http://localhost:7000/login", data)
          .then(res => {
            // console.log("login : ", res.data.length);
            if(res.data.length > 0){
                commit("setIdToken", res.data);
                router.push('/Home')
            }
            // this.$router.push({
            //     path: "/ProjectDetail/1"
            // });

            
            
            
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
    userPass(state) {
      return state.userPass;
    },
    returnToken: state => {
      return state.idToken;
    }
  }
};
