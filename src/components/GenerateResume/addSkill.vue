<template>
<div>
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
            <select id="proficiency_name" required>
                <option selected disabled>Select a Proficiency ...</option>
                <option v-for="(level,index) in proficiency" v-bind:key="index" :value="level">{{level}}</option>
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
            <select :id="'proficiency_name'+getIndex" required>
                <option disabled selected :value="skill[getIndex].proficiency_name">{{skill[getIndex].proficiency_name}}</option>
                <option v-for="(level,index) in proficiency" v-bind:key="index" :value="level">{{level}}</option>
            </select>
        </div>
        <a class="button is-small saveBtn" @click="saveChange(getIndex);showForm = !showForm" style="margin-top: 3px;">Save</a>
        <a class="button is-small cancelBtn" @click="cancelChange(getIndex);showForm = !showForm" style="margin-top: 3px;">Cancel</a>
        <i class="la la-trash" style="float:right" @click="removeSkill(getIndex)"></i>
    </div>
    <!-- show skill -->
    <div :id="'edit'+index" class="columns allSkill" v-for="(s,index) in skill" v-bind:key="index" @click="showDetail(index);showForm = !showForm;">
        <div class="column is-1 skillList">
            <i class="la la-ellipsis-v skillIcon"></i>
        </div>
        <div class="column">
            <p class="showSkill schoolname">{{s.skill_name}}</p>
            <p class="showSkill levelEdu">{{s.proficiency_name}}</p>
        </div>
    </div>
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
            clickAddSkill: false,
            showForm: false,
            getIndex: 0,

            proficiency: ['Beginner', 'Intermediate', 'Expert']
        }
    },
    computed: {
        ...mapGetters({
            skill: 'GET_SKILL'
        })
    },
    async mounted() {},
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
        addSkillToState() {
            this.SET_PAGE(1);
        },
        addSkill() {
            this.skill.push({
                skill_name: document.getElementById('skill_name').value,
                proficiency_name: document.getElementById('proficiency_name').value
            })
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
            var replaceSkill = {
                skill_name: document.getElementById('skill_name' + index).value,
                proficiency_name: document.getElementById('proficiency_name'+ index).value
            }
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
            this.canClickAddSkillBtn()

            // document.getElementById('editing').style.display = "none"
            // console.log(document.getElementById('editing').style.display)
        }
    }
}
</script>
