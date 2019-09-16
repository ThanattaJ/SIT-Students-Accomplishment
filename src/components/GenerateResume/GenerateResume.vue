<template>
<div class="stricky">
    <article class="columns">
        <section class="column is-one-quarter resumeForm">
            <div v-if="GET_SHOWPAGE == 1">
                <div style="text-align:center">
                    <i class="la la-angle-left"></i>
                    <!-- <router-link to="/"><i class="la la-angle-left"></i></router-link> -->
                    <span class="titleText">Generate Resume</span>
                    <img src="./../../assets/upload.png" class="uploadImg" alt="Smiley face" height="22" width="22">
                </div>
                <div style="color:#F7F7F7;height:22px">.</div>
                <div>
                    <!-- <md-field>
                        <label>Fullname</label>
                        <md-input id="" :value="GET_FULLNAME" @change="handleUpdate('UPDATE_FIELD','SET_FULLNAME')"></md-input>
                    </md-field> -->
                    <md-field>
                        <label>Firstname</label>
                        <md-input id="" :value="GET_FIRSTNAME" @change="handleUpdate('UPDATE_FIELD','SET_FIRSTNAME')"></md-input>
                    </md-field>
                    <md-field>
                        <label>Lastname</label>
                        <md-input id="" :value="GET_LASTNAME" @change="handleUpdate('UPDATE_FIELD','SET_LASTNAME')"></md-input>
                    </md-field>
                    <md-field>
                        <label>Nickname</label>
                        <md-input id="" :value="GET_NICKNAME" @change="handleUpdate('UPDATE_FIELD','SET_NICKNAME')"></md-input>
                    </md-field>
                    <md-field>
                        <label>Biography</label>
                        <md-textarea md-autogrow id="" :value="GET_BIOGRAPHY" @change="handleUpdate('UPDATE_FIELD','SET_BIOGRAPHY')"></md-textarea>
                    </md-field>
                    <div class="mainTopic">ADDRESS<i class="la la-home" style="font-size:15px !important; margin-left:5px"></i></div>
                    <md-field>
                        <label>Street</label>
                        <md-input id="" :value="GET_STREET" @change="handleUpdate('UPDATE_FIELD','SET_STREET')"></md-input>
                    </md-field>
                    <md-field>
                        <label>Subdistrict</label>
                        <md-input id="" :value="GET_SUBDISTRICT" @change="handleUpdate('UPDATE_FIELD','SET_SUBDISTRICT')"></md-input>
                    </md-field>
                    <md-field>
                        <label>District</label>
                        <md-input id="" :value="GET_DISTRICT" @change="handleUpdate('UPDATE_FIELD','SET_DISTRICT')"></md-input>
                    </md-field>
                    <md-field>
                        <label>Province</label>
                        <md-input id="" :value="GET_PROVINCE" @change="handleUpdate('UPDATE_FIELD','SET_PROVINCE')"></md-input>
                    </md-field>
                    <md-field>
                        <label>Zipcode</label>
                        <md-input id="" :value="GET_ZIPCODE" @change="handleUpdate('UPDATE_FIELD','SET_ZIPCODE')"></md-input>
                    </md-field>
                    <div class="mainTopic">CONTACT INFO<i class="la la-whatsapp" style="font-size:15px !important; margin-left:5px"></i></div>
                    <md-field>
                        <label>Phone Number</label>
                        <md-input id="" :value="GET_PHONENO" @change="handleUpdate('UPDATE_FIELD','SET_PHONENO')"></md-input>
                    </md-field>
                    <md-field>
                        <label>Email</label>
                        <md-input id="" :value="GET_EMAIL" @change="handleUpdate('UPDATE_FIELD','SET_EMAIL')"></md-input>
                    </md-field>
                    <md-field>
                        <label>Date of Birth</label>
                        <md-input id="" :value="GET_BIRTHDAY" @change="handleUpdate('UPDATE_FIELD','SET_BIRTHDAY')"></md-input>
                    </md-field>
                </div>

                <div style="color:#F7F7F7;height:12px">.</div>

                <!-- Website -->
                <div id="topic8" class="topic" v-on:click="SET_PAGE(2)">
                    <i class="la la-ellipsis-v"></i>
                    <span>Websites</span>
                    <span class="plusIcon"><i class="la la-plus"></i></span>
                </div>
                <div style="color:#F7F7F7;height:12px">.</div>
                <!-- EXTENDED INFO -->
                <div class="mainTopic">EXTENDED INFO<i class="la la-info-circle" style="font-size:15px !important; margin-left:5px"></i></div>
                <div style="color:#F7F7F7;height:12px">.</div>
                <!-- Educations -->
                <div id="topic9" class="topic" v-on:click="SET_PAGE(3)">
                    <i class="la la-ellipsis-v"></i>
                    <span>Educations</span>
                    <span class="plusIcon"><i class="la la-plus"></i></span>
                </div>
                <div style="color:#F7F7F7;height:12px">.</div>
                <!-- Experiences -->
                <div id="topic10" class="topic" v-on:click="SET_PAGE(4)">
                    <i class="la la-ellipsis-v"></i>
                    <span>Experiences</span>
                    <span class="plusIcon"><i class="la la-plus"></i></span>
                </div>
                <div style="color:#F7F7F7;height:12px">.</div>
                <!-- Skills -->
                <div id="topic11" class="topic" v-on:click="SET_PAGE(5)">
                    <i class="la la-ellipsis-v"></i>
                    <span>Skills</span>
                    <span class="plusIcon"><i class="la la-plus"></i></span>
                </div>
                <div style="color:#F7F7F7;height:12px">.</div>
                <!-- Languages -->
                <div id="topic12" class="topic" v-on:click="SET_PAGE(6)">
                    <i class="la la-ellipsis-v"></i>
                    <span>Languages</span>
                    <span class="plusIcon"><i class="la la-plus"></i></span>
                </div>
                <div style="text-align:center;margin-top: 20px;">
                    <a class="button is-rounded savepdf" onclick="printJS({
                        printable: 'printJS-form', 
                        type: 'html',
                        style: `@import url('https://fonts.googleapis.com/css?family=Asap');`,
                        font: 'Asap',
                        targetStyles: ['*']
                        })">
                        <span>Save as PDF</span>
                        <span class="icon">
                            <i class="la la-download"></i>
                        </span>
                    </a>
                </div>

                <div style="color:#F7F7F7;height:90px"></div>
            </div>
            <!-- Website -->
            <div v-if="GET_SHOWPAGE == 2">
                <addWebsite></addWebsite>
            </div>

            <!-- Education -->
            <div v-if="GET_SHOWPAGE == 3">
                <addEducation></addEducation>
            </div>
            <!-- Experience -->
            <div v-if="GET_SHOWPAGE == 4">
                <addExperience></addExperience>
            </div>
            <!-- Skill -->
            <div v-if="GET_SHOWPAGE == 5">
                <addSkill></addSkill>
            </div>
            <!-- Language -->
            <div v-if="GET_SHOWPAGE == 6">
                <addLanguage></addLanguage>
            </div>
        </section>

        <section class="column resumeGen">
            <resumePdf></resumePdf>
        </section>

    </article>

