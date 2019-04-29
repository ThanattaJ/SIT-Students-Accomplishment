<template>
  <div id="app">
    <div id="head_bg"></div>
    <div id="box-inside">
      <nav class="navbar" role="navigation" aria-label="main navigation" id="nav-top" > 
        <div class="navbar-brand">
          <a class="navbar-start" >
            <div id="logo">
              <img src="./assets/Logo_Pro.png">
              <div id="manu">
                <ul>
                  <th><router-link to="/Home" style="margin-right: 30px;">Home</router-link></th>
                  <th><router-link to="/ShowProject" style="margin-right: 30px;">project</router-link></th>
                  <th id="hover-manu">Profile</th>
                </ul>
              </div>
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
name :'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#logo{
  width: 240px;
}
#box-inside{
  width: 80%;
  position: relative;
  margin-left: 10%;
}
#head_bg{
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
}

</style>
