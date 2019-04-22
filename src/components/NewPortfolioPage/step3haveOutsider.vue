<template>
    <div>
        <div class="columns header">
            <div class="column is-one-quarter stepName">My Team</div>
            <!-- <div class="column addMember" v-on:mouseover="clickAddMember=!clickAddMember">+ Add more members...</div> -->
            <!-- Parent to Child : <br>
            {{membersChild.student}} <br>
            {{membersChild.outsider}} <br> -->
        </div>
        
        <!-- add member -->
        <!-- <div class="columns">
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
        </div> -->
        <!-- ------------- -->
        <div class="columns">
            <div class="column">
                <label class="label inputName">Have outsider?</label>
                <div class="control">
                    <label class="radio">
                        <input type="radio" name="answer" value="true" v-model="membersChild.haveOutsider" v-on:change="emitToParent8">
                        Yes
                    </label>
                    <label class="radio">
                        <input type="radio" name="answer" value="false" v-model="membersChild.haveOutsider" v-on:change="emitToParent8">
                        No
                    </label>
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <div>Student</div><hr>
                <div class="chooseMemberType" v-on:click="chooseStudent=true,clickAddMember=!clickAddMember">+ SIT Student</div>
                <table class="table" v-if="membersChild.student.length>0">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>ID</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody v-for="(student,student_index) in membersChild.student" v-bind:key="student_index">
                        <tr>
                            <th>{{student_index+1}}.</th>
                            <td>{{student.student_id}}</td>
                            <td>Nattanat Wimaluangtrakul</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="column" v-if="membersChild.haveOutsider == 'true'">
                <div>Outsider</div><hr>
                <div class="chooseMemberType" v-on:click="chooseOutsider=true,clickAddMember=!clickAddMember">+ Outsider</div>
                <table class="table" v-if="membersChild.outsider.length>0">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody v-for="(outsider,outsider_index) in membersChild.outsider" v-bind:key="outsider_index">
                        <tr>
                            <th>{{outsider_index+1}}.</th>
                            <td>{{outsider.firstname}} {{outsider.lastname}} </td>
                            <td><span @click="removeOutsider(outsider_index)" style="cursor:pointer" class="delete"></span> </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- modal add student -->
        <div v-if="chooseStudent">
            <div class="modal is-active">
                <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                    <p class="modal-card-title">Add Student</p>
                    <button class="delete" aria-label="close" @click="sameStudent" v-on:click="chooseStudent=!chooseStudent"></button>
                    </header>
                    <section class="modal-card-body" style="height: 400px">
                        <div class="field">
                            <label class="label inputName">Student ID</label>
                            <multi-select 
                                :options="studentData"
                                :selected-options="selectedStudent"
                                placeholder="Select Student ID"
                                @select="onSelect">
                            </multi-select>
                        </div>
                    </section>
                    <footer class="modal-card-foot studentFoot field is-grouped is-grouped-centered">
                        <button class="button is-success" @click="addStudent();emitToParent8();emitToParent9();" v-on:click="chooseStudent=!chooseStudent">Add</button>
                    </footer>
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
                        <div class="columns"> 
                            <div class="column">
                                <div class="field">
                                    <label class="label inputName">firstname</label>
                                    <div class="control">
                                        <input class="input inputData" type="text" placeholder="firstname" v-model="newOutsider.tmpFirst">
                                    </div>
                                </div>
                            </div>
                            <div class="column">
                                <div class="field">
                                    <label class="label inputName">lastname</label>
                                    <div class="control">
                                        <input class="input inputData" type="text" placeholder="lastname" v-model="newOutsider.tmpLast">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="addOutsiderButton">
                            <button class="button is-success" @click="addOutsider()" v-on:click="chooseOutsider=!chooseOutsider">Add</button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import './../../../node_modules/bulma/css/bulma.css';
import './../css/form.css';
import vueStep from 'vue-step';
import { MultiSelect } from 'vue-search-select'

export default {
    components: {
        vueStep, MultiSelect
    },
    data () {
        return {
            newOutsider: [{
                tmpFirst:"",
                tmpLast:""
            }],
            membersChild: {
                haveOutsider: this.membersParent.haveOutsider,
                student: this.membersParent.student,
                outsider: this.membersParent.outsider
            },

            name : 'TeamMembers',
            clickAddMember: false,
            chooseStudent: false,
            chooseOutsider: false,

            studentData: [ //ข้อมูลนักศึกษาทั้งหมด ที่อยู่ในระบบ
                { value: '1', text: '59130500024' },
                { value: '2', text: '59130500025' },
                { value: '3', text: '59130500036' },
                { value: '4', text: '59130500051' },
                { value: '5', text: '59130500100' },
                { value: '6', text: '59130500105' },
                { value: '7', text: '59130500109' },
                { value: '8', text: '59130500110' },
                { value: '9', text: '59130500111' },
            ],
            selectedStudent: this.selectedStudentParent, //นักศึกษาที่ถูกเลือก เพื่อจะ add
            selectedStudentNew: []
        }
    },
    props:{
        membersParent: Object,
        selectedStudentParent: Array
    },
    methods: {
        onSelect (selectedStudent) {
            this.selectedStudent = selectedStudent
        },
        addStudent: function() {
                                                                // พอกด add student แล้ว
            if(this.membersChild.student.length > 0){ 
                this.membersChild.student = []                       // reset student member ก่อน
            }
            for(let i=0;i<this.selectedStudent.length;i++){
                this.membersChild.student.push({                     // แล้วค่อยเพิ่มลงไปใหม่
                    student_id: this.selectedStudent[i].text
                })  
            }
            this.selectedStudentNew = this.selectedStudent // เก็บค่า selectedStudent ไว้ 

        },
        sameStudent: function() { 
            this.selectedStudent = this.selectedStudentNew // ถ้าปิด modal add student แบบไม่ได้กด add พอกด add student อีกรอบ จะต้องแสดงแค่ค่าที่เลือกไปแล้ว
        },
        addOutsider: function() {
            this.membersChild.outsider.push({
                firstname: this.newOutsider.tmpFirst,
                lastname: this.newOutsider.tmpLast
            }) 
            this.newOutsider.tmpFirst = ""
            this.newOutsider.tmpLast = ""
        },
        removeOutsider: function(outsider_index){
            this.membersChild.outsider.splice(outsider_index,1)
        },
        

        //send data to parent
        emitToParent8(event) {
            this.$emit('childToParent8', this.membersChild)
        },
        emitToParent9(event) {
            this.$emit('childToParent9', this.selectedStudent)
        },
        emitToParent5(event) {
            this.$emit('childToParent5', this.membersChild.haveOutsider)
        }
    }
}
</script>


