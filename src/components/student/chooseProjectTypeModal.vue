<template>
<div>
    <div>
        <md-card-header>
            <md-card-header-text>
                <div class="md-title" id="title">Do you want to create assignment project or not ?</div>
            </md-card-header-text>
        </md-card-header>
        <md-card-content>
            <div class="columns">
                <div class="column">
                    <div class="createPortPage" @click="routeToCreatePortPage(true, '')">
                        <div class="textCreate">No, I don't</div>
                    </div>
                </div>
                <div class="column">
                    <div class="createPortPage" @click="routeToCreatePortPage(false, '')">
                        <div class="textCreate">Yes, I do.</div>
                    </div>
                </div>
            </div>
        </md-card-content>
    </div>

    <!-- modal assignmentList -->
    <modal name="assignmentList">
        <div>
            <md-card-header>
                <md-card-header-text>
                    <div class="md-title" id="title">Choose the assignment that you want to add project
                        <span class="plus" v-if="assignments.length > 0" @click="joinAssignmentModal(true)">+</span>
                    </div>
                </md-card-header-text>
            </md-card-header>
            <md-card-content style="max-height: 200px; overflow-y: auto" v-if="assignments.length > 0">
                <div class="card-content cardSize colName">
                    <div class="columns">
                        <div class="column is-three-fifths">Assignment</div>
                        <div class="column countAssign">Type</div>
                        <div class="column countAssign">Due date</div>
                    </div>
                </div>
                <div class="card lecturerCard lecturerCourseCard" v-for="(assignment,index) in assignments" v-bind:key="index">
                    <div class="card-content cardSize">
                        <div class="columns">
                            <div class="column is-three-fifths courseName" @click="showAddOrCreate(assignment.assignment_id,assignment.isGroup, assignment.assignment_name)">{{index+1}}) {{assignment.assignment_name}}</div>
                            <div class="column countAssign">
                                <img src="./../../assets/group.png" style="height: 22px;" v-if="assignment.isGroup == true" />
                                <img src="./../../assets/person.png" style="height: 22px;" v-else />
                            </div>
                            <div class="column">{{assignment.close_date}}</div>
                        </div>
                    </div>
                </div>
            </md-card-content>
            <md-card-content style="max-height: 200px; overflow-y: auto" v-else>
                <div class="column" style="text-align:center">
                    All of your assignments have a project. Please JOIN new assignment.
                </div>
                <div class="column" style="text-align:center">
                    <button class="button createBtn" @click="joinAssignmentModal(true)">+ Join assignment ...</button>
                </div>
            </md-card-content>
        </div>
    </modal>
    <!-- joinAssignmentModal -->
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
                        <div class="createPortPage">
                            <div class="textCreate" @click="showProjectList">Add project to assignment</div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="createPortPage">
                            <div class="textCreate" @click="routeToCreatePortPage(false, true)">Create new assignment project</div>
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
                Project <b>{{project_name}}</b> is added to assignment <b>{{assignment_name}}</b>
            </md-card-content>
            <span class="addBtn">
                <a class="button cancelCommentBtn"><span class="courseName" @click="hideAskForSure">No</span></a>
                <a class="button addCommentBtn" @click="addExternalProjectToAssignment">Yes</a>
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
            assignments: [],
            assignment_id: 0,
            assignment_name: '',
            isGroup: true,
            projects: [],
            project_id: 0,
            project_name: '',
            code_join: ''
        }
    },
    computed: {
        ...mapGetters({
            URL: 'GET_PATHNAME',
            config: 'GET_CONFIG'
        })
    },
    mounted() {},
    methods: {
        ...mapActions(['SET_PROJECTTYPE', 'SET_ISGROUP', 'SET_ASSIGNMENTID']),
        async getAllAssignment() {
            await axios.get(
                    this.URL + '/assignment/projects?isHave=false', this.config
                ).then(res => {
                    console.log("res : ", res)
                    this.assignments = res.data
                })
                .catch(err => {
                    console.error("error : " + err);
                });
        },
        routeToCreatePortPage(externalProjectOrNot, goTo4Step) {
            this.SET_PROJECTTYPE(externalProjectOrNot)
            if (externalProjectOrNot) {
                router.push('/createPortPage')
            } else if (externalProjectOrNot == false && goTo4Step == true) {
                router.push('/createPortPage')
            } else if (externalProjectOrNot == false && goTo4Step == '') {
                this.getAllAssignment()
                this.$modal.show('assignmentList');
            }
        },
        showAddOrCreate(assignment_id, isGroup, assignment_name) {
            this.assignment_id = assignment_id
            this.isGroup = isGroup
            this.assignment_name = assignment_name
            this.SET_ASSIGNMENTID(assignment_id)
            this.SET_ISGROUP(isGroup)

            this.getAllProject()
        },
        showProjectList() {
            this.$modal.hide('addOrCreate');
            this.$modal.show('projectList');
        },
        async getAllProject() {
            console.log('this.isGroup : ', this.isGroup)
            await axios.get(
                    this.URL + '/projects/group-Project?isGroup=' + this.isGroup, this.config
                ).then(res => {
                    console.log("res : ", res)
                    this.projects = res.data
                    if (this.projects.length == 0) {
                        this.routeToCreatePortPage(false, true)
                    } else {
                        this.$modal.hide('assignmentList');
                        this.$modal.show('addOrCreate');
                    }
                })
                .catch(err => {
                    console.error("error : " + err);
                });
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
                    this.URL + '/projects/add-external-to-assignment?project_id=' + this.project_id + '&assignment_id=' + this.assignment_id, "", this.config
                ).then(res => {
                    console.log("res : ", res)
                    router.push(`/studentAssignmentDetail/${this.assignment_id}`)
                })
                .catch(err => {
                    console.error("error : " + err);
                });
        },
        joinAssignmentModal(value) {
            this.code_join = null
            if (value) {
                this.$modal.show('joinAssignmentModal');
            } else {
                this.$modal.hide('joinAssignmentModal');
            }
        },
        async addAssignment() {
            await axios.post(
                    this.URL + '/assignment/join-assignment/?join_code=' + this.code_join, "", this.config
                ).then(res => {
                    console.log("res : ", res)
                    this.getAllAssignment()
                    this.joinAssignmentModal(false)
                })
                .catch(err => {
                    console.error("error : " + err);
                });
        },

    }
}
</script>
