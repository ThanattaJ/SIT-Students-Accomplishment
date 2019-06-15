<template>
    <div id="list-project of student">
       <div id="bodyBg"> 
        <div class="tabs is-toggle is-fullwidth">
          <ul>
            <li>
              <a ref="bgColorMenu1"><span ref="textColorMenu1">Profile</span></a>
            </li>
            <li>
              <router-link to="/ShowProject" ref="bgColorMenu2" class="active"><span ref="textColorMenu2" class="act">Project</span></router-link>
            </li>
            <li>
              <router-link to="/Assignment" ref="bgColorMenu3"><span ref="textColorMenu3">Assignment</span></router-link> 
            </li>
            <li>
              <a ref="bgColorMenu4"><span ref="textColorMenu4">Fingerprint</span></a>
            </li>
            <li>
              <a ref="bgColorMenu5"><span ref="textColorMenu5">Generate Resume</span></a>
            </li>
          </ul>
        </div>
      </div>
      <!-- <div id="profile-bg"></div> -->
      <div class="navProfile">
        <div id="bodyBg"> 
          <div class="columns" style="padding: 15px 0 15px 0">
            <div class="column is-3 picture">
              <img src="./../assets/03-REP-Photo-KMUTT-SophonJampasornklin.jpg"  id="img">
            </div>
            <div class="column is-three-fifths" id="information">
              <p id="name">{{name}}</p>
              <p id="info">{{info}}</p>
              <p id="info"> {{year}}</p>
              <p id="info"> {{student_id}}</p>
              <br>
              <p id="info">{{internship}}</p>
            </div>
            <div class="column borderLeft">
              <nav class="level">
                <div class="level-item has-text-centered">
                  <div>
                    <p class="title">1</p>
                    <p class="heading">Gen Resume</p>
                  </div>
                </div>
                <div class="level-item has-text-centered">
                  <div>
                    <p class="title">24</p>
                    <p class="heading">View Profile</p>
                  </div>
                </div>
              </nav>
              <nav class="level">
                <div class="level-item has-text-centered">
                <bars
                    :data="[{value: 0, title: ''}, {value: 1, title: 'a'}, {value: 5, title: 'b'}, {value: 3, title: 'c'}, {value: 1, title: 'd'}]"
                    :gradient="['#6fa8dc', '#42b983']"
                    :barWidth="10"
                    :growDuration="1.5">
                  </bars>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div id="bodyBg"> 
        <div class="columns">
          <div class="column is-narrow">
            <div class="field">
              <p class="control has-icons-left">
                <input class="input" type="text" placeholder="Search Project...">
                <span class="icon is-small is-left">
                  <i class="la la-search"></i>
                </span>
              </p>
            </div>
          </div>
          <div class="column is-1 borderLeft">
          </div>
          <div class="column">
            <router-link to="/CreateExternalPortPage">
              <div class="createPortPage">
                <i class="la la-plus"></i>
                <div class="textCreate">Create Project</div>
              </div>
            </router-link>
          </div>
          <div class="column is-1">
          </div>
          <div class="column">
            <div class="card">
              <div class="card-image">
                <figure class="image">
                  <img src="./../assets/poster.jpg" alt="Placeholder image">
                </figure>
              </div>
              <div class="card-content">
                <div class="content">
                  <p class="projectName">SIT Students Accomplishment</p>
                  <p class="projectDetail">SIT Students Accomplishment detail detail detail</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>

        <!-- <div class="header" id="profile">
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
        </div> -->

     </div>
</template>

<style>

</style>

<script>
import './../../node_modules/bulma/css/bulma.css';
import './css/student.css'
export default {
  // name:"#information",
    data(){
      return{
        name: 'Sophon Jampasornklin',
        info: 'Bachelor of Science Programme in Information Technology',
        year: '3rd year SIT Student',
        student_id: '59130500109',
        internship: 'Internship: @G-Able'
      }
    },
    // methods: {
    //   clickMenu(menu) {
    //       this.$refs.bgColorMenu2.style.backgroundColor = "#265080";
    //       this.$refs.textColorMenu2.style.color= "white";    
    //   }
    // }
}
</script>
