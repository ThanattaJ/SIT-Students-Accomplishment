<template>
    <div id="body-bg">
        <div class="columns is-mobile">
            <div class="column is-one-fifth">
                <div>
                    <vue-step :now-step="nowStep" :step-list="stepList" :active-color="activeColor" :direction="direction"></vue-step>
                </div>
            </div>
            <div class="column">
                <div class="card card-equal-height">
                    <div class="card-content form">
                        <div class="content">
                            <div class="columns header">
                                <div class="column is-one-quarter stepName">My Team</div>
                                <div class="column addMember" v-on:mouseover="clickAddMember=!clickAddMember">+ Add more members...</div>
                            </div>
                            <!-- add member -->
                            <div class="columns">
                                <div class="column is-one-quarter stepName"></div>
                                <div v-if="clickAddMember">
                                    <div class="column is-one-fifth" style="z-index: 1;position:absolute">
                                        <div class="card borderSelectMember">
                                            <div class="card-content selectMember">
                                                <div class="content">
                                                    <div class="chooseMemberType" v-on:click="chooseStudent=true,clickAddMember=!clickAddMember">SIT Student</div>
                                                    <hr>
                                                    <div class="chooseMemberType" v-on:click="chooseOutsider=true,clickAddMember=!clickAddMember">Outsider</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- ------------- -->
                            <div class="columns">
                                <div class="column">
                                    <div>Student</div><hr>
                                    <div v-if="members.student.length>1">
                                        <div class=""  v-for="(student,student_index) in members.student" v-bind:key="student_index"> 
                                            <div>{{student_index+1}}. Student ID: {{student.student_id}}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="column">
                                    <div>Outsider</div><hr>
                                    <div v-if="members.outsider.length>1">
                                        <div class=""  v-for="(outsider,outsider_index) in members.outsider" v-bind:key="outsider_index"> 
                                            <div>{{outsider_index+1}}. Firstname: {{outsider.firstname}} Lastname: {{outsider.lastname}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- modal add outsider -->
                            <div v-if="chooseStudent">
                                <div class="modal is-active">
                                    <div class="modal-background"></div>
                                    <div class="modal-card">
                                        <header class="modal-card-head">
                                        <p class="modal-card-title">Add Student</p>
                                        <button class="delete" aria-label="close" v-on:click="chooseStudent=!chooseStudent"></button>
                                        </header>
                                        <section class="modal-card-body">

                                            <div class="columns" v-for="(student,student_index) in members.student" v-bind:key="student_index"> 
                                                <div class="column">
                                                    <div class="field">
                                                        <label class="label inputName">Student ID   {{student_index}}</label>
                                                        <div class="control">
                                                            <input class="input inputData" type="text" placeholder="Student ID" v-model="student.student_id">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="addStudentButton">
                                                <button class="button is-success" @click="addStudent" v-on:click="chooseStudent=!chooseStudent">Add</button>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                            <!-- ------------- -->
                            <!-- modal add outsider -->
                            <div v-if="chooseOutsider">
                                <div class="modal is-active">
                                    <div class="modal-background"></div>
                                    <div class="modal-card">
                                        <header class="modal-card-head">
                                        <p class="modal-card-title">Add Outsider</p>
                                        <button class="delete" aria-label="close" v-on:click="chooseOutsider=!chooseOutsider"></button>
                                        </header>
                                        <section class="modal-card-body">

                                            <div class="columns" v-for="(outsider,outsider_index) in members.outsider" v-bind:key="outsider_index"> 
                                                <div class="column">
                                                    <div class="field">
                                                        <label class="label inputName">firstname   {{outsider_index}}</label>
                                                        <div class="control">
                                                            <input class="input inputData" type="text" placeholder="firstname" v-model="outsider.firstname">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="column">
                                                    <div class="field">
                                                        <label class="label inputName">lastname</label>
                                                        <div class="control">
                                                            <input class="input inputData" type="text" placeholder="lastname" v-model="outsider.lastname">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="addOutsiderButton">
                                                <button class="button is-success" @click="addOutsider" v-on:click="chooseOutsider=!chooseOutsider">Add</button>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                            <!-- ------------- -->
                        </div>
                    </div>
                    <footer class="card-footer field is-grouped is-grouped-centered backNext">
                        <router-link to="/PortfolioPageDetail">
                            <a class="card-footer-item button backButton">
                                Back
                            </a>
                        </router-link>
                        <router-link to="/Achievement">
                            <a class="card-footer-item button nextButton">
                                Next
                            </a>
                        </router-link>
                    </footer>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import './../../../node_modules/bulma/css/bulma.css';
import './../css/form.css';
import vueStep from 'vue-step';

export default {
    components: {
        vueStep
    },
    data () {
        return {
            members: {
                student:[{
                    student_id:""
                }],
                outsider:[{
                    firstname:"",
                    lastname:""
                }]
            },
            name : 'TeamMembers',
            clickAddMember: false,
            chooseStudent: false,
            chooseOutsider: false,

            // step
            nowStep: 3,
            stepList: [
                'Create Portfolio Page',
                'Project Datail',
                'Team Members',
                'Acheivement'
            ],
            activeColor:'#265080',
            direction: 'vertical'
        }
    },
    methods: {
        addStudent: function() {
            this.members.student.push({
                student_id:""
            })   
        },
        addOutsider: function() {
            this.members.outsider.push({
                firstname:"",
                lastname:""
            })   
        },
        saveOutsiderData: function() {
            localStorage.setItem('members', JSON.stringify(this.members.outsider))
        }
    }
}
</script>