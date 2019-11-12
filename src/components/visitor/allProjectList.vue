<template>
<div id="list-project of student">
    <div id="bodyBg">
        <div>
            <div class="field has-addons has-addons-centered is-narrow" v-if="search == ''">
                <p class="control has-icons-left" style="margin-left:15% !important">
                    <input id="search" style="font-size: 30px;width: 55%;border: none;box-shadow: none;" class="input" type="text" v-model="search" v-on:keyup.enter="searchBy();blur(true)" placeholder="Search ... ">
                    <span style="font-size: 30px !important;" class="icon is-small is-left">
                        <i style="font-size: 33px !important;" class="la la-search"></i>
                    </span>
                </p>
            </div>
            <div class="field has-addons has-addons-centered" style="justify-content: center;align-items: center;display: flex;" v-else>
                <!-- <p class="control" style="width:100%"> -->
                <input id="search searchExpand" style="font-size: 30px;width: 5%;max-width:100%;border: none;box-shadow: none;text-align:center" class="input" type="text" v-model="search" v-on:keyup.enter="searchBy();blur(false)" placeholder="Search ... ">
                <!-- </p> -->
                <i class="la la-times delSearch" @click="clearSearchInput();searchBy()"></i>
            </div>
        </div>
        <div style="text-align:center">
            <button id="projects" class="button is-light viewBtn" style="z-index:1" @click="canClickYear('projects');haveTag = false">Projects</button>
            <button id="tags" class="button is-light viewBtn" style="margin:0px 30px;z-index: 1;" @click="filterByTag('All','');canClickYear('tags');haveTag = true">Tags</button>
            <button id="stdProfile" class="button is-light viewBtn" style="z-index:1" @click="canClickYear('stdProfile');haveTag = false">Students</button>
        </div>
    </div>
    <div v-if="loading"><img src="../../assets/Rolling-2s-200px.svg" class="center-div"></div>
    <div v-else>
        <div id="bodyBg">
            <p class="control" v-if="showYear == true">
                Select year : <span class="select">
                    <select id="selectYear" @change="selectYear">
                        <option :value="year.year" class="navCanClick" v-for="(year,index) in years" v-bind:key="index">
                            {{year.year}}
                        </option>
                    </select>
                </span>
            </p>
        </div>
    </div>
    <div v-if="loading"><img src="../../assets/Rolling-2s-200px.svg" class="center-div"></div>
    <div v-else>
        <div id="bodyBg" class="tags" v-if="searchInput == false">
            <span id='allTag' class="tag profileTag" @click="filterByTag('All','')">
                All
            </span>
            <span :id="'tag'+index" class="tag profileTag" @click="filterByTag(tag.tag_name,index)" v-for="(tag,index) in tags" v-bind:key="index">
                <!-- <vc-donut :sections="[{ value: (tag.total_tag*100/numberOfProjects), color: '#5FAEB8' }]" :size="15" :thickness="40"></vc-donut> -->
                {{tag.tag_name}}
            </span>
        </div>
    </div>
    <div style="height: 1px;background-color: #E8E8E8;position: absolute;top: 227px;width: 100%;z-index: 0;"></div>
    <!-- <div id="bodyBg">
        <div class="field has-addons">
            <p class="control">
                <span class="select">
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
                            <input class="input" v-model="searchTagText" type="search" placeholder="Looking for?" style="border-top-left-radius: 0px;border-bottom-left-radius: 0px;" />
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
    </div> -->
    <!-- All projects -->
    <div v-if="loading"><img src="../../assets/Rolling-2s-200px.svg" class="center-div"></div>
    <div v-else>
        <div id="bodyBg" v-if="isProfileType == false">
            <div class="columns is-multiline">
                <!-- <div class="column is-one-third" v-for="(project,index) in allProjectPresent" v-bind:key="index"> -->
                <div class="column is-one-quarter" v-for="(project,index) in allProjectPresent" v-bind:key="index">
                    <router-link :to="`/ProjectDetail/${project.id}`">
                        <div class="card projectCard content_img">
                            <div v-if="project.cover_path != null">
                                <figure class="image coverImg is-4by2">
                                    <img :src="project.cover_path" alt="Placeholder image" style="height: 200px !important;border-radius: 5px;">
                                    <!-- <img :src="project.cover_path" alt="Placeholder image" style="height: 271px !important;border-radius: 5px;"> -->
                                    <div class="img-text">
                                        <img src="./../../assets/visibility-button.png" style="width:15px;display: inline;">
                                        <span class="countText">{{project.count_viewer}} </span>
                                        <img src="./../../assets/clap-hands.png" style="width:15px;display: inline;">
                                        <span class="countText">{{project.count_clap}} </span>
                                    </div>
                                </figure>
                            </div>
                            <div v-else>
                                <figure class="image coverImg is-4by2">
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
                                <p class="" style="font-size:12px;line-height:14px;height: 30px;overflow: hidden;">{{project.project_abstract}}</p>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
    <!-- All profiles -->
    <div v-if="loading"><img src="../../assets/Rolling-2s-200px.svg" class="center-div"></div>
    <div v-else>
        <div id="bodyBg" v-if="isProfileType == true">
            <div class="columns is-multiline">
                <div class="column is-half" v-for="(profile,index) in profiles" v-bind:key="index">
                    <router-link :to="`/student/${profile.student_id}`">
                        <div class="columns card profile">
                            <!-- <div class="columns card profile" @click="goToStudentProfile(profile.student_id)"> -->
                            <div v-if="profile.profile_picture != null" style="padding-right:20px">
                                <figure class="image" style="height: 160px;width: 120px">
                                    <img :src="profile.profile_picture" alt="Placeholder image" style="border-radius: 5px;">
                                </figure>
                            </div>
                            <div v-else style="padding-right:20px">
                                <figure class="image" style="height: 160px;width: 120px">
                                    <img src="./../../assets/noProfilePicture.png" style="border-radius: 5px;">
                                </figure>
                            </div>
                            <div class="card-content projectInfo" style="width:100%;">
                                <p class="profileName">{{profile.firstname}} {{profile.lastname}}</p>
                                <!-- <p id="info" style="height: 22px;overflow: hidden;">{{profile.student_id}}</p> -->
                                <p id="info">Bachelor of Science Programme in <b>{{profile.curriculum_name}}</b></p>
                                <div style="position:absolute;bottom:20px;" v-if="profile.email != null">
                                    <p id="info"><i class="la la-envelope" style="color:#265080;margin-right:5px"></i>{{profile.email}}</p>
                                </div>
                                <div style="position:absolute;bottom:20px;right:20px;">
                                    <img src="./../../assets/visibility-button.png" style="width:20px;display: inline;margin-right:5px">
                                    <p id="info" style="float:right;">{{profile.viewer}}</p>
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import router from '../../router/index'
import './../css/visitor.css';
import './../css/Loading.css';
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
            isProfileType: false,
            showYear: true,
            search: "",
            searchInput: true,
            haveTag: false,
            searchByTag: false,
            typeOfSearch: "",
            searchTagText: "",
            tagInputEmpty: true,
            allTags: []
        }
    },
    computed: {
        ...mapGetters({
            allProjectPresent: 'GET_ALL_PROJECT_VISITORVIEW',
            profiles: 'GET_ALL_PROFILE',
            years: 'GET_YEARS',
            path: 'GET_PATHNAME',
            loading: 'GET_LOADING'
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
    },
    watch: {
        searchTagText: function (val) {
            if (val == "") {
                this.hideDropdown()
            } else if (this.tagInputEmpty == false) {
                this.hideDropdown()
                this.tagInputEmpty = true
            } else {
                this.showDropdown()
            }
        },
        search: function (val) {

            if (val != "") {
                if (this.searchByTag) {
                    setTimeout(() => {
                        document.getElementById('search searchExpand').style.width = (this.search.length + 7) + '%'
                    }, 5)
                } else {
                    if (document.getElementById('search searchExpand') != null) {
                        document.getElementById('search searchExpand').style.width = (this.search.length + 7) + '%'
                    } else {
                        setTimeout(() => {
                            document.getElementById('search searchExpand').focus()
                        }, 5)
                    }
                }
                this.searchByTag = false
            } else {
                setTimeout(() => {
                    document.getElementById('search').focus()
                }, 10)
            }
        }
    },
    mounted() {
        console.log('loading', this.loading);
        this.LOAD_ALL_PROJECT_VISITORVIEW({
            type: "all",
            year: "present"
        })
        this.load_allTags()
        this.canClickYear('projects')
    },
    methods: {
        // goToStudentProfile(student_id) {
        //     console.log(student_id)
        //     try {
        //         this.SET_LOADING_STATUS(true)
        //         this.LOAD_OTHER_STUDENT_DATA({
        //             user_role: 'student',
        //             user_id: student_id,
        //         })
        //     } catch (err) {
        //         console.log('err', err)
        //     }
        //     this.$router.push('/student')
        // },
        ...mapActions(['LOAD_ALL_PROJECT_VISITORVIEW', 'LOAD_PROJECT_BY_SEARCH', 'LOAD_OTHER_STUDENT_DATA', 'SET_ALL_PROJECT_VISITORVIEW', 'SET_LOADING_STATUS']),
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

        blur(isDefault) {
            if (isDefault) {
                document.getElementById("search").blur();
            } else {
                document.getElementById("search searchExpand").blur();
            }
        },
        canClickYear(searchBy) {
            this.typeOfSearch = searchBy
            var type = ['projects', 'tags', 'stdProfile']
            for (var n = 0; n < type.length; n++) {
                document.getElementById(type[n]).className = "button is-light viewBtn"
            }
            document.getElementById(searchBy).className += " activeBtn"
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
            this.searchBy()
        },
        selectYear() {
            var selectYear = document.getElementById("selectYear") == null ? 'present' : document.getElementById('selectYear').value
            console.log("selectYear : " + selectYear)
            this.LOAD_ALL_PROJECT_VISITORVIEW({
                type: "all",
                year: selectYear
            })
        },
        searchBy() {
            var searchBy = this.typeOfSearch
            this.isProfileType = false
            if (searchBy == 'projects') {
                if (this.search != "") {
                    console.log('a')
                    // this.selectYear()
                    var pro = this.allProjectPresent.filter(
                        items =>
                        items.project_name_en.toLowerCase().includes(this.search.toLowerCase())
                    )
                    this.SET_ALL_PROJECT_VISITORVIEW(pro)
                } else {
                    this.selectYear()
                }
            } else if (searchBy == 'tags' && this.search != '') {
                var para = {
                    type: "search",
                    searchBy: "tags",
                    searchText: this.search
                }
                this.LOAD_ALL_PROJECT_VISITORVIEW(para)
            } else if (searchBy == 'stdProfile') {
                this.isProfileType = true
                var para;
                if (this.search != '') {
                    para = {
                        type: "profile",
                        searchText: this.search
                    }
                } else {
                    para = {
                        type: "profile",
                        searchText: "all"
                    }
                }
                this.LOAD_ALL_PROJECT_VISITORVIEW(para)
            }
        },
        filterByTag(tag_name, index) {
            this.searchByTag = true
            var para;

            setTimeout(() => {
                for (var n = 0; n < this.tags.length; n++) {
                    document.getElementById('tag' + n).className = "tag profileTag"
                }
                document.getElementById('allTag').className = "tag borderTag"
            }, 5)

            if (tag_name == 'All') {
                this.search = ''
                para = {
                    type: "all",
                    year: "all"
                }
                setTimeout(() => {
                    document.getElementById('allTag').className = "tag borderTag"
                }, 5)
            } else {
                this.search = tag_name
                para = {
                    type: "search",
                    searchBy: "tags",
                    searchText: tag_name
                }
                setTimeout(() => {
                    document.getElementById('allTag').className = "tag profileTag"
                    document.getElementById('tag' + index).className = "tag borderTag"
                }, 5)
            }
            this.LOAD_ALL_PROJECT_VISITORVIEW(para)
        },
        clearSearchInput() {
            this.search = ''
            if (this.haveTag) {
                setTimeout(() => {
                    document.getElementById("search").blur();
                }, 100)
                this.filterByTag('All')
            }
        }
    },
    beforeMount() {
        this.SET_LOADING_STATUS(true)
    }
}
</script>

<style>
.delSearch:hover {
    cursor: pointer;
}

.profile {
    margin-bottom: 10px !important;
    padding: 20px 20px 20px 20px !important;
    border-radius: 5px !important;
}

.profile:hover {
    cursor: pointer;
    box-shadow: 0px 0px 6px 0px rgba(130, 130, 130, 1);
}

.profileName {
    font-size: 18px !important;
    font-weight: 600 !important;
    color: #265080 !important;
}

.borderTag {
    border-radius: 9px !important;
    background-color: rgba(95, 174, 184, 0.164) !important;
    border: 0.5px #5FAEB8 solid !important;
    color: #265080 !important;
    font-weight: 700 !important;
}
</style>
