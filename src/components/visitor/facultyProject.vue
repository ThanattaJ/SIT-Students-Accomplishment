<template>
<div>
    <!-- {{allProjects}} -->
    <div id="bodyBg">
        <div class="buttons has-addons is-centered is-fullwidth" style="font-weight:bold">
            <!-- <span class="button menuBar is-info is-selected" @click="filterByFaculty('')">ALL</span> -->
            <span id="INTbtn" class="button facultyMenu is-info is-selected" @click="filterByFaculty('INT')">Information Technology</span>
            <span id="CSCbtn" class="button facultyMenu" style="color:#265080 !important" @click="filterByFaculty('CSC')">Computer Science</span>
            <span id="DSIbtn" class="button facultyMenu" style="color:#265080 !important" @click="filterByFaculty('DSI')">Digital Service Innovation</span>
        </div>
    </div>
    <div v-if="loading"><img src="../../assets/Rolling-2s-200px.svg" class="center-div"></div>
    <div v-else>
        <div id="bodyBg">
            <!-- <search -->
            <!-- <div class="field has-addons">
                <p class="control">
                    <input id="searchText" class="input" type="text" v-model="search" placeholder="Looking for?" style="font-size: 16px !important;margin-top: 0px !important;border-bottom: 1px solid #DBDBDB !important;">
                </p>
            </div> -->
            <!-- All course -->
            <div class="columns">
                <div class="column is-3">
                    <aside class="menu navAssignDetail" v-for="(course,index) in courses" v-bind:key="index">
                        <ul class="menu-list">
                            <li>
                                <a :id="'navAssignment navCourse'+index" class="menu-list navTopic navCanClick" @click="nav(index);showAcademicTerm(index)">
                                    <span :id="'courseName'+index" style="color:#4A4A4A">{{course.course_code}}<br>
                                        {{course.course_name}}</span>
                                </a>
                                <ul :id="'academic_term'+index" style="display:none">
                                    <li v-for="(term,index) in course.term" v-bind:key="index" @click="chooseTerm(course.course_id,term.academic_term_id)"><a><span style="color:#265080">{{term.academic_term}}</span></a></li>
                                </ul>
                            </li>
                        </ul>
                    </aside>
                </div>
                <!-- All projects -->
                <div v-if="fetch"><img src="../../assets/Rolling-2s-200px.svg" class="center-div"></div>
                <div v-else>
                    <div class="columns is-multiline">
                        <div class="column is-one-third" v-for="(allProject,index) in allProjects" v-bind:key="index">
                            <router-link :to="`/ProjectDetail/${allProject.id}`">
                                <div class="card projectCard content_img">
                                    <div class="card-image" v-if="allProject.cover_path != null">
                                        <figure class="image is-4by2">
                                            <img src="./../../assets/gold-medal.png" width="17px" v-if="allProject.achievement" style="z-index:2;position:absolute;width:40px;">
                                            <img :src="allProject.cover_path" alt="Placeholder image" style="height: 156.22px !important;border-radius: 5px;">
                                            <div class="img-text">
                                                <img src="./../../assets/visibility-button.png" style="width:15px;display: inline;">
                                                <span class="countText">{{allProject.count_viewer}} </span>
                                                <img src="./../../assets/clap-hands.png" style="width:15px;display: inline;">
                                                <span class="countText">{{allProject.count_clap}} </span>
                                            </div>
                                        </figure>
                                    </div>
                                    <div class="card-image" v-else>
                                        <figure class="image is-4by2">
                                            <img src="./../../assets/noCoverImg.png" style="height: 156.22px !important;border-radius: 5px;">
                                            <div class="img-text">
                                                <img src="./../../assets/visibility-button.png" style="width:15px;display: inline;">
                                                <span class="countText">{{allProject.count_viewer}} </span>
                                                <img src="./../../assets/clap-hands.png" style="width:15px;display: inline;">
                                                <span class="countText">{{allProject.count_clap}} </span>
                                            </div>
                                        </figure>
                                    </div>
                                    <div class="card-content projectInfo">
                                        <p class="projectName" style="height: 22px;overflow: hidden;">{{allProject.project_name_en}}</p>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import router from '../../router/index'
import './../css/lecturer.css';
import './../css/studentProjectTab.css';
import './../css/Loading.css';
import {
    mapGetters,
    mapActions
} from 'vuex'
import axios from 'axios'

