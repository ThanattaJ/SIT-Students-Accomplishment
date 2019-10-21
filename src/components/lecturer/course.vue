<template>
<div>
    <div id="bodyBg">
        <div class="columns">
            <div class="column">
                <div class="field has-addons">
                    <p class="control">
                        <input id="searchText" class="input" type="text" placeholder="Search Course ..." style="font-size: 16px !important;margin-top: 0px !important;border-bottom: 1px solid #DBDBDB !important;">
                    </p>
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
                        <a class="button" style="color: #265080 !important;">
                            <i class="la la-search"></i>
                        </a>
                    </p>
                </div>
            </div>
            <!-- <div class="column countAll">
                All course 1 - 3 out of 3 results
            </div> -->
        </div>
        <!-- All courses -->
        <div class="card-content cardSize colName">
            <div class="columns">
                <div class="column is-two-thirds">Course</div>
                <div class="column countAssign"># Assignment</div>
                <div class="column"></div>
            </div>
        </div>
        <div class="card lecturerCard lecturerCourseCard" v-for="(course,index) in defaultCourse.courses" v-bind:key="'courseTerm'+index">
            <router-link :to="`/allassignment/${course.course_id}`">
                <div class="card-content cardSize" @click="SET_COURSENAME(course.course_name)">
                    <div class="columns">
                        <div class="column is-two-thirds courseName">{{index+1}}) {{course.course_name}}</div>
                        <div class="column countAssign">{{course.assignment_counting}}</div>
                        <div class="column"><span class="createAssignBtn">+ Create Assignment</span></div>
                    </div>
                </div>
            </router-link>
        </div>

    </div>
    <!-- {{defaultCourse.courses}} -->
</div>
</template>

<script>
// import './../../node_modules/bulma/css/bulma.css';
import './../css/visitor.css';
import './../css/studentProjectTab.css';
import './../css/lecturer.css';
import {
    mapGetters,
    mapActions
} from 'vuex'
import axios from 'axios'

export default {
    data() {
        return {
            courses: Object,
            defaultCourse: Array
        }
    },
    computed: {
        ...mapGetters({
            config: 'GET_CONFIG',
            URL: 'GET_PATHNAMR'
        })
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
    },
    methods: {
        ...mapActions(['SET_COURSENAME', 'SET_ACADEMIC_TERM_ID']),
        chooseTerm() {
            var chooseTerm = document.getElementById("chooseTerm").value
            for (var n = 0; n < this.courses.length; n++) {
                if (this.courses[n].academic_term_id == chooseTerm) {
                    this.SET_ACADEMIC_TERM_ID(this.courses[n].academic_term_id)
                    this.defaultCourse = this.courses[n]
                }
            }
        }
    }
}
</script>
