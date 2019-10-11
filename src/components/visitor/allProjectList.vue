<template>
<div id="list-project of student">
    <div id="bodyBg">

    </div>
    <div class="navProfile">
        <div id="bodyBg">
            <!-- {{allProjectPresent.projects}} -->

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
        </div>
        <div class="columns is-multiline">
            <div class="column is-one-quarter" v-for="(allProject,index) in allProjectPresent.projects" v-bind:key="index">
                <router-link :to="`/ProjectDetail/${allProject.id}`">
                    <div class="card">
                        <div class="card-image" v-if="allProject.cover_path != null">
                            <figure class="image is-4by2">
                                <img :src="allProject.cover_path" alt="Placeholder image" style="height: 156.22px; !important">
                            </figure>
                        </div>
                        <div class="card-image" v-else>
                            <figure class="image is-4by2">
                                <img src="./../../assets/noCoverImg.png">
                            </figure>
                        </div>
                        <div class="card-content projectInfo">
                            <div class="content">
                                <p class="projectName" style="height: 22px;overflow: hidden;">{{allProject.project_name_en}}</p>
                                <div class="columns">
                                    <div class="column" v-if="allProject.achievement">
                                        <p class="projectDetail" style="margin-top:8px;">
                                            <img src="./../../assets/trophy.png" width="25px">
                                        </p>
                                    </div>
                                    <div class="column">
                                        <p class="projectDetail" style="margin-top:8px;text-align:right">
                                            <img src="./../../assets/visibility-button.png" width="30px" style="margin-right:5px;"><span style="margin-right:5px">{{allProject.count_viewer}} </span>
                                            <img src="./../../assets/clap-hands.png" width="25px" style="margin-right:5px"><span style="margin-right:5px">{{allProject.count_clap}} </span>
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

<script>
// import './../../node_modules/bulma/css/bulma.css';
import './../css/studentProjectTab.css';
import {
    mapGetters,
    mapActions
} from 'vuex'
import axios from 'axios'

export default {
    data() {
        return {}
    },
    computed: {
        ...mapGetters({
            allProjectPresent: 'GET_ALL_PROJECT_VISITORVIEW'
        })
    },
    mounted() {
        this.LOAD_ALL_PROJECT_VISITORVIEW()
    },
    methods: {
        ...mapActions(['LOAD_ALL_PROJECT_VISITORVIEW']),

    }
}
</script>
