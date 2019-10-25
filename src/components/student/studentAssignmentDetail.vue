<template>
<div>
    <div id="bodyBg">
        <div class="columns">
            <router-link :to="`/assignment`"><span style="color:#4A4A4A">Assignment</span></router-link> /
            <span style="color:#265080">Details</span>
        </div>
        <!-- assignment topic -->
        <div class="columns">
            <div class="column topicAboutAssignment" style="padding-bottom:0">{{assignmentDetail.assignment_name}}</div>
        </div>
        <div class="courseNameInAssignDetail">{{assignmentDetail.course_name}}</div>
        <div class="columns">
            <div class="column">
                <span style="margin-right:20px">Create by : {{assignmentDetail.lecturers_name}}</span>
                <!-- {{created_at}} (Edited {{updated_at}}) -->
            </div>
            <div class="column countAll">
                Status : 
                <span v-if="assignmentDetail.status_name == 'Approve'" class="projectStatus approved">{{assignmentDetail.status_name}}</span>
                <span v-else-if="assignmentDetail.status_name == 'Waiting'" class="projectStatus request">{{assignmentDetail.status_name}}</span>
                <span v-else class="projectStatus denied">{{assignmentDetail.status_name}}</span>
            </div>
        </div>
        <div class="columns" style="margin-top:5%">
             <div class="column is-one-quarter" v-if="assignmentDetail.project_id == null">
                 <router-link to="/createPortPage">
                    <div class="createPortPage">
                        <div class="textCreate" style="font-size:30px !important">+</div>
                        <div class="textCreate" style="padding-top:10px">Add or Create Project</div>
                    </div>
                </router-link>
            </div>
            <div class="column is-one-quarter" v-else>
                <router-link :to="`/ProjectDetail/${assignmentDetail.project_id}`">
                    <div class="card projectCard content_img">
                        <div class="card-image" v-if="assignmentDetail.cover_path != null">
                            <figure class="image is-4by2">
                                <!-- <img src="./../../assets/gold-medal.png" width="17px" v-if="assignmentDetail.achievement" style="z-index:2;position:absolute;width:40px;"> -->
                                <img :src="assignmentDetail.cover_path" alt="Placeholder image" style="height: 156.22px !important;border-radius: 5px;">
                            </figure>
                        </div>
                        <div class="card-image" v-else>
                            <figure class="image is-4by2">
                                <img src="./../../assets/noCoverImg.png" style="height: 156.22px !important;border-radius: 5px;">
                            </figure>
                        </div>
                        <div class="card-content projectInfo">
                            <p class="projectName" style="height: 22px;overflow: hidden;">{{assignmentDetail.project_name_en}}</p>
                        </div>
                    </div>
                </router-link>
            </div>
            <div class="column">{{assignmentDetail.assignment_detail}}</div>
        </div>
    </div>
</div>
</template>

<script>
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
            assignmentDetail: {},
            created_at: "",
            updated_at: ""
        }
    },
    computed: {
        ...mapGetters({
            config: 'GET_CONFIG',
            URL: 'GET_PATHNAME'
        })
    },
    async mounted() {
        this.getAllAssignmentDetail()
    },
    methods: {
        ...mapActions(['', '']),
        async getAllAssignmentDetail() {
            await axios.get(
                    this.URL + `/assignment/detail/${this.$route.params.assignmentId}`, this.config
                ).then(res => {
                    console.log("res : ", res)
                    this.assignmentDetail = res.data
                })
                .catch(err => {
                    console.error("error : " + err);
                });
            this.created_at = this.assignmentDetail.created_at.substring(0, this.assignmentDetail.created_at.indexOf('T'))
            this.updated_at = this.assignmentDetail.updated_at.substring(0, this.assignmentDetail.updated_at.indexOf('T'))

        }
    }
}
</script>
