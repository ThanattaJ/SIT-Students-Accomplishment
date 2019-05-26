<template>
    <div>
        <div class="stepName">Project Achievement <i class="la la-certificate"></i></div>
        <div class="field">
            <!-- Parent to Child : <br>
            {{achievementChild.achievementName}} <br>
            Child : {{achievementChild.achievementDetail}} <br> -->
            <label class="label inputName">Achievement Name</label>
            <div class="control">
                <input ref="achievementName" class="input inputData" type="text" placeholder="e.g. HackaTravel" v-model="achievementChild.achievementName"  v-on:keyup="validateAchievementName();emitToParent10();"/>
                <p ref="achievementNameValidate" class="help is-danger"></p>
            </div>
        </div>
        <div class="field">
            <label class="label inputName">Achievement Detail</label>
            <div class="control">
                <textarea ref="achievementDetail" class="Normal textarea inputData" placeholder="e.g. Create New Era of Tourism in Thailand เปลี่ยนไอเดีย เป็น ธุรกิจท่องเที่ยง" v-model="achievementChild.achievementDetail"  v-on:keyup="validateAchievementDetail();emitToParent11();"></textarea>
                <p ref="achievementDetailValidate" class="help is-danger"></p>
            </div>
        </div>
        <div class="columns"> 
            <div class="column">
                <div class="field">
                    <label class="label inputName">Organize By</label>
                    <div class="control">
                        <input ref="company" class="input inputData" type="text" placeholder="e.g. การท่องเที่ยงแห่งประเทศไทย(ททท.)" v-model="achievementChild.company"  v-on:keyup="validateCompany();emitToParent12();">
                        <p ref="companyValidate" class="help is-danger"></p>
                    </div>
                </div>
            </div>

            <div class="column">
                <div class="field">
                    <label class="label inputName">Date of Event</label>

                    <button class="input inputData text-left" style="width:90%;">
                        <span class="icon is-small is-left">
                            <i class="la la-calendar" style="color: #949494;"></i>
                        </span>
                        <flat-pickr ref="calendar" class="calendar inputData" placeholder="Select date" v-model="date" :config="config"></flat-pickr>
                    </button>

                    <span class="icon is-small is-right removeDate" @click="removeDate">
                        <i class="la la-times-circle" style="color: #949494;"></i>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import flatPickr from 'vue-flatpickr-component';
  import 'flatpickr/dist/flatpickr.css';

  import VueFlatpickr from 'vue-flatpickr'
