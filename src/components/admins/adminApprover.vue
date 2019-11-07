<template>
<div>
    Status :
    <!-- <a id='Waiting' class="button statusBtn" @click="setStatus('Waiting');openAskModal()"><span id='WaitingText' class="courseName">Waiting</span></a> -->
    <a id='Approve' class="button statusBtn" @click="setStatus('Approve');openAskModal()"><span id='ApproveText' class="courseName">Approve</span></a>
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
        }
    },
    computed: {
        ...mapGetters({
            project_id: 'GET_PROJECT_ID',
            config: 'GET_CONFIG',
            URL: 'GET_PATHNAME',
            ID:'getPID'
        })
    },
    mounted() {
    },
    methods: {
        ...mapActions(['set_approver']),
        setStatus(status) {
            this.statusTmp = status
            console.log('status : ',this.statusTmp)
            document.getElementById('Approve').className = 'button statusBtn'
            document.getElementById('Waiting').className = 'button statusBtn'
            document.getElementById('ApproveText').className = 'courseName'
            document.getElementById('WaitingText').className = 'courseName'

            if (status == 'Approve') {
                document.getElementById('Approve').className = 'button statusBtn approved'
            } else if (status == 'Waiting') {
                document.getElementById('Waiting').className = 'button statusBtn request'
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
        async addRequest() {
            var data = {
                assignment_id:this.ID,
                project_id: this.$route.params.pId,
                status: this.statusTmp,
            }
            console.log("data :", data)
            await axios.patch(
                    this.URL + '/assignment/projects', data, this.config
                ).then(res => {
                    console.log("res : ", res)
                    if (res.status == 200) {
                        this.closeAskModal()
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
