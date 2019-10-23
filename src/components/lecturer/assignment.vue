<template>
<div>
    <div id="bodyBg">
        <div class="columns">
            <router-link to="/course"><span style="color:#4A4A4A">Course</span></router-link> /
            <span style="color:#265080">Assignment</span>
        </div>
        <!-- <search -->
        <div class="columns">
            <div class="column">
                <div class="field has-addons">
                    <p class="control">
                        <input id="searchText" class="input" type="text" placeholder="Search Assignment ..." style="font-size: 16px !important;margin-top: 0px !important;border-bottom: 1px solid #DBDBDB !important;">
                    </p>
                    <p class="control">
                        <a class="button" style="color: #265080 !important;">
                            <i class="la la-search"></i>
                        </a>
                    </p>
                </div>
            </div>
            <div class="column countAll">
                <button class="button createBtn" @click="focus(true)">+ Create assignment ...</button>
            </div>
        </div>
        <!-- assignment topic -->
        <div class="columns">
            <div class="column topic">{{course_name}}</div>
            <!-- <div class="column countAll">All course 1 - 2 out of 2 results</div> -->
        </div>
        <!-- หัวตาราง assignment -->
        <div class="card-content cardSize colName">
            <div class="columns">
                <div class="column is-two-thirds">Assignment</div>
                <div class="column countAssign">Code Join</div>
                <div class="column countAssign"># Members</div>
                <div class="column countAssign"># Projects</div>
                <div class="column countAssign"># Approved</div>
            </div>
        </div>
        <!-- create assignment -->
        <div id="assignmentForm" class="card lecturerCard" style="margin-bottom:20px;display:none">
            <div class="card-content cardSize">
                <div class="field">
                    <div class="control">
                        <input id="inputAssignment" class="input inputData" v-model="assignmentName" type="text" placeholder="Assignment name">
                    </div>
                </div>
                <a class="button is-small saveBtn" @click="createAssignment">Add</a>
                <a class="button is-small cancelBtn" @click="focus(false)">Cancel</a>
            </div>
        </div>
        <!-- All assignment -->
        <div class="card lecturerCard lecturerCourseCard" v-for="(assignment,index) in assignments" v-bind:key="index">
            <router-link :to="`/assignmentDetail/${assignment.assignment_id}`">
                <div class="card-content cardSize">
                    <div class="columns">
                        <div class="column is-two-thirds courseName">{{index+1}}) {{assignment.assignment_name}}</div>
                        <div class="column countAssign">{{assignment.join_code}}</div>
                        <div class="column countAssign">{{assignment.count.student}}</div>
                        <div class="column countAssign">{{assignment.count.project}}</div>
                        <div class="column countAssign">Mock</div>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</div>
</template>

<script>
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
            assignments: {},
            assignmentName: null
        }
    },
    computed: {
        ...mapGetters({
            course_name: 'GET_COURSENAME',
            config: 'GET_CONFIG',
            URL: 'GET_PATHNAMR',
            academic_term_id: 'GET_ACADEMIC_TERM_ID',
            course_id: 'GET_COURSE_ID'
        })
    },
    mounted() {
        this.getAllAssignment()
        this.SET_COURSE_ID(this.$route.params.courseId)
    },
    methods: {
        ...mapActions(['SET_COURSE_ID']),
        async getAllAssignment() {
            await axios.get(
                    this.URL + `/assignment/list-assignment?course_id=${this.$route.params.courseId}`, this.config
                ).then(res => {
                    console.log("res : ", res)
                    this.assignments = res.data
                })
                .catch(err => {
                    console.error("error : " + err);
                });
        },
        async createAssignment() {
            var data = {
                academic_term_id: this.academic_term_id,
                course_id: this.course_id,
                assignment_name: this.assignmentName
            }
            await axios.post(
                    this.URL + '/assignment', data, this.config
                ).then(res => {
                    console.log("res : ", res)
                    if (res.status == 200) {
                        // this.$router.push({
                        //     path: `/ProjectDetail/${res.data.project_id}`
                        // });
                        this.getAllAssignment()
                    }
                })
                .catch(err => {
                    console.error("error : " + err);
                });
            this.focus(false)
        },
        focus(boo) {
            if (boo) {
                document.getElementById("assignmentForm").style.display = 'block'
                document.getElementById("inputAssignment").focus()
            } else {
                document.getElementById("assignmentForm").style.display = 'none'
            }

        }
    }
}
</script>
