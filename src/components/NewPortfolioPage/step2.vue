<template>
    <div>
        <div class="stepName">Project Overview <i class="la la-file-text-o"></i></div>
        <div class="field">
            <label class="label inputName">Abstract(English/Thai)</label>
            <div class="control">
                <textarea ref="abstract" class="Normal textarea inputData portDetail" placeholder="e.g. Virtual Reality is applied to the KMUTT Library for VR study and development to help explore different views." v-model="port_detail_Child.portPageDetailEN" v-on:keyup="validatePortPageDetailEN();emitToParent6();" maxlength="200"></textarea>
                <p ref="abstractValidate" class="help is-danger"></p>
                <div class="field is-grouped is-grouped-right">{{count}}/200</div>
            </div>
        </div>
        <div class="field">
            <label class="label inputName">Project Detail(English/Thai)</label>
            <div class="control">
                <textarea ref="projectDetail" class="Normal textarea inputData portDetail" placeholder="เช่น ระบบจําลองภาพเสมือนหอสมุดโดยนําเทคโนโลยี Virtual Reality มาใช้ทํางานร่วมกับหอสมุดของมหาวิทยาลัยเพื่อศึกษาพัฒนาระบบจำลองภาพเสมือนหอสมุดให้มีความน่าสนใจมากยิ่งขึ้น" v-model="port_detail_Child.portPageDetailTH" v-on:keyup="validatePortPageDetailTH();emitToParent7();"></textarea>
                <p ref="projectDetailValidate" class="help is-danger"></p>
                <br>
                <div><span class="require">* </span><span style="font-size:14px;color:#EB5656;">Please write at least 1 field</span></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            count: 0,
            port_detail_Child: {
                portPageDetailEN: this.port_detail_Parent.portPageDetailEN,
                portPageDetailTH: this.port_detail_Parent.portPageDetailTH
            },
            validatePortDetailChild: {
                validatePortPageDetailEN: this.validatePortDetailParent.validatePortPageDetailEN,
                validatePortPageDetailTH: this.validatePortDetailParent.validatePortPageDetailTH
            }
        }
    },
    props:{
        port_detail_Parent: Object,
        validatePortDetailParent: Object
    },
    methods: {
        emitToParent6(event) {
            var count = this.port_detail_Child.portPageDetailEN.length
            if(count <= 200){
                this.count = count
                count++;
            }
            this.$emit('childToParent6', this.port_detail_Child.portPageDetailEN)
        },
        emitToParent7(event) {
            this.$emit('childToParent7', this.port_detail_Child.portPageDetailTH)
        },

        // validation
        emitPortDetailToParentValidate(event) {
            this.$emit('validationStep2', this.validatePortDetailChild)
        },
        step2Check() { //check ตอนกด next
            this.validatePortPageDetailEN();
            this.validatePortPageDetailTH();
        },
        validatePortPageDetailEN() {
            this.emitPortDetailToParentValidate();

            var lettersEN = /^[A-Za-z1-9.,:() ]+$/;
            var abstract = this.$refs.abstract;
            var projectDetail = this.$refs.projectDetail;
            if(this.port_detail_Child.portPageDetailEN != ""){ //ถ้ากรอก
                if(this.port_detail_Child.portPageDetailEN.match(lettersEN)){
                    abstract.style.borderColor = "#88D738"
                    abstract.style.boxShadow = "0 0 3px #88D738"
                    this.$refs.abstractValidate.innerHTML = ""
                    this.validatePortDetailChild.validatePortPageDetailEN =  true;

                    projectDetail.style.borderColor = ""
                    projectDetail.style.boxShadow = ""
                    this.$refs.projectDetailValidate.innerHTML = ""
                }else{
                    abstract.style.borderColor = "#EB5656"
                    abstract.style.boxShadow = "0 0 3px #EB5656"
                    this.$refs.abstractValidate.innerHTML = "Must be English Alphabet"
                    this.validatePortDetailChild.validatePortPageDetailEN =  false;
                }
            }else{ //ถ้าไม่กรอก
                abstract.style.borderColor = "#EB5656"
                abstract.style.boxShadow = "0 0 3px #EB5656"
                this.$refs.abstractValidate.innerHTML = "Field is required"
                this.validatePortDetailChild.validatePortPageDetailEN =  false;
            }
            
        },
        validatePortPageDetailTH() {
            this.emitPortDetailToParentValidate();

            var lettersTH = /^[ก-๐1-9() ]+$/;
            var projectDetail = this.$refs.projectDetail;
            var abstract = this.$refs.abstract;
            if(this.port_detail_Child.portPageDetailTH != ""){ //ถ้ากรอก
                if(this.port_detail_Child.portPageDetailTH.match(lettersTH)){
                    projectDetail.style.borderColor = "#88D738"
                    projectDetail.style.boxShadow = "0 0 3px #88D738"
                    this.$refs.projectDetailValidate.innerHTML = ""
                    this.validatePortDetailChild.validatePortPageDetailTH =  true;

                    abstract.style.borderColor = ""
                    abstract.style.boxShadow = ""
                    this.$refs.abstractValidate.innerHTML = ""
                }else{
                    projectDetail.style.borderColor = "#EB5656"
                    projectDetail.style.boxShadow = "0 0 3px #EB5656"
                    this.$refs.projectDetailValidate.innerHTML = "กรุณาระบุเป็นภาษาไทย"
                    this.validatePortDetailChild.validatePortPageDetailTH =  false;
                }
            }else{ //ถ้าไม่กรอก
                projectDetail.style.borderColor = "#EB5656"
                projectDetail.style.boxShadow = "0 0 3px #EB5656"
                this.$refs.projectDetailValidate.innerHTML = "โปรดระบุรายละเอียดผลงาน"
                this.validatePortDetailChild.validatePortPageDetailTH =  false;
            }
        }

    }
}
</script>

