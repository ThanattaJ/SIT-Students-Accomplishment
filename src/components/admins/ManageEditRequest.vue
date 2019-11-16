<template>
<div v-if="loading"><img src="../../assets/Rolling-2s-200px.svg" class="center-div"></div>
<div v-else>
    <div id="bodyBg">
        <div class="card-content cardSize colName">
            <div class="columns">
                <div class="column is-two-thirds">Project</div>
                <div class="column countAssign">Status</div>
            </div>
        </div>
        <div class="card lecturerCard lecturerCourseCard" v-for="(project,index) in request" v-bind:key="index">
            <router-link :to="`/ProjectDetail/${project.project_id}`">
                <div class="card-content cardSize">
                    <div class="columns">
                        <div class="column is-two-thirds courseName">{{index+1}}) {{project.project_name_en}}</div>
                        <div class="column countAssign"><span class="projectStatus request">Request Edit Project</span></div>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import './../css/Loading.css';
import {
    mapGetters,
    mapActions
} from 'vuex';
export default {
    computed: {
        ...mapGetters([
            'GET_CONFIG',
            'GET_ALL_PROJECT_VISITORVIEW',
            'get_approver',
            'GET_PATHNAME'
        ])
    },
    data() {
        return {
            projectName: [{
                name: "John Smith"
            }],
            request: [],
            loading: true
        }
    },
    async mounted() {
        this.set_approver(true)
        const {
            data
        } =
        await axios.get(
            this.GET_PATHNAME+'/assignment/requests?status=Request',
            this.GET_CONFIG);
        this.request = data
        console.log("data : ", this.request)
        // console.log('all project ',this.GET_ALL_PROJECT_VISITORVIEW)
        this.loading = false

    },
    methods: {
        ...mapActions([
            'set_approver'
        ]),
    },
}
</script>

<style>
#ManageEditRequest {
    width: 80%;
    margin-top: 5%;
    margin-left: 10%;
}

#cardMenu {
    width: 32%;
    height: 10%;
}
</style>
