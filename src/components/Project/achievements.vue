<template>
<div>
    <div v-if="this.achievement.length > 0">
        <div class="card lecturerCard" id="achievement">
            <header class="card-header">
                <p class="card-header-title" id="cardHeader">Achievement</p>
            </header>

            <div class="card-content">
                <div v-for="(ach,index) in achievement " v-bind:key="index">
                    <div class="card lecturerCard lecturerCourseCard" @click="showAchivement(index)">
                        <div class="card-content cardSize">
                            <div class="columns">
                                <div class="column  courseName"> {{ach.achievement_name}}</div>
                                <div class="column" style="font-size:10px">organize_by :{{ach.organize_by}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <md-button class="md-raised md-primary" id="addAchievementDialog" v-if="getEditProject === true" @click="addAchievementDialog = !addAchievementDialog">Add Achievement</md-button>

    <div v-if="addAchievementDialog==true">
        <div class="modal is-active">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Add Achievement</p>
                    <button class="delete closeDialog" ariaLabel="close" v-on:click="addAchievementDialog = false;clearInputValue()"></button>
                </header>
                <section class="modal-card-body">
                    <div class="field">
                        <label class="label inputName">Achievement Name</label>
                        <div class="control">
                            <input ref="achievementName" class="input inputData" type="text" placeholder="e.g. HackaTravel" v-model="achievement_name" />
                            <p ref="achievementNameValidate" class="help is-danger"></p>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label inputName">Achievement Detail</label>
                        <div class="control">
                            <textarea ref="achievementDetail" class="Normal textarea inputData" placeholder="e.g. Create New Era of Tourism in Thailand เปลี่ยนไอเดีย เป็น ธุรกิจท่องเที่ยว" v-model="achievement_detail"></textarea>
                            <p ref="achievementDetailValidate" class="help is-danger"></p>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column">
                            <div class="field">
                                <label class="label inputName">Organize By</label>
                                <div class="control">
                                    <input ref="company" class="input inputData" type="text" placeholder="e.g. การท่องเที่ยวแห่งประเทศไทย(ททท.)" v-model="organize_by">
                                    <p ref="companyValidate" class="help is-danger"></p>
                                </div>
                            </div>
                        </div>

                        <div class="column">
                            <div class="field">
                                <label class="label inputName">Date of Event</label>
                                <VueCtkDateTimePicker v-model="date_of_event" :formatted="formatted" :color="color" :only-date="onlydate" :label="label" :no-header="noHeader" :auto-close="autoClose" :no-button="noButton" :no-label="noLabel" />
                            </div>
                        </div>
                    </div>
                    <div class="addOutsiderButton">
                        <button class="button is-success" @click.prevent="addAchievement();">Add</button>
                    </div>
                </section>
            </div>
        </div>
    </div>
    <modal name="showDetails">
        <md-card-header>
            <md-card-header-text>
                <div class="md-title" id="title"> {{this.achievement_name}}</div>
            </md-card-header-text>
        </md-card-header>
        <md-card-content v-if="this.achievement_detail == null">
            <p style="text-indent: 2.5em;"> No detail </p>
        </md-card-content>
        <md-card-content v-else>
            <p style="text-indent: 2.5em;">{{this.achievement_detail}}</p>
        </md-card-content>
        <md-card-content v-if="this.organize_by">
            <p style="text-indent: 20em; margin-top:10%">Organize by : {{this.organize_by}}</p>
        </md-card-content>
        <md-card-content v-else>
            <p style="text-indent: 20em; margin-top:10%">Organize by : -</p>
        </md-card-content>
        <md-card-content v-if="this.date_of_event">
            <p style="text-indent: 20em;">Date of event : {{this.date_of_event}}</p>
        </md-card-content>
        <md-card-content v-else>
            <p style="text-indent: 20em;">Date of event : -</p>
        </md-card-content>

    </modal>

    <div v-if="editAchievementDialog==true">
        <div class="modal is-active">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Edit Achievement</p>
                    <button class="delete closeDialog" ariaLabel="close" v-on:click="editAchievementDialog = false;clearInputValue()"></button>
                </header>
                <section class="modal-card-body">
                    <div class="field">
                        <label class="label inputName">Achievement Name</label>
                        <div class="control">
                            <input ref="achievementName" class="input inputData" type="text" placeholder="e.g. HackaTravel" v-model="achievement_name" />
                            <p ref="achievementNameValidate" class="help is-danger"></p>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label inputName">Achievement Detail</label>
                        <div class="control">
                            <textarea ref="achievementDetail" class="Normal textarea inputData" placeholder="e.g. Create New Era of Tourism in Thailand เปลี่ยนไอเดีย เป็น ธุรกิจท่องเที่ยว" v-model="achievement_detail"></textarea>
                            <p ref="achievementDetailValidate" class="help is-danger"></p>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column">
                            <div class="field">
                                <label class="label inputName">Organize By</label>
                                <div class="control">
                                    <input ref="company" class="input inputData" type="text" placeholder="e.g. การท่องเที่ยวแห่งประเทศไทย(ททท.)" v-model="organize_by">
                                    <p ref="companyValidate" class="help is-danger"></p>
                                </div>
                            </div>
                        </div>

                        <div class="column">
                            <div class="field">
                                <label class="label inputName">Date of Event</label>
                                <VueCtkDateTimePicker v-model="date_of_event" :formatted="formatted" :color="color" :only-date="onlydate" :label="label" :no-header="noHeader" :auto-close="autoClose" :no-button="noButton" :no-label="noLabel" />
                            </div>
                        </div>
                    </div>
                    <div class="addOutsiderButton">
                        <button class="button is-success" @click.prevent="saveArchievement();editAchievementDialog = false">Save</button>
                    </div>
                </section>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
import {
    mapGetters,
    mapActions
} from 'vuex'

export default {
    data() {
        return {
            addAchievementDialog: false,
            editAchievementDialog: false,
            indexOfEdit: 0,

            achievement_name: null,
            achievement_detail: null,
            organize_by: null,
            date_of_event: null
        }
    },
    props: {
        formatted: {
            type: String,
            // default: 'DD-MM-YYYY'
            default: 'll'
        },
        color: {
            type: String,
            default: '#265080'
        },
        onlydate: {
            type: Boolean,
            default: true
        },
        label: {
            type: String,
            default: 'Select date'
        },
        noHeader: {
            type: Boolean,
            default: true
        },
        autoClose: {
            type: Boolean,
            default: true
        },
        noButton: {
            type: Boolean,
            default: true
        },
        noLabel: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        ...mapGetters({
            achievement: 'GET_ACHIEVEMENT',
            getEditProject: 'getEditProject',
            getAchievements: 'getAchievements'
        })
    },
    components: {
        VueCtkDateTimePicker
    },
    methods: {
        ...mapActions(['SET_ACHIEVEMENT']),
        addAchievement() {
            if (this.achievement_name != null && this.achievement_name.length > 0) {
                this.SET_ACHIEVEMENT({
                    achievement_name: this.achievement_name,
                    achievement_detail: this.achievement_detail,
                    organize_by: this.organize_by,
                    date_of_event: this.date_of_event,
                    project_id: this.$route.params.pId
                })
                this.addAchievementDialog = false
                this.clearInputValue()
            } else {
                this.$refs.achievementNameValidate.innerHTML = 'The field is required'
            }
        },
        clearInputValue() {
            this.achievement_name = null
            this.achievement_detail = null
            this.organize_by = null
            this.date_of_event = null
        },

        editArchievement(index) {
            this.achievement_name = this.getAchievements[index].achievement_name
            this.achievement_detail = this.getAchievements[index].achievement_detail
            this.organize_by = this.getAchievements[index].organize_by
            this.date_of_event = this.getAchievements[index].date_of_event

            this.indexOfEdit = index
        },
        saveArchievement() {
            console.log("index : " + this.indexOfEdit)
            this.achievement.splice(this.indexOfEdit, 1, {
                achievement_name: this.achievement_name,
                achievement_detail: this.achievement_detail,
                organize_by: this.organize_by,
                date_of_event: this.date_of_event
            })
            this.clearInputValue()
        },
        showAchivement(index) {
            console.log(this.achievement)
            this.achievement_name = this.achievement[index].achievement_name
            this.achievement_detail = this.achievement[index].achievement_detail
            this.organize_by = this.achievement[index].organize_by
            this.date_of_event = this.achievement[index].date_of_event
            this.$modal.show('showDetails')
        }
    },
    mounted() {
        // console.log('SET_ACHIEVEMENT',this.achievement)
    }
    //  beforeDestroy() {
    //      this.SET_ACHIEVEMENT(' ')
    // }
}
</script>

<style>
#addAchievementDialog {
    margin-right: 35%;
    margin-top: 20px;
    color: white;
    background-color: #265080 !important;
}

#title {
    color: #265080;
}
</style>
