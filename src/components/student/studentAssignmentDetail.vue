<template>
<div>
    <div id="bodyBg">
        <div class="columns" style="margin-bottom: 40px;">
            <router-link :to="`/assignment`"><span style="color:#4A4A4A">Assignment</span></router-link> /
            <span style="color:#265080"><b>Details</b></span>
        </div>
        <!-- assignment topic -->
        <div class="columns">
            <div class="column topicAboutAssignment" style="padding-bottom:0">{{assignmentDetail.assignment_name}}</div>
        </div>
        <div class="courseNameInAssignDetail">{{assignmentDetail.course_name}}</div>
        <div class="columns">
            <div class="column">
                <span style="margin-right:20px">Create by : {{assignmentDetail.lecturers_name}}</span>
                <!-- {{created_at}} (Edited {{updated_at}}) -->
            </div>
            <div class="column countAll" v-if="assignmentDetail.status_name != null">
                Status :
                <span class="projectStatus approved" v-if="assignmentDetail.status_name == 'Approve'">Approved</span>
                <span class="projectStatus request" v-else-if="assignmentDetail.status_name == 'Waiting'">Waiting for approve project</span>
                <span class="projectStatus request" v-else-if="assignmentDetail.status_name == 'Request'">Waiting for edit project</span>
                <span class="projectStatus denied" v-else-if="assignmentDetail.status_name == 'Reject'">Rejected</span>
                <span style="color: red" v-else-if="(assignmentDetail.status_name != 'Approve' || assignmentDetail.status_name != 'Waiting' || assignmentDetail.status_name != 'Reject' || assignmentDetail.status_name != 'Request') && assignmentDetail.time_up == true">Missing</span>
                <span v-else>Not submit</span>
            </div>
        </div>
        <div class="columns" style="margin-top:5%">
            <!-- <div class="column is-one-quarter" v-if="assignmentDetail.project_id == null">
                <createProjectBtn />
            </div> -->
            <div class="column is-one-third" v-if="assignmentDetail.project_id == null">
                <div class="createPortPage" @click="getAllProject">
                    <div class="textCreate" style="font-size:30px !important">+</div>
                    <div class="textCreate" style="padding-top:10px">Add or Create Project</div>
                </div>
                <!-- addOrCreate modal -->
                <modal name="addOrCreate">
                    <div>
                        <md-card-header>
                            <md-card-header-text>
                                <div class="md-title" id="title">
                                    Do you want to add exist project or create new one?
                                </div>
                            </md-card-header-text>
                        </md-card-header>
                        <md-card-content>
                            <div class="columns">
                                <div class="column">
                                    <div class="createPortPage" @click="showProjectList">
                                        <div class="textCreate">Add project to assignment</div>
                                    </div>
                                </div>
                                <div class="column">
                                    <div class="createPortPage" @click="routeToCreatePortPage()">
                                        <div class="textCreate">Create new assignment project</div>
                                    </div>
                                </div>
                            </div>
                        </md-card-content>
                    </div>
                </modal>
                <!-- modal projectList -->
                <modal name="projectList">
                    <div>
                        <md-card-header>
                            <md-card-header-text>
                                <div class="md-title" id="title">Choose the project that you want to add to assignment</div>
                            </md-card-header-text>
                        </md-card-header>
                        <md-card-content style="max-height: 200px; overflow-y: auto">
                            <div class="card lecturerCard lecturerCourseCard" v-for="(project,index) in projects" v-bind:key="index">
                                <div class="card-content cardSize">
                                    <div class="columns">
                                        <div class="column courseName" @click="showAskForSure(project.id, project.project_name_en)">{{index+1}}) {{project.project_name_en}}</div>
                                    </div>
                                </div>
                            </div>
                        </md-card-content>
                    </div>
                </modal>
                <!-- modal askForSure -->
                <modal name="askForSure">
                    <div>
                        <md-card-header>
                            <md-card-header-text>
                                <div class="md-title" id="title"> Are you sure ?</div>
                            </md-card-header-text>
                        </md-card-header>
                        <md-card-content>
                            Project <b>{{project_name}}</b> is added to assignment <b>{{assignmentDetail.assignment_name}}</b>
                        </md-card-content>
                        <span class="addBtn">
                            <a class="button cancelCommentBtn"><span class="courseName" @click="hideAskForSure">No</span></a>
                            <a class="button addCommentBtn" @click="addExternalProjectToAssignment">Yes</a>
                        </span>
                    </div>
                </modal>
            </div>

            <div class="column is-one-third" v-else>
                <router-link :to="`/ProjectDetail/${assignmentDetail.project_id}`">
                    <div class="card projectCard content_img">
                        <div class="card-image" v-if="assignmentDetail.cover_path != null">
                            <figure class="image coverImg is-4by2">
                                <!-- <img src="./../../assets/gold-medal.png" width="17px" v-if="assignmentDetail.achievement" style="z-index:2;position:absolute;width:40px;"> -->
                                <img :src="assignmentDetail.cover_path" alt="Placeholder image" style="height: 271px !important;border-radius: 5px;">
                            </figure>
                        </div>
                        <div class="card-image" v-else>
                            <figure class="image coverImg is-4by2">
                                <img src="./../../assets/noCoverImg.png" style="height: 271pxpx !important;border-radius: 5px;">
                            </figure>
                        </div>
                        <div class="card-content projectInfo">
                            <p class="projectName" style="height: 22px;overflow: hidden;">{{assignmentDetail.project_name_en}}</p>
                        </div>
                    </div>
                </router-link>
            </div>
            <div class="column">{{assignmentDetail.assignment_detail}}</div>
        </div>
    </div>
