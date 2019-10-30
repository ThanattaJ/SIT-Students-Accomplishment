<template>
<div id="member">
    <div class="card lecturerCard" id="Authors">
        <header class="card-header">
            <p class="card-header-title" id="cardHeader">Members</p>
        </header>
        <div class="card-content" id="student">
            <div class="columns" v-for="(student,index) in getMember" v-bind:key="index">
                <div class="column" id="left">
                    <div class="content" @click="profile(index)">
                        <input class="input" type="text" v-model="student.firstname" id="fname" disabled style="font-size:1px;" />
                        <input class="input" type="text" v-model="student.lastname" id="lname" disabled />
                    </div>
                </div>
                <div class="column">
                    <div class="content">
                        <div id="student_id" @click="profile(index)">ID : {{student.student_id}}</div>
                        <div id="mail">{{student.email}}</div>
                    </div>
                </div>
            </div>
            <div v-if="this.getNonMember">
                <div class="columns" v-for=" (out,index) in getNonMember" v-bind:key="`${index}-${out.id}`" id="outsider">
                    <div class="column">
                        <div class="content">
                            <input class="input" type="text" v-model="out.firstname" id="fname" :disabled="!getEditProject">
                            <input class="input" type="text" v-model="out.lastname" id="lname" :disabled="!getEditProject">
                        </div>
                    </div>
                    <div class="column">
                        <div class="content">
                            <div id="mail">{{out.email}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else></div>
        </div>
    </div>
</div>
</template>

<script>
import {
    mapGetters,
    mapActions
} from 'vuex';
export default {
    data() {
        return {
            fullname: '',
            user_role: "student"
        }
    },
    computed: {
        ...mapGetters([
            'getNonMember',
            'getMember',
            'getEditProject',
            'GET_STUDENT_PROFILE'
        ])
    },
    methods: {
        ...mapActions([
            'setMember',
            'setNonMember',
            'LOAD_OTHER_STUDENT_DATA'
        ]),
        profile(index) {

         
            var user_id = this.getMember[index].student_id
            console.log('user_id ', user_id)
            var user_role = 'student'
            try {
                this.LOAD_OTHER_STUDENT_DATA({
                    user_role: user_role,
                    user_id: user_id,
                })

            } catch(err) {
                console.log('err',err)
            }
        }
    },
    beforeDestroy() {
        this.setMember(" ")
        this.setNonMember(" ")
    },
}
</script>

<style>
#non {
    color: #949494;
    margin-left: 15%;
    margin-bottom: 20px;
    margin-top: -10px;
}

#fname,
#lname,
#student_id {
    color: #265080 !important;
    background-color: white !important;
    border: none !important;
    font-size: 15px !important;
    margin-top: -10px !important;
}

#mail {
    font-size: 14px !important;
    line-height: 16px !important;
    display: flex !important;
    align-items: center !important;

    color: #949494 !important;
}

#left {
    max-width: 80%;
    table-layout: fixed;
}

#lname {
    margin-right: -30px !important;
}
</style>
