<template>
  <div v-if="loading"><img src="../../assets/Rolling-2s-200px.svg" class="center-div"></div>
  <div v-else>
    <div>
    <carousel :perPage="1" 
      :adjustableHeight="true" 
      :paginationSize="20" 
      paginationActiveColor="#265080" 
      :autoplay="true" 
      :loop="true">
      <slide  v-for="(project,i) in projects" :key="i">
        <div class="grid">
           <router-link :to="`/ProjectDetail/${projects[i].project_id}`">
            <figure class="effect-zoe">
              <img :src=project.cover_path >
                <figcaption>
                  <h2><span>{{project.name_en}}</span></h2>
                </figcaption>			
            </figure>
           </router-link>
        </div>
      </slide>
    </carousel>
    </div>
    <div id="block">
        <div class="row">
          <div class="introCol" id="introCol">
            <img src="../../assets/home-example.png">
          </div>
          <div class="introCol" id="introCol">
            <h1 id="headerContent">SIT STUDENTS ACCOMPLISHMENT</h1>
            <p id="contentIntro">
              &emsp;&nbsp; Online portfolio lets students of the 
              School of Information Technology faculty at KMUTT collecting 
              their portfolios that persistent, not lost and can be used in the future
              <br><br>
              <blockquote style="display: block;">
                <div style="padding-left:45%"><img class="imgQuote" src="../../assets/left-quotes-sign.png"></div>
                <p class="quote">Everyone is on the achievement base.<br>We believe that the portfolio is a success.</p>
                <p class="quote-footer">SIT Student Accomplishment</p>
              </blockquote>
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
            <p id="contentFetures">Export yours resume.</p>
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
  import './../css/Loading.css';
  import axios from 'axios'
  import { Carousel, Slide } from 'vue-carousel';
  import { VueperSlides, VueperSlide } from 'vueperslides'
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  export default {
      components: { VueperSlides, VueperSlide, Carousel, Slide },
      computed: {
        ...mapGetters({
            URL: 'GET_PATHNAME',
            loading: 'GET_LOADING'
        })
      },
      data(){
        return {
            projects: []
        }
      },
      async mounted() {
        console.log('loading!', this.loading);
        const {
          data
        } = await axios.get(`${this.URL}/projects/Top-Project`);
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
        this.SET_LOADING_STATUS(false)
    },
    methods: {
      ...mapActions(['SET_LOADING_STATUS']),
      beforeMount() {
          this.setEditProject(this.EditProject)
          this.SET_LOADING_STATUS(true)
      }
    }
  }
</script>