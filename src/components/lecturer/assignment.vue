<template>
<div>
    <div id="bodyBg">
        <div class="columns">
            Course / Assignment
        </div>
        <!-- <search -->
        <div class="columns">
            <div class="column">
                <div class="field has-addons">
                    <p class="control">
                        <input id="searchText" class="input" type="text" placeholder="Search Assignment ..." style="font-size: 16px !important;margin-top: 0px !important;border-bottom: 1px solid #DBDBDB !important;">
                    </p>
                    <p class="control">
                        <a class="button" style="color: #265080 !important;">
                            <i class="la la-search"></i>
                        </a>
                    </p>
                </div>
            </div>
            <div class="column countAll">
                <button class="button createBtn">+ Create assignment ...</button>
            </div>
        </div>
        <!-- assignment topic -->
        <div class="columns">
            <div class="column topic">INT351 Human Computer Interaction</div>
            <div class="column countAll">All course 1 - 2 out of 2 results</div>
        </div>
        <!-- All assignment -->
        <div class="card-content cardSize colName">
            <div class="columns">
                <div class="column is-two-thirds">Assignment</div>
                <div class="column countAssign">Code Join</div>
                <div class="column countAssign"># Members</div>
                <div class="column countAssign"># Projects</div>
                <div class="column countAssign"># Approved</div>
            </div>
        </div>
        <router-link :to="`/assignmentDetail`">
            <div class="card lecturerCard lecturerCourseCard">
                <div class="card-content cardSize">
                    <div class="columns">
                        <div class="column is-two-thirds courseName">1) Design Web Application</div>
                        <div class="column countAssign">78D1CA</div>
                        <div class="column countAssign">120</div>
                        <div class="column countAssign">2</div>
                        <div class="column countAssign">1</div>
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
