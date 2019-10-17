<template>
<div>
    <!-- {{skill}} -->
    <div class="genText">
        <i class="la la-angle-left" v-on:click="addSkillToState"></i>
        <span class="titleText">Skills</span>
    </div>
    <div id="addSkillBtn" class="addSkillBtn" v-if="clickAddSkill == false" @click="cannotClick();clickAddSkill = !clickAddSkill" style="margin-bottom:10px">+ Add Skills</div>
    <!-- form for add -->
    <div class="skill" v-else style="margin-bottom:10px">
        <div>
            <md-field>
                <label>Skill</label>
                <md-input id="skill_name"></md-input>
            </md-field>
        </div>
        <div class="select">
            <select id="proficiency_name" class="selectInGenResume" required>
                <option selected disabled>Select a Proficiency ...</option>
                <option v-for="(level,index) in proficiency" v-bind:key="index" :value="level.id">{{level.level_name}}</option>
            </select>
        </div>
        <a class="button is-small saveBtn" @click="canClick();addSkill();clickAddSkill = !clickAddSkill">Add</a>
        <a class="button is-small cancelBtn" @click="canClick();clickAddSkill = !clickAddSkill">Cancel</a>
    </div>
    <!-- form for edit -->
    <div id="editing" class="skill editing" v-if="showForm == true && skill.length>0">
        <div>
            <md-field>
                <label>Skill</label>
                <md-input :id="'skill_name'+getIndex" :value="skill[getIndex].skill_name"></md-input>
            </md-field>
        </div>
        <div class="select">
            <select :id="'proficiency_name'+getIndex" class="selectInGenResume" required>
                <option disabled selected :value="proficiency[(skill[getIndex].skill_level_id)-1].id">{{proficiency[(skill[getIndex].skill_level_id)-1].level_name}}</option>
                <option :id="'profi'+getIndex" v-for="(level,index) in proficiency" v-bind:key="index" :value="level.id">{{level.level_name}}</option>
            </select>
        </div>

        <a class="button is-small saveBtn" @click="saveChange(getIndex);showForm = false" style="margin-top: 3px;">Save</a>
        <a class="button is-small cancelBtn" @click="cancelChange(getIndex);showForm = false" style="margin-top: 3px;">Cancel</a>
        <i class="la la-trash" style="float:right" @click="removeSkill(getIndex);showForm = false"></i>
    </div>
    <!-- show skill -->
    <div :id="'edit'+index" class="columns allSkill" v-for="(s,index) in skill" v-bind:key="index" @click="showDetail(index);showForm = true;">
        <div class="column is-1 skillList">
            <i class="la la-ellipsis-v skillIcon"></i>
        </div>
        <div class="column">
            <p class="showSkill schoolname">{{s.skill_name}}</p>
            <p class="showSkill levelEdu">{{s.level_name}}</p>
        </div>
    </div>
    <!-- {{proficiency}} -->
</div>
</template>

<script>
import axios from "axios";
import {
    mapGetters,
    mapActions
} from 'vuex'
import { parse } from 'path';

export default {
    data() {
        return {
            clickAddSkill: false,
            showForm: false,
            getIndex: 0,

            proficiency: []
        }
    },
    computed: {
        ...mapGetters({
            skill: 'GET_SKILL',
            config: 'GET_CONFIG'
        })
    },
    async mounted() {
        
        const {
            data
        } = await axios.get(
            // "http://localhost:7000/users/skill-level"
            "https://www.sit-acc.nruf.in.th/users/skill-level"
        );
        this.proficiency = data
        
    },
    methods: {
        ...mapActions(['SET_PAGE']),
        canClick() {
            for (var n = 0; n < this.skill.length; n++) {
                document.getElementById('edit' + n).setAttribute("class", "columns allSkill")
            }
        },
        cannotClick() {
            for (var n = 0; n < this.skill.length; n++) {
                document.getElementById('edit' + n).setAttribute("class", "columns allSkill mystyle")
            }
        },
        async addSkillToState() {
            this.SET_PAGE(1);
            console.log("all skill : ", this.skill)
            // const config = {
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiJzdHVkZW50MDEiLCJmdWxsbmFtZSI6InN0dWRlbnQwMSIsImVtYWlsIjoic3R1ZGVudDAxQHN0LnNpdC5rbXV0dC5hYy50aCIsImRlc2NyaXB0aW9uIjoiQ1MiLCJyb2xlIjoic3R1ZGVudCIsImlhdCI6MTU2OTUwOTU1NzQxMX0.n7-qj3563sovVgYgbkPiK5ZqirMRvD2qAsGMvvvXcbg'
            //     }
            // }
            try {
                await axios
                    // .patch("http://localhost:7000/users/skills", {
                    .patch("https://www.sit-acc.nruf.in.th/users/skills", {
                skills : this.skill
                }, this.config)
                    .then((res) => {
                        console.log("res : ", res);
                        console.log("success!");
                    })
                    .catch((err) => {
                        console.error("err : "+ err);
                    });
            } catch (err) {
                console.log("FAILURE!!" + err);
            }
        },
        addSkill() {
            var skill_level_id = parseInt(document.getElementById('proficiency_name').value)-1
            this.skill.push({
                skill_name: document.getElementById('skill_name').value,
                skill_level_id: skill_level_id+1,
                level_name: this.proficiency[skill_level_id].level_name
            })
            console.log("skill : ",this.skill)
        },
        canClickAddSkillBtn() { //ทำให้กดปุ่มได้
            document.getElementById('addSkillBtn').setAttribute("class", "addSkillBtn")
        },
        cannotClickAddSkillBtn() { //ทำให้กดปุ่มไม่ได้
            document.getElementById('addSkillBtn').setAttribute("class", "addSkillBtn mystyle")
        },
        showDetail(index) {
            this.cannotClickAddSkillBtn()
            this.cannotClick()
            document.getElementById('edit' + index).style.display = 'none'
            this.getIndex = index
            return this.getIndex
        },
        saveChange(index) {
            var skill_level_id = parseInt(document.getElementById('proficiency_name'+ index).value)
            var replaceSkill = {
                skill_name: document.getElementById('skill_name'+ index).value,
                skill_level_id: skill_level_id,
                level_name: this.proficiency[skill_level_id-1].level_name
            }
                console.log(replaceSkill)
            this.skill.splice(index, 1, replaceSkill)
            this.cancelChange(index)
            this.canClickAddSkillBtn()
        },
        cancelChange(index) {
            this.canClickAddSkillBtn()
            this.canClick()
            document.getElementById('edit' + index).style.display = 'flex'
        },
        removeSkill(index) {
            this.skill.splice(index, 1)
            this.canClick()
            this.canClickAddSkillBtn()
            document.getElementById('edit' + index).style.display = 'flex'
        }
    }
}
</script>
