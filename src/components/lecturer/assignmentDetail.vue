<template>
<div>
    <div id="bodyBg">
        <div class="columns">
            Course / Assignment / Details
        </div>
        <!-- assignment topic -->
        <div class="columns">
            <div class="column topic" style="padding-bottom:0">Design Web application</div>
        </div>
        <div class="courseNameInAssignDetail">INT351 Human Computer Interaction</div>
        <div class="columns">
            <div class="column">
                <span style="margin-right:20px">Create by : UMAPORN SUPASITTHIMETHEE</span>
                Sep 20, 2019 (Edit Sep 20, 2019)
            </div>
            <div class="column countAll">
                Code Join : <span class="codeJoin">78D1CA</span>
            </div>
        </div>
        <div class="columns" style="margin-top:40px">
            <!-- nav bar -->
            <div class="column is-2">
                <aside class="menu navAssignDetail">
                    <ul class="menu-list navTopic navCanClick" @click="show('assignmentDetail')">
                        Detail
                    </ul>
                    <ul class="menu-list navTopic">
                        <li>
                            <span>Members</span>
                            <ul>
                                <li class="navTitle navCanClick" @click="show('lecturersMember')">Lecturers</li>
                                <li class="navTitle navCanClick" @click="show('studentsMember')">Students</li>
                            </ul>
                        </li>
                    </ul>
                    <ul class="menu-list navTopic">
                        <li>
                            <span>Projects</span>
                            <ul>
                                <li class="navTitle navCanClick" @click="show('projectsApproved')">Approved<span class="countProjectStatus approved">2</span></li>
                                <li class="navTitle navCanClick" @click="show('projectsRequest')">Request<span class="countProjectStatus request">0</span></li>
                                <li class="navTitle navCanClick" @click="show('projectsDenied')">Denied<span class="countProjectStatus denied">1</span></li>
                            </ul>
                        </li>
                    </ul>
                </aside>
            </div>
            <!-- detail -->
            <div class="column" style="padding-left:100px;padding-right:100px">
                <div id="assignmentDetail">
                    assignmentDetail
                </div>
                <div id="projectsRequest">
                    projectsRequest
                </div>
                <div id="projectsDenied">
                    projectsDenied
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
                        <div class="card-content cardSize">
                            <div class="columns">
                                <div class="column is-two-thirds courseName">1) Thanatta Opartkajornyos</div>
                                <div class="column countAssign">59130500001</div>
                            </div>
                        </div>
                        <div class="card-content cardSize">
                            <div class="columns">
                                <div class="column is-two-thirds courseName">2) Nattanit Wimaluangtrakul</div>
                                <div class="column countAssign">59130500002</div>
                            </div>
                        </div>
                        <div class="card-content cardSize">
                            <div class="columns">
                                <div class="column is-two-thirds courseName">3) Nattanat Wimaluangtrakul</div>
                                <div class="column countAssign">59130500024</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- lecturer -->
                <div id="lecturersMember">
                    <div class="card-content cardSize colName">
                        <div class="columns">
                            <div class="column is-two-thirds">Name</div>
                            <div class="column countAssign">Position</div>
                        </div>
                    </div>
                    <div class="card lecturerCard">
                        <div class="card-content cardSize">
                            <div class="columns">
                                <div class="column is-two-thirds courseName">1) Umaporn Supasitthimethee</div>
                                <div class="column countAssign">Creator<i class="la la-pencil"></i></div>
                            </div>
                        </div>
                        <div class="card-content cardSize">
                            <div class="columns">
                                <div class="column is-two-thirds courseName">2) Sumet Angkasirikul</div>
                                <div class="column countAssign">Approvers<i class="la la-pencil"></i></div>
                            </div>
                        </div>
                        <div class="card-content cardSize">
                            <div class="columns">
                                <div class="column is-two-thirds courseName">3) Sanit Sirisawatvatana</div>
                                <div class="column countAssign">Approvers<i class="la la-pencil"></i></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Approved -->
                <div id="projectsApproved">
                    <div class="card-content cardSize colName">
                        <div class="columns">
                            <div class="column is-two-thirds">Project</div>
                            <div class="column countAssign">Status</div>
                            <div class="column countAssign">Comment</div>
                        </div>
                    </div>
                    <div class="card lecturerCard">
                        <div class="card-content cardSize">
                            <div class="columns">
                                <div class="column is-two-thirds courseName">1) Hospital BBB Web Application</div>
                                <div class="column countAssign"><span class="projectStatus">Approved</span></div>
                                <div class="column countAssign"><i class="la la-comment"></i></div>
                            </div>
                            <div class="columns">
                                <div class="column is-two-thirds courseName">2) Hospital CCC Web Application</div>
                                <div class="column countAssign"><span class="projectStatus">Approved</span></div>
                                <div class="column countAssign"><i class="la la-comment"></i></div>
                            </div>
                        </div>
                    </div>
                </div>

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
import {
    mapGetters,
    mapActions
} from 'vuex'
import axios from 'axios'

export default {
    data() {
        return {
            hoverCardOrNot: false
        }
    },
    computed: {
        ...mapGetters({
            // allProjectPresent: 'GET_ALL_PROJECT_VISITORVIEW'
        })
    },
    mounted() {},
    methods: {
        ...mapActions(['', '']),
        show(element) {
            document.getElementById("studentsMember").style.display = "none"
            document.getElementById("lecturersMember").style.display = "none"
            document.getElementById("projectsApproved").style.display = "none"
            document.getElementById("assignmentDetail").style.display = "none"
            document.getElementById("projectsRequest").style.display = "none"
            document.getElementById("projectsDenied").style.display = "none"
            document.getElementById(element).style.display = "block"
        }
    }
}
</script>