</div>
</template>

<script>
import './../css/genResume.css';
import addWebsite from './addWebsite'
import addEducation from './addEducation.vue'
import addExperience from './addExperience.vue'
import addSkill from './addSkill.vue'
import addLanguage from './addLanguage.vue'
import resumePdf from './resumePdf.vue'
import {
    mapGetters,
    mapActions
} from 'vuex'

export default {
    data() {
        return {
            page: '1',
        }
    },
    components: {
        addWebsite,
        addEducation,
        addExperience,
        addSkill,
        addLanguage,
        resumePdf
    },
    computed: {
        ...mapGetters(['GET_SHOWPAGE', 'GET_RESUME_DATA', 'GET_FIRSTNAME', 'GET_LASTNAME', 'GET_NICKNAME', 'GET_BIOGRAPHY',
            'GET_STREET', 'GET_SUBDISTRICT', 'GET_DISTRICT', 'GET_PROVINCE', 'GET_ZIPCODE',
            'GET_EMAIL', 'GET_PHONENO', 'GET_BIRTHDAY',
            // 'GET_WEBSITE', 'GET_EDUCATION_DATA', 'GET_EXPERIENCE_DATA', 'GET_SKILL', 'GET_LANGUAGE'
        ])
    },
    mounted() {
        this.LOAD_RESUME_DATA()
    },
    methods: {
        ...mapActions(['SET_PAGE', 'LOAD_RESUME_DATA', 'UPDATE_FIELD']),
        handleUpdate(actionName, setter) {
            this[actionName]({
                callSetter: setter,
                value: event.target.value
            })
        }
    }
}
</script>
