<template>
<div>
    <div id="bodyBg">
        <div class="buttons has-addons is-centered is-fullwidth" style="font-weight:bold">
            <span class="button visitorMenu is-info is-selected" @click="filterByFaculty('')">ALL</span>
            <span class="button visitorMenu" style="color:#265080 !important" @click="filterByFaculty('INT');nav(0)">IT</span>
            <span class="button visitorMenu" style="color:#265080 !important" @click="filterByFaculty('CSC');nav(0)">CS</span>
            <span class="button visitorMenu" style="color:#265080 !important" @click="filterByFaculty('DSI');nav(0)">DSI</span>
        </div>
    </div>
    <div id="bodyBg">
        <!-- <search -->
        <div class="field has-addons">
            <p class="control">
                <input id="searchText" class="input" type="text" v-model="search" placeholder="Looking for?" style="font-size: 16px !important;margin-top: 0px !important;border-bottom: 1px solid #DBDBDB !important;">
            </p>
        </div>
        <!-- All projects -->
        <div class="columns">
            <div class="column is-3">
                <aside class="menu navAssignDetail" v-for="(course,index) in courses" v-bind:key="index">
                    <ul :id="'navAssignment navCourse'+index" class="menu-list navTopic navCanClick" @click="getProjectFilterByCourse(course.course_id);nav(index)">
                        <span>{{course.course_code}}</span><br>
                        {{course.course_name}}
                    </ul>
                </aside>
            </div>
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
</template>

<script>
import router from '../../router/index'
import './../css/lecturer.css';
import './../css/studentProjectTab.css';
import {
    mapGetters,
    mapActions
} from 'vuex'
import axios from 'axios'

export default {
    data() {
        return {
            search: '',
            faculty: '',
            allProjects: []
        }
    },
    computed: {
        ...mapGetters({
            URL: 'GET_PATHNAME',
            config: 'GET_CONFIG',
            allProjectCourse: 'GET_ALL_COURSE_PROJECT',
        }),
        courses() {
            if (this.faculty == "") {
                return this.allProjectCourse
            } else if (this.faculty == "DSI") {
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
        this.LOAD_ALL_PROJECT_VISITORVIEW({
            type: "assignment",
            year: "present"
        })
        this.getProjectFilterByCourse(this.courses[0].course_id)
        this.nav(0)
    },
    methods: {
        nav(index) {
            if (this.courses.length > 0) {
                for (var n = 0; n < this.courses.length; n++) {
                    var navStyle = document.getElementById('navAssignment navCourse' + n).style
                    navStyle.backgroundColor = 'transparent'
                    navStyle.color = '#4A4A4A'
                    navStyle.padding = '0px 0px'
                    navStyle.borderRadius = '6px'
                }
                console.log("index >>> ", index)
                var navStyle = document.getElementById('navAssignment navCourse' + index).style
                navStyle.backgroundColor = '#265080'
                navStyle.color = 'white'
                navStyle.padding = '3px 5px'
                navStyle.borderRadius = '6px'
            }
        },
        ...mapActions(['LOAD_ALL_PROJECT_VISITORVIEW']),
        filterByFaculty(faculty) {
            this.faculty = faculty
            if (this.courses.length > 0) {
                console.log("abc : ", this.courses[0].course_id)
                this.getProjectFilterByCourse(this.courses[0].course_id)
            } else {
                this.getProjectFilterByCourse()
            }
        },
        async getProjectFilterByCourse(course_id) {
            try {
                await axios
                    .get(this.URL + '/projects/assignment?' + 'course_id=' + course_id, this.config)
                    .then((res) => {
                        console.log("success! : ", res);
                        this.allProjects = res.data.projects
                    })
                    .catch((err) => {
                        console.error("err : " + err);
                    });
            } catch (err) {
                console.log("FAILURE!!" + err);
            }
        },
    }
}
</script>
