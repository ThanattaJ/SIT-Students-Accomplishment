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
                <button class="button createBtn" @click="openCreateAssignmentModal()">+ Create assignment ...</button>
            </div>
        </div>
        <!-- assignment topic -->
        <div class="columns">
            <div class="column topicAboutAssignment">{{course_name}}</div>
            <div class="column countAll">All course 1 - {{countAssignment}} out of {{countAssignment}} results</div>
        </div>
        <!-- หัวตาราง assignment -->
        <div class="card-content cardSize colName">
            <div class="columns">
                <div class="column is-half">Assignment</div>
                <div class="column countAssign">Code Join</div>
                <div class="column countAssign"># Members</div>
                <div class="column countAssign"># Projects</div>
                <div class="column countAssign">Due date</div>
                <div class="column countAssign">Type</div>
            </div>
        </div>
        <!-- create assignment -->
        <modal name="createAssignmentModal">
            <md-card-header>
                <md-card-header-text>
                    <div class="md-title" id="title">Create assignment</div>
                </md-card-header-text>
            </md-card-header>
            <!-- <md-card-content style="max-height: 180px; overflow-y: auto;padding-top: 0px;"> -->
            <md-card-content style="padding-top: 0px;">
                <md-field>
                    <label>Assignment name</label>
                    <md-input v-model="assignmentName"></md-input>
                </md-field>
                <md-field>
                    <label>Assignment detail</label>
                    <md-textarea v-model="assignmentDetail" md-autogrow style="max-height: 45px;"></md-textarea>
                </md-field>
                <div class="columns" style="margin-top: 0px;">
                    <div class="column">
                        <div class="field">
                            Due date
                            <VueCtkDateTimePicker v-model="closeDate" :locale="locale" :formatted="formatted" :color="color" :only-date="onlydate" :label="label" :no-header="noHeader" :auto-close="autoClose" :no-button="noButton" :no-label="noLabel" />
                        </div>
                    </div>
                    <div class="column">
                        <div>Type</div>
                        <div style="margin-top: -10px;">
                            <md-radio v-model="isGroup" value="group"  class="md-primary">Group</md-radio>
                            <md-radio v-model="isGroup" value="single"  class="md-primary">Single</md-radio>
                        </div>
                    </div>
                </div>
            </md-card-content>
            <span class="addBtn">
                <a class="button cancelCommentBtn"><span class="courseName" @click="closeCreateAssignmentModal">Cancel</span></a>
                <a class="button addCommentBtn cannotClick" v-if="assignmentName == null && closeDate == null">Add</a>
                <a class="button addCommentBtn" @click="createAssignment" v-else>Add</a>
            </span>
        </modal>
        <!-- All assignment -->
        <div class="card lecturerCard lecturerCourseCard" v-for="(assignment,index) in assignments" v-bind:key="index">
            <div class="card-content cardSize">
                <div class="columns">
                    <div class="column is-half courseName" @click="routeToAssignmentDetail(assignment.assignment_id,assignment.isApprover)">{{index+1}}) {{assignment.assignment_name}}</div>
                    <div class="column countAssign">{{assignment.join_code}}</div>
                    <div class="column countAssign">{{assignment.count.student}}</div>
                    <div class="column countAssign">{{assignment.count.project}}</div>
                    <div class="column countAssign">{{assignment.close_date}}</div>
                    <div class="column countAssign">
                        <img src="./../../assets/group.png" style="height: 22px;" v-if="assignment.isGroup == true" />
                        <img src="./../../assets/person.png" style="height: 22px;" v-else />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
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
            assignments: {},
            assignmentName: null,
            assignmentDetail: null,
            isGroup: 'group',
            closeDate: null,

            countAssignment: 0
        }
    },
    components: {
        VueCtkDateTimePicker
    },
    props: {
        locale: {
            type: String,
            default: 'en'
        },
        formatted: {
            type: String,
            // default: 'DD-MM-YYYY'
            default: 'll'
        },
        color: {
            type: String,
            default: '#265080'
        },
        onlydate: {
            type: Boolean,
            default: true
        },
        label: {
            type: String,
            default: 'Select date'
        },
        noHeader: {
            type: Boolean,
            default: true
        },
        autoClose: {
            type: Boolean,
            default: true
        },
        noButton: {
            type: Boolean,
            default: true
        },
        noLabel: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        ...mapGetters({
            course_name: 'GET_COURSENAME',
            config: 'GET_CONFIG',
            URL: 'GET_PATHNAME',
            academic_term_id: 'GET_ACADEMIC_TERM_ID',
            course_id: 'GET_COURSE_ID'
        })
    },
    mounted() {
        this.getAllAssignment()
        this.SET_COURSE_ID(this.$route.params.courseId)
    },
    methods: {
        ...mapActions(['SET_COURSE_ID', 'SET_ISAPPROVER']),
        async getAllAssignment() {
            await axios.get(
                    this.URL + `/assignment/list-assignment?course_id=${this.$route.params.courseId}`, this.config
                ).then(res => {
                    console.log("res : ", res)
                    this.assignments = res.data
                    this.countAssignment = res.data.length
                })
                .catch(err => {
                    console.error("error : " + err);
                });
        },
        async createAssignment() {

            var data = {
                academic_term_id: this.academic_term_id,
                course_id: this.course_id,
                assignment_name: this.assignmentName,
                close_date: this.closeDate.substring(8, 10) + "-" + this.closeDate.substring(5, 7) + "-" + this.closeDate.substring(0, 4),
                isGroup: this.isGroup == 'group' ? true : false
            }
            if(this.assignmentDetail != null){
                data['assignment_detail'] = this.assignmentDetail
            }
            
            console.log("create assignment data")
            console.log("", data)
            await axios.post(
                    this.URL + '/assignment', data, this.config
                ).then(res => {
                    console.log("res : ", res)
                    this.getAllAssignment()
                    this.closeCreateAssignmentModal()
                })
                .catch(err => {
                    console.error("error : " + err);
                });
        },
        openCreateAssignmentModal() {
            this.$modal.show('createAssignmentModal')
        },
        closeCreateAssignmentModal() {
            this.$modal.hide('createAssignmentModal')
        },
        routeToAssignmentDetail(assignment_id, isApprover) {
            this.SET_ISAPPROVER(isApprover)
            router.push(`/assignmentDetail/${assignment_id}`)
        }
    }
}
</script>

<style>
.datetimepicker[data-v-564d30d4] {
    bottom: 44% !important;
    position: fixed !important;
    z-index: 9 !important;
    width: 100% !important;
}

.md-radio.md-theme-default.md-checked .md-radio-container:after {
    background-color: #265080 !important;
}
.md-radio.md-theme-default.md-checked .md-radio-container {
    border-color: #265080 !important;
}
.md-radio.md-theme-default .md-radio-container {
    border-color: #265080 !important;
}
.md-radio .md-radio-container {
    width: 15px !important;
    min-width: 15px !important;
    height: 15px !important;
    position: relative !important;
    border: 2px solid transparent !important;
    border-radius: 50% !important;
    transition: .4s cubic-bezier(.25,.8,.25,1) !important;
}
</style>
