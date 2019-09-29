<template>
<div id="list-project of student">
    <div id="bodyBg">
        <div class="buttons has-addons is-centered is-fullwidth">
            <!-- <span class="button menuBar">Profile</span> -->
            <span class="button menuBar is-info is-selected">Project</span>
            <span class="button menuBar" style="color:#265080 !important">Assignment</span>
            <!-- <span class="button menuBar">
                <router-link to="createPortPage" style="color:#265080 !important">Fingerprint</router-link>
            </span> -->
            <span class="button menuBar">
                <router-link to="GenerateResume" style="color:#265080 !important">Generate Resume</router-link>
            </span>
        </div>
    </div>
    <div class="navProfile">
        <div id="bodyBg">
            <div class="columns" style="padding: 15px 0 15px 0">
                <div class="column is-3 picture">
                    <img src="./../assets/03-REP-Photo-KMUTT-SophonJampasornklin.jpg" id="img">
                </div>
                <div class="column is-three-fifths" id="information">
                    <p id="name">{{profile.firstname}} {{profile.lastname}}</p>
                    <p id="info">Bachelor of Science Programme in {{profile.curriculum_name}}</p>
                    <p id="info"> {{year}} (Mock Data)</p>
                    <p id="info"> {{profile.student_id}}</p>
                    <br>
                    <p id="info">{{profile.email}}</p>
                </div>
                <div class="column borderLeft">
                    <nav class="level">
                        <div class="level-item has-text-centered">
                            <div>
                                <p class="title">{{profile.resume_gen_count}}</p>
                                <p class="heading">Gen Resume</p>
                            </div>
                        </div>
                        <div class="level-item has-text-centered">
                            <div>
                                <p class="title">{{profile.viwer}}</p>
                                <p class="heading">View Profile</p>
                            </div>
                        </div>
                    </nav>
                    <nav class="level">
                        <div class="level-item has-text-centered">
                            <bars :data="[{value: 0, title: ''}, {value: 1, title: 'a'}, {value: 5, title: 'b'}, {value: 3, title: 'c'}, {value: 1, title: 'd'}]" :gradient="['#6fa8dc', '#42b983']" :barWidth="10" :growDuration="1.5">
                            </bars>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    </div>
    <!-- All projects -->
    <!-- <div id="bodyBg">
        <div class="columns">
            <div class="column is-narrow">
                <div class="field">
                    <p class="control has-icons-left">
                        <input class="input" type="text" placeholder="Search Project...">
                        <span class="icon is-small is-left">
                            <i class="la la-search"></i>
                        </span>
                    </p>
                </div>
            </div>
            <div class="borderLeft">
            </div>
            <div class="column">
                <router-link to="/createPortPage">
                    <div class="createPortPage">
                        <i class="la la-plus"></i>
                        <div class="textCreate">Create Project</div>
                    </div>
                </router-link>
            </div>
            <div class="column">
                <div class="card">
                    <div class="card-image">
                        <figure class="image">
                            <img src="./../assets/poster.jpg" alt="Placeholder image">
                        </figure>
                    </div>
                    <div class="card-content projectInfo">
                        <div class="content">
                            <p class="projectName">SIT Students Accomplishment</p>
                            <p class="projectDetail" style="height: 35px;overflow: hidden;">SIT Students Accomplishment detail detail detail SIT Students Accomplishment detail detail detail SIT Students Accomplishment detail detail detail</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="card">
                    <div class="card-image">
                        <figure class="image">
                            <img src="./../assets/poster.jpg" alt="Placeholder image">
                        </figure>
                    </div>
                    <div class="card-content projectInfo">
                        <div class="content">
                            <p class="projectName">SIT Students Accomplishment</p>
                            <p class="projectDetail" style="height: 35px;overflow: hidden;">SIT Students Accomplishment detail detail detail SIT Students Accomplishment detail detail detail SIT Students Accomplishment detail detail detail</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> -->
    <div id="bodyBg">
        <div class="columns">
            <div class="column is-narrow" style="padding: 0 !important;padding-left: 0.75rem !important;">
                <div class="field">
                    <p class="control has-icons-left">
                        <input class="input" type="text" placeholder="Search Project...">
                        <span class="icon is-small is-left">
                            <i class="la la-search"></i>
                        </span>
                    </p>
                </div>
            </div>
        </div>
        <div class="columns is-multiline">
            <div class="column">
                <router-link to="/createPortPage">
                    <div class="createPortPage">
                        <i class="la la-plus"></i>
                        <div class="textCreate">Create Project</div>
                    </div>
                </router-link>
            </div>
            <div class="column is-one-quarter" v-for="(project,index) in projects" v-bind:key="index">
                <router-link :to="`/ProjectDetail/${project.id}`">
                    <div class="card">
                        <div class="card-image">
                            <figure class="image">
                                <img src="./../assets/poster.jpg" alt="Placeholder image">
                            </figure>
                        </div>
                        <div class="card-content projectInfo">
                            <div class="content">
                                {{project.project_id}}
                                <p class="projectName">{{project.project_name_en}}</p>
                                <p class="projectDetail" style="height: 35px;overflow: hidden;">{{project.project_abstract}}</p>
                            </div>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</div>
</template>

<script src="print.js"></script>

<script>
import './../../node_modules/bulma/css/bulma.css';
import './css/studentProjectTab.css';
import print from 'print-js'
import {
    mapGetters,
    mapActions
} from 'vuex'

export default {
    data() {
        return {
            message: '',
            info: 'Bachelor of Science Programme in Information Technology',
            year: '3rd year SIT Student',
        }
    },
    computed: {
        ...mapGetters({
            student: 'GET_STUDENT_DATA',
            profile: 'GET_STUDENT_PROFILE',
            projects: 'GET_STUDENT_PROJECT'
        })
    },
    mounted() {
        this.LOAD_STUDENT_DATA()
    },
    methods: {
        ...mapActions(['LOAD_STUDENT_DATA']),
    }
}
</script>
