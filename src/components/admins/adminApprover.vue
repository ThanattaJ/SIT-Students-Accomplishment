<template>
<div> 
    <div id="approve_bar">
    Status :
    <a id='Waiting' class="button statusBtn" @click="setStatus('Waiting');openAskModal()"><span id='WaitingText' class="courseName">Waiting</span></a>
    <a id='Approve' class="button statusBtn" @click="setStatus('Waiting');openAskModal()"><span id='ApproveText' class="courseName">Approve</span></a>
    <a id='Reject' class="button statusBtn" @click="setStatus('Approve');openAskModal()"><span id='RejectText' class="courseName">Reject</span></a>
    </div>
    <modal name="askForSure">
        <md-card-header>
            <md-card-header-text>
                <div class="md-title" id="title">Are you sure to {{this.statusTmp}} project ?</div>
            </md-card-header-text>
        </md-card-header>
        <md-card-content>
            <span class="addBtn">
                <a class="button cancelCommentBtn" @click="closeAskModal"><span class="courseName">No</span></a>
                <a class="button addCommentBtn" @click="addRequest">Yes</a>
            </span>
        </md-card-content>
    </modal>
    <modal name="commentModal">
        <md-card-header>
            <md-card-header-text>
                <div class="md-title" id="title">Comment</div>
            </md-card-header-text>
        </md-card-header>
        <md-card-content style="max-height: 200px; overflow-y: auto">
            <md-card-content>
                <md-field>
                    <label>Add a comment ...</label>
                    <md-textarea id="inputComment" v-model="commentText" md-autogrow style="max-height: 130px;"></md-textarea>
                </md-field>
            </md-card-content>
            <span class="addBtn">
                <a class="button cancelCommentBtn" @click="closeComment"><span class="courseName">Cancel</span></a>
                <a class="button addCommentBtn cannotClick" v-if="commentText == '' || commentText == null">Add</a>
                <a class="button addCommentBtn" v-else @click.prevent="addComment">Add</a>
            </span>
        </md-card-content>
    </modal>
</div>
</template>

<script>
import router from '../../router/index'
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
            statusTmp: '',
            commentText: null
        }
    },
    computed: {
        ...mapGetters({
            project_id: 'GET_PROJECT_ID',
            config: 'GET_CONFIG',
            URL: 'GET_PATHNAME',
            ID: 'getPID',
            project_status: 'GET_PROJECT_STATUS',
            assignment_id: 'get_assignment_id',
        })
    },
    mounted() {
        this.setStatus(this.project_status)
    },
    methods: {
        ...mapActions(['set_approver']),
        setStatus(status) {
            this.statusTmp = status
            console.log('status : ', this.statusTmp)
            document.getElementById('Approve').className = 'button statusBtn'
            document.getElementById('Waiting').className = 'button statusBtn'
            document.getElementById('Reject').className = 'button statusBtn'
            document.getElementById('ApproveText').className = 'courseName'
            document.getElementById('WaitingText').className = 'courseName'
            document.getElementById('RejectText').className = 'courseName'

            if (status == 'Approve') {
                document.getElementById('Approve').className = 'button statusBtn approved'
            } else if (status == 'Waiting') {
                document.getElementById('Waiting').className = 'button statusBtn request'
            } else {
                document.getElementById('Reject').className = 'button statusBtn denied'
            }
            document.getElementById(status + 'Text').className = 'white'
            document.getElementById(status).className += ' white'
        },
        openAskModal(status) {
            this.$modal.show('askForSure')
        },
        closeAskModal() {
            this.$modal.hide('askForSure');
        },
        openComment() {
            if (this.statusTmp == 'Reject') {
                this.$modal.show('commentModal');
            } else {
                this.addComment()
            }
            // document.getElementById("inputComment").focus()
        },
        closeComment() {
            this.$modal.hide('commentModal');
        },
        async addRequest() {
            var data = {
                assignment_id: this.assignment_id,
                project_id: parseInt(this.$route.params.pId),
                status: this.statusTmp,
                comment: this.commentText
            }
            console.log("data :", data)
            await axios.patch(
                    this.URL + '/assignment/projects', data, this.config
                ).then(res => {
                    console.log("res : ", res)
                    if (res.status == 200) {
                        this.closeAskModal()
                        this.closeComment()
                    }
                })
                .catch(err => {
                    console.error("error : " + err);
                });
        }
    },
    beforeDestroy() {
        this.set_approver(false)
    },
}
</script>
<style>
#approve_bar{
    margin-left: 28%
}
</style>

