<template>
    <div id="list-project of student">
      <div id="student-bg"></div>
        <div class="hearder" id="hearder">
          <div class="columns">
            <div class="column is-2">
              <img src="./../assets/03-REP-Photo-KMUTT-SophonJampasornklin.jpg"  id="img">
            </div>
            <div class="column" id="information">
              <p id="name">{{name}}</p>
              <p id="info">{{info}}</p>
              <p id="info"> {{year}}</p>
              <p id="info"> {{student_id}}</p>
              <p id="internship">{{internship}}</p>
            </div>
            <div class="column">
            </div>
          </div>
        <router-view/>
        </div>
        <div id="body-bg">
        <div class="body" id="body">
          <div class="columns is-gapless.is-centered" id="head-table">
            <div class="button column" id="th">
                <router-link to="/Profile" >Profile</router-link> 
            </div>
            <div class="button column" id="tb" >
                <router-link to="/Project" >Project</router-link> 
            </div>
            <div class="button column" id="tb" >
                <router-link to="/Assignment" >Assignment</router-link> 
            </div>
            <div class="button column" id="tb" >
              Fingerprint
            </div>
            <div class="button column" id="te" >
              Generate Resume
            </div>
          </div>
        </div>
        </div>
     </div>

</template>
<script>
import './../../node_modules/bulma/css/bulma.css';
import './css/student.css'
export default {
  el:"#information",
    data(){
      return{
        name: 'Sophon Jampasornklin',
        info: 'Bachelor of Science Programme in Information Technology',
        year: '3rd year SIT Student',
        student_id: '59130500109',
        internship: 'Internship: @G-Able'
      }
    }
}
</script>
