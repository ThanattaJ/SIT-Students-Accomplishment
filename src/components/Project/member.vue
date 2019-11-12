<template>
<div id="member">
    <div class="card lecturerCard" id="Authors">
        <header class="card-header">
            <p class="card-header-title" id="cardHeader">Members</p>
        </header>
        <div class="card-content" id="student">
            <div class="columns" v-for="(student,index) in getMember" v-bind:key="index">
                <div class="column" id="left">
                    <div class="content" id="student">
                <router-link :to="`/student/${student.student_id}`">
                        <div class="columns">
                            <div class="column">
                                <a id="student"> {{student.firstname}}</a>
                            </div>
                            <div class="column">
                                <a id="student">{{student.lastname}}</a>
                            </div>
                        </div>
                </router-link>
                    </div>
                </div>
                <div class="column">
                    <div class="content">
                        <div id="student_id">ID : <a id="student">{{student.student_id}}</a></div>
                        <div id="mail">{{student.email}}</div>
                    </div>
                </div>
                <md-tooltip md-direction="bottom">Click on the name/id to go to the profile.</md-tooltip>
            </div>
        </div>
    </div>
    <div v-if=" this.getNonMember.length != 0" >
        <div class="card lecturerCard" id="Authors">
            <header class="card-header">
                <p class="card-header-title" id="cardHeader">Outsiders</p>
            </header>
            <div class="card-content" id="student">
                <div class="columns" v-for=" (out,index) in getNonMember" v-bind:key="`${index}-${out.id}`" id="outsider">
                    <div class="column">
                        <div class="content">

                            <div v-if="!getEditProject">
                                <div class="columns">
                                    <div class="column">
                                        {{out.firstname}}
                                    </div>
                                    <div class="column">
                                        {{out.lastname}}
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <div class="columns">
                                    <div class="column">
                                        <input class="input" type="text" v-model="out.firstname" id="student">
                                    </div>
                                    <div class="column">
                                        <input class="input" type="text" v-model="out.lastname" id="student">
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                    <div class="column">
                        <div class="content">
                            <div id="mail">{{out.email}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else></div>

</div>
</template>

<script>
import router from '../../router/index'
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
    mounted() {
        console.log('out : ', this.getNonMember.length)
    },
    methods: {
        ...mapActions([
            'setMember',
            'setNonMember',
            'LOAD_OTHER_STUDENT_DATA'
        ]),
        // profile(index) {
        //     var user_id = this.getMember[index].student_id
        //     var user_role = 'student'
        //     try {
        //         this.LOAD_OTHER_STUDENT_DATA({
        //             user_role: user_role,
        //             user_id: user_id,
        //         })

        //     } catch (err) {
        //         console.log('err', err)
        //     }
        //     this.$router.push('/student')
        // }
    },
    beforeDestroy() {
        this.setMember(" ")
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

#student,
#student_id {
    color: #265080 !important;
    background-color: white !important;
    border: none !important;
    font-size: 15px !important;
    margin-top: 10px !important;
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
