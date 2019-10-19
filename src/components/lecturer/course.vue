<template>
<div>
    <div id="bodyBg">
        <div class="columns">
            <div class="column">
                <div class="field has-addons">
                    <p class="control">
                        <input id="searchText" class="input" type="text" placeholder="Search Course ..." style="font-size: 16px !important;margin-top: 0px !important;border-bottom: 1px solid #DBDBDB !important;">
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
                                        <a href="#" class="dropdown-item" style="color:black !important">
                                            1/2019
                                        </a>
                                        <a href="#" class="dropdown-item" style="color:black !important">
                                            2/2018
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p class="control">
                        <a class="button" style="color: #265080 !important;">
                            <i class="la la-search"></i>
                        </a>
                    </p>
                </div>
            </div>

            <div class="column countAll">
                All course 1 - 3 out of 3 results
            </div>
        </div>
    <!-- All courses -->
        <div class="card-content cardSize colName">
            <div class="columns">
                <div class="column is-two-thirds">Course</div>
                <div class="column countAssign"># Assignment</div>
                <div class="column"></div>
            </div>
        </div>
        <!-- <router-link :to="`allassignment`"> -->
        <router-link to="/allassignment">
            <div class="card lecturerCard lecturerCourseCard">
                <div class="card-content cardSize">
                    <div class="columns">
                        <div class="column is-two-thirds courseName">1) INT202 Software Development Process</div>
                        <div class="column countAssign">1</div>
                        <div class="column"><span class="createAssignBtn">+ Create Assignment</span></div>
                    </div>
                </div>
            </div>
        </router-link>
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
    }
}
</script>
