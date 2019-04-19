<template>
  <div class="body" id="ProjectDetail-bg">
      <div id="TitleName">
          <p id="TitleName_eg">{{header.TitleName}}</p>
          <p id="TitleName_th">{{header.TitleName_TH}}</p>
      </div>
      <div id="img-project">
          <img src="./../../assets/LUNA.png">
      </div>
      <!-- ------------------------------ -->
      <div class="control">
          <label class="radio">
              <input type="radio" name="showDetail" v-on:click="show">
                Show
          </label>
          <label class="radio">
              <input type="radio" name="showDetail" v-on:click="notShow">
                Not Show
          </label>
      </div>
      <div id="EditProjects">
            <button @click="EditProject = !EditProject" v-if="!EditProject">EditProject</button>
            <button @click="save" v-else-if="EditProject">Save</button>
            <button @click="cancel" v-if="EditProject">Cancel</button>
      </div>
      <!-- ------------------------------ -->
      <div id="body-project" v-show="showDetail">
        <div class="columns ">
            <div class="column is-6">
                <div class="card" id="Details">
                    <header class="card-header">
                        <p class="card-header-title">
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
                        <p class="card-header-title">
                            Acheivement
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content"  id="Acheivement">
                            Name:
                        </div>
                        <div class="content"  id="Acheivement">
                            Details:
                        </div>
                        <div class="content" id="Acheivement" >
                            Company:
                        </div>
                        <div class="content"  id="Acheivement">
                            Date of Event:
                        </div>
                    </div>
                </div>
                <div  id="carousel">
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
                </div>
                <div id="video">
                    <iframe src="https://www.youtube.com/embed/UJF_eZpJn4o" width="100%" height="100%"></iframe>
                </div>
            </div>
            <div class="column">
                <div class="card" id="Authors">
                    <header class="card-header">
                        <p class="card-header-title">
                            Authors
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="columns">
                            <div class="column">
                                <div class="content">
                                    <div id="student_name">{{Authours.name}}</div>
                                </div>
                            </div>
                            <div class="column">
                                <div class="content">
                                    <div id="student_id"> ID : {{Authours.Student_id}}</div>
                                    <div id="mail">{{Authours.mail}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column">
                                <div class="content">
                                    <div id="student_name">{{Authours.name}}</div>
                                </div>
                            </div>
                            <div class="column">
                                <div class="content">
                                    <div id="student_id"> ID : {{Authours.Student_id}}</div>
                                    <div id="mail">{{Authours.mail}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column">
                                <div class="content">
                                    <div id="student_name">{{Authours.name}}</div>
                                </div>
                            </div>
                            <div class="column">
                                <div class="content">
                                    <div id="student_id"> ID : {{Authours.Student_id}}</div>
                                    <div id="mail">{{Authours.mail}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card" id="tool">
                    <header class="card-header">
                        <p class="card-header-title">
                            Development Tools & Techniques
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content" id="tool">
                            Development Tools  
                            <textarea class="textarea has-fixed-size"
                             v-model="Tools.tool" id="content" 
                             :disabled="!EditProject"
                             rows="1"
                             max-rows="6">
                            </textarea>
                        </div>
                        <div class="content" id="tool">
                            Techniques
                             <textarea class="textarea has-fixed-size"
                             v-model="Tools.Technology" id="content" 
                             :disabled="!EditProject"
                             rows="1"
                             max-rows="6">
                            </textarea>
                        </div>
                        <div class="content" id="tool">
                            Github :
                             <textarea class="textarea has-fixed-size"
                             v-model="Tools.github" id="content" 
                             :disabled="!EditProject"
                             rows="1"
                             max-rows="6">
                            </textarea>
                        </div>
                    </div>
                </div>
                <div class="card" id="Documents">
                    <header class="card-header">
                        <p class="card-header-title">
                            Documents
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content" >
                            Documents
                        </div>
                    </div>
                </div>
                <div class="card" id="Tag">
                    <header class="card-header">
                        <p class="card-header-title">
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
                        <p class="card-header-title">
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
import './../css/ProjectDetail.css';
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import bCarousel from 'bootstrap-vue/es/components/carousel/carousel';
import bCarouselSlide from 'bootstrap-vue/es/components/carousel/carousel-slide';
Vue.component('b-carousel', bCarousel);
Vue.component('b-carousel-slide', bCarouselSlide);
export default {
  name: 'ProjectDetail',
  data () {
    return {
        header:{
            TitleName: 'SIT Students Accomplishment',
            TitleName_TH: 'ระบบสะสมผลงานนักศึกษา คณะเทคโนโลยีสารสนเทศ',
        },
        Detail:{
            content_th: 'พัฒนาระบบ โดยนักศึกษาทุกชั้นปีสามารถเก็บโครงงานของตนเองได้ ไม่จำกัดเฉพาะนักศึกษาปี 4 เท่านั้น บุคคลที่เข้ามาดูโครงงานสามารถดูประวัติ และผลงานของนักศึกษาแต่ละคนได้ หรืออาจารย์แต่ละท่านได้ และผู้ดูเเลระบบ สามารถเพิ่มวิชาเพื่อให้นักศึกษามาลงผลงานของรายวิชานั้นๆได้ส่วนอาจารย์ ผู้สอนสามารถสร้าง Assignment ให้นักศึกษาได้ ทั้งนี้เพื่อลดข้อจำกัด ในการใช้งานเฉพาะนักศึกษาชั้นปีที่ 4 รวมถึงเป็นการเก็บโครงงานของนักศึกษา ตั้งแต่เข้าศึกษาจนจบการศึกษา',
            content_eg: 'Vue prototype and Vue Axios are powerful tools you should use when learning Vue.js Watch this video and find out how you can create a quick joke app!'
        },
        Authours:{
            name: 'Sophon Jampasornklin',
            Student_id: '59130500109',
            mail: 'sophonjampasornklin@gmail.com'
        },
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
        showDetail:true,
        EditProject:false,
        slide: 0,
        sliding: null
    }
  },
    mounted() {
         this.cachedUser_eg = JSON.parse(JSON.stringify(this.Detail.content_eg));
         this.cachedUser_th = JSON.parse(JSON.stringify(this.Detail.content_th));
         this.Tools_tool = JSON.parse(JSON.stringify(this.Tools.tool));
         this.Tools_tech = JSON.parse(JSON.stringify(this.Tools.Technology));
         this.Tools_github = JSON.parse(JSON.stringify(this.Tools.github));
         console.log(this.cachedUser)
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
            this.Tools_Technology = Object.assign({}, this.user);
            this.Tools_Technology=this.Tools.Technology
            this.Tools_github = Object.assign({}, this.user);
            this.Tools_github=this.Tools.github
            this.EditProject = false;
            console.log(this.Detail)
        },
        cancel() {
            this.EditProject = Object.assign({}, this.cachedUser_eg);
            this.EditProject = Object.assign({}, this.cachedUser_th);
            this.EditProject = Object.assign({}, this.Tools_tool);
            this.EditProject = Object.assign({}, this.Tools_tech);
            this.EditProject = Object.assign({}, this.Tools_github);
            this.Detail.content_eg= this.cachedUser_eg;
            this.Detail.content_th= this.cachedUser_th;
            this.Tools.tool=this.Tools_tool;
            this.Tools.Technology=this.Tools_tech;
            this.Tools.github=this.Tools_github;
            this.EditProject = false;
            console.log(this.cachedUser)
        },
        onSlideStart(slide) {
        this.sliding = true
        },
        onSlideEnd(slide) {
        this.sliding = false
        }
    }
}
</script>

