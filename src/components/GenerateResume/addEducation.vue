<template>
<div>
    <!-- {{education_level}} -->
    <div class="genText">
        <i class="la la-angle-left" v-on:click="addEduToState"></i>
        <span class="titleText">Education</span>
    </div>
    <div id="addEduBtn" class="addEduBtn" v-if="clickAddEducation == false" @click="cannotClick();clickAddEducation = !clickAddEducation" style="margin-bottom:10px">+ Add Education</div>
    <!-- form for add -->
    <div class="education" v-else style="margin-bottom:10px">
        <div class="select">
            <select id="level_name" required>
                <option selected disabled>Select a Degree ...</option>
                <option id="level" v-for="(level,index) in education_level" :key="index" :value="level.id">{{level.level_name}}</option>
            </select>
        </div>
        <div>
            <md-field>
                <label>School Name</label>
                <md-input id="school_name"></md-input>
            </md-field>
            <md-field>
                <label>Program/Faculty</label>
                <md-input id="program"></md-input>
            </md-field>
            <md-field>
                <label>GPA</label>
                <md-input id="gpa"></md-input>
            </md-field>
        </div>
        <div class="columns">
            <div class="column">
                <md-field>
                    <label>Start Year</label>
                    <md-input id="start_year"></md-input>
                </md-field>
            </div>
            <div class="column">
                <md-field>
                    <label id="present">End Year</label>
                    <md-input id="end_year"></md-input>
                </md-field>
                <label class="checkbox" style="font-size:11px;">
                    <input type="checkbox" @click="selectCurrent(chooseCurrent)">
                    I currently study here
                </label>
            </div>
        </div>
        <a class="button is-small saveBtn" @click="canClick();addEducation();clickAddEducation = !clickAddEducation" style="margin-top: -15px;">Add</a>
        <a class="button is-small cancelBtn" @click="canClick();clickAddEducation = !clickAddEducation" style="margin-top: -15px;">Cancel</a>
    </div>
    <!-- form for edit -->
    <div class="education editing" v-if="showForm == true && education.length>0">
        <div class="select">
            <select :id="'level_name'+getIndex">
                <option disabled selected :value="levelId_all[getIndex]">{{education[getIndex].level_name}}</option>
                <option :id="'level'+getIndex" v-for="(level,index) in education_level" v-bind:key="index" :value="level.id">{{level.level_name}}</option>
            </select>
        </div>
        <div>
            <md-field>
                <label>School Name</label>
                <md-input :id="'school_name'+getIndex" :value="education[getIndex].school_name"></md-input>
            </md-field>
            <md-field>
                <label>Program/Faculty</label>
                <md-input :id="'program'+getIndex" :value="education[getIndex].program"></md-input>
            </md-field>
            <md-field>
                <label>GPA</label>
                <md-input :id="'gpa'+getIndex" :value="education[getIndex].gpa"></md-input>
            </md-field>
        </div>
        <div class="columns">
            <div class="column">
                <md-field>
                    <label>Start Year</label>
                    <md-input :id="'start_year'+getIndex" :value="education[getIndex].start_year"></md-input>
                </md-field>
            </div>
            <div class="column">
                <md-field>
                    <label :id="'present'+getIndex">End Year</label>
                    <md-input :id="'end_year'+getIndex" :value="education[getIndex].end_year"></md-input>
                </md-field>
                <label class="checkbox" style="font-size:11px;">
                    <input type="checkbox" @click="selectCurrentFromEdit(chooseCurrentFromEdit, getIndex)">
                    I currently study here
                </label>
            </div>
        </div>
        <a class="button is-small saveBtn" @click="saveChange(getIndex);showForm = false" style="margin-top: 3px;">Save</a>
        <a class="button is-small cancelBtn" @click="cancelChange(getIndex);showForm = false" style="margin-top: 3px;">Cancel</a>
        <i class="la la-trash" style="float:right" @click="removeEducation(getIndex);showForm = false"></i>
    </div>
    <!-- show education -->
    <div :id="'edit'+index" class="columns allEducation" v-for="(edu,index) in education" v-bind:key="index" @click="showDetail(index);showForm = true;">
        <div class="column is-1 educationList">
            <i class="la la-ellipsis-v educationIcon"></i>
        </div>
        <div class="column">
            <p class="showEducation schoolname">{{edu.school_name}}</p>
            <p class="showEducation levelEdu">{{edu.level_name}}</p>
            <p class="showEducation program">{{edu.program}} | GPA: {{edu.gpa}}</p>
            <p class="showEducation eduYear">{{edu.start_year}} - {{edu.end_year}}</p>
        </div>
    </div>
    <!-- {{levelId_all}} -->
    <!-- {{education}} -->
</div>
</template>

<script>
import axios from "axios";
import {
    mapGetters,
    mapActions
} from 'vuex'

