<template>
  <div class="body" id="ProjectDetail-bg">
      <div id="TitleName">
        <p id="TitleName_eg">{{header.TitleName}}</p>
        <p id="TitleName_th">{{header.TitleName_TH}}</p>
      </div>
      <!-- -------------cover----------------- -->
      <div class="section" id="cover">
          <img src="https://storage.googleapis.com/senior-project-c9108.appspot.com/Images/1/cover">
          <div class="container" v-if="EditProject" >
              <uploadimg/>
          </div>
      </div>
      <div id="EditProjects">
        <div class="columns">
            <div class="column is-offset-5">  
                <nav class="navbar" role="navigation" aria-label="dropdown navigation" v-if="EditProject">
                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link">
                          Select Status
                        </a>

                        <div class="navbar-dropdown">
                            <a class="navbar-item" v-on:click="show">
                                Show
                            </a>
                            <a class="navbar-item" v-on:click="notShow">
                                not Show
                            </a>
                        </div>
                    </div>
                </nav>
            </div>
            <div class="column is-1">  
                <figure class="image is-24x24">
                    <img src="../.././assets/clap.png">
                        24
                </figure>
            </div>
            <div class="column is-1">
                <figure class="image is-24x24">
                    <img src="../.././assets/watch.png">
                        30
                </figure>
            </div> 
            </div>
            <div class="columns">
                <div class="column is-four-fifths">
                    <button @click="EditProject = !EditProject" v-if="!EditProject">EditProject</button>
                    <button @click="save" v-else-if="EditProject">Save Change</button>
                    <button @click="cancel" v-if="EditProject">Cancel</button>
                </div>
            </div>    
      </div>
      <!-- ------------------------------ -->
      <div id="body-project" v-show="showDetail">
        <div class="columns ">
            <div class="column is-6">
                <div class="card" id="Details">
                    <header class="card-header">
                        <p class="card-header-title" id="cardHeader">
                            Details
                        </p>
                    </header>
                    <!-- ------------------------------ -->
                    <div class="card-content" >
                        <div class="content"  id="content">
                            <textarea class="textarea has-fixed-size" 
                            v-model="Detail.content_eg" id="content" 
                            :disabled="!EditProject"
                            rows="5"
                            max-rows="6"></textarea>
                         </div>
                         <div class="content" id="content">
                             <textarea class="textarea has-fixed-size" 
                             v-model="Detail.content_th" id="content" 
                             :disabled="!EditProject"
                             rows="5"
                             max-rows="6"></textarea>
                        </div>
                    </div>
                    <!-- ------------------------------ -->
                </div>
                <div class="card" id="Acheivement">
                    <header class="card-header">
                        <p class="card-header-title" id="cardHeader">
                            Acheivement
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content"  id="Acheivement">
                            Name: {{Acheivement.name}}
                        </div>
                        <div class="content"  id="Acheivement">
                            Details: {{Acheivement.detail}}
                        </div>
                        <div class="content" id="Acheivement" >
                            Company: {{Acheivement.company}}
                        </div>
                        <div class="content"  id="Acheivement">
                            Date of Event: {{Acheivement.date_of_event}}
                        </div>
                    </div>
                </div>
                <!-- ------------------- -->
                <!-- <div  id="carousel">
                            <b-carousel
                            id="carousel-1"
                            v-model="slide"
                            :interval="4000"
                            controls
                            indicators
                            background="#ababab"
                            img-width="1024"
                            img-height="480"
                            style="text-shadow: 1px 1px 2px #333;"
                            @sliding-strat="onSlideStart"
                            @sliding-end="onSlideEnd">
                                <b-carousel
                                caption="First Slide"
                                text="test"
                                img-src="https://picsum.photos/1024/480/?image=52">
                                </b-carousel>
                                <b-carousel-slide img-src="https://www.img.live/images/2019/04/20/LUNA.png">
                                    <h1>Hello world!</h1>
                                </b-carousel-slide>
                                <b-carousel-slide img-src="https://www.img.live/images/2019/04/20/ScreenShot2562-04-20at02.59.26.png"></b-carousel-slide>
                                <b-carousel-slide>
                                    <img
                                        slot="img"
                                        class="d-block img-fluid w-100"
                                        width="1024"
                                        height="480"
                                        src="https://www.img.live/images/2019/04/20/ScreenShot2562-04-20at02.59.37.png"
                                        alt="image slot"
                                        >
                                </b-carousel-slide> 
                            </b-carousel>
                        </div> -->
                         <!-- -------------------- -->
                <div id="video">
                    <iframe src="https://www.youtube.com/embed/98YUIBPJWMo" width="100%" height="100%"></iframe>
                </div>
            </div>
            <div class="column">
                <div class="card" id="Authors">
                    <header class="card-header">
                        <p class="card-header-title" id="cardHeader">
                            Authors
                        </p>
                    </header>
                        <div class="card-content" id="student" > 
                            <div class="columns" v-for="(student,index) in Authours" v-bind:key="index">
                                <div class="column">
                                    <div class="content">
                                        <div id="student_name">{{student.name}}</div>
                                    </div>
                                </div>
                                <div class="column">
                                    <div class="content">
                                        <div id="student_id"> ID : {{student.Student_id}}</div>
                                        <div id="mail">{{student.mail}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="columns" v-for="(out,index) in outsider">
                                <div class="column">
                                    <div class="content">
                                        <div id="student_name">{{out.name}}</div>
                                    </div>
                                </div>
                                <div class="column">
                                    <div class="content">
                                        <textarea class="textarea has-fixed-size" 
                                            v-model="outsider.mail" id="content" 
                                            :disabled="!EditProject"
                                            rows="1"
                                            max-rows="1">
                                            {{out.mail}}
                                        </textarea>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
                <div class="card" id="tool">
                    <header class="card-header">
                        <p class="card-header-title" id="cardHeader">
                            Development Tools & Techniques
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content" id="tool" > 
                            Tool 
                            <textarea class="textarea has-fixed-size" 
                             v-model="Tools.tool" id="content" 
                             :disabled="!EditProject"
                             rows="1"
                             max-rows="6">
                            </textarea>
                        </div>
                    </div>
                </div>
                <div class="card" id="Documents">
                    <header class="card-header">
                        <p class="card-header-title" id="cardHeader">
                            Documents
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content" >
                             {{document}}
                        </div>
                    </div>
                </div>
                <div class="card" id="Tag">
                    <header class="card-header">
                        <p class="card-header-title" id="cardHeader">
                            Tag
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            Tag
                        </div>
                    </div>
                </div>
                <div class="card" id="References">
                    <header class="card-header">
                        <p class="card-header-title" id="cardHeader">
                            References
                        </p>
                    </header>
                    <div class="card-content" >
                        <div class="content">
                            <a href="">{{References.ref}}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

      </div>
  </div>
</template>

<script>

import uploadimg from './uploadimg'
import './../css/ProjectDetail.css';
import Vue from 'vue'
import axios from 'axios';
// import BootstrapVue from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
// import bCarousel from 'bootstrap-vue/es/components/carousel/carousel';
// import bCarouselSlide from 'bootstrap-vue/es/components/carousel/carousel-slide';
// Vue.component('b-carousel', bCarousel);
// Vue.component('b-carousel-slide', bCarouselSlide);
export default {
  name: 'ProjectDetail',
  components: {uploadimg},
  data () {
    return {
        header:{
            TitleName: ' SIT ',
            TitleName_TH: 'ระบบสะสมผลงานนักศึกษา คณะเทคโนโลยีสารสนเทศ',
        },
        cover:{
            images:'./../../assets/LUNA.png'
        },
        Detail:{
            content_th: '',
            content_eg: ''
        },
        Authours:[
            {   name: 'Sophon Jampasornklin',
                Student_id: '59130500101',
                mail: 'sophonjampasornklin@gmail.com'
                },
             {   name: ' ',
                Student_id: ' ',
                mail: ' '
                },
        ],
       Tools:{
           tool:'-',
           Technology:'-',
           github:'-'
        },
        Acheivement:{
            name:'',
            detail:'',
            company:'',
            date_of_event:''
        },
        References:{
            ref:'https://bootstrap-vue.js.org/docs/components/form-textarea/'
        },
        document:[],
        outsider:[
            {
            mail: "s@mail.com",
            name: "firstname1",
            id: '0',
             },
             {
            mail: "s@mail.com",
            name: "firstname1",
            id: '0',
             }
        ],
        showDetail:true,
        EditProject:false,
        imgCover:[],
        // slide: 0,
        // sliding: null,
        // image:''
    }
  },

    
    async mounted() {

        // get data
        const { data } = await axios.get('http://localhost:7000/projects/1')
        console.log(data)
        this.header.TitleName = data.project_detail.project_name_en;
        this.header.TitleName_TH = data.project_detail.project_name_th;
        this.Detail.content_eg = data.project_detail.project_detail_en;
        this.Detail.content_th = data.project_detail.project_detail_th;
        this.Tools.tool = data.project_detail.tool_techniq_detail;
        this.References.ref =data.project_detail.references;
        // ----Array---

        // console.log(data.achievement[0].achievement_name)
        this.Acheivement.name = data.achievement[0].achievement_name
        this.Acheivement.detail=data.achievement[0].achievement_detail
        this.Acheivement.company=data.achievement[0].organize_by
        this.Acheivement.date_of_event=data.achievement[0].date_of_event

        // console.log(data.students[0])
        // student
        for (let i = 0; i < data.students.length ; i++){
            this.Authours[i].Student_id = data.students[i].student_id
            this.Authours[i].name = data.students[i].firstname_en +" "+data.students[i].lastname_en
            this.Authours[i].mail = data.students[i].email
        }
        this.Authours.length = data.students.length
        // outsiders
        
        for (let i = 0; i < data.outsiders.length ; i++){
            this.outsider[i].mail = data.outsiders[i].email
            this.outsider[i].name = data.outsiders[i].firstname+ " "+data.outsiders[i].lastname
            this.outsider[i].id = data.outsiders[i].id
        }
        this.outsider.length =data.outsiders.length
        // document
        for (let i = 0; i < data.document.length ; i++){
           this.document[i] = data.document[i].path_name 
        }
        this.document.length= data.document.length
        // console.log(data.document[0].path_name)
        // cover
        // for(let i =0 ; i< data.picture.length ; i++){
        //     this.imgCover[i] =data.picture[i].path_name
        // }
        // this.imgCover[i].length = data.picture.length

        // เก็บข้อมูลไว้ก่อน
         this.cachedUser_eg = Object.assign({}, this.Detail.content_eg);
         this.cachedUser_th = Object.assign({}, this.Detail.content_th);
         this.Tools_tool = Object.assign({}, this.Tools.tool);
        //  console.log(this.cachedUser)
  },
    methods:{
        // funtion show ต้องกลับมาเเก้ต้องรู้ roll ของ user เเล้ว
        show () {
            this.showDetail = true;
        },
        notShow(){
            this.showDetail = false;
        },
        save() {
            this.cachedUser_eg = Object.assign({}, this.user);
            this.cachedUser_eg=this.Detail.content_eg;
            this.cachedUser_th = Object.assign({}, this.user);
            this.cachedUser_th=this.Detail.content_th;
            this.Tools_tool = Object.assign({}, this.user);
            this.Tools_tool=this.Tools.tool
            this.EditProject = false;
            // console.log(this.Detail)
        },
        cancel() {
            this.EditProject = Object.assign({}, this.cachedUser_eg);
            this.EditProject = Object.assign({}, this.cachedUser_th);
            this.EditProject = Object.assign({}, this.Tools_tool);
            this.Detail.content_eg= this.cachedUser_eg;
            this.Detail.content_th= this.cachedUser_th;
            this.Tools.tool=this.Tools_tool;
            this.EditProject = false;
            // console.log(this.cachedUser)
        },
        onSlideStart(slide) {
        this.sliding = true
        },
        onSlideEnd(slide) {
        this.sliding = false
        },
    }
}
</script>

