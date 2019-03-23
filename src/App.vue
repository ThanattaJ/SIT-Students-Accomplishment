<template>
  <div id="app">
    <div id="head_bg"></div>
    <div id="box-inside">
      <nav class="navbar" role="navigation" aria-label="main navigation" id="nav-top" > 
        <div class="navbar-brand">
          <a class="navbar-start" >
            <div id="logo">
              <img src="./assets/Logo_Pro.png">
            </div>
          </a>
          <a class="button" id="login" >
            Login
          </a>
        </div>
      </nav>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#logo{
  width: 260px;
}
#box-inside{
   width: 80%;
  position: relative;
  margin-left: 10%;
}
#head_bg{
  height: 120px;
  background-color:#265080;
}
#nav-top{
  height: 120px;
  background-color:#265080;
  margin-top: -120px;
}
#login{
  position:absolute;
  right: 20px;
  color: aliceblue;
  font-size: 80%;
  background: none;
  margin-top: 30px;
}

</style>
