<template>
<div id="member">
    <div class="card lecturerCard" id="Authors">
        <header class="card-header">
            <p class="card-header-title" id="cardHeader">Members</p>
        </header>
        <div class="card-content" >
            <div class="columns" v-for="(student,index) in getMember" v-bind:key="index">
                <div class="column" id="left">
                    <div class="content" id="student">
                        <router-link :to="`/student/${student.student_id}`">
                            <div class="columns">
                                <div class="column" >
                                    <a id="student"> {{student.firstname}}</a>
                                </div>
                                <div class="column" style="margin-left:-80px">
                                    <a id="student">{{student.lastname}}</a>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>
                <div class="column">
                    <div class="content">
                        <div id="student_id">ID : <router-link :to="`/student/${student.student_id}`"> <a id="student">{{student.student_id}}</a></router-link></div>
                        <div id="mail" >{{student.email}}</div>
                    </div>
                </div>
                <md-tooltip md-direction="bottom">Click on the name/id to go to the profile.</md-tooltip>
            </div>
            <div v-if=" this.getNonMember">
                <div class="columns" v-for=" (out,index) in this.getNonMember" v-bind:key="index">
                    <div class="column">
                        <div class="content">
                            <div>
                            <!-- <div v-if="!getEditProject"> -->
                                <div class="columns" id="nonMember">
                                    <div class="column">                                        
                                        {{out.firstname}}
                                    </div>
                                    <div class="column" style="margin-left:-80px">
                                        {{out.lastname}}
                                    </div>
                                </div>
                            </div>
                            <!-- <div v-else>
                                <div class="columns">
                                    <div class="column">
                                        <input class="input" type="text" v-model="out.firstname" id="nonMember">
                                        <div v-if="out.firstname == 0">
                                            <p id="warning"> Enter firstname.</p>
                                        </div>
                                    </div>
                                    <div class="column">
                                        <input class="input" type="text" v-model="out.lastname" id="nonMember">
                                        <div v-if="out.lastname == 0">
                                            <p id="warning"> Enter firstname.</p>
                                        </div>
                                    </div>
                                </div>
                            </div> -->

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
            user_role: "student",
            storeNonMember:[]
        }
    },
    computed: {
        ...mapGetters([
            'getNonMember',
            'getMember',
            'getEditProject',
            'GET_STUDENT_PROFILE'
        ]),
    },
    mounted() {
        console.log(this.getNonMember,'get non member');        
    },
    methods: {
        ...mapActions([
            'setMember'
        ])
    },
    // beforeDestroy() {
    //     this.setMember(" ")
    // },
}
</script>

<style>

#student,
#student_id {
    color: #265080 !important;
    background-color: white !important;
    border: none !important;
    font-size: 15px !important;
    /* margin-top: -2px !important; */
}
#nonMember{
    color: #265080 !important;
    background-color: white !important;
    border: none !important;
    font-size: 15px !important;
    margin-top: -25px !important;
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

#warning {
    font-size: 10px;
    color: red;
    margin-left: 5px;
}

#student:hover {
    font-weight:bold;
}
#student::after {
    display: block;
    content: attr(title);
    font-weight: bold;
    height: 0;
    overflow: hidden;
    visibility: hidden;
}
</style>
