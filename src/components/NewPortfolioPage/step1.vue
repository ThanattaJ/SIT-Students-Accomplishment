<template>
    <div>
        <!-- <section class="grid">

  <div class="datepicker__container">
    <label for="datepicker" class="">---select the date---</label>
    <input type='text' class="js-datepicker" id='datepicker' placeholder="Select date" @click="dateClick"/>
  </div>
  
</section> -->
        <div class="stepName">Create Project <i class="la la-edit"></i></div>
        <div class="field">
            <label class="label inputName">Project Name (English) <span class="require">*</span></label>
            <div class="control">
                <input ref="portNameEN" class="input inputData" type="text" placeholder="e.g. Library VR" v-model="portChild.portPageNameEN" v-on:keyup="validatePortPageNameEN();emitToParent1();">
                <p ref="portNameENValidate" class="help is-danger"></p>
            </div>
        </div>
        <div class="field">
            <label class="label inputName">ชื่อผลงาน (ภาษาไทย) <span class="require">*</span></label>
            <div class="control">
                <input ref="portNameTH" class="input inputData" type="text" placeholder="เช่น ระบบจําลองภาพเสมือนหอสมุด" v-model="portChild.portPageNameTH" v-on:keyup="validatePortPageNameTH();emitToParent2();">
                <p ref="portNameTHValidate" class="help is-danger"></p>
            </div>
        </div>
        <div class="inputName">When did you start the project?</div>
        <div class="columns field"> 
            <div class="column is-one-quarter startMonth">
                <span class="select">
                    <select class="selectText" ref="startMonth" v-model="portChild.startMonth" v-on:change="emitToParent3" >
                        <option selected disabled :value=null>Month</option>
                        <option v-for="(m,index) in months" v-bind:key="index" :value="m.id">{{m.month}}</option>
                    </select>
                </span>
            </div>
            <div class="column">
                <span class="select">
                    <select class="selectText" ref="startYear" v-model="portChild.startYear" v-on:change="validateStartYear();emitToParent4();">
                        <option selected disabled :value=null>Year</option>
                        <option v-for="(y,index) in years" v-bind:key="index" :value="y">{{y}}</option>
                    </select>
                    <p style="width: 100px;" ref="startYearValidate" class="help is-danger"></p>
                </span>
            </div>
        </div>
        <!-- ------ When did you finish the project? ------ -->
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
            validatePortChild:{
                validatePortPageNameEN: this.validatePortParent.validatePortPageNameEN,
                validatePortPageNameTH: this.validatePortParent.validatePortPageNameTH,
                validateStartMonth: this.validatePortParent.validateStartMonth,
                validateStartYear: this.validatePortParent.validateStartYear,
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
        portParent: Object,
        validatePortParent: Object
    },
    methods: {


// $(function() {
//     dateClick() {
//   const $datepicker = $('.js-datepicker');
//   // var disabledDates = [0, 6];
  
//   let datepicker = $datepicker.datepicker({
//     autoClose: true,
//     classes: 'datepicker__calendar',
//     position: 'bottom right',
//     offset: 22,
//     onRenderCell: function (date, cellType) {
//       if (cellType == 'day') {
//         let day = date.getDay();
//         // let isDisabled = disabledDates.indexOf(day) != -1;
//         // return {
//         //   disabled: isDisabled
//         // }
//       }
//     },
//     onSelect: function(formattedDate, date, inst) {
//       if(date) {
//         alert(date);
//       }
//     }
//   }).data('datepicker');
  
// },


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

        // validation
        emitPortToParentValidate(event) {
            this.$emit('validationStep1', this.validatePortChild)
        },
        step1Check() { //check ตอนกด next
            this.validatePortPageNameEN();
            this.validatePortPageNameTH();
            this.validateStartYear();
            if(this.date != ""){
                this.validatePortPageNameEN();
            }
        },
        validatePortPageNameEN() {
            this.emitPortToParentValidate();

            var lettersEN = /^[A-Za-z1-9.,:() ]+$/;
            var portNameEN = this.$refs.portNameEN;
            if(this.portChild.portPageNameEN.match(lettersEN)){
                portNameEN.style.borderColor = "#88D738"
                portNameEN.style.boxShadow = "0 0 3px #88D738"
                this.$refs.portNameENValidate.innerHTML = ""
                this.validatePortChild.validatePortPageNameEN =  true;
            }else if(this.portChild.portPageNameEN == "" || this.portChild.portPageNameEN == null){
                portNameEN.style.borderColor = "#EB5656"
                portNameEN.style.boxShadow = "0 0 3px #EB5656"
                this.$refs.portNameENValidate.innerHTML = "Field is required"
                this.validatePortChild.validatePortPageNameEN =  false;
            }
            else{
                portNameEN.style.borderColor = "#EB5656"
                portNameEN.style.boxShadow = "0 0 3px #EB5656"
                this.$refs.portNameENValidate.innerHTML = "Must be English Alphabet"
                this.validatePortChild.validatePortPageNameEN =  false;
            }
        },
        validatePortPageNameTH() {
            this.emitPortToParentValidate();

            var lettersTH = /^[ก-๐1-9() ]+$/;
            var portNameTH = this.$refs.portNameTH;
            if(this.portChild.portPageNameTH.match(lettersTH)){
                portNameTH.style.borderColor = "#88D738"
                portNameTH.style.boxShadow = "0 0 3px #88D738"
                this.$refs.portNameTHValidate.innerHTML = ""
                this.validatePortChild.validatePortPageNameTH =  true;
            }else if(this.portChild.portPageNameTH == "" || this.portChild.portPageNameTH == null){
                portNameTH.style.borderColor = "#EB5656"
                portNameTH.style.boxShadow = "0 0 3px #EB5656"
                this.$refs.portNameTHValidate.innerHTML = "โปรดระบุชื่อผลงาน"
                this.validatePortChild.validatePortPageNameTH =  false;
            }else{
                portNameTH.style.borderColor = "#EB5656"
                portNameTH.style.boxShadow = "0 0 3px #EB5656"
                this.$refs.portNameTHValidate.innerHTML = "กรุณาระบุเป็นภาษาไทย"
                this.validatePortChild.validatePortPageNameTH =  false;
            }
        },
        validateStartYear() {
            this.emitPortToParentValidate();

            if(this.portChild.startYear != null){
                this.$refs.startYear.style.borderColor = "#88D738"
                this.$refs.startYear.style.boxShadow = "0 0 3px #88D738"
                this.$refs.startYearValidate.innerHTML = ""
                this.validatePortChild.validateStartYear =  true;
            }else{
                this.$refs.startYear.style.borderColor = "#EB5656"
                this.$refs.startYear.style.boxShadow = "0 0 3px #EB5656"
                this.$refs.startYearValidate.innerHTML = "Field is required"
                this.validatePortChild.validateStartYear =  false;
            }
        }
    }
}
</script>
