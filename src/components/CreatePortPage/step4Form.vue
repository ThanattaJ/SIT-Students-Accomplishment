<template>
<div>
    <div class="stepName">Project Achievement <i class="la la-certificate"></i></div>
    <!-- <div class="field">
        <label class="label inputName">Achievement Name</label>
        <div class="control">
            <input ref="achievementName" class="input inputData" type="text" placeholder="e.g. HackaTravel" />
            <p ref="achievementNameValidate" class="help is-danger"></p>
        </div>
    </div>
    <div class="field">
        <label class="label inputName">Achievement Detail</label>
        <div class="control">
            <textarea ref="achievementDetail" class="Normal textarea inputData" placeholder="e.g. Create New Era of Tourism in Thailand เปลี่ยนไอเดีย เป็น ธุรกิจท่องเที่ยว"></textarea>
            <p ref="achievementDetailValidate" class="help is-danger"></p>
        </div>
    </div>
    <div class="columns">
        <div class="column">
            <div class="field">
                <label class="label inputName">Organize By</label>
                <div class="control">
                    <input ref="company" class="input inputData" type="text" placeholder="e.g. การท่องเที่ยวแห่งประเทศไทย(ททท.)">
                    <p ref="companyValidate" class="help is-danger"></p>
                </div>
            </div>
        </div>

        <div class="column">
            <div class="field">
                <label class="label inputName">Date of Event</label>
                <VueCtkDateTimePicker v-model="date" :formatted="formatted" :color="color" :only-date="onlydate" :label="label" :no-header="noHeader" :auto-close="autoClose" :no-button="noButton" :no-label="noLabel" />
            </div>
        </div>
    </div> -->
    <div v-for="(ach,index) in achievement" v-bind:key="index">
        <div class="field has-addons">
            <p class="control" style="width:4%">
                {{index+1}}.
            </p>
            <p class="control" style="width:45%;word-break: break-all;">
                {{ach.achievement_name}}
            </p>
            <p class="control is-expanded" style="word-break: break-all;">
                {{ach.organize_by}}
            </p>
            <p class="control">
                <i class="la la-edit" @click="editAchievementDialog = !editAchievementDialog;editArchievement(index)"></i>
                <i :id="'trash'+index" class="la la-trash" @click="removeArchievement(index)"></i>
            </p>
        </div>
    </div>
    <div class="buttons has-addons is-right">
        <span class="button addAchievement" @click="addAchievementDialog = !addAchievementDialog">+ Add more...</span>
    </div>

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
                                <VueCtkDateTimePicker v-model="date_of_event"  :locale="locale" :formatted="formatted" :color="color" :only-date="onlydate" :label="label" :no-header="noHeader" :auto-close="autoClose" :no-button="noButton" :no-label="noLabel" />
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
                                <VueCtkDateTimePicker v-model="date_of_event" :locale="locale" :formatted="formatted" :color="color" :only-date="onlydate" :label="label" :no-header="noHeader" :auto-close="autoClose" :no-button="noButton" :no-label="noLabel" />
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
        locale: {
            type: String,
            default: 'en'
        },
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
            achievement: 'GET_ACHIEVEMENT'
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
                    date_of_event: this.date_of_event
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
        removeArchievement(index) {
            this.achievement.splice(index, 1)
        },
        editArchievement(index) {
            this.achievement_name = this.achievement[index].achievement_name
            this.achievement_detail = this.achievement[index].achievement_detail
            this.organize_by = this.achievement[index].organize_by
            this.date_of_event = this.achievement[index].date_of_event

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
        }
    }
}
</script>

<style>
.datetimepicker[data-v-564d30d4] {
    bottom: 46% !important;
    position: fixed !important;
    z-index: 9 !important;
    width: 100% !important;
}
</style>
