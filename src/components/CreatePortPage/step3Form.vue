<template>
<div>
    <div class="stepName">Project Members <i class="la la-group"></i></div>
    <nav class="tabs is-fullwidth is-centered is-boxed is-small" v-if="isExternalProject == true">
        <ul>
            <li class="tab is-active" id="Students" v-on:click="openTab('Student')">
                <a style="font-size: 14px;">SIT Student</a>
            </li>
            <li class="tab" id="Non-Students" v-on:click="openTab('Non-Student')">
                <a style="font-size: 14px;color: #265080 !important;">Non-SIT Student</a>
            </li>
        </ul>
    </nav>
    <!-- Add และ show นศที่ถูกเลือกเพิ่มเข้ามาเป็น member -->
    <div id="Student" class="content-tab">
        <div class="field">
            <multi-select :options="allStudent" :selectedOptions="selectedStudentMember" placeholder="Select Student ID" @select="onSelect">
            </multi-select>
        </div>
        <div v-for="(student,student_index) in selectedStudentMember" v-bind:key="student_index">
            <div class="field has-addons">
                <p class="control" style="width:4%">
                    {{student_index+1}}.
                </p>

                <p class="control" style="width:30%">
                    {{student.text}}
                </p>
                <p class="control is-expanded">
                    {{student.firstname}} {{student.lastname}}
                </p>
            </div>
        </div>
    </div>
    <!-- Add และ show บุคคลภายนอกที่ถูกเพิ่มเข้ามาเป็น member -->
    <div id="Non-Student" class="content-tab" style="display:none">
        <div class="columns" style="margin-bottom: -10px;">
            <div class="column is-5">
                <div class="field">
                    <label class="label inputName">First Name</label>
                    <div class="control">
                        <input id="inputOutsiderFirstname" ref="tmpFirst" class="input inputData" type="text" placeholder="e.g. Nattanat" v-model="outsiderFirstname">
                        <p ref="tmpFirstValidate" class="help is-danger"></p>
                    </div>
                </div>
            </div>
            <div class="column"></div>
            <div class="column is-5">
                <div class="field">
                    <label class="label inputName">Last Name</label>
                    <div class="control">
                        <input id="inputOutsiderLastname" ref="tmpLast" class="input inputData" type="text" placeholder="e.g. Wimaluangtrakul" v-model="outsiderLastname">
                        <p ref="tmpLastValidate" class="help is-danger"></p>
                    </div>
                </div>
            </div>

            <div class="column">
                <div class="field">
                    <label class="label inputName" style="color:white;">.</label>
                    <p class="control">
                        <a class="button" @click.prevent="addOutsider();" style="color: #265080 !important;">
                            Add
                        </a>
                    </p>
                </div>
            </div>
        </div>
        <div v-for="(outsider,outsider_index) in outsider" v-bind:key="outsider_index">
            <div class="field has-addons">
                <p class="control" style="width:4%">
                    {{outsider_index+1}}.
                </p>
                <p class="control is-expanded">
                    {{outsider.firstname}} {{outsider.lastname}}
                </p>
                <p class="control">
                    <i class="la la-trash" @click="removeOutsider(outsider_index)"></i>
                </p>
            </div>
        </div>
    </div>
    <div class="columns">
    </div>
</div>
</template>

<script>
import 'vue-search-select/dist/VueSearchSelect.css'
import './../../../node_modules/bulma/css/bulma.css';
import './../css/form.css';
import vueStep from 'vue-step';
import {
    MultiSelect
} from 'vue-search-select'
import axios from 'axios';
import {
    mapGetters,
    mapActions
} from 'vuex'

export default {
    components: {
        vueStep,
        MultiSelect
    },
    data() {
        return {
            outsiderFirstname: "",
            outsiderLastname: ""
        }
    },
    computed: {
        ...mapGetters({
            allStudent: 'GET_ALL_STUDENT',
            selectedStudentMember: 'GET_SELECTED_STUDENT_MEMBER',
            outsider: 'GET_OUTSIDER',
            //ใช้แสดงพวก step ในการ create project
            isExternalProject: 'GET_PROJECTTYPE',
            isGroupProject: 'GET_ISGROUP'
        })
    },
    mounted() {},
    methods: {
        ...mapActions(['LOAD_ALL_STUDENT', 'SET_SELECTED_STUDENT_MEMBER', 'SET_OUTSIDER']),
        openTab(tabName) {
            var i, x, tablinks;
            x = document.getElementsByClassName("content-tab");
            for (i = 0; i < x.length; i++) {
                x[i].style.display = "none";
            }
            tablinks = document.getElementsByClassName("tab");
            for (i = 0; i < x.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" is-active", "");
            }
            document.getElementById(tabName).style.display = "block";
            document.getElementById(tabName + "s").className += " is-active";
        },
        //multi-select นศ
        onSelect(selectedStudentMember) {
            this.SET_SELECTED_STUDENT_MEMBER(selectedStudentMember)
        },
        //outsider
        addOutsider() {
            if (this.outsiderFirstname.length > 0 && this.outsiderLastname.length > 0) {
                this.SET_OUTSIDER({
                    firstname: this.outsiderFirstname,
                    lastname: this.outsiderLastname
                })
                this.$refs.tmpFirstValidate.innerHTML = ''
                this.$refs.tmpLastValidate.innerHTML = ''
                this.outsiderFirstname = '';
                this.outsiderLastname = ''
            } else {
                if(this.outsiderFirstname.length == 0){
                    this.$refs.tmpFirstValidate.innerHTML = 'The field is required'
                }
                if(this.outsiderLastname.length == 0){
                    this.$refs.tmpLastValidate.innerHTML = 'The field is required'
                }
            }
        },
        removeOutsider: function (outsider_index) {
            this.outsider.splice(outsider_index, 1)
        }
    }
}
</script>
