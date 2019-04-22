<template>
    <div>
        <div class="stepName">Create My Portfolio Page</div>
        <div class="field">
            <!-- Parent to Child : <br>
            {{portParent.portPageNameEN}} <br> -->
            <label class="label inputName">Portfolio Page Name(EN)</label>
            <div class="control">
                <input ref="portNameEN" class="input inputData" type="text" placeholder="Portfolio Page Name" v-model="portChild.portPageNameEN" v-on:keyup="emitToParent1(); validate();">
                <p ref="portNameENValidate" class="help is-danger"></p>
            </div>
        </div>
        <div class="field">
            <label class="label inputName">Portfolio Page Name(TH)</label>
            <div class="control">
                <input ref="portNameTH" class="input inputData" type="text" placeholder="Portfolio Page Name" v-model="portChild.portPageNameTH" v-on:keyup="emitToParent2();validate();">
                <p ref="portNameTHValidate" class="help is-danger"></p>
            </div>
        </div>
        <div class="inputName">When you start the Portfolio Page?</div>
        <div class="columns field"> 
            <div class="column is-one-quarter startMonth">
                <span class="select">
                    <select v-model="portChild.startMonth" v-on:change="emitToParent3" style="background-color: #ECECEC;">
                        <option selected disabled :value=null>Month</option>
                        <option v-for="(m,index) in months" v-bind:key="index" :value="m.id">{{m.month}}</option>
                    </select>
                </span>
            </div>
            <div class="column">
                <span class="select">
                    <select v-model="portChild.startYear" v-on:change="emitToParent4" style="background-color: #ECECEC;">
                        <option selected disabled :value=null>Year</option>
                        <option v-for="(y,index) in years" v-bind:key="index">{{y}}</option>
                    </select>
                </span>
            </div>
        </div>
        <!-- <label class="label inputName">Have outsider?</label>
        <div class="control">
            <label class="radio">
                <input type="radio" name="answer" value="true" v-model="portChild.haveOutsider" v-on:change="emitToParent5">
                Yes
            </label>
            <label class="radio">
                <input type="radio" name="answer" value="false" v-model="portChild.haveOutsider" v-on:change="emitToParent5">
                No
            </label>
        </div> -->
        <footer class="card-footer field is-grouped is-grouped-centered backNext">
                <!-- <button class="card-footer-item button backButton">
                    <p class="letterBackNext">Back</p> 
                </button> -->
                <!-- <button class="card-footer-item button nextButton" @click.prevent="next">
                    <p class="letterBackNext">Next</p> 
                </button> -->
        </footer>
    </div>
</template>

<script>
export default {
    data(){
        return{
            portChild:{
                portPageNameEN: this.portParent.portPageNameEN,
                portPageNameTH: this.portParent.portPageNameTH,
                startMonth: this.portParent.startMonth,
                startYear: this.portParent.startYear,
            },
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
        portParent: Object
    },
    methods: {
        emitToParent1(event) {
            this.$emit('childToParent1', this.portChild.portPageNameEN)
        },
        emitToParent2(event) {
            this.$emit('childToParent2', this.portChild.portPageNameTH)
        },
        emitToParent3(event) {
            this.$emit('childToParent3', this.portChild.startMonth)
        },
        emitToParent4(event) {
            this.$emit('childToParent4', this.portChild.startYear)
        },
        // emitToParent5(event) {
        //     this.$emit('childToParent5', this.portChild.haveOutsider)
        // },
        // validation
        validate() {
            var lettersEN = /^[A-Za-z]+$/;
            var lettersTH = /^[ก-๐]+$/;
            if(this.portChild.portPageNameEN.match(lettersEN)){
                this.$refs.portNameEN.style.borderColor = "#88D738"
                this.$refs.portNameEN.style.boxShadow = "0 0 3px #88D738"
                this.$refs.portNameENValidate.innerHTML = ""
            }else{
                this.$refs.portNameEN.style.borderColor = "#EB5656"
                this.$refs.portNameEN.style.boxShadow = "0 0 3px #EB5656"
                this.$refs.portNameENValidate.innerHTML = "The name is required"
            }if(this.portChild.portPageNameTH.match(lettersTH)){
                this.$refs.portNameTH.style.borderColor = "#88D738"
                this.$refs.portNameTH.style.boxShadow = "0 0 3px #88D738"
                this.$refs.portNameTHValidate.innerHTML = ""
            }else{
                this.$refs.portNameTH.style.borderColor = "#EB5656"
                this.$refs.portNameTH.style.boxShadow = "0 0 3px #EB5656"
                this.$refs.portNameTHValidate.innerHTML = "The name is required"
            }
        }
    }
}
</script>
