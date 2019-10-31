<template>
    <div>
        <div class="columns header">
            <div class="column is-one-quarter stepName">My Team</div>
            <div class="column addMember" v-on:click="chooseStudent=true">+ Add more members...</div>
            <!-- Parent to Child : <br>
            {{membersChild.student}} <br> -->
        </div>
        <!-- ------------- -->
        <div style="margin-top: 53px;">
            <div>Student</div><hr>
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
        <!-- modal add student -->
        <div v-if="chooseStudent">
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
                        <button class="button is-success" @click="addStudent();emitToParent8();emitToParent9();chooseStudent=!chooseStudent">Add</button>
                    </footer>
                </div>
            </div>
        </div>
        <!-- ------------- -->
        
    </div>
</template>

<script>
// import './../../../node_modules/bulma/css/bulma.css';
import './../css/form.css';
import vueStep from 'vue-step';
import { MultiSelect } from 'vue-search-select'

export default {
    components: {
        vueStep, MultiSelect
    },
    data () {
        return {
            membersChild: {
                student: this.membersParent.student,
                outsider: this.membersParent.outsider
            },

            name : 'TeamMembers',
            chooseStudent: false,

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
        //send data to parent
        emitToParent8(event) {
            this.$emit('childToParent8', this.membersChild)
        },
        emitToParent9(event) {
            this.$emit('childToParent9', this.selectedStudent)
        }
    }
}
</script>


