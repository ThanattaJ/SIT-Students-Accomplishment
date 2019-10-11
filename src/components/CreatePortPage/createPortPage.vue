<template>
<div id="body-bg">
    <div style="margin-top: -25px;">
        <stepProgress :steps="mySteps" :currentStep="currentStep" iconClass="la la-check"></stepProgress>
    </div>
    <div class="columns">
        <div class="column stepCard">
            <div class="card card-equal-height">
                <div class="card-content form">
                    <div class="content">
                        <form>
                            <div v-if="currentStep === 0">
                                <!-- step1 -->
                                <ValidationObserver tag="form" ref="obs1" v-slot="{ invalid }">
                                    <step1Form />
                                </ValidationObserver>
                            </div>
                            <div v-if="currentStep === 1">
                                <!-- step2 -->
                                <step2Form />
                                <p class="help is-danger" v-if="invalidStep2">* Please write at least 1 field</p>

                            </div>
                            <div v-if="currentStep === 2">
                                <!-- step3 -->
                                <step3Form />
                            </div>
                            <div v-if="currentStep === 3">
                                <!-- step4 -->
                                <step4Form />
                            </div>
                        </form>
                    </div>
                </div>
                <footer class="card-footer field is-grouped is-grouped-centered">
                    <button class="card-footer-item button backButton" @click.prevent="prev" v-if="currentStep > 0">
                        <p class="letterBackNext">Back</p>
                    </button>
                    <button class="card-footer-item button nextButton" @click.prevent="next" v-if="currentStep != 3">
                        <p class="letterBackNext">Next</p>
                    </button>
                    <button class="card-footer-item button nextButton" @click.prevent="CREATE_PROJECT" v-if="currentStep == 3">
                        <p class="letterBackNext">Submit</p>
                    </button>
                </footer>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    mapGetters,
    mapActions
} from 'vuex'

import axios from "axios";
import StepProgress from 'vue-step-progress';
import 'vue-step-progress/dist/main.css';
import "./../css/form.css";
import step1Form from "./step1Form.vue";
import step2Form from "./step2Form.vue";
import step3Form from "./step3Form.vue";
import step4Form from "./step4Form.vue";
import {
    ValidationObserver,
    ValidationProvider
} from "vee-validate";

