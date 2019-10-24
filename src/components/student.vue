<template>
<div id="list-project of student">
    <div id="bodyBg">
        <div class="buttons has-addons is-centered is-fullwidth" style="font-weight:bold">
            <span class="button menuBar is-info is-selected">Project</span>
            <span class="button menuBar" style="color:#265080 !important">
                <router-link to="/assignment" style="color:#265080 !important">Assignment</router-link>
            </span>
            <span class="button menuBar">
                <router-link to="/GenerateResume" style="color:#265080 !important">Generate Resume</router-link>
            </span>
        </div>
    </div>
    <div class="navProfile">
        <div id="bodyBg">
            <div class="columns" style="padding: 15px 0 15px 0;">
                <div class="column is-3 picture" style="position: relative;">
                    <img class="profileImg StdImgPage" v-if="profile.profile_picture != null" :src="profile.profile_picture" id="profilePic" @mouseover="showUploadImg" @mouseout="hideUploadImg">
                    <img class="profileImg StdImgPage" v-else src="./../assets/girl.png" id="profilePic" @mouseover="showUploadImg" @mouseout="hideUploadImg">
                    <div id="textBlock" class="text-block" style="display:flex"><i class="la la-camera-retro"></i>Update</div>
                    <input type="file" ref="profileImg" @change="uploadProfileImg" class="file-input profileInput" accept=".jpg, .png" @mouseover="showUploadImg" @mouseout="hideUploadImg" />
                </div>
                <div class="column is-three-fifths" id="information">
                    <br>
                    <p id="name">{{profile.firstname}} {{profile.lastname}}</p>
                    <p id="info">Bachelor of Science Programme in {{profile.curriculum_name}}</p>
                    <p id="info"> {{profile.student_id}}</p>
                    <br><br>
                    <p id="info" v-if="clickEditEmail == false">{{profile.email}} <i class="la la-pencil" @click="clickEditEmail = true"></i></p>
                    <md-field v-if="clickEditEmail == true" style="width: 50%;margin-top: -22px !important;">
                        <!-- <ValidationProvider name=" Email " rules="required"> -->
                        <!-- <div slot-scope="{ errors }"> -->
                        <div style="width: 100% !important;">
                            <!-- <label>Email</label> -->
                            <md-input :value="profile.email" id="email"></md-input>
                            <!-- <p class="help is-danger">{{ errors[0] }}</p> -->
                        </div>
                        <!-- </ValidationProvider> -->
                        <!-- <div></div> -->
                    </md-field>
                    <div v-if="clickEditEmail == true" style="margin-bottom:-20px">
                        <a class="button is-small saveBtn" @click="saveChange">Save</a>
                        <a class="button is-small cancelBtn" @click="cancelChange">Cancel</a>
                    </div>
                </div>
                <div class="column borderLeft">
                    <nav class="level" style="margin-bottom: 0;">
                        <div class="level-item has-text-centered">
                            <div>
                                <p class="title">{{profile.resume_gen_count}}</p>
                                <p class="heading">Gen Resume</p>
                            </div>
                        </div>
                        <div class="level-item has-text-centered">
                            <div>
                                <p class="title">{{profile.viewer}}</p>
                                <p class="heading">View Profile</p>
                            </div>
                        </div>
                    </nav>
                    <nav class="level">
                        <div class="level-item has-text-centered">
                            <svg style="width:0; height:0; position:absolute;" aria-hidden="true" focusable="false">
                                <defs>
                                    <linearGradient id="btcFill">
                                        <stop offset="0%" stop-color="#6fa8dc"></stop>
                                        <stop offset="100%" stop-color="#42b983"></stop>
                                    </linearGradient>
                                </defs>
                            </svg>
                            <TrendChart 
                                :datasets="[
                                    {
                                        data: dataToChart,
                                        smooth: true,
                                        fill: true,
                                        className: 'curve-btc'
                                    }
                                ]" 
                                :labels="{
                                    xLabels:  totalProject[totalProject.length-1].start_year_en-totalProject[0].start_year_en !=0 ? 
                                                [totalProject[0].start_year_en, totalProject[totalProject.length-1].start_year_en] :
                                                [totalProject[0].start_year_en-1, totalProject[0].start_year_en]
                                }"
                                :min="0"
                            >
                            </TrendChart>
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
                    <span class="tag profileTag" v-for="(tag,index) in tags" v-bind:key="index">
                        <vc-donut :sections="[{ value: (tag.total_tag*100/projects.length), color: '#5FAEB8' }]" :size="15" :thickness="40"></vc-donut>
                        <span style="padding-left:5px">{{tag.tag_name}} </span>
                        <!-- ({{tag.total_tag}})  -->
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
            <div class="column is-one-quarter" v-for="(allProject,index) in projects" v-bind:key="index">
                <router-link :to="`/ProjectDetail/${allProject.id}`">
                    <div class="card projectCard content_img">
                        <div class="card-image" v-if="allProject.cover_path != null">
                            <figure class="image is-4by2">
                                <img src="./../assets/gold-medal.png" width="17px" v-if="allProject.achievement" style="z-index:2;position:absolute;width:40px;">
                                <img :src="allProject.cover_path" alt="Placeholder image" style="height: 156.22px !important;border-radius: 5px;">
                                <div class="img-text" >
                                    <img src="./../assets/visibility-button.png" style="width:15px;display: inline;">
                                    <span class="countText">{{allProject.count_viewer}} </span>
                                    <img src="./../assets/clap-hands.png" style="width:15px;display: inline;">
                                    <span class="countText">{{allProject.count_clap}} </span>
                                </div>
                            </figure>
                        </div>
                        <div class="card-image" v-else>
                            <figure class="image is-4by2">
                                <img src="./../assets/noCoverImg.png" style="height: 156.22px !important;border-radius: 5px;">
                                <div class="img-text" >
                                    <img src="./../assets/visibility-button.png" style="width:15px;display: inline;">
                                    <span class="countText">{{allProject.count_viewer}} </span>
                                    <img src="./../assets/clap-hands.png" style="width:15px;display: inline;">
                                    <span class="countText">{{allProject.count_clap}} </span>
                                </div>
                            </figure>
                        </div>
                        <div class="card-content projectInfo">
                            <p class="projectName" style="height: 22px;overflow: hidden;">{{allProject.project_name_en}}</p>
                        </div>
                    </div>
                </router-link>
            </div>
            <!-- <div class="column is-one-quarter" v-for="(project,index) in projects" v-bind:key="index">
                <router-link :to="`/ProjectDetail/${project.id}`">
                    <div class="card">
                        <div class="card-image" v-if="project.cover_path != null">
                            <figure class="image is-4by2">
                                <img class="StdImgPage" :src="project.cover_path" alt="Placeholder image" style="height: 156.22px; !important">
                            </figure>
                        </div>
                        <div class="card-image" v-else>
                            <figure class="image is-4by2">
                                <img class="StdImgPage" src="./../assets/noCoverImg.png">
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
            </div> -->
        </div>
    </div>
