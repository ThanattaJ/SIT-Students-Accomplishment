<template>
  <div class="body" id="ProjectDetail-bg">
    <div id="TitleName">
      <p id="TitleName_eg">{{header.TitleName}}</p>
      <p id="TitleName_th">{{header.TitleName_TH}}</p>
    </div>
    <!-- -------------cover----------------- -->
    <div class="section" id="imgCover">
      <div v-if="this.getFile">
            <img :src="getFile">             
      </div>
      <div v-else>
        <img src="../.././assets/no-image-icon-23485.png">
      </div>
    </div>
    <div id="EditProjects">
      <div class="columns">
        <div class="column is-offset-5"></div>
        <uploadCover v-if="EditProject"/>
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
          <span
            class="button"
            id="Edit"
            @click="EditProject = !EditProject"
            v-if="!EditProject"
          >Edit Project</span>
          <span
            class="button is-success"
            id="save"
            @click="save"
            v-else-if="EditProject"
          >Save Change</span>
          <span class="button" id="cancel" @click="cancel" v-if="EditProject">Cancel</span>
        </div>
      </div>
    </div>
    <!-- ------------------------------ -->
    <div id="body-project">
      <div class="columns">
        <div class="column is-6">
          <div v-if="this.Abstract.content_Abstract">
            <div class="card" id="Abstract">
              <header class="card-header">
                <p class="card-header-title" id="cardHeader">Abstract</p>
              </header>
              <!-- ------------------------------ -->
              <div class="card-content">
                <div class="content" id="contentAbstract">
                  <textarea
                    class="textarea has-fixed-size"
                    v-model="Abstract.content_Abstract"
                    id="contentAbstract"
                    :disabled="!EditProject"
                    rows="5"
                    max-rows="6"
                  ></textarea>
                  <!-- <vue-editor v-model="Abstract.content_Abstract" 
                  :editorToolbar="customToolbar"></vue-editor>-->
                  <!-- <div v-html="Abstract.content_Abstract"></div> -->
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="EditProject">
            <div class="card" id="Details">
              <header class="card-header">
                <p class="card-header-title" id="cardHeader">Abstract</p>
              </header>
              <!-- ------------------------------ -->
              <div class="card-content">
                <div class="content" id="abstracts">
                  <textarea
                    class="textarea has-fixed-size"
                    v-model="Abstract.content_Abstract"
                    id="contentDetails"
                    :disabled="!EditProject"
                    rows="5"
                    max-rows="6"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div v-if="(this.Detail.content_eg)">
            <div class="card" id="Details">
              <header class="card-header">
                <p class="card-header-title" id="cardHeader">Details</p>
              </header>
              <!-- ------------------------------ -->
              <div class="card-content">
                <div class="content" id="content">
                  <textarea
                    class="textarea has-fixed-size"
                    v-model="Detail.content_eg"
                    id="contentDetails"
                    :disabled="!EditProject"
                    rows="5"
                    max-rows="6"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="EditProject">
            <div class="card" id="Details">
              <header class="card-header">
                <p class="card-header-title" id="cardHeader">Details</p>
              </header>
              <!-- ------------------------------ -->
              <div class="card-content">
                <div class="content" id="content">
                  <textarea
                    class="textarea has-fixed-size"
                    v-model="Detail.content_eg"
                    id="contentDetails"
                    :disabled="!EditProject"
                    rows="5"
                    max-rows="6"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <!-- ------------------------------ -->
          <!-- loop -->
          <div class="card" id="achievements" style="$card-header-padding: 20px">
            <header class="card-header">
              <p class="card-header-title" id="cardHeader">Acheivement</p>
            </header>
            <div id="achieve">
              <div id="Acheivement" v-for=" i in Acheivement" v-bind:key="i.name">
                <md-card>
                  <md-card-header>
                    <md-card-header-text>Name: {{i.name}}</md-card-header-text>
                  </md-card-header>
                  <md-card-content>
                    Details: {{i.detail}}
                    <br>
                    Company: {{i.company}}
                    <br>
                    Date of Event: {{i.date_of_event}}
                  </md-card-content>
                </md-card>
              </div>
            </div>
            <div id="addAchievements">
              <img src="../../assets/plus-3.png" v-if="EditProject">
            </div>
          </div>
          <!-- ------------------- -->
          <div id="carousel">
            <div id="container is-fluid">
              <div class="columns is-multiline">
                <div class="column is-one" v-for="(picture,index) in getImages" v-bind:key="index">
                  <button  id="deleteImg" v-if="EditProject" @click="deletePicture(index)">x</button>
                  <div class="image is-128x128">
                    <img :src="picture.path">
                    {{index}}
                  </div>
                  
                </div>
              </div>
              <div class="container" v-if="EditProject">
                <uploadimg/>
              </div>
            </div>
          </div>
          <div class="card" id="Details">
            <div class="card-content">
              <div class="content" id="content">
                <Video/>
              </div>
            </div>
          </div>
        </div>

        <!-- ---------------------------- -->
        <div class="column">
          <div class="card" id="Authors">
            <header class="card-header">
              <p class="card-header-title" id="cardHeader">Authors</p>
            </header>
            <div class="card-content" id="student">
              <div class="columns" v-for="(student,index) in Authours" v-bind:key="index">
                <div class="column">
                  <div class="content">
                    <input
                      class="input is-small"
                      type="text"
                      v-model="student.firstname"
                      id="fname"
                      :disabled="!EditProject"
                    >
                    <input
                      class="input is-small"
                      type="text"
                      v-model="student.lastname"
                      id="lname"
                      :disabled="!EditProject"
                    >
                  </div>
                </div>
                <div class="column">
                  <div class="content">
                    <div id="student_id">ID : {{student.Student_id}}</div>
                    <div id="mail">{{student.mail}}</div>
                  </div>
                </div>
              </div>
              <div
                class="columns"
                v-for=" (out,index) in outsider"
                v-bind:key="`${index}-${out.id}`"
                id="outsider"
              >
                <div class="column">
                  <div class="content">
                    <input
                      class="input is-small"
                      type="text"
                      v-model="out.firstname"
                      id="fname"
                      :disabled="!EditProject"
                    >
                    <input
                      class="input is-small"
                      type="text"
                      v-model="out.lastname"
                      id="lname"
                      :disabled="!EditProject"
                    >
                  </div>
                </div>
                <div class="column">
                  <div class="content">
                    <div id="student_id">ID : {{out.id}}</div>
                    <div id="mail">{{out.email}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="(this.Tools.tool)">
            <div class="card" id="tool">
              <header class="card-header">
                <p class="card-header-title" id="cardHeader">Development Tools & Techniques</p>
              </header>
              <div class="card-content">
                <div class="content" id="tool">
                  Tool
                  <textarea
                    class="textarea has-fixed-size"
                    v-model="Tools.tool"
                    id="tool_box"
                    :disabled="!EditProject"
                    rows="5"
                    max-rows="6"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="EditProject">
            <div class="card" id="tool">
              <header class="card-header">
                <p class="card-header-title" id="cardHeader">Development Tools & Techniques</p>
              </header>
              <div class="card-content">
                <div class="content" id="tool">
                  Tool
                  <textarea
                    class="textarea has-fixed-size"
                    v-model="Tools.tool"
                    id="tool_box"
                    :disabled="!EditProject"
                    rows="5"
                    max-rows="6"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="card" id="Documents">
            <header class="card-header">
              <p class="card-header-title" id="cardHeader">Documents</p>
            </header>
            <div class="card-content">
              <div class="content">
                <uploadFilePond/>
              </div>
            </div>
          </div>
          <div class="card" id="Tag">
            <header class="card-header">
              <p class="card-header-title" id="cardHeader">Tag</p>
            </header>
            <div class="card-content">
              <div class="content">
                <span class="tag is-warning is-medium">
                  Hello
                  <button class="delete" id="deleteImg" v-if="EditProject">x</button>
                </span>
              </div>
            </div>
          </div>
          <div class="card" id="References">
            <header class="card-header">
              <p class="card-header-title" id="cardHeader">References</p>
            </header>
            <div class="card-content">
              <div class="content">
                <a href>{{References.ref}}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import { mapGetters, mapActions } from 'vuex'

import uploadFilePond from "./uploadFilePond";
import uploadimg from "./uploadimg";
import uploadCover from "./uploadCover";
import Document from "./../NewPortfolioPage/Document.vue";
import Video from "./../NewPortfolioPage/Video.vue";
import "./../css/ProjectDetail.css";
export default {
  namePro: "ProjectDetail",
  computed: {
      ...mapGetters([
          'getFile',
          'getPath',
          'getImages',
          'GET_CONFIG'
      ]),
  },
  components: {
    uploadimg,
    uploadCover,
    Document,
    Video,
    uploadFilePond
  },
  data() {
    return {
      header: {
        TitleName: " SIT ",
        TitleName_TH: "ระบบสะสมผลงานนักศึกษา คณะเทคโนโลยีสารสนเทศ"
      },
      Abstract: {
        content_Abstract: "Abstract"
      },
      Detail: {
        content_eg: " "
      },
      Authours: [
        {
          Student_id: "",
          firstname: "",
          lastname: "",
          mail: ""
        }
      ],
      Tools: {
        tool: "-",
        Technology: "-",
        github: "-"
      },
      Acheivement: [
        {
          name: "test",
          detail: null,
          company: null,
          date_of_event: null
        }
      ],
      References: {
        ref: "https://bootstrap-vue.js.org/docs/components/form-textarea/"
      },
      document: [],
      outsider: [],
      showDetail: true,
      EditProject: false,
      img: [{}],
      cover: [
        {
          path: null
        }
      ],
      project_id: "",
      pictures: [],
      tag: [{ name: "Hello" }],
      seen: true
    };
  },

  

  async mounted() {
    var sizeArea = document.getElementsByTagName("textarea");
    for (var i = 0; i < sizeArea.length; i++) {
      sizeArea[i].setAttribute(
        "style",
        "height:" + sizeArea[i].scrollHeight + "px;overflow-y:hidden;"
      );
      sizeArea[i].addEventListener("input", OnInput, false);
      //   console.log("sizeArea.length  = "+sizeArea.length)
    }
    // ------- textarea -----------
    function OnInput() {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
    }
    // console.log("เทสๆ " + this.$route.params.pId)

    // get data
    const { data } = await axios.get(
      `https://www.sit-acc.nruf.in.th/projects/${this.$route.params.pId}`
      // "http://localhost:7000/projects/" + this.$route.params.pId
    );
    this.header.TitleName = data.project_detail.project_name_en;
    this.header.TitleName_TH = data.project_detail.project_name_th;
    this.Detail.content_eg = data.project_detail.project_detail;
    this.Abstract.content_Abstract = data.project_detail.project_abstract;
    this.Tools.tool = data.project_detail.tool_techniq_detail;
    this.References.ref = data.project_detail.references;
    this.project_id = data.project_detail.id;
    this.setPID(this.project_id)
    console.log("project Id",this.project_id)

    // get Acheivement ออกมาไม่ได้

    for (let i = 0; i < data.achievements.length; i++) {
      this.Acheivement.push(data.achievements[i]);
      this.Acheivement[i].name = data.achievements[i].achievement_name;
      this.Acheivement[i].detail = data.achievements[i].achievement_detail;
      this.Acheivement[i].company = data.achievements[i].organize_by;
      this.Acheivement[i].date_of_event = data.achievements[i].date_of_event;
    }
    this.Acheivement.length = data.achievements.length;

    // console.log("Acheivement : "+ this.Acheivement[0].name)
    // console.log("detail : "+ this.Acheivement[0].detail)
    // console.log("Date : "+ this.Acheivement[0].date_of_event )

    for (let i = 0; i < data.students.length; i++) {
      this.Authours.push(data.students[i]);
      this.Authours[i].Student_id = data.students[i].student_id;
      this.Authours[i].firstname = data.students[i].firstname;
      this.Authours[i].lastname = data.students[i].lastname;
      this.Authours[i].mail = data.students[i].email;
      this.index = i;
      // console.log("firstname : ", data.students[i] )
    }
    this.Authours.length = data.students.length;
    // console.log("length :"+data.students.length)
    // console.log("outseider : ", data.outsiders);
    if (data.outsiders) {
      for (let i = 0; i < data.outsiders.length; i++) {
        // console.log("outsiders : ", data.outsiders[i]);
        this.outsider.push(data.outsiders[i]);
        this.outsider[i].id = data.outsiders[i].id;
        this.outsider[i].firstname = data.outsiders[i].firstname;
        this.outsider[i].lastname = data.outsiders[i].lastname;
        this.outsider[i].mail = data.outsiders[i].email;
      }
      this.outsider.length = data.outsiders.length;
    } else console.log("outsider :", null);
    // outsiders

    // document
    for (let i = 0; i < data.document.length; i++) {
      this.document[i] = data.document[i].path_name;
    }
    this.document.length = data.document.length;

    // fetch data
    for (let i = 0; i < data.picture.length; i++) {
      this.img[i] = data.picture[i].path_name;
      var path = this.img[i];
      var name = path
        .substring(path.lastIndexOf("_", path.length - 1))
        .substring(1);
      var newPath = path.replace();
      if (name === "cover") {
        this.cover.push(data.picture[i]);
        this.setFile(data.picture[i].path_name);
      } else if (name != "cover") {
        this.countPic++;
        this.addImage({path:newPath})
        // this.pictures.push({ path : newPath});
        
      }
    }
        this.pictures.push({ path : this.getPath });
        // console.log("getPath : ", this.getPath)
    // เก็บข้อมูลไว้ก่อน
    this.cachedUser_eg = this.Detail.content_eg;
    this.cachedUser_th = this.Abstract.content_Abstract;
    this.Tools_tool = this.Tools.tool;
    //  console.log(this.cachedUser)
  },
  methods: {
      ...mapActions([
          'setFile',
          'setPath',
          'addImage',
          'setPID'
        
      ]),
    save() {
      try {
        axios
          .patch("https://www.sit-acc.nruf.in.th/projects/", {
              //.patch("http://localhost:7000/projects/"
            project_detail: {
              id: this.project_id,
              project_name_th: this.header.TitleName_TH,
              project_name_en: this.header.TitleName,
              project_abstract: this.Abstract.content_Abstract,
              project_detail: this.Detail.content_eg,
              haveOutsider: true,
              isShow: false,
              tool_techniq_detail: this.Tools.tool,
              references: null,
              count_viewer: 0,
              count_clap: 0,
              start_month: 2,
              start_year_th: 2562,
              start_year_en: 2019,
              project_type_name: "External"
            },
            students: [
              {
                student_id: this.Authours[this.index].Student_id,
                firstname_en: this.Authours.firstname,
                lastname_en: this.Authours.lastname,
                email: this.Authours.mail
              }
            ],
            achievements: [
              {
                project_id: "",
                achievement_name: this.Acheivement.name,
                achievement_detail: this.Acheivement.detail,
                organize_by: this.Acheivement.company,
                date_of_event: this.Acheivement.date_of_event
              }
            ],
            tags: [],
            document: [],
            picture: [],
            video: {
              path_name: null
            },
            outsiders: [
              {
                id: this.outsider.id,
                firstname: this.outsider.firstname,
                lastname: this.outsider.lastname,
                email: this.outsider.mail
              }
            ]
          },this.GET_CONFIG)
          .then(function(res) {
            console.log(res);
          });
        this.message = "File has been update";
        this.cachedUser_eg = Object.assign({}, this.user);
        this.cachedUser_eg = this.Detail.content_eg;
        this.cachedUser_th = Object.assign({}, this.user);
        this.cachedUser_th = this.Abstract.content_Abstract;
        this.Tools_tool = Object.assign({}, this.user);
        this.Tools_tool = this.Tools.tool;
        this.EditProject = false;
      } catch (err) {
        console.log("FAILURE!!" + err);
        this.message = "Something went wrong";
        this.error = true;
      }
    },
    cancel() {
      this.Detail.content_eg = this.cachedUser_eg;
      this.Abstract.content_Abstract = this.cachedUser_th;
      this.EditProject = Object.assign({}, this.Tools_tool);
      this.Tools.tool = this.Tools_tool;
      this.EditProject = false;
    },
    // onSlideStart(slide) {
    //     this.sliding = true
    // },
    // onSlideEnd(slide) {
    //     this.sliding = false
    // },
    deletePicture(index) {
      console.log("delete  : " + this.getImages[index].path);

      try {
        axios
          .delete("https://www.sit-acc.nruf.in.th/files/image", {
              //.delete("http://localhost:7000/files/image", {
            data: { path_name: this.getImages[index].path }
          },this.GET_CONFIG)
          //
          .then(response => this.getImages.splice(index, 1));
        // this.pictures[index].path = data.picture.path_name
        // this.pictures[this.countPic].path = data.picture.path_name
      } catch (err) {
        console.log("FAILURE!!" + err);
        this.message = "Something went wrong";
        this.error = true;
      }
    }
  }
};
</script> 


