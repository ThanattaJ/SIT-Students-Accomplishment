<template>
  <div id="student-bg">
    <div class="hearder" id="hearder">
      <div class="columns">
        <div class="column is-2"><img src="./../assets/03-REP-Photo-KMUTT-SophonJampasornklin.jpg"  id="img"></div>
        <div class="column" id="information">
          <p id="name">Sophon Jampasornklin</p>
          <p id="info">Bachelor of Science Programme in Information Technology</p>
          <p id="info"> 3rd year SIT Student</p>
          <p id="internship">Internship: @G-Able</p>
        </div>
        <div class="column">
        </div>
      </div>
    <router-view/>
    </div>
  </div>

</template>
<script>
import './../../node_modules/bulma/css/bulma.css';
export default {
    name : 'student'
}
</script>
<style>
#student-bg{
  height:200px;
  background-color: #F7F7F7;
  position:relative;
  z-index: -1;
}
#hearder{ 
  background-color: #F7F7F7;
  height: 200px;
  width: 80%;
  margin-left: 10%;
}
#img{
  width: 120px;
  margin-left: 40px;
  margin-top: 27px;
}
#name{
  margin-top: 35px;
  font-size: 25px;
  color: #265080;
}
#info{
  color:#949494;
  font-size: 15px;
}
#internship{
  color:#949494;
  margin-top: 35px;
}
</style>


