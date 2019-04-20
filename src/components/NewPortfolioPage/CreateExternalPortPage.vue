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
                                        v-on:childToParent5="getHaveOutsiderfromChild($event)"
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
                                    <step3haveOutsider v-if="portParent.haveOutsider=='true'"
                                        v-on:childToParent8="getMemberfromChild($event)"
                                        v-on:childToParent9="getSelectedStudentfromChild($event)"
                                        :membersParent="membersParent"
                                        :selectedStudentParent="selectedStudentParent"
                                    />
                                    <step3noOutsider v-if="portParent.haveOutsider=='false'"
                                        v-on:childToParent8="getMemberfromChild($event)"
                                        v-on:childToParent9="getSelectedStudentfromChild($event)"
                                        :membersParent="membersParent"
                                        :selectedStudentParent="selectedStudentParent"
                                    />
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
        Have outsider : {{portParent.haveOutsider}} <br>
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
                portPageNameEN: null,
                portPageNameTH: null,
                startMonth: null,
                startYear: null,
                haveOutsider: null
            },
            //step2
            port_detail_Parent: {
                portPageDetailEN: null,
                portPageDetailTH: null
            },
            //step3
            membersParent: {
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
        getHaveOutsiderfromChild(haveOutsider){
            this.portParent.haveOutsider = haveOutsider
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

