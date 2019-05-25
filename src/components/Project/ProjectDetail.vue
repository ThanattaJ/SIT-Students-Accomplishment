<template>
  <div class="body" id="ProjectDetail-bg">
      <div id="TitleName">
        <p id="TitleName_eg">{{header.TitleName}}</p>
        <p id="TitleName_th">{{header.TitleName_TH}}</p>
      </div>
      <!-- -------------cover----------------- -->
      <div class="section" id="imgCover">
          <img :src ="this.cover.path" />
            <div class="container" v-if="EditProject" >
                <uploadCover/>
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
                    <span class="button" id="Edit" @click="EditProject = !EditProject" v-if="!EditProject">Edit Project</span>
                    <span class="button is-success" id="save" @click="save" v-else-if="EditProject">Save Change</span>
                    <span class="button " id="cancel" @click="cancel" v-if="EditProject">Cancel</span>
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
                <div  id="carousel">
                    <div id="container is-fluid">
                        <div class="columns is-multiline"  >
                            <div class="column is-one" v-for="(picture,id) in pictures"  v-bind:key="id">
                                <a class="delete" v-if="EditProject" @click="deletePicture(countPic)"></a>
                                 <div class="image is-128x128">
                                     <img :src= "picture.path" >
                                        <!-- {{id+1}} -->
                                 </div>  
                            </div>
                        </div>
                        <div class="container" v-if="EditProject" >
                            <uploadimg/>
                        </div>
                    </div>
                </div>
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
                                        <div id="student_name">{{student.firstname}}  {{student.lastname}}</div>
                                    </div>
                                </div>
                                <div class="column">
                                    <div class="content">
                                        <div id="student_id"> ID : {{student.Student_id}}</div>
                                        <div id="mail">{{student.mail}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="columns" v-for=" out in outsider" v-bind:key="out.mail">
                                <div class="column">
                                    <div class="content">
                                        <div id="student_name">{{out.firstname}}   {{out.lastname}}</div>
                                    </div>
                                </div>
                                <div class="column">
                                    <div class="content">
                                       <div id="mail">
                                           {{out.mail}}
                                       </div>
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
                             <!-- {{document}} --> 
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
                            <span class="tag is-warning is-medium">
                              Hello
                              <button class="delete is-small" v-if="EditProject"></button>
                            </span>
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
import uploadCover from './uploadCover'
import './../css/ProjectDetail.css';
import Vue from 'vue'
import axios from 'axios';
import VueCarousel from 'vue-carousel';
import { Carousel, Slide } from 'vue-carousel';
import Multiselect from 'vue-multiselect'
// import BootstrapVue from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
// import bCarousel from 'bootstrap-vue/es/components/carousel/carousel';
// import bCarouselSlide from 'bootstrap-vue/es/components/carousel/carousel-slide';
// Vue.component('b-carousel', bCarousel);
// Vue.component('b-carousel-slide', bCarouselSlide);
Vue.use(VueCarousel);
export default {
  namePro: 'ProjectDetail',
  components: {uploadimg,
                'carousel': VueCarousel.Carousel,
                'slide': VueCarousel.Slide,
                uploadCover
            },
  data () {
   return {
        header:{
            TitleName: ' SIT ',
            TitleName_TH: 'ระบบสะสมผลงานนักศึกษา คณะเทคโนโลยีสารสนเทศ',
        },
        // cover:{
        //     images:'./../../assets/LUNA.png'
        // },
        Detail:{
            content_th: "test",
            content_eg: "test"
        },
        Authours:[
            {   
                Student_id : '59130500109',
                firstname : 'Sophon',
                lastname : 'Jampasornklin',
                mail: 'sophonjampasornklin@gmail.com'
            },{}
        ],
       Tools:{
           tool:'-',
           Technology:'-',
           github:'-'
        },
        Acheivement:[
            {
            name: "test",
            detail:null,
            company:null,
            date_of_event:null
            }
        ],
        References:{
            ref:'https://bootstrap-vue.js.org/docs/components/form-textarea/'
        },
        // document:[],
        outsider:[
            {
                id: "1",
                firstname: " ",
                lastname: " ",
                mail: "s@mail.com",
             },
        ],
        showDetail:true,
        EditProject:false,
        img:[
            {
            name: " "
             },
             {}  
            ],
        cover: [{
            path : " "
             }] ,
        project_id: '',
        pictures: [],
        countPic: 0,
        tag:[
            { name :'Hello'}
        ]
        // sliding: null,
        // image:''
    }
  },

    
    async mounted() {

        // get data
        const { data } = await axios.get('http://34.73.213.209:7000/projects/1')
        console.log("data ",data)
        this.header.TitleName = data.project_detail.project_name_en;
        this.header.TitleName_TH = data.project_detail.project_name_th;
        this.Detail.content_eg = data.project_detail.project_detail_en;
        this.Detail.content_th = data.project_detail.project_detail_th;
        this.Tools.tool = data.project_detail.tool_techniq_detail;
        this.References.ref =data.project_detail.references;
        this.project_id = data.project_detail.id

        // console.log(this.project_id)
    
        for(let i = 0; i < data.achievement.length; i++){
            this.Acheivement.push(data.achievement[i])
            this.Acheivement[i].name = data.achievement[i].achievement_name
            this.Acheivement[i].detail=data.achievement[i].achievement_detail
            this.Acheivement[i].company=data.achievement[i].organize_by
            this.Acheivement[i].date_of_event=data.achievement[i].date_of_event
            
        }
        this.Acheivement.length = data.achievement.length
 
        for (let i = 0; i < data.students.length ; i++){
            this.Authours.push(data.students[i])
            this.Authours[i].Student_id = data.students[i].student_id
            this.Authours[i].firstname = data.students[i].firstname_en 
            this.Authours[i].lastname = data.students[i].lastname_en
            this.Authours[i].mail = data.students[i].email
        }
        this.Authours.length = data.students.length
        // outsiders
        
        for (let i = 0; i < data.outsiders.length ; i++){                 
            // console.log(data.outsiders[i])
            this.outsider.push(data.outsiders[i])
            this.outsider[i].id = data.outsiders[i].id 
            this.outsider[i].firstname = data.outsiders[i].firstname
            this.outsider[i].lastname = data.outsiders[i].lastname
            this.outsider[i].mail = data.outsiders[i].email 
        }
        this.outsider.length =data.outsiders.length
        // console.log('data', data)
        for (let i = 0; i < data.picture.length ;i++){
            // this.img.push(data.picture[i])
            this.img[i] = data.picture[i].path_name
                var path = this.img[i]
                var name = path.substring(path.lastIndexOf("/", path.length-1)).substring(1)   
                var newPath = path.replace(/ /g, '%20')
            if(name === "cover"){
                this.cover.push(data.picture[i])
                this.cover.path = `${data.picture[i].path_name}`
                // console.log(this.cover.path)
            }else if(name != "cover" ){
                // this.pictures.path = true
                this.pictures.push({ path: newPath })
                // this.pictures[i].path = newPath
                // console.log(this.pictures.path)
                ++this.countPic
                // console.log(name)
                // console.log( this.countPic)
            }
        }
        // console.log('picture', this.pictures)
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

           try{
                axios.patch('http://34.73.213.209:7000/projects/',{
                    'project_detail': {
                        "id": this.project_id,
                        "project_name_th": this.header.TitleName_TH,
                        "project_name_en": this.header.TitleName,
                        "project_detail_th": this.Detail.content_th,
                        "project_detail_en": this.Detail.content_eg,
                        "haveOutsider": true,
                        "isShow": false,
                        "tool_techniq_detail": null,
                        "references": null,
                        "project_type_name": "External"
                    },
                    "students": [
                        {
                          "student_id": this.Authours.Student_id,
                          "firstname_en": this.Authours.firstname,
                          "lastname_en": this.Authours.lastname,
                          "email": this.Authours.mail
                        },
                    ],
                    "achievement": [
                        {
                        "achievement_name": "test",
                        "achievement_detail": "test",
                        "organize_by": "test",
                        "date_of_event": "06-04-2019"
                        }
                    ],
                    "tags": [
                    
                    ],
                    "picture": [
                        {
                          "path_name": "https://storage.googleapis.com/senior-project-c9108.appspot.com/Images/1/cover"
                        },
                    ],
                    "outsiders": [
                      {
                        "id":this.outsider.id,
                        "firstname": this.outsider.firstname,
                        "lastname": this.outsider.lastname,
                        "email": this.outsider.mail
                      },
                    ]
                })
                .then(function(res){ console.log(res);})
                this.message = "File has been update";
                this.cachedUser_eg = Object.assign({}, this.user);
                this.cachedUser_eg=this.Detail.content_eg;
                this.cachedUser_th = Object.assign({}, this.user);
                this.cachedUser_th=this.Detail.content_th;
                this.Tools_tool = Object.assign({}, this.user);
                this.Tools_tool=this.Tools.tool
                this.EditProject = false;
                console.log(this.cachedUser_eg)
            }catch(err){
                console.log('FAILURE!!'+err)
                this.message = "Something went wrong";
                this.error = true;
            }
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
        deletePicture (countPic){
            console.log(this.pictures[this.countPic])
        try{
            axios.delete('http://34.73.213.209:7000/files/image' ,{
               data : {"path_name" : this.pictures[this.countPic]}
            }) 
            .then(response =>this.pictures.splice(this.pictures[this.countPic]))
            this.pictures[this.countPic] = data.picture.path_name
        }catch(err){
                console.log('FAILURE!!'+err)
                this.message = "Something went wrong";
                this.error = true;
            }
        },
        getTag(){ 
            return axios.get('http://34.73.213.209:7000/tags/:character')
            .then(response => (this.info = response.data.bpi))
            .catch(error => console.log(error))
            console.log(res)
        }
    }
}
</script> 

