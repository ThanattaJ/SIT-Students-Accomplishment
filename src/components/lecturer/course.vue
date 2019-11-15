<template>
<div>
    <div id="bodyBg">
        <div class="columns">
            <div class="column" style="margin-bottom: -55px;">
                <div class="field has-addons">
                    <p class="control">
                        <span class="select">
                            <select id="chooseTerm" @change="chooseTerm">
                                <option :value="course.academic_term_id" class="navCanClick" v-for="(course,index) in courses" v-bind:key="index">
                                    {{course.academic_term}}
                                </option>
                            </select>
                        </span>
                    </p>
                    <p class="control">
                        <input id="searchText" class="input" type="text" v-model="search" placeholder="Search Course ..." style="font-size: 16px !important;margin-top: 0px !important;border-bottom: 1px solid #DBDBDB !important;">
                    </p>
                </div>
            </div>
            <!-- <div class="column countAll">
                All course 1 - 3 out of 3 results
            </div> -->
        </div>
        <!-- All courses -->
        <div v-if="loading"><img src="../../assets/Rolling-2s-200px.svg" class="center-div"></div>
        <div v-else>
            <div class="card-content cardSize colName">
                <div class="columns">
                    <div class="column is-two-thirds">Course</div>
                    <div class="column countAssign"># Assignment</div>
                    <!-- <div class="column"></div> -->
                </div>
            </div>
        </div>
        <div  class="overflowY" style="height: 540px;">
            <div class="card lecturerCard lecturerCourseCard" v-for="(course,index) in allCourse" v-bind:key="'courseTerm'+index">
                <router-link :to="`/allassignment/${course.course_id}`">
                    <div class="card-content cardSize" @click="SET_COURSENAME(course.course_name)">
                        <div class="columns">
                            <div class="column is-two-thirds courseName">{{index+1}}) {{course.course_name}}</div>
                            <div class="column countAssign">{{course.assignment_counting}}</div>
                            <!-- <div class="column"><span class="createAssignBtn">+ Create Assignment</span></div> -->
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</div>
</template>

<script>
// import './../../node_modules/bulma/css/bulma.css';
import './../css/visitor.css';
import './../css/studentProjectTab.css';
import './../css/lecturer.css';
import './../css/Loading.css';
import {
    mapGetters,
    mapActions
} from 'vuex'
import axios from 'axios'

export default {
    data() {
        return {
            courses: {},
            defaultCourse: [],
            search: ''
        }
    },
    computed: {
        ...mapGetters({
            config: 'GET_CONFIG',
            URL: 'GET_PATHNAME',
            loading: 'GET_LOADING'
        }),
        allCourse() {
            if (this.search != "") {
                return this.defaultCourse.courses.filter(
                    items =>
                    items.course_name.toLowerCase().includes(this.search.toLowerCase())
                )
            } else {
                return this.defaultCourse.courses
            }
        }
    },
    async mounted() {
        await axios.get(
                this.URL + "/users/default", this.config
            ).then(res => {
                console.log("res : ", res)
                this.courses = res.data.courses
            })
            .catch(err => {
                console.error("error : " + err);
            });
        this.defaultCourse = this.courses[0]
        this.SET_LOADING_STATUS(false)
    },
    methods: {
        ...mapActions(['SET_COURSENAME', 'SET_ACADEMIC_TERM_ID', 'SET_LOADING_STATUS']),
        chooseTerm() {
            var chooseTerm = document.getElementById("chooseTerm").value
            for (var n = 0; n < this.courses.length; n++) {
                if (this.courses[n].academic_term_id == chooseTerm) {
                    this.SET_ACADEMIC_TERM_ID(this.courses[n].academic_term_id)
                    this.defaultCourse = this.courses[n]
                }
            }
        }
    },
    beforeMount() {
      this.SET_LOADING_STATUS(true)
    }
}
</script>