</div>
</template>

<script src="print.js"></script>

<script>
import './../../node_modules/bulma/css/bulma.css';
import './css/studentProjectTab.css';
import './css/visitor.css';
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
    // props: {
    //     dataToChart: this.dataToChart
    // },
    computed: {
        ...mapGetters({
            profile: 'GET_STUDENT_PROFILE',
            projects: 'GET_STUDENT_PROJECT',
            tags: 'GET_STUDENT_TAG',
            totalProject: 'GET_STUDENT_TOTALPROJECT',
            dataToChart: 'GET_DATATOCHART',
            email: 'GET_EMAIL',
            config: 'GET_CONFIG'
        })
    },
    mounted() {
        // this.LOAD_OTHER_STUDENT_DATA({user_id:"59130500001"})
        this.LOAD_OWN_STUDENT_DATA()
    },
    methods: {
        ...mapActions(['LOAD_OWN_STUDENT_DATA', 'LOAD_OTHER_STUDENT_DATA', 'UPDATE_FIELD', 'SET_EMAIL']),
        showUploadImg: function () {
            document.getElementById("textBlock").style.display = "flex"
        },
        hideUploadImg: function () {
            document.getElementById("textBlock").style.display = "none"
        },
        async saveChange() {
            var newEmail = document.getElementById('email').value
            try {
                await axios
                    // .patch("http://localhost:7000/users/email", {
                    .patch("https://www.sit-acc.nruf.in.th/users/email", {
                        email: newEmail
                    }, this.config)
                    .then((res) => {
                        console.log("success! : ", res);
                        this.LOAD_OWN_STUDENT_DATA()
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
            const formData = new FormData();
            formData.append('file', this.$refs.profileImg.files[0]);
            formData.append('method', 'profile');
            try {
                await axios
                    .patch('https://www.sit-acc.nruf.in.th/users/image', formData, this.config)
                    .then((res) => {
                        this.LOAD_OWN_STUDENT_DATA()
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
