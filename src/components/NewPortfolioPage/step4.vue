<template>
    <div>
        <div class="stepName">Achievement</div>
        <div class="field">
            <!-- Parent to Child : <br>
            {{achievementChild.achievementName}} <br>
            Child : {{achievementChild.achievementDetail}} <br> -->
            <label class="label inputName">Achievement name</label>
            <div class="control">
                <input class="input inputData" type="text" placeholder="Achievement name" v-model="achievementChild.achievementName"  v-on:keyup="emitToParent10"/>
            </div>
        </div>
        <div class="field">
            <label class="label inputName">Achievement Detail</label>
            <div class="control">
                <textarea class="Normal textarea inputData" placeholder="Detail..." v-model="achievementChild.achievementDetail"  v-on:keyup="emitToParent11"></textarea>
            </div>
        </div>
        <div class="columns"> 
            <div class="column">
                <div class="field">
                    <label class="label inputName">Organize by</label>
                    <div class="control">
                        <input class="input inputData" type="text" placeholder="Company name" v-model="achievementChild.company"  v-on:keyup="emitToParent12">
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="field">
                    <label class="label inputName">Date of Event</label>
                    <!-- <div class="control">
                        <input class="input inputData" type="text" placeholder="Wimaluangtrakul">
                    </div> -->
                    <div class="columns field"> 
            <div class="column">
                <span class="select">
                    <select style="background-color: #ECECEC;" v-model="achievementChild.dateOfEvent" v-on:change="emitToParent13">
                        <option selected disabled :value=null>Date</option>
                        <option v-for="(d,index) in dates" v-bind:key="index" :value="d">{{d}}</option>
                    </select>
                </span>
            </div>
            <div class="column">
                <span class="select">
                    <select style="background-color: #ECECEC;" v-model="achievementChild.monthOfEvent" v-on:change="emitToParent14">
                        <option selected disabled :value=null>Month</option>
                        <option v-for="(m,index) in months" v-bind:key="index" :value="m.id">{{m.month}}</option>
                    </select>
                </span>
            </div>
            <div class="column">
                <span class="select">
                    <select style="background-color: #ECECEC;" v-model="achievementChild.yearOfEvent" v-on:change="emitToParent15">
                        <option selected disabled :value=null>Year</option>
                        <option v-for="(y,index) in years" v-bind:key="index">{{y}}</option>
                    </select>
                </span>
            </div>
        </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name : 'Achievement',
    data () {
        return {
            achievementChild:{
                achievementName: this.achievementParent.achievementName,
                achievementDetail: this.achievementParent.achievementDetail,
                company: this.achievementParent.company,
                dateOfEvent: this.achievementParent.dateOfEvent,
                monthOfEvent: this.achievementParent.monthOfEvent,
                yearOfEvent: this.achievementParent.yearOfEvent
            },
            dates: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
            months: [
                {month:'Jan',id:1},
                {month:'Feb',id:2},
                {month:'Mar',id:3},
                {month:'Apr',id:4},
                {month:'May',id:5},
                {month:'Jun',id:6},
                {month:'Jul',id:7},
                {month:'Aug',id:8},
                {month:'Sep',id:9},
                {month:'Oct',id:10},
                {month:'Nov',id:11},
                {month:'Dec',id:12},
            ],
            years: [2016,2017,2018,2019]
        }
    },
    props:{
        achievementParent: Object
    },
    methods: {
        emitToParent10(event) {
            this.$emit('childToParent10', this.achievementChild.achievementName)
        },
        emitToParent11(event) {
            this.$emit('childToParent11', this.achievementChild.achievementDetail)
        },
        emitToParent12(event) {
            this.$emit('childToParent12', this.achievementChild.company)
        },
        emitToParent13(event) {
            this.$emit('childToParent13', this.achievementChild.dateOfEvent)
        },
        emitToParent14(event) {
            this.$emit('childToParent14', this.achievementChild.monthOfEvent)
        },
        emitToParent15(event) {
            this.$emit('childToParent15', this.achievementChild.yearOfEvent)
        }
    }
}
</script>

