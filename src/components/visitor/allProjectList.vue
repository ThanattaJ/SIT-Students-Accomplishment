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
    <div id="bodyBg">
        <div class="field has-addons">
            <p class="control">
                <input id="searchText" class="input" type="text" placeholder="Looking for?" style="font-size: 16px !important;margin-top: 0px !important;border-bottom: 1px solid #DBDBDB !important;">
            </p>
            <div class="control">
                <div class="dropdown is-hoverable">
                    <div class="dropdown-trigger">
                        <button class="button filter" aria-haspopup="true" aria-controls="dropdown-menu4">
                            <span><img src="./../../assets/filter-results-button.png" width="17px"></span>
                        </button>
                    </div>
                    <div class="dropdown-menu" id="dropdown-menu4" role="menu">
                        <div class="dropdown-content">
                            <div class="dropdown-item">
                                <p class="menu-label">
                                    All prejects
                                </p>
                                <a href="#" class="dropdown-item" style="color:black !important">
                                    <input type="checkbox">have achievement
                                </a>
                                <a href="#" class="dropdown-item" style="color:black !important">
                                    <input type="checkbox">have assignment
                                </a>
                                <p class="menu-label">
                                    Year
                                </p>
                                <div class="dropdown-item select">
                                    <select id="proficiency_name" class="selectInGenResume" required>
                                        <option selected>Present</option>
                                        <option>2018</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p class="control" @click="search">
                <a class="button" style="color: #265080 !important;">
                    <i class="la la-search"></i>
                </a>
            </p>
        </div>
    </div>
    <!-- All projects -->
    <div id="bodyBg">
        <div class="columns is-multiline">
            <div class="column is-one-quarter" v-for="(allProject,index) in allProjectPresent.projects" v-bind:key="index">
                <router-link :to="`/ProjectDetail/${allProject.id}`">
                    <div class="card projectCard content_img">
                        <div class="card-image" v-if="allProject.cover_path != null">
                            <figure class="image is-4by2">
                                <img src="./../../assets/gold-medal.png" width="17px" v-if="allProject.achievement" style="z-index:2;position:absolute;width:40px;">
                                <img :src="allProject.cover_path" alt="Placeholder image" style="height: 156.22px !important;border-radius: 5px;">
                                <div class="img-text">
                                    <img src="./../../assets/visibility-button.png" style="width:15px;display: inline;">
                                    <span class="countText">{{allProject.count_viewer}} </span>
                                    <img src="./../../assets/clap-hands.png" style="width:15px;display: inline;">
                                    <span class="countText">{{allProject.count_clap}} </span>
                                </div>
                            </figure>
                        </div>
                        <div class="card-image" v-else>
                            <figure class="image is-4by2">
                                <img src="./../../assets/noCoverImg.png" style="height: 156.22px !important;border-radius: 5px;">
                                <div class="img-text">
                                    <img src="./../../assets/visibility-button.png" style="width:15px;display: inline;">
                                    <span class="countText">{{allProject.count_viewer}} </span>
                                    <img src="./../../assets/clap-hands.png" style="width:15px;display: inline;">
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
        </div>
    </div>
</div>
</template>

<script>
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
            hoverCardOrNot: false
        }
    },
    computed: {
        ...mapGetters({
            allProjectPresent: 'GET_ALL_PROJECT_VISITORVIEW'
        })
    },
    mounted() {
        this.LOAD_ALL_PROJECT_VISITORVIEW({
            type: "all",
            year: "present"
        })
    },
    methods: {
        ...mapActions(['LOAD_ALL_PROJECT_VISITORVIEW', 'LOAD_PROJECT_BY_SEARCH']),
        search() {
            var typeOfSearch = document.getElementById('typeOfSearch').value
            var searchText = document.getElementById('searchText').value
            var searchBy = document.getElementById('searchBy').value
            var year = document.getElementById('year').value

            console.log("typeOfSearch : " + document.getElementById('typeOfSearch').value)
            console.log("searchText : " + document.getElementById('searchText').value)
            console.log("searchBy : " + document.getElementById('searchBy').value)
            console.log("year : " + document.getElementById('year').value)

            if (searchText == "") {
                this.LOAD_ALL_PROJECT_VISITORVIEW({
                    type: typeOfSearch,
                    year: year
                })
            } else {
                this.LOAD_PROJECT_BY_SEARCH({
                    searchText: searchText,
                    searchBy: searchBy
                })
            }
        }
    }
}
</script>