</div>
</template>

<script>
import router from '../../router/index'
import './../css/visitor.css';
import './../css/studentProjectTab.css';
import './../css/lecturer.css';
import createProjectBtn from './createProjectBtn'
import {
    mapGetters,
    mapActions
} from 'vuex'
import axios from 'axios'

export default {
    data() {
        return {
            assignmentDetail: {},
            created_at: "",
            updated_at: "",
            project_id: 0,
            projects: [],
            project_name: ""
        }
    },
    components: {
        createProjectBtn
    },
    computed: {
        ...mapGetters({
            config: 'GET_CONFIG',
            URL: 'GET_PATHNAME'
        })
    },
    async mounted() {
        this.getAllAssignmentDetail()
    },
    methods: {
        ...mapActions(['SET_PROJECTTYPE', 'SET_ISGROUP']),
        async getAllAssignmentDetail() {
            await axios.get(
                    this.URL + `/assignment/detail/${this.$route.params.assignmentId}`, this.config
                ).then(res => {
                    console.log("res : ", res)
                    this.assignmentDetail = res.data
                    console.log('assignment_id : ' + this.assignmentDetail.assignment_id)
                    console.log('course_id : ' + this.assignmentDetail.course_id)
                    console.log('isGroup : ' + this.assignmentDetail.isGroup)
                })
                .catch(err => {
                    console.error("error : " + err);
                });
            this.created_at = this.assignmentDetail.created_at.substring(0, this.assignmentDetail.created_at.indexOf('T'))
            this.updated_at = this.assignmentDetail.updated_at.substring(0, this.assignmentDetail.updated_at.indexOf('T'))
        },
        async getAllProject() {
            await axios.get(
                    this.URL + '/projects/group-Project?isGroup=' + this.assignmentDetail.isGroup, this.config
                ).then(res => {
                    console.log("res : ", res)
                    this.projects = res.data
                    if (this.projects.length == 0) {
                        this.routeToCreatePortPage()
                    } else {
                        this.$modal.show('addOrCreate');
                    }
                })
                .catch(err => {
                    console.error("error : " + err);
                });
        },
        routeToCreatePortPage() {
            this.SET_PROJECTTYPE(false)
            this.SET_ISGROUP(this.assignmentDetail.isGroup)
            router.push('/createPortPage')
        },
        showProjectList() {
            this.$modal.hide('addOrCreate');
            this.$modal.show('projectList');
        },
        showAskForSure(project_id, project_name_en) {
            this.project_id = project_id
            this.project_name = project_name_en
            console.log('this.project_id >>> ', this.project_id)
            this.$modal.hide('projectList');
            this.$modal.show('askForSure')
        },
        hideAskForSure() {
            this.$modal.hide('askForSure')
        },
        async addExternalProjectToAssignment() {
            await axios.post(
                    this.URL + '/projects/add-external-to-assignment?project_id=' + this.project_id + '&assignment_id=' + this.assignmentDetail.assignment_id, "", this.config
                ).then(res => {
                    console.log("res : ", res)
                    this.hideAskForSure()
                    this.getAllAssignmentDetail()
                })
                .catch(err => {
                    console.error("error : " + err);
                });
        },
    }
}
</script>
