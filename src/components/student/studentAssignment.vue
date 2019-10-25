<template>
<div id="bodyBg">
    <div>
        <div class="buttons has-addons is-centered is-fullwidth" style="font-weight:bold">
            <span class="button menuBar" style="color:#265080 !important">
                <router-link to="student" style="color:#265080 !important">Project</router-link>
            </span>
            <span class="button menuBar is-info is-selected">Assignment</span>
            <span class="button menuBar">
                <router-link to="GenerateResume" style="color:#265080 !important">Generate Resume</router-link>
            </span>
        </div>
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
            <button class="button createBtn" @click="joinAssignmentModal(true)">+ Join assignment ...</button>
        </div>
    </div>
    <!-- หัวตาราง assignment -->
    <div class="card-content cardSize colName">
        <div class="columns">
            <div class="column is-half">Assignment</div>
            <div class="column countAssign">Code Join</div>
            <div class="column countAssign">Status</div>
            <div class="column countAssign">Comment</div>
            <div class="column countAssign is-one-fifth"></div>
        </div>
    </div>
    <!-- All assignment -->
    <div class="card lecturerCard lecturerCourseCard" v-for="(assignment,index) in assignments" v-bind:key="index">
        <div class="card-content cardSize">
            <div class="columns">
                <div class="column is-half courseName" @click="routeToAssignmentDetail(assignment.assignment_id)">{{index+1}}) {{assignment.assignment_name}}</div>
                <div class="column countAssign">{{assignment.join_code}}</div>
                <div class="column countAssign">
                    <span class="projectStatus approved" v-if="assignment.status_name == 'Approve'">{{assignment.status_name}}</span>
                    <span class="projectStatus request" v-else-if="assignment.status_name == 'Waiting'">{{assignment.status_name}}</span>
                    <span class="projectStatus denied" v-else-if="assignment.status_name == 'Reject'">{{assignment.status_name}}</span>
                    <span v-else>Not submit</span>
                </div>
                <div class="column countAssign">
                    <i class="la la-comment" v-if="assignment.comment == null" style="color:#CCCCCC"></i>
                    <i class="la la-comment haveComment" v-else @click="showComment(assignment.comment)" style="color:#265080"></i>
                </div>
                <div class="column countAssign is-one-fifth">
                    <span class="createAssignBtn">+ Add or Create Project</span>
                    <span class="createAssignBtn" v-if="assignment.status_name == 'Reject'">+ Add or Create Project</span>
                    <!-- <img src="./../../assets/draft.png" style="height: 20px;" v-else-if="assignment.status_name == 'Waiting'" />
                    <img src="./../../assets/verified-text-paper.png" style="height: 20px;" v-else /> -->
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
    <modal name="joinAssignmentModal">
        <md-card-header>
            <md-card-header-text>
                <div class="md-title" id="title">Join Assignment</div>
            </md-card-header-text>
        </md-card-header>
        <div class="grey-text">
            <md-card-content>
                <md-field>
                    <label>Code join ...</label>
                    <md-input v-model="code_join" md-autofocus></md-input>
                </md-field>
            </md-card-content>
            <span class="addBtn">
                <a class="button cancelCommentBtn" @click="joinAssignmentModal(false)"><span class="courseName">Cancel</span></a>
                <a class="button addCommentBtn cannotClick" v-if="code_join == '' || code_join == null">Add</a>
                <a class="button addCommentBtn" v-else @click.prevent="addAssignment">Add</a>
            </span>
        </div>
    </modal>
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
            assignments: {},
            commentText: '',
            code_join: null
        }
    },
    computed: {
        ...mapGetters({
            URL: 'GET_PATHNAMR',
            config: 'GET_CONFIG'
        })
    },
    mounted() {
        this.getAllAssignment()
    },
    methods: {
        ...mapActions(['']),
        async getAllAssignment() {
            await axios.get(
                    this.URL + '/assignment/projects?isHave=all', this.config
                ).then(res => {
                    console.log("res : ", res)
                    this.assignments = res.data
                })
                .catch(err => {
                    console.error("error : " + err);
                });
        },
        showComment(commentText) {
            this.commentText = commentText
            this.$modal.show('commentModal');
        },
        joinAssignmentModal(value) {
            this.code_join = null
            if(value){
               this.$modal.show('joinAssignmentModal'); 
            }else{
               this.$modal.hide('joinAssignmentModal'); 
            }
            
        },
        async addAssignment(){
            await axios.post(
                    this.URL + '/assignment/join-assignment/?join_code='+ this.code_join, "", this.config
                ).then(res => {
                    console.log("res : ", res)
                    this.getAllAssignment()
                    this.joinAssignmentModal(false) 
                    // 48W93Y
                })
                .catch(err => {
                    console.error("error : " + err);
                });
        },
        routeToAssignmentDetail(assignment_id) {
            router.push(`/studentAssignmentDetail/${assignment_id}`)
        }
    }
}
</script>
