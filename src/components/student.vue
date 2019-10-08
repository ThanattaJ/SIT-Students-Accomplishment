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
            <div class="columns" style="padding: 15px 0 15px 0;">
                <div class="column is-3 picture" style="position: relative;">
                    <img class="profileImg" :src="profile.profile_picture" id="profilePic" @mouseover="showUploadImg" @mouseout="hideUploadImg" height="133.61" width="105">
                    <!-- <img class="profileImg" src="./../assets/gib.jpg" id="profilePic" @mouseover="showUploadImg" @mouseout="hideUploadImg" height="133.61" width="105"> -->
                    <!-- <img class="profileImg" src="./../assets/03-REP-Photo-KMUTT-SophonJampasornklin.jpg" id="profilePic" @mouseover="showUploadImg" @mouseout="hideUploadImg" height="133.61" width="105"> -->
                    <div id="textBlock" class="text-block" style="display:none">Change Image</div>
                    <input type="file" ref="profileImg" @change="uploadProfileImg">
                    <!-- <input type="file" ref="file" @change="selectFile" class="file-input" accept=".jpg, .png"  /> -->
                    <!-- <img v-if="url" :src="url" /> -->
                </div>
                <div class="column is-three-fifths" id="information">
                    <br>
                    <p id="name">{{profile.firstname}} {{profile.lastname}}</p>
                    <p id="info">Bachelor of Science Programme in {{profile.curriculum_name}}</p>
                    <!-- <p id="info"> {{year}} (Mock Data)</p> -->
                    <p id="info"> {{profile.student_id}}</p>
                    <br><br>
                    <p id="info" v-if="clickEditEmail == false">{{profile.email}} <i class="la la-pencil" @click="clickEditEmail = true"></i></p>
                    <md-field v-if="clickEditEmail == true" style="width: 50%;margin-top: -22px !important;">
                        <!-- <ValidationProvider name=" Email " rules="required"> -->
                        <!-- <div slot-scope="{ errors }"> -->
                        <div style="width: 100% !important;">
                            <!-- <label>Email</label> -->
                            <md-input :value="email" id="email"></md-input>
                            <!-- <p class="help is-danger">{{ errors[0] }}</p> -->
                        </div>
                        <!-- </ValidationProvider> -->
                        <!-- <div></div> -->
                    </md-field>
                    <div v-if="clickEditEmail == true" style="margin-bottom:-6px">
                        <a class="button is-small saveBtn" @click="saveChange">Save</a>
                        <a class="button is-small cancelBtn" @click="cancelChange">Cancel</a>
                    </div>
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
            <div class="column" style="padding: 8px 8px;">
                <div class="tags">
                    <span class="tag" v-for="(tag,index) in tags" v-bind:key="index" style="border-radius: 12px;background-color:#FFD15C;color: white;font-weight: bolder;">
                        {{tag.tag_name}} ({{tag.total_tag}})
                    </span>
                </div>
            </div>
        </div>
        <div class="columns is-multiline">
            <div class="column is-one-quarter">
                <router-link to="/createPortPage">
                    <div class="createPortPage">
                        <!-- <i class="la la-plus"></i> -->
                        <div class="textCreate" style="font-size:30px !important">+</div>
                        <div class="textCreate" style="padding-top:10px">Create Project</div>
                    </div>
                </router-link>
            </div>
            <div class="column is-one-quarter" v-for="(project,index) in projects" v-bind:key="index">
                <router-link :to="`/ProjectDetail/${project.id}`">
                    <div class="card">
                        <div class="card-image" v-if="project.cover_path != null">
                            <figure class="image is-4by2">
                                <img :src="project.cover_path" alt="Placeholder image">
                            </figure>
                        </div>
                        <div class="card-image" v-else>
                            <figure class="image is-4by2">
                                <img src="./../assets/noCoverImg.png">
                            </figure>
                        </div>
                        <div class="card-content projectInfo">
                            <div class="content">
                                <p class="projectName" style="height: 22px;overflow: hidden;">{{project.project_name_en}}</p>
                                <div class="columns">
                                    <div class="column" v-if="project.achievement">
                                        <p class="projectDetail" style="margin-top:8px;">
                                            <img src="./../assets/trophy.png" width="25px">
                                        </p>
                                    </div>
                                    <div class="column">
                                        <p class="projectDetail" style="margin-top:8px;text-align:right">
                                            <img src="./../assets/visibility-button.png" width="30px" style="margin-right:5px;"><span style="margin-right:5px">{{project.count_viewer}} </span>
                                            <img src="./../assets/clap-hands.png" width="25px" style="margin-right:5px"><span style="margin-right:5px">{{project.count_clap}} </span>
                                        </p>
                                    </div>
                                </div>

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
import axios from 'axios'

export default {
    data() {
        return {
            message: '',
            info: 'Bachelor of Science Programme in Information Technology',
            year: '3rd year SIT Student',
            clickEditEmail: false
        }
    },
    computed: {
        ...mapGetters({
            student: 'GET_STUDENT_DATA',
            profile: 'GET_STUDENT_PROFILE',
            projects: 'GET_STUDENT_PROJECT',
            tags: 'GET_STUDENT_TAG',
            email: 'GET_EMAIL',
            config: 'GET_CONFIG'
        })
    },
    mounted() {
        this.LOAD_STUDENT_DATA()
    },
    methods: {
        ...mapActions(['LOAD_STUDENT_DATA', 'UPDATE_FIELD', 'SET_EMAIL']),
        showUploadImg: function () {
            document.getElementById("textBlock").style.display = "flex"
        },
        hideUploadImg: function () {
            document.getElementById("textBlock").style.display = "none"
        },
        async saveChange() {
            var newEmail = document.getElementById('email').value
            // this.UPDATE_FIELD({
            //     callSetter: 'SET_EMAIL',
            //     value: newEmail
            // })
            try {
                await axios
                    // .patch("http://localhost:7000/users/email", {
                    .patch("https://www.sit-acc.nruf.in.th/users/email", {
                        email: newEmail
                    }, this.config)
                    .then((res) => {
                        console.log("success! : ", res);
                        this.LOAD_STUDENT_DATA()
                    })
                    .catch((err) => {
                        console.error("err : " + err);
                    });
            } catch (err) {
                console.log("FAILURE!!" + err);
            }
            this.cancelChange()
        },
        cancelChange() {
            this.clickEditEmail = false
        },
        async uploadProfileImg() {
            // try {
            //     await axios
            //         // .patch("http://localhost:7000/users/email", {
            //         .patch("https://www.sit-acc.nruf.in.th/users/email", {
            //             email: newEmail
            //         }, this.config)
            //         .then((res) => {
            //             console.log("success! : ", res);
            //             this.LOAD_STUDENT_DATA()
            //         })
            //         .catch((err) => {
            //             console.error("err : " + err);
            //         });
            // } catch (err) {
            //     console.log("FAILURE!!" + err);
            // }
            const formData = new FormData();
            formData.append('file', this.$refs.profileImg.files[0]);
            // formData.append('project_id',this.$route.params.pId);
            // console.log("formdata : ",formData)
            try {
                await axios
                    .patch('https://www.sit-acc.nruf.in.th/users/image', formData, this.config)
                    .then((res) => {
                        this.LOAD_STUDENT_DATA()
                        console.log("success! : ", res);
                    })
                    .catch((err) => {
                        console.error("err : " + err);
                    });
            } catch (err) {
                console.log('FAILURE!!' + err)
            }
        },
    }
}
</script>