export default {
    name : 'Achievement',
    components:{
        flatPickr
    },
    data () {
        return {
            date: this.achievementParent.date,  //d-m-Y
            config: {
                wrap: true, // set wrap to true only when using 'input-group'
                altFormat: 'M  j, Y',
                altInput: true,
                dateFormat: 'd-m-Y'   
            },   
            achievementChild:{
                achievementName: this.achievementParent.achievementName,
                achievementDetail: this.achievementParent.achievementDetail,
                company: this.achievementParent.company
            },
            validateAchievementChild:{
                validateAchievementName: this.validateAchievementParent.validateAchievementName,
                validateAchievementDetail: this.validateAchievementParent.validateAchievementDetail,
                validateCompany: this.validateAchievementParent.validateCompany
            }
        }
    },
    props:{
        achievementParent: Object,
        validateAchievementParent: Object
    },
    methods: {
        // doSomethingOnChange(date){
        //     this.date = date
        // },
        removeDate() {
            this.date = '';
            this.achievementParent.date = '';
            this.validateAchievementName()
        },
        emitToParent10(event) {
            this.$emit('childToParent10', this.achievementChild.achievementName)
        },
        emitToParent11(event) {
            this.$emit('childToParent11', this.achievementChild.achievementDetail)
        },
        emitToParent12(event) {
            this.$emit('childToParent12', this.achievementChild.company)
        },
        emitDateToParent(event){
            this.$emit('childToParent13', this.date)
        },
        //validate
        emitAchievementToParentValidate(event) {
            this.$emit('validationStep4', this.validateAchievementChild)
        },
        step4Check(){
            this.validateAchievementName()
            this.validateAchievementDetail()
            this.validateCompany()
            this.emitDateToParent()
        },

        validateAchievementName(){
            this.emitAchievementToParentValidate();

            var lettersEN = /^[A-Za-z0-9 ]+$/;
            var achievementName = this.$refs.achievementName;
            if(this.achievementChild.achievementName != ""){ //ถ้ากรอก
                achievementName.style.borderColor = "#88D738"
                achievementName.style.boxShadow = "0 0 3px #88D738"
                this.$refs.achievementNameValidate.innerHTML = ""
                this.validateAchievementChild.validateAchievementName =  "trueData";
                // if(this.achievementChild.achievementName.match(lettersEN)){ //ถ้ากรอก eng
                //     achievementName.style.borderColor = "#88D738"
                //     achievementName.style.boxShadow = "0 0 3px #88D738"
                //     this.$refs.achievementNameValidate.innerHTML = ""
                //     this.validateAchievementChild.validateAchievementName =  "trueData";
                // }else{ //ถ้าไม่กรอก eng
                //     achievementName.style.borderColor = "#EB5656"
                //     achievementName.style.boxShadow = "0 0 3px #EB5656"
                //     this.$refs.achievementNameValidate.innerHTML = "Must be English Alphabet and Number"
                //     this.validateAchievementChild.validateAchievementName =  "falseData";
                // }
            }else{ //ถ้าไม่กรอก
                if(this.achievementChild.achievementDetail != "" || this.achievementChild.company != "" || this.date != ""){ //ถ้ามีข้อมูลอื่น
                    achievementName.style.borderColor = "#EB5656"
                    achievementName.style.boxShadow = "0 0 3px #EB5656"
                    this.$refs.achievementNameValidate.innerHTML = "Field is required"
                    this.validateAchievementChild.validateAchievementName =  "mustHaveData";
                }else{ //ถ้าไม่มีข้อมูลอื่น
                    achievementName.style.borderColor = ""
                    achievementName.style.boxShadow = ""
                    this.$refs.achievementNameValidate.innerHTML = ""
                    this.validateAchievementChild.validateAchievementName =  "noData";
                }
            }
        },
        validateAchievementDetail(){
            this.emitAchievementToParentValidate();

            var lettersEN = /^[A-Za-z0-9 ]+$/;
            var achievementDetail = this.$refs.achievementDetail;
            if(this.achievementChild.achievementDetail != "" || this.achievementChild.achievementDetail != null){ //ถ้ากรอก
                achievementDetail.style.borderColor = "#88D738"
                achievementDetail.style.boxShadow = "0 0 3px #88D738"
                this.$refs.achievementDetailValidate.innerHTML = ""
                this.validateAchievementChild.validateAchievementDetail =  "trueData";
                this.validateAchievementName()
                // if(this.achievementChild.achievementDetail.match(lettersEN)){ //ถ้ากรอก eng
                //     achievementDetail.style.borderColor = "#88D738"
                //     achievementDetail.style.boxShadow = "0 0 3px #88D738"
                //     this.$refs.achievementDetailValidate.innerHTML = ""
                //     this.validateAchievementChild.validateAchievementDetail =  "trueData";
                //     this.validateAchievementName()
                // }else{ //ถ้าไม่กรอก eng
                //     achievementDetail.style.borderColor = "#EB5656"
                //     achievementDetail.style.boxShadow = "0 0 3px #EB5656"
                //     this.$refs.achievementDetailValidate.innerHTML = "Must be English Alphabet and Number"
                //     this.validateAchievementChild.validateAchievementDetail =  "falseData";
                //     this.validateAchievementName()
                // }
            }else{ //ถ้าไม่กรอก
                achievementDetail.style.borderColor = ""
                achievementDetail.style.boxShadow = ""
                this.$refs.achievementDetailValidate.innerHTML = ""
                this.validateAchievementChild.validateAchievementDetail =  "noData";
                this.validateAchievementName()
            }
        },
        validateCompany(){
            this.emitAchievementToParentValidate();

            var lettersEN = /^[A-Za-z0-9 ]+$/;
            var company = this.$refs.company;
            if(this.achievementChild.company != "" || this.achievementChild.company != null){ //ถ้ากรอก
                company.style.borderColor = "#88D738"
                company.style.boxShadow = "0 0 3px #88D738"
                this.$refs.companyValidate.innerHTML = ""
                this.validateAchievementChild.validateCompany =  "trueData";
                this.validateAchievementName()
                // if(this.achievementChild.company.match(lettersEN)){ //ถ้ากรอก eng
                //     company.style.borderColor = "#88D738"
                //     company.style.boxShadow = "0 0 3px #88D738"
                //     this.$refs.companyValidate.innerHTML = ""
                //     this.validateAchievementChild.validateCompany =  "trueData";
                //     this.validateAchievementName()
                // }else{ //ถ้าไม่กรอก eng
                //     company.style.borderColor = "#EB5656"
                //     company.style.boxShadow = "0 0 3px #EB5656"
                //     this.$refs.companyValidate.innerHTML = "Must be English Alphabet and Number"
                //     this.validateAchievementChild.validateCompany =  "falseData";
                //     this.validateAchievementName()
                // }
            }else{ //ถ้าไม่กรอก
                company.style.borderColor = ""
                company.style.boxShadow = ""
                this.$refs.companyValidate.innerHTML = ""
                this.validateAchievementChild.validateCompany =  "noData";
                this.validateAchievementName()
            }
            
        }
    }
}
</script>

