<template>
<div id="list-project of student">
    <!-- <div id="bodyBg">
        <div class="field has-addons">
            <p class="control">
                <span class="select">
                    <select id="typeOfSearch" class="selectInSearch" style="font-size: 16px !important; ">
                        <option value="all">All Projects</option>
                        <option value="achievement">All Achievement</option>
                        <option value="assignment">All Assignment</option>
                    </select>
                </span>
            </p>
            <p class="control">
                <input id="searchText" class="input" type="text" placeholder="Looking for?" style="font-size: 16px !important;margin-top: 0px !important;border-bottom: 1px solid #DBDBDB !important;">
            </p>
            <p class="control">
                <span class="select">
                    <select id="searchBy" class="selectInSearch" style="font-size: 16px !important;">
                        <option value="projects">Search by Project</option>
                        <option value="tags">Search by Tag</option>
                    </select>
                </span>
            </p>
            <p class="control">
                <span class="select">
                    <select id="year" class="selectInSearch" style="font-size: 16px !important;">
                        <option value="present">Present</option>
                        <option>2018</option>
                        <option>2017</option>
                    </select>
                </span>
            </p>
            <p class="control" @click="search">
                <a class="button" style="color: rebeccapurple !important;">
                    <i class="la la-search"></i>
                </a>
            </p>
        </div>
    </div> -->
    <!-- <div id="bodyBg">
        <a class="button cancelCommentBtn" @click="searchBy('projects')"><span class="courseName">Projects</span></a>
        <a class="button cancelCommentBtn" @click="searchBy('tags')"><span class="courseName">Tags</span></a>
        <a class="button cancelCommentBtn" @click="searchBy('profile')"><span class="courseName">Profiles</span></a>
    </div> -->
    <div id="bodyBg">
        <div class="field has-addons">
            <p class="control">
                <span class="select">
                    <!-- <select id="selectSearchBy" @change="searchBy"> -->
                    <select id="selectSearchBy" @change="canClickYear">
                        <option value="projects">Project Name</option>
                        <option value="tags">Tag</option>
                        <option value="profile">Student Name</option>
                    </select>
                </span>
            </p>
            <p class="control" v-if="showYear == true">
                <span class="select">
                    <select id="selectYear" @change="selectYear">
                        <option :value="year.year" class="navCanClick" v-for="(year,index) in years" v-bind:key="index">
                            {{year.year}}
                        </option>
                    </select>
                </span>
            </p>
            <p class="control" v-if="showYear == false">
                <span class="select">
                    <select id="allYear" disabled style="border-color: #dbdbdb;">
                        <option value="All years">
                            All years
                        </option>
                    </select>
                </span>
            </p>
            <p class="control has-icons-left" v-if="searchInput == true">
                <input class="input" type="text" v-model="search" v-on:keyup.enter="searchBy" placeholder="Looking for?">
                <span class="icon is-small is-left">
                    <i class="la la-search"></i>
                </span>
            </p>
            <div id="tagInput" class="dropdown" v-if="searchInput == false">
                <div class="dropdown-trigger">
                    <div class="field">
                        <p class="control is-expanded has-icons-left">
                            <input class="input" v-model="searchTagText" type="search" placeholder="Looking for?" 
                            style="border-top-left-radius: 0px;border-bottom-left-radius: 0px;"/>
                            <span class="icon is-small is-left"><i class="la la-search"></i></span>
                        </p>
                    </div>
                </div>
                <div class="dropdown-menu" id="dropdown-menu" role="menu">
                    <div class="dropdown-content" style="max-height: 300px;overflow-y: auto;">
                        <a href="#" @click="chooseTag(tag.tag_name)" class="dropdown-item" v-for="(tag,index) in tags" v-bind:key="index">
                            <span style="color:black">{{tag.tag_name}} ({{tag.count_tags}}
                                <span v-if="tag.count_tags == 1">project</span>
                                <span v-else>projects</span>
                                )
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <!-- <autocomplete :search="searchTag"></autocomplete> -->

    </div>
    <!-- All projects -->
    <div id="bodyBg" v-if="type == false">
        <div class="columns is-multiline">
            <div class="column is-one-quarter" v-for="(project,index) in allProjectPresent" v-bind:key="index">
                <router-link :to="`/ProjectDetail/${project.id}`">
                    <div class="card projectCard content_img">
                        <div class="card-image" v-if="project.cover_path != null">
                            <figure class="image is-4by2">
                                <!-- <img src="./../../assets/gold-medal.png" width="17px" v-if="project.achievement" style="z-index:2;position:absolute;width:40px;"> -->
                                <img :src="project.cover_path" alt="Placeholder image" style="height: 156.22px !important;border-radius: 5px;">
                                <div class="img-text">
                                    <img src="./../../assets/visibility-button.png" style="width:15px;display: inline;">
                                    <span class="countText">{{project.count_viewer}} </span>
                                    <img src="./../../assets/clap-hands.png" style="width:15px;display: inline;">
                                    <span class="countText">{{project.count_clap}} </span>
                                </div>
                            </figure>
                        </div>
                        <div class="card-image" v-else>
                            <figure class="image is-4by2">
                                <!-- <img src="./../../assets/gold-medal.png" width="17px" v-if="project.achievement" style="z-index:2;position:absolute;width:40px;"> -->
                                <img src="./../../assets/noCoverImg.png" style="height: 156.22px !important;border-radius: 5px;">
                                <div class="img-text">
                                    <img src="./../../assets/visibility-button.png" style="width:15px;display: inline;">
                                    <span class="countText">{{project.count_viewer}} </span>
                                    <img src="./../../assets/clap-hands.png" style="width:15px;display: inline;">
                                    <span class="countText">{{project.count_clap}} </span>
                                </div>
                            </figure>
                        </div>
                        <div class="card-content projectInfo">
                            <p class="projectName" style="height: 22px;overflow: hidden;">{{project.project_name_en}}</p>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
    <!-- All profiles -->
    <div id="bodyBg" v-if="type == true">
        <div class="columns is-multiline">
            <div class="column is-one-quarter" v-for="(profile,index) in profiles" v-bind:key="index">
                <!-- <router-link :to="`/student/${profile.student_id}`"> -->
                <div class="card projectCard content_img" @click="goToStudentProfile(profile.student_id)">
                    <div class="card-image" v-if="profile.profile_picture != null">
                        <figure class="image" style="height: 159px;width: 120px">
                            <img :src="profile.profile_picture" alt="Placeholder image" style="border-radius: 5px;">
                        </figure>
                    </div>
                    <div class="card-image" v-else>
                        <figure class="image" style="height: 159px;width: 120px">
                            <img src="./../../assets/noProfilePicture.png" style="border-radius: 5px;">
                        </figure>
                    </div>
                    <div class="card-content projectInfo">
                        <p class="projectName" style="height: 22px;overflow: hidden;">{{profile.firstname}}</p>
                        <p class="projectName" style="height: 22px;overflow: hidden;">{{profile.lastname}}</p>
                        <p class="projectName" style="height: 22px;overflow: hidden;">{{profile.student_id}}</p>
                    </div>
                </div>
                <!-- </router-link> -->
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Autocomplete from '@trevoreyre/autocomplete-vue'
import router from '../../router/index'
import './../css/visitor.css';
import './../css/studentProjectTab.css';
import {
    mapGetters,
    mapActions
} from 'vuex'
import axios from 'axios'