export default {
    data() {
        return {
            search: '',
            faculty: 'INT',
            allProjects: [],
            allProjectCourse: [],
            fetch: false
        }
    },
    computed: {
        ...mapGetters({
            URL: 'GET_PATHNAME',
            config: 'GET_CONFIG',
            loading: 'GET_LOADING'
        }),
        courses() {
            if (this.faculty == "DSI") {
                var ssc = "SSC"
                return this.allProjectCourse.filter(
                    items =>
                    items.course_code.toLowerCase().includes(this.faculty.toLowerCase()) ||
                    items.course_code.toLowerCase().includes(ssc.toLowerCase())
                )
            } else {
                return this.allProjectCourse.filter(
                    items =>
                    items.course_code.toLowerCase().includes(this.faculty.toLowerCase())
                )
            }
        }
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            this.getAllCourses()
            setTimeout(() => {
                if (this.allProjectCourse.length != 0) {
                    this.nav(0)
                    this.showAcademicTerm(0)
                }
            }, 2000)
        },
        async getAllCourses() {
            try {
                await axios
                    .get(this.URL + '/projects/assignment', this.config)
                    .then((res) => {
                        console.log("success! : ", res);
                        this.allProjectCourse = res.data.courses
                    })
                    .catch((err) => {
                        console.error("err : " + err);
                    });
            } catch (err) {
                console.log("FAILURE!!" + err);
            }
            this.SET_LOADING_STATUS(false)
        },
        async chooseTerm(course_id, academic_term_id) { 
            this.fetch = true
            console.log('course_id : ', course_id)
            console.log('academic_term_id : ', academic_term_id)
            try {
                await axios
                    .get(this.URL + '/projects/assignment?' + 'academic_term_id=' + academic_term_id + '&course_id=' + course_id, this.config)
                    .then((res) => {
                        console.log("success! : ", res);
                        this.allProjects = res.data.projects
                        this.fetch = false
                    })
                    .catch((err) => {
                        console.error("err : " + err);
                    });
            } catch (err) {
                console.log("FAILURE!!" + err);
            }
        },
        showAcademicTerm(index) {
            if (this.courses.length > 0) {
                for (var n = 0; n < this.courses.length; n++) {
                    document.getElementById('academic_term' + n).style.display = 'none'
                }
            }
            document.getElementById('academic_term' + index).style.display = 'block'
        },
        nav(index) {
            console.log('index : ', index)
            if (this.courses.length > 0) {
                for (var n = 0; n < this.courses.length; n++) {
                    var navStyle = document.getElementById('navAssignment navCourse' + n).style
                    var courseName = document.getElementById('courseName' + n).style
                    navStyle.backgroundColor = 'transparent'
                    courseName.color = '#4A4A4A'
                    navStyle.padding = '0px 0px'
                    navStyle.borderRadius = '6px'
                }
                var navStyle = document.getElementById('navAssignment navCourse' + index).style
                var courseName = document.getElementById('courseName' + index).style
                navStyle.backgroundColor = '#265080'
                courseName.color = 'white'
                navStyle.padding = '3px 5px'
                navStyle.borderRadius = '6px'
            }
            this.showAcademicTerm(0)
        },
        ...mapActions(['LOAD_ALL_PROJECT_VISITORVIEW', 'SET_LOADING_STATUS']),
        filterByFaculty(faculty) {
            this.faculty = faculty
            var btn = ['INT','DSI','CSC']
            for(var n = 0; n < btn.length; n++){
                document.getElementById(btn[n]+'btn').className = "button facultyMenu"                
                document.getElementById(btn[n]+'btn').style.color = "#265080"                
            }
            document.getElementById(faculty+'btn').className = "button facultyMenu is-info is-selected"
            document.getElementById(faculty+'btn').style.color = "white"  
            
            this.allProjects = []
        }
    },
    beforeMount() {
      this.SET_LOADING_STATUS(true)
    }
}
</script>

<style>
.facultyMenu {
    padding: 1.7% 9.25% 1.7% 9.25% !important
}

@media screen and (max-width: 1024px) {
    .facultyMenu {
        padding: 1.7% 5.1% 1.7% 5.1% !important;
    }
}

@media screen and (max-width: 800px) {
    .facultyMenu {
        padding: 1.7% 3.5% 1.7% 3.5% !important;
    }
}

@media screen and (max-width: 500px) {
    .facultyMenu {
        width: 100% !important;
        border-radius: 5px !important;
    }
}
</style>
