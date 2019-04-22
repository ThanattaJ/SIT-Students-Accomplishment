<template>
    <div id="body-bg">
        <div class="columns is-mobile">
            <div class="column is-one-fifth">
                <div>
                    <vue-step :now-step="nowStep" :step-list="stepList" :active-color="activeColor" :direction="direction"></vue-step>
                </div>
            </div>
            <div class="column">
                <div class="card card-equal-height">
                    <div class="card-content form">
                        <div class="content">
                            <form>
<!-- step1 -->
                                <div v-if="nowStep === 1">
                                    <step1 
                                        v-on:childToParent1="getPortPageNameENfromChild($event)"
                                        v-on:childToParent2="getPortPageNameTHfromChild($event)"
                                        v-on:childToParent3="getStartMonthfromChild($event)"
                                        v-on:childToParent4="getStartYearfromChild($event)"
                                        :portParent="portParent"
                                    />
                                </div>
<!-- step2 -->
                                <div v-if="nowStep === 2">
                                    <step2
                                        v-on:childToParent6="getPortPageDetailENfromChild($event)"
                                        v-on:childToParent7="getPortPageDetailTHfromChild($event)"
                                        :port_detail_Parent="port_detail_Parent"
                                    />
                                </div>
<!-- step3 -->
                                <div v-if="nowStep === 3">
                                    <!-- v-if="portParent.haveOutsider=='true'" -->
                                    <step3haveOutsider 
                                        v-on:childToParent8="getMemberfromChild($event)"
                                        v-on:childToParent9="getSelectedStudentfromChild($event)"
                                        :membersParent="membersParent"
                                        :selectedStudentParent="selectedStudentParent"
                                    />
                                    <!-- <step3noOutsider v-if="portParent.haveOutsider=='false'"
                                        v-on:childToParent8="getMemberfromChild($event)"
                                        v-on:childToParent9="getSelectedStudentfromChild($event)"
                                        :membersParent="membersParent"
                                        :selectedStudentParent="selectedStudentParent"
                                    /> -->
                                </div>
<!-- step1 -->
                                <div v-if="nowStep === 4">
                                    <step4 
                                        v-on:childToParent10="getAchievementNamefromChild($event)"
                                        v-on:childToParent11="getAchievementDetailfromChild($event)"
                                        v-on:childToParent12="getCompanyfromChild($event)"
                                        v-on:childToParent13="getDateOfEventfromChild($event)"
                                        v-on:childToParent14="getMonthOfEventfromChild($event)"
                                        v-on:childToParent15="getYearOfEventfromChild($event)"
                                        :achievementParent="achievementParent"
                                    />
                                </div>
<!-- next, back -->
                                <footer class="card-footer field is-grouped is-grouped-centered backNext">
                                    <button class="card-footer-item button backButton" @click.prevent="prev">
                                        <p class="letterBackNext">Back</p> 
                                    </button>
                                    <button class="card-footer-item button nextButton" @click.prevent="next">
                                        <p class="letterBackNext">Next</p> 
                                    </button>
                                    <!-- <button class="card-footer-item button nextButton" @click.prevent="sendDataToDb">
                                        <p class="letterBackNext">Test Submit</p> 
                                    </button> -->
                                </footer>
                            </form>
                            <!-- Child to Parent<br>
                            {{achievementParent.achievementName}} <br>
                            Parent : {{achievementParent.achievementDetail}} <br> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        Port name EN : {{portParent.portPageNameEN}} <br>
        Port name TH : {{portParent.portPageNameTH}} <br>
        Start : {{portParent.startMonth}} / {{portParent.startYear}} <br>
        Have outsider : {{membersParent.haveOutsider}} <br>
        <hr>
        Port Detail EN : {{port_detail_Parent.portPageDetailEN}} <br>
        Port Detail TH : {{port_detail_Parent.portPageDetailTH}} <br>
        <hr>
        Student Members : {{membersParent.student}} <br>
        Outsider Members : {{membersParent.outsider}} <br>
        <hr>
        Achievement name : {{achievementParent.achievementName}} <br>
        Achievement detail : {{achievementParent.achievementDetail}} <br>
        Company : {{achievementParent.company}} <br>
        Date of Event : {{achievementParent.dateOfEvent}} / {{achievementParent.monthOfEvent}} / {{achievementParent.yearOfEvent}} <br>
    </div>
</template>

