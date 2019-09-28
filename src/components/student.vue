<template>
<div id="list-project of student">
    <div id="bodyBg">
        <div class="buttons has-addons is-centered is-fullwidth">
            <!-- <span class="button menuBar">Profile</span> -->
            <span class="button menuBar is-info is-selected">Project</span>
            <span class="button menuBar" style="color:#265080 !important">Assignment</span>
            <span class="button menuBar">
                <router-link to="createPortPage" style="color:#265080 !important">Fingerprint</router-link>
            </span>
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
                    <p id="name">{{student[0].firstname}} {{student[0].lastname}}</p>
                    <p id="info">{{info}}</p>
                    <p id="info"> {{year}}</p>
                    <p id="info"> {{student[0].student_id}}</p>
                    <br>
                    <p id="info">{{internship}}</p>
                </div>
                <div class="column borderLeft">
                    <nav class="level">
                        <div class="level-item has-text-centered">
                            <div>
                                <p class="title">1</p>
                                <p class="heading">Gen Resume</p>
                            </div>
                        </div>
                        <div class="level-item has-text-centered">
                            <div>
                                <p class="title">24</p>
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
    <div id="bodyBg">
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
            <!-- <div class="column is-1">
            </div> -->
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
                            <p class="projectDetail" style="    height: 35px;
    overflow: hidden;">SIT Students Accomplishment detail detail detail SIT Students Accomplishment detail detail detail SIT Students Accomplishment detail detail detail</p>
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
                            <p class="projectDetail" style="    height: 35px;
    overflow: hidden;">SIT Students Accomplishment detail detail detail SIT Students Accomplishment detail detail detail SIT Students Accomplishment detail detail detail</p>
                        </div>
                    </div>
                </div>
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
            name: 'Sophon Jampasornklin',
            info: 'Bachelor of Science Programme in Information Technology',
            year: '3rd year SIT Student',
            student_id: '59130500109',
            internship: 'Internship: @G-Able'
        }
    },
    computed: {
        ...mapGetters({
            student: 'GET_STUDENT_PROFILE'
        })
    },
    mounted() {
        this.LOAD_STUDENT_PROFILE()
    },
    methods: {
        ...mapActions(['LOAD_STUDENT_PROFILE']),
    }
}
</script>