export default {
    data() {
        return {
            clickAddEducation: false,
            showForm: false,
            getIndex: 0,
            chooseCurrent: false,
            chooseCurrentFromEdit: false,
            education_level: [],
            levelId_all: []
        }
    },
    computed: {
        ...mapGetters({
            education: 'GET_EDUCATION_DATA',
            config: 'GET_CONFIG'
        })
    },
    async mounted() {
        const {
            data
        } = await axios.get(
            // "http://localhost:7000/users/education-level"
            "https://www.sit-acc.nruf.in.th/users/education-level"
        );
        this.education_level = data
        for (var n = 0; n < this.education.length; n++) {
            this.levelId_all.push(this.education[n].education_level_id)
        }
    },
    methods: {
        ...mapActions(['SET_PAGE']),
        canClick() {
            for (var n = 0; n < this.education.length; n++) {
                document.getElementById('edit' + n).setAttribute("class", "columns allEducation")
            }
        },
        cannotClick() {
            for (var n = 0; n < this.education.length; n++) {
                document.getElementById('edit' + n).setAttribute("class", "columns allEducation mystyle")
            }
        },
        async addEduToState() {
            this.SET_PAGE(1);
            // const config = {
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiJzdHVkZW50MDEiLCJmdWxsbmFtZSI6InN0dWRlbnQwMSIsImVtYWlsIjoic3R1ZGVudDAxQHN0LnNpdC5rbXV0dC5hYy50aCIsImRlc2NyaXB0aW9uIjoiQ1MiLCJyb2xlIjoic3R1ZGVudCIsImlhdCI6MTU2OTUwOTU1NzQxMX0.n7-qj3563sovVgYgbkPiK5ZqirMRvD2qAsGMvvvXcbg'
            //     }
            // }
            try {
                console.log(" this.education : ", this.education)
                await axios
                    // .patch("http://localhost:7000/users/educations", {
                    .patch("https://www.sit-acc.nruf.in.th/users/educations", {
                // educations : []
                educations : this.education
                }, this.config)
                    .then((res) => {
                        console.log("res : ", res);
                        console.log("Update Education Success!");
                    })
                    .catch((err) => {
                        console.error("err : "+ err);
                    });
            } catch (err) {
                console.log("FAILURE!!" + err);
            }
        },
        addEducation() {
            var school_name = document.getElementById('school_name').value;
            var level_id = document.getElementById('level_name').value;
            console.log("add to : " + level_id)
            var level_name = this.education_level[level_id - 1].level_name
            var program = document.getElementById('program').value;
            var gpa = document.getElementById('gpa').value;
            var start_year = document.getElementById('start_year').value;
            var end_year = document.getElementById('end_year').value;
            this.education.push({
                education_level_id: level_id,
                level_name: level_name,
                school_name: school_name,
                program: program,
                gpa: gpa,
                start_year: start_year,
                end_year: end_year
            })
            var int = parseInt(level_id)
            this.levelId_all.push(int)
            console.log(typeof (int))
        },
        canClickAddEduBtn() { //ทำให้กดปุ่มได้
            document.getElementById('addEduBtn').setAttribute("class", "addEduBtn")
        },
        cannotClickAddEduBtn() { //ทำให้กดปุ่มไม่ได้
            document.getElementById('addEduBtn').setAttribute("class", "addEduBtn mystyle")
        },
        showDetail(index) {
            this.cannotClickAddEduBtn()
            this.cannotClick()
            document.getElementById('edit' + index).style.display = 'none'
            this.getIndex = index
            return this.getIndex
        },
        saveChange(index) {
            var school_name = document.getElementById('school_name' + index).value;
            var level_id = document.getElementById('level_name' + index).value;
            // var level_id = this.levelId_all[index];
            console.log("change to : " + level_id)
            var level_name = this.education_level[level_id - 1].level_name
            var program = document.getElementById('program' + index).value;
            var gpa = document.getElementById('gpa' + index).value;
            var start_year = document.getElementById('start_year' + index).value;
            var end_year = document.getElementById('end_year' + index).value;

            var replaceEdu = {
                education_level_id: level_id,
                level_name: level_name,
                school_name: school_name,
                program: program,
                gpa: gpa,
                start_year: start_year,
                end_year: end_year
            }
            this.education.splice(index, 1, replaceEdu)

            var int = parseInt(level_id)
            this.levelId_all.splice(index, 1, int)
            console.log(typeof (int))

            this.cancelChange(index)
            this.canClickAddEduBtn()
        },
        cancelChange(index) {
            this.canClickAddEduBtn()
            this.canClick()
            document.getElementById('edit' + index).style.display = 'flex'
        },
        removeEducation(index) {
            console.log("remove " + index)
            this.education.splice(index, 1)
            this.canClick()
            this.canClickAddEduBtn()
            document.getElementById('edit' + index).style.display = 'flex'
            this.levelId_all.splice(index, 1)
        },
        selectCurrent(chooseCurrent) {
            if (chooseCurrent == false) {
                document.getElementById('present').style.display = "none";
                document.getElementById('end_year').value = "Present";
                document.getElementById('end_year').disabled = true;
                console.log("1")
            } else {
                document.getElementById('present').style.display = "flex";
                document.getElementById('end_year').value = ""
                document.getElementById('end_year').disabled = false;
                console.log("2")
            }
            this.chooseCurrent = !chooseCurrent

        },
        selectCurrentFromEdit(chooseCurrentFromEdit, getIndex) {
            if (chooseCurrentFromEdit == false) {
                document.getElementById('present' + getIndex).style.display = "none";
                document.getElementById('end_year' + getIndex).value = "Present";
                document.getElementById('end_year' + getIndex).disabled = true;
                console.log("3")
            } else {
                document.getElementById('present' + getIndex).style.display = "flex";
                document.getElementById('end_year' + getIndex).value = ""
                document.getElementById('end_year' + getIndex).disabled = false;
                console.log("4")
            }
            this.chooseCurrentFromEdit = !chooseCurrentFromEdit
        }
    }
}
</script>
