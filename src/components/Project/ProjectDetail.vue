<template>
<div v-if="loading"><img src="../../assets/Rolling-2s-200px.svg" class="center-div"></div>
<div v-else>
    <div class="body" id="bodyBg">
        <div id="TitleName">
            <p id="TitleName_eg">{{header.TitleName}}</p>
            <p id="TitleName_th">{{header.TitleName_TH}}</p>
        </div>
        <hr style="margin-top:20px!important;;">
        <div class="section" id="imgCover">
            <div v-if="this.getFile">
                <img :src="this.getFile" id="coverI">
            </div>
            <div v-else>
                <img :src=" this.noPic.cover">
            </div>
        </div>
        <div id="EditProjects">
            <div class="columns">
                <div class="column is-three-quarters" style="padding: 8px 8px;">
                    <div class="tags">
                        <span class="tag profileTag" v-for="(tag,index) in getTag" v-bind:key="index">
                            <span style="padding-left:5px">{{tag.tag_name}} </span>
                        </span>
                    </div>
                    <div id="tag" v-if="EditProject">
                        <tag />
                    </div>
                </div>
                <div class="column is-3 is-offset-1">
                    <uploadCover v-if="EditProject" id="uploadCover" />
                </div>
            </div>
            <div class="columns">
                <div id="create" class="column is-three-fifths" style="margin-top:30px;margin-left:1%">
                    <div style=" color: #949494 ; font-size: 12px;">Created Project: {{this.create}}</div>
                    <div id="term" v-if="this.haveAssignment">
                        <div style="color: #949494 ; font-size: 12px;">Academic Term: {{this.academic_term}}</div>
                    </div>

                    <div id="end">
                        <div style=" color: #949494; font-size: 12px;">Updated at: {{this.update}}</div>
                    </div>
                    <!-- this.project_status : {{this.project_status}} -->
                    <div id="project_status">
                        <div v-if="this.access">
                            <div v-if="this.project_status === 'Request'">
                                <p>Project Status : <span class="projectStatus request">Request admin to edit project</span></p>
                            </div>
                            <div v-if="this.project_status === 'Waiting'">
                                <p>Project Status : <span class="projectStatus request">Waiting for approve project</span></p>
                            </div>
                            <div v-if="!this.statusRequest">
                                <div v-if="this.project_status === 'Approve'">
                                    <p>Project Status : <span class="projectStatus approved">Approved</span></p>
                                </div>
                            </div>
                            <div v-else>
                                <p>Project Status : <span class="projectStatus request">Request admin to edit project</span></p>
                            </div>
                            <div v-if="this.project_status === 'Reject'">
                                <p>Project Status : <span class="projectStatus denied">Reject</span></p>
                            </div>
                        </div>
                        <div v-if="GET_ISAPPROVER == true">
                            <approveAssignmentProject></approveAssignmentProject>
                        </div>
                        <!-- admin : {{get_approver}} <br>
                        project_status : {{project_status}} -->
                        <div v-if="get_approver == true">
                            <adminApprover v-if="project_status == 'Request'" />
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="column">
                        <div class="columns">
                            <div class="column is-two-fifths" style="margin-left: 40%;margin-top:-2%">
                                <div v-if="this.access">
                                    <div v-if="this.EditProject">
                                        <md-switch v-model="show">
                                            <p v-if="this.show == true" style="margin-left:-180px">
                                                {{this.status}}
                                                <h id="status">: Publish</h>
                                            </p>
                                            <p v-else style="margin-left:-180px">
                                                {{this.status}}
                                                <h id="status">: Private</h>
                                            </p>
                                        </md-switch>
                                    </div>
                                    <div v-else>
                                        <p v-if="this.get_show == true" style="margin-left:-100px;margin-top:15px">
                                            {{this.status}}
                                            <h id="status">: Publish</h>
                                        </p>
                                        <p v-else style="margin-left:-100px;margin-top:15px">
                                            {{this.status}}
                                            <h id="status">: Private</h>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div v-if="this.access == false" class="column is-2" style="margin-left:-25%">
                                <div @click="clapProject()" id="claps" style="margin-top:-38%">
                                    <vue-clap-button icon="good" maxClick="50" colorActive="#265080" id="claps" />
                                </div>
                            </div>
                            <div v-else class="column is-2 " style="margin-left:-28%">
                                <md-button class="md-icon-button" disabled>
                                    <img class="image" src="../.././assets/clap-hands.png" style="margin-top:-8px">
                                </md-button>
                            </div>
                            <div class="column is-1" style="margin-top:2%;margin-left: -4%;">{{this.getClap}}</div>

                            <div class="column  is-2">
                                <img class="image is-32x32" src="../.././assets/visibility-button.png"></div>
                            <div class="column  is-1 " style="margin-top:2%;margin-left: -5%;">{{this.viewer}}</div>
                        </div>
                    </div>
                    <div class="columns">
                        <div id="ed" class="column">
                            <div v-if="this.project_status === 'Waiting' ||this.project_status === 'Reject'">
                                <div v-if="this.access == true">
                                    <button class="button" id="Edit" @click="Edit" v-if="!EditProject">Edit Portfolio Page</button>
                                    <button class="button is-success" id="save" @click="save" v-else-if="EditProject">Save Change</button>
                                    <button class="button" id="cancel" @click="cancel" v-if="EditProject">Cancel</button>
                                </div>
                            </div>
                            <div v-if="this.project_status === 'Approve'">
                                <div v-if="this.access == true">
                                    <div v-if="!this.statusRequest">
                                        <button class="button" @click="sendRequest()" id="request">Request admin to edit project</button>
                                    </div>
                                    <div v-else>
                                    </div>
                                </div>
                            </div>
                            <div v-if="this.project_status === 'Request'">
                            </div>
                            <div v-if="!this.project_status">
                                <div v-if="this.access == true">
                                    <button class="button" id="Edit" @click="Edit" v-if="!EditProject">Edit Portfolio Page</button>
                                    <button class="button is-success" id="save" @click="save" v-else-if="EditProject">Save Change</button>
                                    <button class="button" id="cancel" @click="cancel" v-if="EditProject">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

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
                        <div>
                            <div v-if="this.pictures[0]">
                                <carousel />
                            </div>
                            <div v-else>
                                <!-- no more pic -->
                            </div>
                            <div class="container" id="edit" v-if="EditProject">
                                <editImg />
                            </div>
                        </div>
                    </div>
                    <div id="Details" v-if="GET_VDO_PATHNAME != '' && EditProject == false" style="margin-bottom:100px">
                        <div class="resp-container">
                            <iframe style="height:371.25px !important;width:100%" :src="'//www.youtube.com/embed/' + GET_VDO_PATHNAME " frameborder="0" allowfullscreen></iframe>
                        </div>
                    </div>
                    <div class="card lecturerCard" id="Documents" v-else-if="EditProject">
                        <header class="card-header">
                            <p class="card-header-title" id="cardHeader">Video</p>
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
                        <!-- nonMembers : {{this.nonMembers}}<br>
                        getNonMember: {{this.getNonMember}} -->
                    </div>
                    <div id="lecturer" v-if="this.haveAssignment">
                        <div class="card lecturerCard" id="Documents">
                            <header class="card-header">
                                <p class="card-header-title" id="cardHeader">Lecturer</p>
                            </header>
                            <div class="card-content" style="margin-top: 20px">
                                <div class="content" style="color: #265080 !important " v-for='(lecturer,index) in lecturer' v-bind:key="index">
                                    <div class="columns">
                                        <div class="column is-one-quarter" style="margin-top:-20px">{{lecturer.fname}}</div>
                                        <div class="column" style="margin-top:-20px;margin-left:-40px">{{lecturer.lname}}</div>
                                    </div>
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
import './../css/Loading.css';
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
import approveAssignmentProject from "./../lecturer/approveAssignmentProject"
import adminApprover from "./../admins/adminApprover"
import vueClapButton from './vue-clap-button'
import 'vue-material/dist/theme/default.css'
import carousel from './carousel'
Vue.use(vueClapButton);
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
            'getClap',
            'getPID',
            'get_assignment_id',
            'get_show',
            //admin
            'get_approver',

            //login
            'GET_USERNAME',

            //lecturer
            'GET_ISAPPROVER',
            'GET_LOADING'
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
        editImg,
        tag,
        approveAssignmentProject,
        adminApprover,
        Loading,
        carousel,
    },

    data() {
        return {
            header: {
                TitleName: null,
                TitleName_TH: null
            },
            Abstract: {
                content_Abstract: null
            },
            Detail: {
                content_eg: null
            },
            Authours: [{
                Student_id: null,
                firstname: null,
                lastname: null,
                mail: null
            }],
            nonMembers: [],
            type: null,
            Tools: {},
            Acheivement: [],
            References: null,
            files: [],
            start_year_th: 0,
            start_year_en: 0,
            end_year_th: 0,
            end_year_en: 0,
            EditProject: 0,
            tags: [],
            video_pathname: '',
            img: [],
            cover: {
                path: null
            },
            pictures: [],
            clap: null,
            viewer: null,
            create: null,
            update: null,
            noPic: {
                'cover': require('../.././assets/cover_nopic.png')
            },
            show: true,
            access: true,
            haveOutsider: false,
            haveAssignment: false,
            assignment_id: null,
            academic_term: null,
            lecturer: [],
            isClap: true,
            project_status: null,
            isLoading: false,
            status: 'Status',
            statusRequest: false,
            loading: true
        }
    },

    async mounted() {
        console.log('------Project Detail !!-------')

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
        console.log(data, "data");

        if (data.project_detail.assignment_detail.assignment_id != null) {
            this.academic_term = data.project_detail.assignment_detail.academic_term
            this.assignment_id = data.project_detail.assignment_detail.assignment_id
            this.set_assignment_id(data.project_detail.assignment_detail.assignment_id)
            this.project_status = data.project_detail.assignment_detail.project_status
            console.log('status Project : ', this.project_status);

            for (var i = 0; i < data.project_detail.assignment_detail.lecturers.length; i++) {
                var name = data.project_detail.assignment_detail.lecturers[i].lecturers_name;
                name = name.split(" ")
                this.lecturer.push({
                    fname: name[0],
                    lname: name[1]
                })
            }
            this.haveAssignment = true
        } else {
            this.haveAssignment = false
        }
        this.setPID(data.project_detail.id)
        this.header.TitleName = data.project_detail.project_name_en;
        this.header.TitleName_TH = data.project_detail.project_name_th;
        this.type = data.project_detail.project_type_name;
        this.start_year_th = data.project_detail.start_year_th,
        this.start_year_en = data.project_detail.start_year_en
        this.end_year_th = data.project_detail.end_year_th,
        this.end_year_en = data.project_detail.end_year_en,
        this.haveOutsider = data.project_detail.haveOutsider
        this.viewer = data.project_detail.count_viewer
        this.create = data.project_detail.created_at
        this.update = data.project_detail.updated_at
        this.setAbstract(data.project_detail.project_abstract)
        this.setDetail(data.project_detail.project_detail)
        this.SET_ACHIEVEMENT_STATE(data.achievements)
        this.setMember(data.students)
        // nonMember
        if (data.outsiders) {
            if (data.outsiders.length != 0) {
                this.setNonMember(data.outsiders)
            }
        }
        console.log(data.project_detail,'ref');
        if (data.project_detail.references != null) {
            if (data.project_detail.references.length) {
                this.setRef(data.project_detail.references[0])
            }
        } else {
            this.setRef('')
        }
        // this.setRef(data.project_detail.references[0])
        this.setTool(data.project_detail.tool_techniq_detail)
        this.setTag(data.tags)
        this.setClap(data.project_detail.count_clap)
        this.show = data.project_detail.isShow
        this.set_show(data.project_detail.isShow)
        this.access = data.access

        // console.log("-----------")
        console.log("acess : ", data.access)

        this.Abstract.content_Abstract = data.project_detail.project_abstract
        this.Detail.content_eg = data.project_detail.project_detail
        this.Tools = data.project_detail.tool_techniq_detail
        this.References = data.project_detail.references

        // document
        this.loadDocumentToShow()

        //video
        this.video_pathname = data.video.path_name
        if(this.video_pathname !== null) {
            this.SET_VDO_PATHNAME(this.video_pathname)
        }

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
        for (let i = 0; i < this.getMember.length; i++) {
            if (this.getMember[i].student_id === this.GET_USERNAME) {
                this.clap = false
            } else {
                this.clap = true
            }
        }
        this.loading = false
        this.SET_LOADING_STATUS(false)
    },
    methods: {
        async loadDocumentToShow(document) {
            const {
                data
            } = await axios.get(this.GET_PATHNAME + `/projects/?project_id=${this.$route.params.pId}`,
                this.GET_CONFIG)

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
            'set_assignment_id',
            'set_show',
            'SET_LOADING_STATUS',
            'SET_VDO_PATHNAME'

        ]),
        save() {
            // console.log('vdo', this.GET_VDO_PATHNAME)
            this.setEditProject(this.EditProject)
            var vdo_pathname = this.GET_VDO_PATHNAME
            var vdo_pathname = this.GET_VDO_PATHNAME
            if (this.getNonMember) {} else {
                this.setNonMember([])
            }
            try {
                axios
                    .patch(this.GET_PATHNAME + `/projects/`, {
                        project_detail: {
                            id: this.$route.params.pId,
                            project_name_th: this.header.TitleName_TH,
                            project_name_en: this.header.TitleName,
                            project_detail: this.getDetail === null || this.getDetail.length === 0 ? null : this.getDetail,
                            project_abstract: this.getAbstract,
                            haveOutsider: this.haveOutsider,
                            isShow: this.show,
                            tool_techniq_detail: this.getTool === null || this.getTool.length === 0 ? null : this.getTool,
                            references: this.getRef === null || this.getRef.length === 0 ? null : this.getRef,
                            start_year_th: this.start_year_th,
                            start_year_en: this.start_year_en,
                            end_year_th: this.end_year_th,
                            end_year_en: this.end_year_en,
                            project_type_name: this.type,
                            assignment_detail: {
                                assignment_id: this.assignment_id
                            }
                        },
                        students: this.getMember,
                        achievements: this.GET_ACHIEVEMENT,
                        tags: this.getTag,
                        //update tags  
                        // document: [],
                        picture: [],
                        video: {
                            path_name: vdo_pathname == "" ? null : vdo_pathname,
                        },
                        outsiders: this.getNonMember === " " ? null : this.getNonMember
                    }, this.GET_CONFIG) .then(res => {
                        console.log("res : ", res)
                        if (res.status == 200) {
                            if (res.data.message == "Validate Error") {
                                alert('File has been Error')
                            } else {
                                location.reload();
                                console.log('tags : ', this.getTag)
                                this.EditProject = false;
                            }
                            this.loadDocumentToShow()
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
            this.show = this.get_show
            this.setEditProject(this.EditProject)
            this.setAbstract(this.Abstract.content_Abstract)
            this.setDetail(this.Detail.content_eg)
            this.setTool(this.Tools)
            this.setRef(this.References)

            console.log(this.nonMembers, "defult");

            this.setNonMember(this.nonMembers)

        },
        Edit: function () {
            this.EditProject = true
            this.setEditProject(this.EditProject)
            for (var n = 0; n < this.getNonMember.length; n++)
                this.nonMembers.push(this.getNonMember[n])
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
        sendRequest() {
            console.log('request :', this.getPID, this.assignment_id)
            try {
                axios.patch(this.GET_PATHNAME + `/assignment/projects`, {
                    assignment_id: this.assignment_id,
                    project_id: this.getPID,
                    status: "Request"
                }, this.GET_CONFIG).then(res => {
                    console.log("res : ", res)
                    if (res.status == 200) {
                        if (res.data.message == "Validate Error") {
                            alert('Request Error')
                        } else {
                            this.statusRequest = true
                        }
                    }
                })

            } catch (err) {}
        }
    },
    beforeDestroy() {
        this.setImage([])
        this.setFile(this.noPic.cover)
        this.setMember('')
        this.setNonMember('')
        this.setRef('')
        this.SET_VDO_PATHNAME('')
    },
    beforeMount() {
        this.setEditProject(this.EditProject)
        this.SET_LOADING_STATUS(true)
    },
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

#status {
    color: #265080;
}

#claps {
    margin-top: 12px
}

#public {
    margin-left: 20px;

}

#request {
    color: white;
    background-color: #265080 !important;
    border: none;
    margin-left: 50%;
}

#waitimg {
    background: #F8C441;
    color: white;
    border: none;
    margin-left: 68%;
}

#project_status {
    margin-top: 3%;
}

#poster {
    margin-top: 10px;
    margin-left: -17%;
    color: #6F6F6F;
}

#claps:hover {
    transform: scale(1.1);
}

</style
</style>
