<template>
<div>
    <div class="genText">
        <i class="la la-angle-left" v-on:click="addLanguageToState"></i>
        <span class="titleText">Languages</span>
    </div>
    <div id="addLanguageBtn" class="addLanguageBtn" v-if="clickAddLanguage == false" @click="cannotClick();clickAddLanguage = !clickAddLanguage" style="margin-bottom:10px">+ Add Language</div>
    <!-- form for add -->
    <div class="language" v-else style="margin-bottom:10px">
        <div class="select">
            <select id="language_name" class="selectInGenResume" required>
                <option selected disabled>Select a Language ...</option>
                <option v-for="(language,index) in language_list" v-bind:key="index" :value="[language.language_name,index+1]">{{language.language_name}}</option>
            </select>
        </div>
        <div class="select">
            <select id="proficiency_name" class="selectInGenResume" required>
                <option selected disabled>Select a Proficiency ...</option>
                <option v-for="(level,index) in proficiency" v-bind:key="index" :value="[level.level_name,index+1]">{{level.level_name}}</option>
            </select>
        </div>
        <a class="button is-small saveBtn" @click="canClick();addLanguage();clickAddLanguage = !clickAddLanguage">Add</a>
        <a class="button is-small cancelBtn" @click="canClick();clickAddLanguage = !clickAddLanguage">Cancel</a>
    </div>
    <!-- form for edit -->
    <div id="editing" class="language editing" v-if="showForm == true && language.length>0">
        <div class="select">
            <select :id="'language_name'+getIndex" required class="selectInGenResume">
                <option disabled selected :value="[language[getIndex].language_name,getIndex+1]">{{language[getIndex].language_name}}</option>
                <option v-for="(language,index) in language_list" v-bind:key="index" :value="[language.language_name,index+1]">{{language.language_name}}</option>
            </select>
        </div>
        <div class="select">
            <select :id="'proficiency_name'+getIndex" required class="selectInGenResume">
                <option disabled selected :value="[language[getIndex].level_name,getIndex+1]">{{language[getIndex].level_name}}</option>
                <option v-for="(level,index) in proficiency" v-bind:key="index" :value="[level.level_name,index+1]">{{level.level_name}}</option>
            </select>
        </div>
        <a class="button is-small saveBtn" @click="saveChange(getIndex);showForm = false" style="margin-top: 3px;">Save</a>
        <a class="button is-small cancelBtn" @click="cancelChange(getIndex);showForm = false" style="margin-top: 3px;">Cancel</a>
        <i class="la la-trash" style="float:right" @click="removeLanguage(getIndex);showForm = false"></i>
    </div>
    <!-- show language -->
    <div :id="'edit'+index" class="columns allLanguage" v-for="(l,index) in language" v-bind:key="index" @click="showDetail(index);showForm = true;">
        <div class="column is-1 languageList">
            <i class="la la-ellipsis-v languageIcon"></i>
        </div>
        <div class="column">
            <p class="showLanguage schoolname">{{l.language_name}}</p>
            <p class="showLanguage levelEdu">{{l.level_name}}</p>
        </div>
    </div>
    <!-- {{language}} -->
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
            clickAddLanguage: false,
            language_list: [],
            proficiency: [],
            showForm: false,
            getIndex: 0
        }
    },
    computed: {
        ...mapGetters({
            language: 'GET_LANGUAGE',
            config: 'GET_CONFIG',
            URL: 'GET_PATHNAME'
        })
    },
    async mounted() {
        // if(this.language == null){
        //     this.language = []
        // }
        const {
            data
        } = await axios.get(
            this.URL + "/users/languages"
        );
        this.language_list = data.language
        this.proficiency = data.level
    },
    methods: {
        ...mapActions(['SET_PAGE']),
        canClick() {
            for (var n = 0; n < this.language.length; n++) {
                document.getElementById('edit' + n).setAttribute("class", "columns allLanguage")
            }
        },
        cannotClick() {
            for (var n = 0; n < this.language.length; n++) {
                document.getElementById('edit' + n).setAttribute("class", "columns allLanguage mystyle")
            }
        },
        canClickAddSkillBtn() { //ทำให้กดปุ่มได้
            document.getElementById('addLanguageBtn').setAttribute("class", "addLanguageBtn")
        },
        cannotClickAddSkillBtn() { //ทำให้กดปุ่มไม่ได้
            document.getElementById('addLanguageBtn').setAttribute("class", "addLanguageBtn mystyle")
        },
        async addLanguageToState() {
            this.SET_PAGE(1);
            // const config = {
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiJzdHVkZW50MDEiLCJmdWxsbmFtZSI6InN0dWRlbnQwMSIsImVtYWlsIjoic3R1ZGVudDAxQHN0LnNpdC5rbXV0dC5hYy50aCIsImRlc2NyaXB0aW9uIjoiQ1MiLCJyb2xlIjoic3R1ZGVudCIsImlhdCI6MTU2OTUwOTU1NzQxMX0.n7-qj3563sovVgYgbkPiK5ZqirMRvD2qAsGMvvvXcbg'
            //     }
            // }
            const languageData = []
            for (var n = 0; n < this.language.length; n++) {
                languageData.push({
                    language_id: this.language[n].languages_id,
                    level_id: this.language[n].languages_level_id
                })
            }
            const data = {
                languages: languageData
            }
            console.log("All lang : ", data)
            try {
                await axios
                    .patch(this.URL + "/users/languages", data, this.config)
                    .then((res) => {
                        console.log("res : ", res);
                        console.log("success!");
                    })
                    .catch((err) => {
                        console.error("err : " + err);
                    });
            } catch (err) {
                console.log("FAILURE!!" + err);
            }
        },
        addLanguage() {
            var language_name = document.getElementById('language_name').value
            var proficiency_name = document.getElementById('proficiency_name').value
            var lan_id = language_name.substring(language_name.indexOf(',') + 1)
            var level_id = proficiency_name.substring(proficiency_name.indexOf(',') + 1)
            console.log(language_name + " " + proficiency_name + " " + lan_id + " " + level_id)
            this.language.push({
                languages_id: Number(lan_id),
                language_name: language_name.substring(0, language_name.indexOf(',')),
                languages_level_id: Number(level_id),
                level_name: proficiency_name.substring(0, proficiency_name.indexOf(','))
            })
        },
        showDetail(index) {
            this.cannotClickAddSkillBtn()
            this.cannotClick()
            document.getElementById('edit' + index).style.display = 'none'
            this.getIndex = index
            return this.getIndex
        },
        saveChange(index) {
            var language_name = document.getElementById('language_name' + index).value
            var proficiency_name = document.getElementById('proficiency_name' + index).value
            var lan_id = language_name.substring(language_name.indexOf(',') + 1)
            var level_id = proficiency_name.substring(proficiency_name.indexOf(',') + 1)
            console.log(language_name + " " + proficiency_name + " " + lan_id + " " + level_id)

            var replaceLanguage = {
                languages_id: Number(lan_id),
                language_name: language_name.substring(0, language_name.indexOf(',')),
                languages_level_id: Number(level_id),
                level_name: proficiency_name.substring(0, proficiency_name.indexOf(','))
            }
            this.language.splice(index, 1, replaceLanguage)
            this.cancelChange(index)
            this.canClickAddSkillBtn()
        },
        cancelChange(index) {
            this.canClickAddSkillBtn()
            this.canClick()
            document.getElementById('edit' + index).style.display = 'flex'
        },
        removeLanguage(index) {
            this.language.splice(index, 1)
            this.canClickAddSkillBtn()
            this.canClick()
            document.getElementById('edit' + index).style.display = 'flex'
        }
    }
}
</script>
