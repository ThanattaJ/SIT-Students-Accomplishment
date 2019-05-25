<template>
    <div>
        <div class="stepName">Project Members <i class="la la-group"></i></div>
        <!-- <div class="field">
            <label class="label inputName">Have outsider?</label>
                    <label class="radio">
                        <input type="radio" name="answer" value="true" v-model="membersChild.haveOutsider" v-on:change="emitToParent8();step3Check();">
                        Yes
                    </label>
                    <label class="radio">
                        <input type="radio" name="answer" value="false" v-model="membersChild.haveOutsider" v-on:change="emitToParent8();step3Check();">
                        No
                    </label>
            <p ref="haveoutsiderValidate" class="help is-danger"></p>
        </div> -->
        <!-- ------------- -->
        <div class="tabs is-centered is-boxed is-small">
            <ul>
                <li class="is-active">
                <a>
                    <span>Pictures</span>
                </a>
                </li>
                <li>
                <a>
                    <span>Music</span>
                </a>
                </li>
            </ul>
        </div>

        <div class="columns">
            <div class="column">
                <div class="field">
                <label class="label inputName">Student</label>
                <hr>
                <multi-select 
                    :options="studentData"
                    :selectedOptions="selectedStudent"
                    placeholder="Select Student ID"
                    @select="onSelect">
                    
                </multi-select>
                </div>
                <table class="table" v-if="membersChild.student.length>0">
                    <tbody v-for="(student,student_index) in studentName" v-bind:key="student_index">
                        <tr>
                            <th>{{student_index+1}}.</th>
                            <td>{{student.student_id}}</td>
                            <td>{{student.firstname}} {{student.lastname}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="column">
                <div class="field">
                    <label class="label inputName">Non-Student</label>
                    <hr>
                    <div class="columns">
                        <div class="column">
                            <div class="field">
                                <label class="label inputName">firstname</label>
                                <div class="control">
                                    <input ref="tmpFirst" class="input inputData" type="text" placeholder="firstname" v-model="newOutsider.tmpFirst" v-on:keyup="outsiderFirstNameValidation()">
                                    <p ref="tmpFirstValidate" class="help is-danger"></p>
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="field">
                                <label class="label inputName">lastname</label>
                                <div class="control">
                                    <input ref="tmpLast" class="input inputData" type="text" placeholder="lastname" v-model="newOutsider.tmpLast" v-on:keyup="outsiderLastNameValidation()">
                                    <p ref="tmpLastValidate" class="help is-danger"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        




        <div class="columns">
            <div class="column" v-if="membersChild.haveOutsider != null">
                <div class="chooseMemberType" v-on:click="chooseStudent=true,clickAddMember=!clickAddMember">+ SIT Student ...</div><hr>
                <p ref="studentValidate" class="help is-danger"></p>
                <table class="table" v-if="membersChild.student.length>0">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>ID</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody v-for="(student,student_index) in studentName" v-bind:key="student_index">
                        <tr>
                            <th>{{student_index+1}}.</th>
                            <td>{{student.student_id}}</td>
                            <td>{{student.firstname}} {{student.lastname}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="column" v-if="membersChild.haveOutsider == 'true'">
                <div class="chooseMemberType" v-on:click="chooseOutsider=true,clickAddMember=!clickAddMember">+ Outsider ...</div><hr>
                <p ref="outsiderValidate" class="help is-danger"></p>
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
        <!-- <div v-if="chooseStudent">
            <div class="modal is-active">
                <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                    <p class="modal-card-title">Add Student</p>
                    <button class="delete" ariaLabel="close" @click="sameStudent,chooseStudent=!chooseStudent"></button>
                    </header>
                    <section class="modal-card-body" style="height: 400px">
                        <div class="field">
                            <label class="label inputName">Student ID</label>
                            <multi-select 
                                :options="studentData"
                                :selectedOptions="selectedStudent"
                                placeholder="Select Student ID"
                                @select="onSelect">
                            </multi-select>
                        </div>
                    </section>
                    <footer class="modal-card-foot studentFoot field is-grouped is-grouped-centered">
                        <button class="button is-success" @click.prevent="addStudent();emitToParent8();emitToParent9();step3CheckMember();chooseStudent=!chooseStudent">Add</button>
                    </footer>
                </div>
            </div>
        </div> -->
        <!-- ------------- -->
        <!-- modal add outsider -->
        <!-- <div v-if="chooseOutsider">
            <div class="modal is-active">
                <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                    <p class="modal-card-title">Add Outsider</p>
                    <button class="delete" ariaLabel="close" v-on:click="setTmp();chooseOutsider=!chooseOutsider"></button>
                    </header>
                    <section class="modal-card-body">
                        <div class="columns"> 
                            <div class="column">
                                <div class="field">
                                    <label class="label inputName">firstname</label>
                                    <div class="control">
                                        <input ref="tmpFirst" class="input inputData" type="text" placeholder="firstname" v-model="newOutsider.tmpFirst" v-on:keyup="outsiderFirstNameValidation()">
                                        <p ref="tmpFirstValidate" class="help is-danger"></p>
                                    </div>
                                </div>
                            </div>
                            <div class="column">
                                <div class="field">
                                    <label class="label inputName">lastname</label>
                                    <div class="control">
                                        <input ref="tmpLast" class="input inputData" type="text" placeholder="lastname" v-model="newOutsider.tmpLast" v-on:keyup="outsiderLastNameValidation()">
                                        <p ref="tmpLastValidate" class="help is-danger"></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="addOutsiderButton">
                            <button class="button is-success" @click.prevent="addOutsider();step3CheckMember();">Add</button>
                        </div>
                    </section>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script>
import './../../../node_modules/bulma/css/bulma.css';
import './../css/form.css';
import vueStep from 'vue-step';
import { MultiSelect } from 'vue-search-select'
import axios from 'axios';

export default {
    components: {
        vueStep, MultiSelect
    },
    data () {
        return {
            newOutsider: {
                tmpFirst: '',
                tmpLast: ''
            },
            membersChild: {
                haveOutsider: this.membersParent.haveOutsider,
                student: this.membersParent.student,
                outsider: this.membersParent.outsider
            },

            name : 'TeamMembers',
            clickAddMember: false,
            chooseStudent: false,
            chooseOutsider: false,

            studentData: this.studentDataFromParent,
            selectedStudent: this.selectedStudentParent, //นักศึกษาที่ถูกเลือก เพื่อจะ add
            selectedStudentNew: [],
            studentName: []
        }
    },
    props:{
        membersParent: Object,
        selectedStudentParent: Array,
        studentDataFromParent: Array
    },
    methods: {
        async getStudent() {
                let allStudent = await axios.get("http://34.73.213.209:7000/users/list_student/59", data)
                let data = allStudent.data;
        },

        onSelect (selectedStudent) {
            this.selectedStudent = selectedStudent
            this.addStudent();
            this.emitToParent8();
            this.emitToParent9();
            this.step3CheckMember();
        },
        addStudent: function() {
                                                                // พอกด add student แล้ว
            if(this.membersChild.student.length > 0){ 
                this.membersChild.student = []                       // reset student member ก่อน
                this.studentName = []
            }
            for(let i=0;i<this.selectedStudent.length;i++){
                this.membersChild.student.push({                     // แล้วค่อยเพิ่มลงไปใหม่
                    student_id: this.selectedStudent[i].text
                })

                this.studentName.push({
                    firstname: this.selectedStudent[i].firstname,
                    lastname: this.selectedStudent[i].lastname,
                    student_id: this.selectedStudent[i].text
                })
            }
            this.selectedStudentNew = this.selectedStudent // เก็บค่า selectedStudent ไว้ 
            //sorting ตาม student_id
            this.membersChild.student.sort((a,b) => (a.student_id > b.student_id) ? 1 : ((b.student_id > a.student_id) ? -1 : 0));
            this.studentName.sort((a,b) => (a.student_id > b.student_id) ? 1 : ((b.student_id > a.student_id) ? -1 : 0));
        },
        sameStudent: function() { 
            this.selectedStudent = this.selectedStudentNew // ถ้าปิด modal add student แบบไม่ได้กด add พอกด add student อีกรอบ จะต้องแสดงแค่ค่าที่เลือกไปแล้ว
        },
        setTmp(){
            this.newOutsider.tmpFirst = ""
            this.newOutsider.tmpLast = ""
        },
        addOutsider: function() {
            var lettersEN = /^[A-Za-z ]+$/;
            if(this.newOutsider.tmpFirst != "" && this.newOutsider.tmpLast != "" && 
            this.newOutsider.tmpFirst.match(lettersEN) && this.newOutsider.tmpLast.match(lettersEN)){ //กรอก outsider มาทั้งชื่อและสกุล กด add ได้
                this.chooseOutsider=false //ปิด modal ไป
                this.membersChild.outsider.push({
                    firstname: this.newOutsider.tmpFirst,
                    lastname: this.newOutsider.tmpLast
                }) 
                this.newOutsider.tmpFirst = ""
                this.newOutsider.tmpLast = ""
            }else{ //ไม่กรอก outsider มาทั้งชื่อและสกุล กด add ไม่ได้
                this.chooseOutsider=true //modal ไม่ปิด
                if(this.newOutsider.tmpFirst == "" && this.newOutsider.tmpLast == ""){
                    this.$refs.tmpFirstValidate.innerHTML = "Field is required"
                    this.$refs.tmpLastValidate.innerHTML = "Field is required"
                    this.$refs.tmpFirst.style.borderColor = "#EB5656"
                    this.$refs.tmpFirst.style.boxShadow = "0 0 3px #EB5656"
                    this.$refs.tmpLast.style.borderColor = "#EB5656"
                    this.$refs.tmpLast.style.boxShadow = "0 0 3px #EB5656"
                }
            }
        },
        outsiderFirstNameValidation(){
            var lettersEN = /^[A-Za-z ]+$/;
            if(this.newOutsider.tmpFirst.length > 0){
                if(this.newOutsider.tmpFirst.match(lettersEN)){
                    this.$refs.tmpFirstValidate.innerHTML = ""
                    this.$refs.tmpFirst.style.borderColor = "#88D738"
                    this.$refs.tmpFirst.style.boxShadow = "0 0 3px #88D738"
                }else{
                    this.$refs.tmpFirstValidate.innerHTML = "Must be English Alphabet"
                    this.$refs.tmpFirst.style.borderColor = "#EB5656"
                    this.$refs.tmpFirst.style.boxShadow = "0 0 3px #EB5656"
                }
            }else{
                this.$refs.tmpFirstValidate.innerHTML = "Field is required"
                this.$refs.tmpFirst.style.borderColor = "#EB5656"
                this.$refs.tmpFirst.style.boxShadow = "0 0 3px #EB5656"
            }
        },
        outsiderLastNameValidation(){
            var lettersEN = /^[A-Za-z ]+$/;
            if(this.newOutsider.tmpLast.length > 0){
                if(this.newOutsider.tmpLast.match(lettersEN)){
                    this.$refs.tmpLastValidate.innerHTML = ""
                    this.$refs.tmpLast.style.borderColor = "#88D738"
                    this.$refs.tmpLast.style.boxShadow = "0 0 3px #88D738"
                }else{
                    this.$refs.tmpLastValidate.innerHTML = "Must be English Alphabet"
                    this.$refs.tmpLast.style.borderColor = "#EB5656"
                    this.$refs.tmpLast.style.boxShadow = "0 0 3px #EB5656"
                }
            }else{
                this.$refs.tmpLastValidate.innerHTML = "Field is required"
                this.$refs.tmpLast.style.borderColor = "#EB5656"
                this.$refs.tmpLast.style.boxShadow = "0 0 3px #EB5656"
            }
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
        },

        //validation
        step3Check() { //check ตอนกด next
            if(this.membersChild.haveOutsider == null){
                this.$refs.haveoutsiderValidate.innerHTML = "Please choose"
            }else{
                this.$refs.haveoutsiderValidate.innerHTML = ""
            }
        },
        step3CheckMember(){
             if(this.membersChild.haveOutsider == "true"){
                if(this.membersChild.student.length == 0 && this.membersChild.outsider.length == 0){
                    this.$refs.studentValidate.innerHTML = "Please add SIT Student member"
                    this.$refs.outsiderValidate.innerHTML = "Please add Outsider member"
                }else if(this.membersChild.student.length != 0 && this.membersChild.outsider.length == 0){
                    this.$refs.studentValidate.innerHTML = ""
                    this.$refs.outsiderValidate.innerHTML = "Please add Outsider member"
                }else if(this.membersChild.outsider.length != 0 && this.membersChild.student.length == 0){
                    this.$refs.studentValidate.innerHTML = "Please add SIT Student member"
                    this.$refs.outsiderValidate.innerHTML = ""
                }else{
                    this.$refs.studentValidate.innerHTML = ""
                    this.$refs.outsiderValidate.innerHTML = ""
                }
            }else if(this.membersChild.haveOutsider == "false"){
                if(this.membersChild.student.length == 0 ){
                    this.$refs.studentValidate.innerHTML = "Please add SIT Student member"
                }else{
                    this.$refs.studentValidate.innerHTML = ""
                }
            }
        }
    }
}
</script>


