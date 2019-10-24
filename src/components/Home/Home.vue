<template>
  <div>
    <div>
    <vueper-slides autoplay :dragging-distance="50" prevent-y-scroll :arrows="false"  fixed-height="700px" :bullets-outside="true">
      <vueper-slide 
        v-for="(project,i) in projects" 
          :key="i" 
          :project_id="projects[i].project_id"
          :image="projects[i].cover_path"
          :name_en="projects[i].name_em"
          :name_th="projects[i].name_th"
          :link="`http://localhost:7001/ProjectDetail/${projects[i].project_id}`">
      </vueper-slide>
    </vueper-slides>
    </div>
    <div id="block">
        <div class="row">
          <div class="introCol" id="introCol">
            <img src="../../assets/home-example.png">
          </div>
          <div class="introCol" id="introCol">
            <h1 id="headerContent">SIT STUDENTS ACCOMPLISHMENT</h1>
            <p id="contentIntro">
              &emsp;&nbsp; Web Application for students of School of Information Technology faculty of 
              King Mongkut's University of Technology Thonburi blah blah blah

              Achievement Base blah blah
            </p>
          </div>
        </div>
    </div>
    <div class="featuresBlock">
        <h1 class="featuresHeader" id="headerContent">FEATURES</h1>
        <div class="featuresRow">
          <div class="featuresCol" id="featuresCol">
            <img src="../../assets/home-page.png" class="imgFeaturers">
            <p id="contentFetures">Manage your portfolio pages</p>
          </div>
          <div class="featuresCol" id="featuresCol">
            <img src="../../assets/home-upload.png" class="imgFeaturers">
            <p id="contentFetures">Upload Documents</p>
          </div>
          <div class="featuresCol" id="featuresCol">
            <img src="../../assets/home-photo.png" class="imgFeaturers">
            <p id="contentFetures">Upload Photo and Attach Video Link</p>
          </div>
          <div class="featuresCol" id="featuresCol">
            <img src="../../assets/home-achive.png" class="imgFeaturers">
            <p id="contentFetures">Specify your awards of portfolio</p>
          </div>
        </div>
        <div class="featuresRow">
          <div class="featuresCol" id="featuresCol">
            <img src="../../assets/home-group.png" class="imgFeaturers">
            <p id="contentFetures">Referring to the collaborators of portfolio</p>
          </div>
          <div class="featuresCol" id="featuresCol">
            <img src="../../assets/home-chart.png" class="imgFeaturers">
            <p id="contentFetures">Show Statistics on portfolio relevance from tags.</p>
          </div>
          <div class="featuresCol" id="featuresCol">
            <img src="../../assets/home-clap.png" class="imgFeaturers">
            <p id="contentFetures">Clap the portfolio that you like</p>
          </div>
          <div class="featuresCol" id="featuresCol">
            <img src="../../assets/home-gen-resume.png" class="imgFeaturers">
            <p id="contentFetures">Generate Resume</p>
          </div>
        </div>
    </div>
    <footer id="footer">
        <span class="footerContent">SIT STUDENTS ACCOMPLISHMENT &copy;2019</span>   
        <span class="footerContent footerRight">View More Projects 
          <router-link to="/Projects"><md-button class="buttonToViewProject"> Click </md-button></router-link>
        </span>
    </footer>
  </div>
</template>

<script>
  import './../css/Home.css';
  import axios from 'axios'
  import { VueperSlides, VueperSlide } from 'vueperslides'

  export default {
      components: { VueperSlides, VueperSlide },
      data(){
        return {
            projects: []
        }
      },
      async mounted() {
        const {
            data
        } = await axios.get('https://www.sit-acc.nruf.in.th/projects/Top-Project');
          console.log('data', data);
          console.log('data', data.length);
          console.log('projects', this.projects)
        for (let i = 0; i < data.length; i++) {
            const project = {
              project_id: data[i].id,
              name_en: data[i].project_name_en,
              name_th: data[i].project_name_th,
              cover_path: data[i].cover_path,
            }
            this.projects.push(project)
        }
    },
  }
</script>

<style>
  .vueperslides__bullet {
    background-color: rgba(0, 0, 0, 0.3);
    border: none;
    box-shadow: none;
    transition: 0.3s;
    width: 20px;
    height: 20px;
  }

  .vueperslides__bullet--active {
    background-color: #265080;
  }
</style>