<script>
import './../css/form.css';
import vueStep from 'vue-step';
import step1 from './step1.vue';
import step2 from './step2.vue';
import step3haveOutsider from './step3haveOutsider.vue';
import step3noOutsider from './step3noOutsider.vue';
import step4 from './step4.vue';
import axios from 'axios';

export default {
    data() {
      return {
            // step list
            nowStep: 1,
            stepList: [
                'Create Portfolio Page',
                'Project Datail',
                'Team Members',
                'Acheivement'
            ],
            activeColor:'#265080',
            direction: 'vertical',

            //step1
            portParent: {
                portPageNameEN: "",
                portPageNameTH: "",
                startMonth: null,
                startYear: null,
            },
            //step2
            port_detail_Parent: {
                portPageDetailEN: null,
                portPageDetailTH: null
            },
            //step3
            membersParent: {
                haveOutsider: null,
                student: [],
                outsider: []
            },
            selectedStudentParent: [],
            //step4
            achievementParent: {
                achievementName: null,
                achievementDetail: null,
                company: null,
                dateOfEvent: null,
                monthOfEvent: null,
                yearOfEvent: null
            }
        }
    },
    methods:{
        prev: function() {
            this.nowStep--;
        },
        next: function() {
            this.nowStep++;
        },
        //step1
        getPortPageNameENfromChild(portPageNameEN){
            this.portParent.portPageNameEN = portPageNameEN
        },
        getPortPageNameTHfromChild(portPageNameTH){
            this.portParent.portPageNameTH = portPageNameTH
        },
        getStartMonthfromChild(startMonth){
            this.portParent.startMonth = startMonth
        },
        getStartYearfromChild(startYear){
            this.portParent.startYear = startYear
        },
        //step2
        getPortPageDetailENfromChild(portPageDetailEN){
            this.port_detail_Parent.portPageDetailEN = portPageDetailEN
        },
        getPortPageDetailTHfromChild(portPageDetailTH){
            this.port_detail_Parent.portPageDetailTH = portPageDetailTH
        },
        //step3
        getMemberfromChild(members){
            this.membersParent = members
        },
        getSelectedStudentfromChild(selectedStudent){
            this.selectedStudentParent = selectedStudent
        },
        //step4
        getAchievementNamefromChild(achievementName){
            this.achievementParent.achievementName = achievementName
        },
        getAchievementDetailfromChild(achievementDetail){
            this.achievementParent.achievementDetail = achievementDetail
        },
        getCompanyfromChild(company){
            this.achievementParent.company = company
        },
        getDateOfEventfromChild(dateOfEvent){
            this.achievementParent.dateOfEvent = dateOfEvent
        },
        getMonthOfEventfromChild(monthOfEvent){
            this.achievementParent.monthOfEvent = monthOfEvent
        },
        getYearOfEventfromChild(yearOfEvent){
            this.achievementParent.yearOfEvent = yearOfEvent 
        },
        async sendDataToDb() {
            const data = 
                {
                    "project_data": {
                        "project_name_th": this.portParent.portPageNameTH,
                        "project_name_en": this.portParent.portPageNameEN,
                        "project_type_name": "external",
                        "project_detail_th": "ดีเทลลึ",
                        "project_detail_en": null,
                        "start_month": 2,
                        "start_year_en": 2019,
                        "haveOutsider": true
                    },
                    "member": {
                        "students": [
                            {
                                "student_id":59130500001
                            },
                            {
                                "student_id":59130500002
                            }
                        ],
                        "outsiders": [ 
                            {
                                "firstname": "firstname1",
                                "lastname": "lastname1"
                            }
                        ]
                    },
                    "achievement": {
                    "achievement_name": "test",
                    "achievement_detail": "test",
                    "organize_by": "test",
                    "date_of_event": "06-04-2019"
                    }
                };
            try {
                await axios.post("http://localhost:7000/projects/external", data
                )
                .then(res => {
                    console.log(res);
                })
                .catch(res => {
                    console.log(res);
                })
            } catch(err) {
                console.log('FAILURE!!'+err)
            }
        }
        // //validation
        // validate() {
        //     if(this.nowStep = 1){
        //         if(this.portParent.portPageNameEN == null){
        //             alert("please fill port page eng")
        //         }if(this.portParent.portPageNameTH == null){
        //             alert("please fill port page thai")                    
        //         }else{
        //             this.next()
        //         }
        //     }
        // }
    },
    components: {
        vueStep,step1,step2,step3haveOutsider,step3noOutsider,step4
    }
}
</script>