export default {
    data() {
        return {
            hoverCardOrNot: false,
            type: false,
            showYear: true,
            search: "",
            searchInput: true,
            searchTagText: "",
            tagInputEmpty: true,
            allTags: []
        }
    },
    components: {
        Autocomplete
    },
    computed: {
        ...mapGetters({
            allProjectPresent: 'GET_ALL_PROJECT_VISITORVIEW',
            profiles: 'GET_ALL_PROFILE',
            years: 'GET_YEARS',
            path: 'GET_PATHNAME'
        }),
        tags() {
            if (this.searchTagText != "") {
                return this.allTags.filter(
                    items =>
                    items.tag_name.toLowerCase().includes(this.searchTagText.toLowerCase())
                )
            } else {
                return this.allTags
            }
        }

        // allProjects() {
        //     var searchBy;
        //     if (document.getElementById('selectSearchBy') != null) {
        //         searchBy = document.getElementById('selectSearchBy').value
        //     }else{
        //         searchBy = 'projects'
        //     }

        //     // if (this.search != "" && searchBy == 'projects') {
        //     if (this.search != "") {
        //         console.log('aaa')
        //         return this.allProjectPresent.filter(
        //             items =>
        //             items.project_name_en.toLowerCase().includes(this.search.toLowerCase())
        //         )
        //     } else {
        //         return this.allProjectPresent
        //     }
        // }
    },
    watch: {
        searchTagText: function (val) {
            if (val == "") {
                console.log('1')
                this.hideDropdown()
            } else if (this.tagInputEmpty == false) {
                console.log('2')
                this.hideDropdown()
                this.tagInputEmpty = true
            } else {
                console.log('3')
                this.showDropdown()
            }
        }
    },
    mounted() {
        this.LOAD_ALL_PROJECT_VISITORVIEW({
            type: "all",
            year: "present"
        })
        this.load_allTags()
    },
    methods: {
        showDropdown() {
            document.getElementById('tagInput').className = "dropdown is-active"
        },
        hideDropdown() {
            document.getElementById('tagInput').className = "dropdown"
        },
        async load_allTags() {
            const {
                data
            } = await axios.get(
                this.path + '/tags/all'
            );
            this.allTags = data
        },
        searchTag(input) {
            if (input.length < 1) {
                return []
            }
            return this.allTags.filter(
                items =>
                items.tag_name.toLowerCase().includes(input.toLowerCase())
            )
        },
        chooseTag(tag_name) {
            console.log(tag_name)
            this.tagInputEmpty = false
            this.searchTagText = tag_name
            this.search = tag_name
            this.searchBy()
        },
        ...mapActions(['LOAD_ALL_PROJECT_VISITORVIEW', 'LOAD_PROJECT_BY_SEARCH', 'LOAD_OTHER_STUDENT_DATA']),
        selectYear() {
            var selectYear = document.getElementById("selectYear").value == null ? 'present' : document.getElementById('selectYear').value
            console.log("selectYear : " + selectYear)
            this.LOAD_ALL_PROJECT_VISITORVIEW({
                type: "all",
                year: selectYear
            })
        },
        goToStudentProfile(student_id) {
            try {
                this.LOAD_OTHER_STUDENT_DATA({
                    user_role: 'student',
                    user_id: student_id,
                })

            } catch (err) {
                console.log('err', err)
            }
            this.$router.push('/student')
        },
        canClickYear() {
            var searchBy = document.getElementById('selectSearchBy').value == null ? 'projects' : document.getElementById('selectSearchBy').value
            this.showYear = false
            this.searchInput = true
            if (searchBy == 'projects') {
                this.showYear = true
            } else {
                this.showYear = false
                if (searchBy == 'tags') {
                    this.searchInput = false
                }
            }
        },
        searchBy() {
            var searchBy = document.getElementById('selectSearchBy').value == null ? 'projects' : document.getElementById('selectSearchBy').value
            this.type = false

            if (searchBy == 'projects') {
                if (this.search != "") {
                    console.log('aaa')
                    var para = {
                        type: "search",
                        searchBy: "projects",
                        searchText: this.search
                    }
                    this.LOAD_ALL_PROJECT_VISITORVIEW(para)
                } else {
                    var selectYear = document.getElementById("selectYear") == null ? 'present' : document.getElementById('selectYear').value
                    var para = {
                        type: "all",
                        year: selectYear
                    }
                    this.LOAD_ALL_PROJECT_VISITORVIEW(para)
                }
            }
            if (searchBy == 'tags' && this.search != '') {
                var para = {
                    type: "search",
                    searchBy: "tags",
                    searchText: this.search
                }
                this.LOAD_ALL_PROJECT_VISITORVIEW(para)
            } else if (searchBy == 'profile' && this.search != '') {
                this.type = true
                var para = {
                    type: "profile",
                    searchText: this.search
                }
                this.LOAD_ALL_PROJECT_VISITORVIEW(para)
            }
        }
    }
}
</script>
