<template>
<div>
    <div id="bodyBg">
        <div class="columns">
            <router-link to="/course"><span style="color:#4A4A4A">Course</span></router-link> /
            <router-link :to="`/allassignment/${courseId}`"><span style="color:#4A4A4A">Assignment</span></router-link> /
            <span style="color:#265080">Details</span>
        </div>
        <!-- assignment topic -->
        <div class="columns">
            <div class="column topicAboutAssignment" style="padding-bottom:0">{{assignmentDetail.assignment_name}}</div>
        </div>
        <div class="courseNameInAssignDetail">{{assignmentDetail.course_name}}</div>
        <div class="columns">
            <div class="column">
                <span style="margin-right:20px">Create by : {{creator.lecturers_name}}</span>
                {{created_at}} (Edited {{updated_at}})
            </div>
            <div class="column countAll">
                Code Join : <span class="codeJoin">{{assignmentDetail.join_code}}</span>
            </div>
        </div>
        <div class="columns" style="margin-top:40px">
            <!-- nav bar -->
            <div class="column is-2">
                <aside class="menu navAssignDetail">
                    <ul id="navAssignment" class="menu-list navTopic navCanClick" @click="show('assignmentDetail','navAssignment')">
                        Detail
                    </ul>
                    <ul class="menu-list navTopic">
                        <li>
                            <span>Members</span>
                            <ul>
                                <li id="navLecturer" class="navTitle navCanClick" @click="show('lecturersMember','navLecturer')">Lecturers</li>
                                <li id="navStudent" class="navTitle navCanClick" @click="show('studentsMember','navStudent')">Students</li>
                            </ul>
                        </li>
                    </ul>
                    <ul class="menu-list navTopic">
                        <li>
                            <span>Projects</span>
                            <ul>
                                <li id="navApprove" class="navTitle navCanClick" @click="show('approve','navApprove')">Approved<span class="countProjectStatus approved">{{countProject.approve}}</span></li>
                                <li id="navRequest" class="navTitle navCanClick" @click="show('waiting','navRequest')">Request<span class="countProjectStatus request">{{countProject.request}}</span></li>
                                <li id="navDenied" class="navTitle navCanClick" @click="show('reject','navDenied')">Denied<span class="countProjectStatus denied">{{countProject.denied}}</span></li>
                            </ul>
                        </li>
                    </ul>
                </aside>
            </div>
            <!-- detail -->
            <div class="column" style="padding-left:100px;padding-right:100px">
                <div id="assignmentDetail">
                    <div id="datail">
                        <div v-if="detailText == null || detailText == ''">no detail</div>
                        <div v-else>{{detailText}}</div>
                        <i class="la la-pencil" @click="editDetail(true)"></i>
                    </div>
                    <div id="inputDetail" class="field" style="display:none">
                        <div class="control">
                            <textarea class="input inputData" v-model="detailText" type="text" placeholder="Detail ..." style="height: 230px;margin-bottom: 10px;" />
                            <a class="button is-small saveBtn" @click="updateDetail">Add</a>
                            <a class="button is-small cancelBtn" @click="editDetail(false)">Cancel</a>
                        </div>
                    </div>
                </div>
                <!-- student -->
                <div id="studentsMember">
                    <div class="card-content cardSize colName">
                        <div class="columns">
                            <div class="column is-two-thirds">Name</div>
                            <div class="column countAssign">Student ID</div>
                        </div>
                    </div>
                    <div class="card lecturerCard">
                        <div class="card-content cardSize" v-for="(student,index) in assignmentDetail.students" v-bind:key="index">
                            <div class="columns">
                                <div class="column is-two-thirds courseName">{{index+1}}) {{student.students_name}}</div>
                                <div class="column countAssign">{{student.student_id}}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- lecturer -->
                <div id="lecturersMember">
                    <div class="card-content cardSize colName">
                        <div class="columns">
                            <div class="column is-two-thirds">Name</div>
                            <div class="column countAssign">Status</div>
                        </div>
                    </div>
                    <div class="card lecturerCard">
                        <div class="card-content cardSize" v-for="(lecturer,index) in assignmentDetail.lecturers" v-bind:key="index">
                            <div class="columns">
                                <div class="column is-two-thirds courseName">{{index+1}}) {{lecturer.lecturers_name}}</div>
                                <div class="column countAssign">
                                    <span :id="'editCanApprove'+index" style="display:none">
                                        <input :id="'lecturerCanApprove'+index" type="checkbox"/>
                                        <span>Can approve</span>
                                    </span>
                                    <span :id="'Approver'+index" v-if="lecturer.isApprover == true">Approver</span>
                                    <span :id="'Approver'+index" v-else>Cannot Approve</span>
                                    <i class="la la-pencil" v-if="lecturer_username == creator.lecturer_id" @click="checkedBox(index,lecturer.lecturer_course_id)"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Approved -->
                <div id="approve">
                    <div v-if="approveProject.length == 0">no approve project</div>
                    <div v-else>
                        <div class="card-content cardSize colName">
                            <div class="columns">
                                <div class="column is-two-thirds">Project</div>
                                <div class="column countAssign">Status</div>
                                <div class="column countAssign">Comment</div>
                            </div>
                        </div>
                        <div class="card lecturerCard lecturerCourseCard">
                            <div class="card-content cardSize">
                                <div class="columns" v-for="(project,index) in approveProject" v-bind:key="index">
                                    <div class="column is-two-thirds courseName" @click="routeToProjectDetail(project.project_id,project.status_name)">{{index+1}}) {{project.project_name_en}}</div>
                                    <div class="column countAssign"><span class="projectStatus approved">Approve</span></div>
                                    <div class="column countAssign">
                                        <i class="la la-comment" v-if="project.comment == null" style="color:#CCCCCC"></i>
                                        <i class="la la-comment haveComment" v-else @click="showComment(project.comment)" style="color:#265080"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Request -->
                <div id="waiting">
                    <div v-if="requestProject.length == 0">no request project</div>
                    <div v-else>
                        <div class="columns">
                            <div class="column">
                                <div class="card-content cardSize colName">
                                    <div class="columns">
                                        <div class="column is-two-thirds">Project</div>
                                        <div class="column countAssign">Status</div>
                                        <div class="column countAssign">Comment</div>
                                    </div>
                                </div>
                                <div class="card lecturerCard lecturerCourseCard">
                                    <div class="card-content cardSize">
                                        <div class="columns" v-for="(project,index) in requestProject" v-bind:key="index">
                                            <div class="column is-two-thirds courseName" @click="routeToProjectDetail(project.project_id,project.status_name)">{{index+1}}) {{project.project_name_en}}</div>
                                            <div class="column countAssign"><span class="projectStatus request">Request</span></div>
                                            <div class="column countAssign">
                                                <i class="la la-comment" v-if="project.comment == null" style="color:#CCCCCC"></i>
                                                <i class="la la-comment haveComment" v-else @click="showComment(project.comment)" style="color:#265080"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Denied -->
                <div id="reject">
                    <div v-if="deniedProject.length == 0">no request project</div>
                    <div v-else>
                        <div class="card-content cardSize colName">
                            <div class="columns">
                                <div class="column is-two-thirds">Project</div>
                                <div class="column countAssign">Status</div>
                                <div class="column countAssign">Comment</div>
                            </div>
                        </div>
                        <div class="card lecturerCard lecturerCourseCard">
                            <div class="card-content cardSize">
                                <div class="columns" v-for="(project,index) in deniedProject" v-bind:key="index">
                                    <div class="column is-two-thirds courseName" @click="routeToProjectDetail(project.project_id,project.status_name)">{{index+1}}) {{project.project_name_en}}</div>
                                    <div class="column countAssign"><span class="projectStatus denied">Reject</span></div>
                                    <div class="column countAssign">
                                        <i class="la la-comment" v-if="project.comment == null" style="color:#CCCCCC"></i>
                                        <i class="la la-comment haveComment" v-else @click="showComment(project.comment)" style="color:#265080"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <modal name="commentModal">
        <md-card-header>
            <md-card-header-text>
                <div class="md-title" id="title">Comment</div>
            </md-card-header-text>
        </md-card-header>
        <md-card-content style="max-height: 200px; overflow-y: auto">
            {{commentText}}
        </md-card-content>
    </modal>

