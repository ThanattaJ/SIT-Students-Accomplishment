<template>
  <div id="app">
    <nav class="navbar nav1" role="navigation" aria-label="main navigation">
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
            Login
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
        
      }
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
  height: 100px;
  padding-top: 15px;
  padding-bottom: 15px;
}
.nav2{
  max-height: 20px;
  z-index:0; 
  padding-top: 15px;  
}
.navbar-item{
  color: white;
}
/* @media screen and (min-width: 1085px){
  .navbar-item{
    color: white !important;
  }
  .navbar-menu {
    border-radius: 15px;
  }
} */
@media screen and (max-width: 1085px){
  .navbar-item{
    color: #265080 !important;
  }
  .navbar-menu {
    border-radius: 15px;
  }
}

a.navbar-item:hover{
  background-color: #ffffff00;
}

a.menuName:hover{
  background-color: #ffffff00;
  border-bottom: 2px solid white;
}

.navbar-item img{
  max-height: 70px !important;
}

.la{
  font-size: 22px;
      margin-right: 3px;
}
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
