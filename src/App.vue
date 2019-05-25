<template>
  <div id="app">
    <nav class="navbar nav1" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://bulma.io">
      <img src="./assets/logo.png">
    </a>
    <a class="navbar-item">
        <i class="la la-home"></i>
          Home
      </a>
      <a class="navbar-item">
          <i class="la la-folder-o"></i>
          Project
      </a>
      <a class="navbar-item">
        <i class="la la-user"></i>
          Profile
      </a>
  </div>
   <div class="navbar-end">
      <div class="navbar-item">
        <i class="la la-sign-in"></i>
        Login
      </div>
    </div>
</nav>
<!-- <nav class="navbar nav2" role="navigation" aria-label="main navigation">
  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item">
        <i class="la la-home"></i>
          Home
      </a>
      <a class="navbar-item">
          <i class="la la-folder-o"></i>
          Project
      </a>
      <a class="navbar-item">
        <i class="la la-user"></i>
          Profile
      </a>
    </div>
  </div>
</nav> -->
    <router-view/>
  </div>
</template>

<script>
export default {
name :'app'
}
</script>

<style>
.navbar{
  /* height: 100px; */
  background-color: #265080;
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
  color: white
}

.navbar-item img{
  max-height: 100px ;
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
/* #logo{
  width: 100px;
}
#box-inside{
  width: 80%;
  position: relative;
  margin-left: 10%;
}
#head_bg{
  width: 100%;
  height: 100px;
  background-color:#265080;
}
#nav-top{
  height: 100px;
  background-color:#265080;
  margin-top: -107px;
}
#login{
  position:absolute;
  right: 20px;
  color: aliceblue;
  font-size: 80%;
  background: none;
  margin-top: -8%;
}
#manu{
  margin-left: 20%;
  margin-top: -18px;
  font-size: 13px;
  color: white;
}
#hover-manu {
  border-bottom: 3px solid white;
} */

</style>