</div>
</template>

<script>
import router from '../../router/index'
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
            assignmentDetail: {},
            courseId: 0,
            created_at: "",
            updated_at: "",
            creator: {},
            approveProject: {},
            requestProject: {},
            deniedProject: {},
            commentText: null,
            assignment_id: 0,
            project_id: 0,
            status: "",
            detailText: "",
            countProject: {
                approve: 0,
                request: 0,
                denied: 0
            }
        }
    },
    computed: {
        ...mapGetters({
            config: 'GET_CONFIG',
            URL: 'GET_PATHNAME',
            lecturer_username: 'GET_USERNAME'
        })
    },
    async mounted() {
        this.hideElements()
        this.getAllAssignmentDetail()
        var navStyle = document.getElementById('navAssignment').style

        navStyle.color = "white"
        navStyle.background = "#265080"
        navStyle.borderRadius = "6px"
        navStyle.padding = "3px 5px 3px 5px"
    },
    methods: {
        ...mapActions(['SET_PROJECT_STATUS', 'SET_ASSIGNMENT_ID', 'SET_PROJECT_ID']),
        async getAllAssignmentDetail() {
            await axios.get(
                    this.URL + `/assignment/detail/${this.$route.params.assignmentId}`, this.config
                ).then(res => {
                    console.log("res : ", res)
                    this.assignmentDetail = res.data
                    this.detailText = this.assignmentDetail.assignment_detail
                    this.SET_ASSIGNMENT_ID(res.data.assignment_id)
                })
                .catch(err => {
                    console.error("error : " + err);
                });

            this.courseId = this.$route.params.assignmentId
            this.created_at = this.assignmentDetail.created_at.substring(0, this.assignmentDetail.created_at.indexOf(','))
            this.updated_at = this.assignmentDetail.updated_at.substring(0, this.assignmentDetail.updated_at.indexOf(','))

            var lecturer = this.assignmentDetail.lecturers
            for (var n = 0; n < lecturer.length; n++) {
                if (lecturer[n].isCreator == true) {
                    this.creator = lecturer[n]
                }
            }

            var countProjectNav = this.assignmentDetail.project
            for(var n = 0; n < countProjectNav.length; n++){
                if(countProjectNav[n].status_name == 'Approve'){
                    this.countProject.approve = countProjectNav[n].count
                }else if(countProjectNav[n].status_name == 'Waiting'){
                    this.countProject.request = countProjectNav[n].count
                }else{
                    this.countProject.denied = countProjectNav[n].count
                }
            }
        },
        hideElements() {
            document.getElementById("studentsMember").style.display = "none"
            document.getElementById("lecturersMember").style.display = "none"
            document.getElementById("approve").style.display = "none"
            document.getElementById("waiting").style.display = "none"
            document.getElementById("reject").style.display = "none"

            var allNavs = ['navAssignment', 'navLecturer', 'navStudent', 'navApprove', 'navRequest', 'navDenied']
            for (var n = 0; n < allNavs.length; n++) {
                document.getElementById(allNavs[n]).style.backgroundColor = "transparent"
                document.getElementById(allNavs[n]).style.color = "#4A4A4A"
                document.getElementById(allNavs[n]).style.padding = "0"
            }
        },
        show(element, nav) {
            this.hideElements()
            document.getElementById("assignmentDetail").style.display = "none"
            document.getElementById(element).style.display = "block"

            var navStyle = document.getElementById(nav).style

            navStyle.color = "white"
            navStyle.background = "#265080"
            navStyle.borderRadius = "6px"
            navStyle.padding = "3px 5px 3px 5px"

            if (element == 'approve' || element == 'waiting' || element == 'reject') {
                this.getProjectData(element)
            }
        },
        async getProjectData(element) {
            await axios.get(
                    this.URL + `/assignment/requests?assignment_id=${this.$route.params.assignmentId}&status=` + element, this.config
                ).then(res => {
                    console.log("res : ", res)
                    console.log(this.URL + `/assignment/requests?assignment_id=${this.$route.params.assignmentId}&status=` + element)

                    if (element == "approve" || element == "Approve") {
                        this.approveProject = res.data
                    } else if (element == "waiting" || element == "Waiting") {
                        this.requestProject = res.data
                    } else {
                        this.deniedProject = res.data
                    }
                })
                .catch(err => {
                    console.error("error : " + err);
                });
        },
        showComment(commentText) {
            this.commentText = commentText
            this.$modal.show('commentModal');
        },
        editDetail(boo) {
            if (boo) {
                document.getElementById("inputDetail").style.display = "block"
                document.getElementById("inputDetail").focus()
                document.getElementById("datail").style.display = 'none'
            } else {
                document.getElementById("inputDetail").style.display = 'none'
                document.getElementById("datail").style.display = "block"
            }
        },
        async updateDetail() {
            var data = {
                assignment_id: this.assignmentDetail.assignment_id,
                assignment_detail: this.detailText
            }
            await axios.patch(
                    this.URL + '/assignment', data, this.config
                ).then(res => {
                    console.log("res : ", res)
                    // if (res.status == 200) {
                    //     this.getAllAssignmentDetail()
                    // }
                })
                .catch(err => {
                    console.error("error : " + err);
                });
            this.editDetail(false)
        },
        async checkedBox(index, lecturer_course_id) {
            var checkbox = document.getElementById("lecturerCanApprove" + index)
            var editCanApprove = document.getElementById("editCanApprove" + index)
            var approver = document.getElementById("Approver" + index)

            if (editCanApprove.style.display == 'none') {
                editCanApprove.style.display = 'initial';
                approver.style.display = 'none';
            } else {
                editCanApprove.style.display = 'none'
                approver.style.display = 'initial';
                var data = {
                    assignment_id: this.assignmentDetail.assignment_id,
                    lecturer_course_id: lecturer_course_id,
                    isApprove: checkbox.checked
                }
                await axios.patch(
                        this.URL + '/assignment/lecturer', data, this.config
                    ).then(res => {
                        console.log("res : ", res)
                        if (res.status == 200) {
                            this.getAllAssignmentDetail()
                        }
                    })
                    .catch(err => {
                        console.error("error : " + err);
                    });
            }
        },
        routeToProjectDetail(project_id,status_name){
            this.SET_PROJECT_STATUS(status_name)
            this.SET_PROJECT_ID(project_id)
            router.push(`/ProjectDetail/${project_id}`)
        }
    }
}
</script>