export default {
    data() {
        return {
            mySteps: ['Create Project', 'Project Overview', 'Project Members', 'Project Achievement'],
            currentStep: 0,

            invalidStep2: false
        };
    },

    mounted() {
        this.LOAD_ALL_STUDENT()
    },

    computed: {
        ...mapGetters({
            allStudent: 'GET_ALL_STUDENT',
            project_detail: 'GET_PROJECT_DETAIL',
            project_abstract: 'GET_PROJECT_ABSTRACT',

            project_data: 'GET_PROJECT_DATA',
            member_student: 'GET_SELECTED_STUDENT_MEMBER',
            member_outsider: 'GET_OUTSIDER',
            achievement: 'GET_ACHIEVEMENT',
            config: 'GET_CONFIG',
        })
    },

    methods: {
        ...mapActions(['LOAD_ALL_STUDENT', 'CREATE_PROJECT', 'SET_HAVE_OUTSIDER',
            'UPDATE_FIELD',
            'SET_SELECTED_STUDENT_MEMBER', 'SET_OUTSIDER',
            'SET_ACHIEVEMENT'
        ]),
        prev: function () {
            if (this.currentStep != 0) {
                this.currentStep--;
            }
        },
        async next() {
            if (this.currentStep == 0) {
                var value = await this.$refs.obs1.validate();
                console.log(value)
                if (value) {
                    // if (true) {
                    this.currentStep++;
                }
            } else if (this.currentStep == 1) {
                if (this.project_detail.length > 0 || this.project_abstract.length > 0) {
                    this.currentStep++;
                    this.invalidStep2 = false
                } else {
                    this.invalidStep2 = true
                }
            } else if (this.currentStep == 2) {
                this.currentStep++;
            }
        },
        async CREATE_PROJECT() {
            var studentID_member = []
            for (var n = 0; n < this.member_student.length; n++) {
                studentID_member.push({
                    student_id: this.member_student[n].text
                })
            }

            if (this.member_outsider.length > 0) {
                this.SET_HAVE_OUTSIDER()
            }

            if (this.project_abstract == "") {
                this.project_data.project_abstract = null
                console.log("this.project_abstract : " + this.project_data.project_abstract)
            }
            if (this.project_detail == "") {
                this.project_data.project_detail = null
                console.log("this.project_detail : " + this.project_data.project_detail)
            }
            var data;
            data = {
                project_data: this.project_data,
                member: {
                    students: studentID_member,
                    outsiders: JSON.parse(JSON.stringify(this.member_outsider))
                }
            };
            data.project_data.start_year_en = parseInt(data.project_data.start_year_en)
            data.project_data.end_year_en = parseInt(data.project_data.end_year_en)

            if (this.achievement.length > 0) {
                console.log("have achievement");
                data["achievements"] = this.achievement
                for (var n = 0; n < this.achievement.length; n++) {
                    var date = this.achievement[n].date_of_event
                    if (date != null) {
                        data.achievements[n].date_of_event = date.substring(8, 10) + "-" + date.substring(5, 7) + "-" + date.substring(0, 4)
                        console.log("date : " + data.achievements[n].date_of_event)
                    }
                }
            }
            // const config = {
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiJzdHVkZW50MDEiLCJmdWxsbmFtZSI6InN0dWRlbnQwMSIsImVtYWlsIjoic3R1ZGVudDAxQHN0LnNpdC5rbXV0dC5hYy50aCIsImRlc2NyaXB0aW9uIjoiQ1MiLCJyb2xlIjoic3R1ZGVudCIsImlhdCI6MTU2OTUwOTU1NzQxMX0.n7-qj3563sovVgYgbkPiK5ZqirMRvD2qAsGMvvvXcbg'
            //     }
            // }
            try {
                console.log("data : ", data)
                await axios
                    // .post("http://localhost:7000/projects/external", data, this.config)
                    .post("https://www.sit-acc.nruf.in.th/projects/external", data, this.config)
                    .then((res) => {
                        console.log("res : ", res.data);
                        this.$router.push({
                            path: `/ProjectDetail/${res.data.project_id}`
                        });
                        console.log("success!");
                        this.resetField()
                    })
                    .catch((err) => {
                        console.error("aaaaaaaa : ", err);
                    });
            } catch (err) {
                console.log("FAILURE!!" + err);
            }
        },
        resetField() {
            this.UPDATE_FIELD({callSetter: 'SET_PROJECTNAME_EN', value: null})
            this.UPDATE_FIELD({callSetter: 'SET_PROJECTNAME_TH', value: null})
            this.UPDATE_FIELD({callSetter: 'SET_DATE_STARTPROJECT', value: null})
            this.UPDATE_FIELD({callSetter: 'SET_DATE_ENDPROJECT', value: null})
            this.UPDATE_FIELD({callSetter: 'SET_PROJECT_ABSTRACT', value: ""})
            this.UPDATE_FIELD({callSetter: 'SET_PROJECT_DETAIL', value: ""})

            // commit(callSetter, value)
            this.SET_SELECTED_STUDENT_MEMBER([])
                // commit('SET_SELECTED_STUDENT_MEMBER', student)
            this.SET_OUTSIDER([])
                // commit('SET_OUTSIDER', outsider)
            this.SET_HAVE_OUTSIDER(false)
                // commit('SET_HAVE_OUTSIDER')
            this.SET_ACHIEVEMENT([])
                // commit('SET_ACHIEVEMENT', achievement)
            
        }
    },

    components: {
        StepProgress,
        step1Form,
        step2Form,
        step3Form,
        step4Form,
        ValidationObserver,
        ValidationProvider
    }
};
</script>
