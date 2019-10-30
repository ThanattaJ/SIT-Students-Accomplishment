<template>
<div class="body" id="ProjectDetail-bg">
    <div class="vld-parent">
        <loading :active="isLoading" :can-cancel="true" :on-cancel="onCancel" :is-full-page="fullPage" :width="200" :height="200" ></loading>
    </div>
    <div id="TitleName">
        <p id="TitleName_eg">{{header.TitleName}}</p>
        <p id="TitleName_th">{{header.TitleName_TH}}</p>
    </div>
    <div class="section" id="imgCover">
        <div v-if="this.getFile">
            <img :src="this.getFile" id="coverI">
        </div>
        <div v-else>
            <img :src=" this.noPic.cover">
        </div>
    </div>
    <div id="EditProjects">
        <uploadCover v-if="EditProject" id="uploadCover" />
        <div>
            <div id="term" v-if="this.haveAssignment">
                <div style="margin-left:80%; color: #949494 ; font-size: 12px;">Academic Term: {{this.academic_term}}</div>
            </div>
            <div id="create">
                <div style="margin-left:80%; color: #949494 ; font-size: 12px;">Created at: {{this.create}}</div>
            </div>
            <div id="end">
                <div style="margin-left:80%; color: #949494; font-size: 12px;">Updated at: {{this.update}}</div>
            </div>
        </div>
        <div class="column" style="padding: 8px 8px;">
            <div class="tags">
                <span class="tag profileTag" v-for="(tag,index) in getTag" v-bind:key="index">
                    <span style="padding-left:5px">{{tag.tag_name}} </span>
                </span>
            </div>
            <div id="tag" v-if="EditProject">
                <tag />
            </div>
        </div>
        <div class="columns">
            <div class="column is-four-fifths">
                <div v-if="this.project_status != 'Approve'">
                    <div v-if="this.access == true">
                        <span class="button" id="Edit" @click="Edit" v-if="!EditProject">Edit Project</span>
                        <span class="button is-success" id="save" @click="save" v-else-if="EditProject">Save Change</span>
                        <span class="button" id="cancel" @click="cancel" v-if="EditProject">Cancel</span>
                    </div>
                </div>
                <div v-if="GET_ISAPPROVER == true">
                    <approveAssignmentProject></approveAssignmentProject>
                </div>
                <div v-if="get_approver == true">
                    <adminApprover />
                </div>
                <div>
                    <md-switch v-model="show" v-if="EditProject">{{show}}</md-switch>
                </div>
            </div>
            <div v-if="this.clap">
                <md-button class="md-icon-button md-accent" style="margin-top:12px" @click="clapProject">
                    <img class="image" src="../.././assets/clap.png">
                </md-button>
            </div>
            <div v-else>
                <md-button class="md-icon-button" disabled style="margin-top:12px">
                    <img class="image" src="../.././assets/clap.png">
                </md-button>
            </div>
            <div style="margin-top:24px">:{{this.getClap}}</div>

            <img class="image is-32x32" src="../.././assets/visibility-button.png" style=" margin-left: 30px;
            margin-top:20px">
            <div style="margin-top:25px ; margin-left:5px">: {{this.viewer}}</div>
        </div>
    </div>
    <Abstract />
    <div id="body-project">
        <div class="columns">
            <div class="column is-6">
                <div id="Details">
                    <Detail />
                </div>
                <div id="achievement">
                    <achievements />
                </div>
                <div id="image">
                    <div id="container">
                        <div v-if="this.pictures[0]">
                            <showImg />
                        </div>
                        <div v-else>
                            <!-- no more pic -->
                        </div>
                        <div class="container" id="edit" v-if="EditProject">
                            <editImg />
                        </div>
                    </div>
                </div>
                <div id="Details" v-if="video_pathname != null && EditProject == false">
                    <div class="resp-container">
                        <iframe width="560" height="315" :src="'//www.youtube.com/embed/' + GET_VDO_PATHNAME " frameborder="0" allowfullscreen></iframe>
                    </div>
                </div>
                <div class="card lecturerCard" id="Documents" v-else-if="EditProject">
                    <header class="card-header">
                        <p class="card-header-title" id="cardHeader">Videp</p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            <Video />
                        </div>
                    </div>
                </div>
            </div>
            <div class="column">
                <div id="Authors">
                    <member />
                </div>
                <div id="lecturer" v-if="this.haveAssignment">
                    <div class="card lecturerCard" id="Documents">
                        <header class="card-header">
                            <p class="card-header-title" id="cardHeader">Lecturer</p>
                        </header>
                        <div class="card-content">
                            <div class="content" style="color: #265080 !important " v-for='(lecturer,index) in lecturer' v-bind:key="index">
                                {{lecturer.lecturers_name}}
                            </div>
                        </div>
                    </div>
                </div>
                <div id="tool">
                    <tool />
                </div>
                <div class="card lecturerCard" id="Documents" v-if="files.length > 0 && EditProject == false">
                    <header class="card-header">
                        <p class="card-header-title" id="cardHeader">Documents</p>
                    </header>
                    <div class="card-content">
                        <div class="content" style="color: #265080 !important " v-for="(doc,index) in files" v-bind:key="index">
                            <a :href="doc.document_path"><span style="color:#265080">{{doc.document_name}}</span></a>

                        </div>
                    </div>
                </div>
                <div class="card lecturerCard" id="Documents" v-else-if="EditProject">
                    <header class="card-header">
                        <p class="card-header-title" id="cardHeader">Documents</p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            <uploadFilePond />
                        </div>
                    </div>
                </div>
                <ref />
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import {
    mapGetters,
    mapActions,
    mapMutations
} from 'vuex'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Abstract from './Abstract';
import Detail from './Detail';
import achievements from './achievements';
import member from './member';
import tool from './tool';
import ref from './ref';
import tag from './tag';
import uploadFilePond from "./uploadFilePond";
import uploadimg from "./uploadimg";
import uploadCover from "./uploadCover";
import editImg from "./editImg"
import Document from "./../NewPortfolioPage/Document.vue";
import Video from "./Video.vue";
import "./../css/ProjectDetail.css";
import showImg from "./showImg"
import approveAssignmentProject from "./../lecturer/approveAssignmentProject"
import adminApprover from "./../admins/adminApprover"
export default {

    namePro: "ProjectDetail",

    computed: {
        ...mapGetters([
            'GET_PATHNAME',
            'GET_VDO_PATHNAME',
            'getFile',
            'getPath',
            'getImages',
            'GET_CONFIG',
            'getAbstract',
            'getAchievements',
            'getMember',
            'getNonMember',
            'getEditProject',
            'getTool',
            'GET_ACHIEVEMENT',
            'getDetail',
            'getRef',
            'getTag',
            'GET_STUDENT_TAG',
            'GET_STUDENT_PROJECT',
            'getPic',
            'getNonMember',
            'getClap',
            'GET_PATHNAME',
            //admin
            'get_approver',

            //login
            'GET_USERNAME',

            //lecturer
            'GET_ISAPPROVER'
        ]),
    },
    components: {
        uploadimg,
        uploadCover,
        Document,
        Video,
        uploadFilePond,
        Abstract,
        Detail,
        achievements,
        member,
        tool,
        ref,
        showImg,
        editImg,
        tag,
        approveAssignmentProject,
        adminApprover,
        Loading
    },

    data() {
        return {
            header: {
                TitleName: "",
                TitleName_TH: ""
            },
            Abstract: {
                content_Abstract: ""
            },
            Detail: {
                content_eg: " "
            },
            Authours: [{
                Student_id: "",
                firstname: "",
                lastname: "",
                mail: ""
            }],
            Tools: {},
            Acheivement: [],
            References: " ",
            // document: [],
            files: [],
            outsider: [],
            showDetail: true,
            EditProject: false,
            tags: [],
            video_pathname: '',
            img: [],
            cover: {
                path: null
            },
            project_id: 1,
            pictures: [],
            tag: [{
                name: "Hello"
            }],
            seen: true,
            index: '',
            Tags: [
                'Vue.js'
            ],
            clap: '',
            viewer: '',
            create: '',
            update: '',
            noPic: {
                'cover': require('../.././assets/noCoverImg.png')
            },
            show: true,
            access: true,
            haveAssignment: false,
            academic_term: '',
            lecturer: [],
            isClap: true,
            project_status: '',
            isLoading: false,
            fullPage: true
        }
    },

    async mounted() {
        
        var sizeArea = document.getElementsByTagName("textarea");
        for (var i = 0; i < sizeArea.length; i++) {
            sizeArea[i].setAttribute(
                "style",
                "height:" + sizeArea[i].scrollHeight + "px;overflow-y:hidden;"
            );
            sizeArea[i].addEventListener("input", OnInput, false);
        }

        function OnInput() {
            this.style.height = "auto";
            this.style.height = this.scrollHeight + "px";
        }

        // get data
        const {
            data
        } = await axios.get(
            this.GET_PATHNAME + `/projects/?project_id=${this.$route.params.pId}`,
            this.GET_CONFIG)
        // "http://localhost:7000/projects/" + this.$route.params.pId
        console.log('data : ', data)
        if (data.project_detail.assignment_detail.assignment_id != null) {
            console.log("have assignment")
            // this.header.TitleName = data.project_detail.assignment_detail.assignment_name,
            this.academic_term = data.project_detail.assignment_detail.academic_term
            // this.header.TitleName_TH = data.project_detail.assignment_detail.course_name
            this.setPID(data.project_detail.assignment_detail.assignment_id)
            this.project_status = data.project_detail.assignment_detail.project_status
            console.log('status : ', this.project_status)
            for (var i = 0; i < data.project_detail.assignment_detail.lecturers.length; i++) {
                this.lecturer.push(data.project_detail.assignment_detail.lecturers[i])
            }
            this.haveAssignment = true

        } else {

            this.setPID(data.project_detail.id)
            this.haveAssignment = false
        }
        console.log("  this.header.TitleName : ", data.project_detail.assignment_detail.assignment_name)
        this.header.TitleName = data.project_detail.project_name_en;
        this.header.TitleName_TH = data.project_detail.project_name_th;
        this.viewer = data.project_detail.count_viewer
        this.create = data.project_detail.created_at
        this.update = data.project_detail.updated_at
        this.setAbstract(data.project_detail.project_abstract)
        this.setDetail(data.project_detail.project_detail)
        this.SET_ACHIEVEMENT_STATE(data.achievements)
        this.setMember(data.students)
        this.setNonMember(data.outsiders)
        this.setRef(data.project_detail.references)
        this.setTool(data.project_detail.tool_techniq_detail)
        this.setTag(data.tags)
        this.setClap(data.project_detail.count_clap)
        // this.addTag(data.tags)
        this.show = data.project_detail.isShow
        this.access = data.access

        // console.log("-----------")
        console.log("acess : ", this.access)

        this.Abstract.content_Abstract = data.project_detail.project_abstract
        this.Detail.content_eg = data.project_detail.project_detail
        this.Tools = data.project_detail.tool_techniq_detail
        this.References = data.project_detail.references

        // document
        this.loadDocumentToShow()

        //video
        this.video_pathname = data.video.path_name

        //tag
        for (let i = 0; i < data.tags.length; i++) {
            this.tags.push(data.tags[i])
            this.tags[i].name = data.tags[i]
        }
        this.tags.length = data.tags.length
        for (let i = 0; i < data.picture.length; i++) {
            this.img[i] = data.picture[i].path_name;
            var path = this.img[i];
            var name = path
                .substring(path.lastIndexOf("_", path.length - 1))
                .substring(1);
            var newPath = path.replace();
            if (name === "cover") {
                this.cover.path = data.picture[i].path_name
                this.setFile(data.picture[i].path_name);
            } else if (name != "cover") {
                this.pictures.push({
                    path: newPath
                });
                this.addImage({
                    path: newPath
                })
            }
        }
        // ------------- clap -------------
        console.log('GET_USERNAME : ', this.GET_USERNAME)
        console.log('Member :', this.getMember)
        for (let i = 0; i < this.getMember.length; i++) {
            if (this.getMember[i].student_id === this.GET_USERNAME) {
                this.clap = false
            } else {
                this.clap = true
            }
        }
    },
    methods: {
        async loadDocumentToShow(document) {
            const {
                data
            } = await axios.get(this.GET_PATHNAME + `/projects/?project_id=${this.$route.params.pId}`)

            const doc = data.document.map((_item, index = 0) => _item.path_name);
            this.files = []
            for (let i = 0; i < doc.length; i++) {
                var docName = doc[i].substring(doc[i].lastIndexOf("/", doc[i].length - 1)).substring(1)
                this.files.push({
                    document_name: docName.substring(docName.lastIndexOf("_")).substring(1),
                    document_path: doc[i]
                })
            }
        },
        ...mapActions([
            'setFile',
            'setPath',
            'addImage',
            'setPID',
            'setAbstract',
            'setEditProject',
            'setDetail',
            'setAchievements',
            'setMember',
            'setNonMember',
            'setTool',
            'setRef',
            'setTag',
            'addPushImage',
            'setImage',
            'SET_ACHIEVEMENT_STATE',
            'addTag',
            'setClap',

        ]),
        save() {
            // this.EditProject = false;
            this.setEditProject(this.EditProject)
            var vdo_pathname = this.GET_VDO_PATHNAME
            var data = {
                project_detail: {
                    id: this.$route.params.pId,
                    project_name_th: this.header.TitleName_TH,
                    project_name_en: this.header.TitleName,
                    project_detail: this.getDetail === " " ? null : this.getDetail,
                    project_abstract: this.getAbstract,
                    haveOutsider: true,
                    isShow: this.show,
                    tool_techniq_detail: this.getTool === " " ? null : this.getTool,
                    references: this.getRef === " " ? null : this.getRef,
                    // count_viewer: 0,
                    // count_clap: this.clap,
                    start_month: 2,
                    start_year_th: 2562,
                    start_year_en: 2019,
                    "end_month": 5,
                    "end_year_th": 2562,
                    "end_year_en": 2019,
                    project_type_name: "External"
                },
                students: this.getMember,
                achievements: this.GET_ACHIEVEMENT,
                tags: [],
                //update tags  
                // document: [],
                picture: [],
                video: {
                    path_name: vdo_pathname
                },
                outsiders: this.getNonMember
            }
            try {
                axios
                    .patch(this.GET_PATHNAME + `/projects/`, {
                        project_detail: {
                            id: this.$route.params.pId,
                            project_name_th: this.header.TitleName_TH,
                            project_name_en: this.header.TitleName,
                            project_detail: this.getDetail === " " ? null : this.getDetail,
                            project_abstract: this.getAbstract,
                            haveOutsider: true,
                            isShow: this.show,
                            tool_techniq_detail: this.getTool === " " ? null : this.getTool,
                            references: this.getRef === " " ? null : this.getRef,
                            // count_viewer: 0,
                            // count_clap: this.clap,
                            start_month: 2,
                            start_year_th: 2562,
                            start_year_en: 2019,
                            "end_month": 5,
                            "end_year_th": 2562,
                            "end_year_en": 2019,
                            project_type_name: "External"
                        },
                        students: this.getMember,
                        achievements: this.GET_ACHIEVEMENT,
                        tags: this.getTag,
                        //update tags  
                        // document: [],
                        picture: [],
                        video: {
                            path_name: vdo_pathname
                        },
                        outsiders: this.getNonMember
                    }, this.GET_CONFIG)
                    .then(res => {
                        console.log("res : ", res)
                        if (res.status == 200) {
                            this.EditProject = false;
                            alert('File has been update')
                            console.log(' Tags : ', this.getTag)
                        }
                    })

                this.message = "File has been update";
                this.getEditProject
                this.video_pathname = vdo_pathname
            } catch (err) {
                console.log("FAILURE!!" + err);
                this.error = true;
                this.EditProject = false;
            }
        },
        cancel() {
            this.EditProject = false;
            this.setEditProject(this.EditProject)
            this.setAbstract(this.Abstract.content_Abstract)
            this.setDetail(this.Detail.content_eg)
            this.setTool(this.Tools)
            this.setRef(this.References)
        },

        Edit: function () {
            this.EditProject = true
            this.setEditProject(this.EditProject)
            // console.log("2",this.getEditProject)
        },
        clapProject() {
            try {
                axios.patch(this.GET_PATHNAME + `/projects/claping`, {
                    project_id: this.$route.params.pId
                }).then(function (res) {
                    console.log(res);
                });
                var clap = this.getClap + 1
                this.setClap(clap)
                console.log('can clap', clap)
            } catch (err) {
                console.log('can not clap')
            }
        },
        doAjax() {
            this.isLoading = true;
            // simulate AJAX
            setTimeout(() => {
                this.isLoading = false
            }, 5000)
        },
        onCancel() {
            console.log('User cancelled the loader.')
        }
    },
    beforeDestroy() {
        this.setImage([])
        this.setFile(this.noPic.cover)
        this.setMember('')
        this.setNonMember('')
    },
    created() {
        this.isLoading = true;
        setTimeout(() => {
            this.isLoading = false
        }, 4000)
    }
};
</script>

<style>
#coverI {
    max-width: 1000px;
    max-height: 600px;
}

.md-button.md-theme-default.md-accent {
    color: #265080;
}
</style>
