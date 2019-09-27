<template>
  <div id="app">
    <nav class="navbar nav1 sticky" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <img src="./assets/logo.png">
        </a>

        <a ref="showMenu" role="button" class="navbar-burger burger" @click="showMenu" style="color:white" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>

      </div>
      <div ref="menu" id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item menuName">
            <i class="la la-home"></i>
              Home
          </a>

          <a class="navbar-item menuName">
            <i class="la la-folder-o"></i>
              Project
          </a>

          <a class="navbar-item menuName">
            <i class="la la-user"></i>
              Profile
          </a>
        </div>

        <div class="navbar-end">
          <a class="navbar-item">
            <i class="la la-sign-in"></i>
            <span v-if="isLoggedIn"> | <a @click="logout">Logout</a></span>
            <span v-else> | <router-link to="/login">Login</router-link></span>
          </a>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
    name :'app',
    data(){
      return{
        clickBurger: true
      }
    },
    computed: {
        isLoggedIn: function() {
          return this.$store.getters.userId;
        }
    },
    methods:{
      showMenu(){
        this.clickBurger = !this.clickBurger
        if(this.clickBurger != true){
          this.$refs.showMenu.className="navbar-burger burger is-active"
          this.$refs.menu.className="navbar-menu is-active"
        }else{
          this.$refs.showMenu.className="navbar-burger burger"
          this.$refs.menu.className="navbar-menu"
        }
      },
       logout: function() {
          this.$store.dispatch("logout").then(() => {
            this.$router.push("/login");
          });
        },
    }
}
</script>

<style>
.navbar{
  /* height: 100px; */
  background-color: #265080 !important;
  padding-left: 10%;
  padding-right: 10%;
}
.nav1{
  height: 100px !important;
  padding-top: 15px !important;
  padding-bottom: 15px !important;
}
.nav2{
  max-height: 20px !important;
  z-index:0 !important; 
  padding-top: 15px !important;  
}
.navbar-item{
  color: white !important;
}

@media screen and (max-width: 1085px){
  .navbar-item{
    color: #265080 !important;
  }
  .navbar-menu {
    border-radius: 15px !important;
  }
}

a.navbar-item:hover{
  background-color: #ffffff00 !important;
}

a.menuName:hover{
  background-color: #ffffff00 !important;
  border-bottom: 2px solid white !important;
}

.navbar-item img{
  max-height: 70px !important;
}

.la{
  font-size: 22px !important;
  /* margin-right: 3px !important; */
}
/* #app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
} */
</style>
