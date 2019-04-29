<template>
    <div>
        <div class="stepName">My Portfolio Page Detail</div>
        <div class="field">
            <label class="label inputName">Portfolio Page Detail(EN)</label>
            <div class="control">
                <textarea ref="portDetailEN" class="Normal textarea inputData portDetail" placeholder="Detail..." v-model="port_detail_Child.portPageDetailEN" v-on:keyup="validatePortPageDetailEN();emitToParent6();" maxlength="200"></textarea>
                <p ref="portDetailENValidate" class="help is-danger"></p>
                <div class="field is-grouped is-grouped-right">{{count}}/200</div>
            </div>
        </div>
        <div class="field">
            <label class="label inputName">Portfolio Page Detail(TH)</label>
            <div class="control">
                <textarea ref="portDetailTH" class="Normal textarea inputData portDetail" placeholder="Detail..." v-model="port_detail_Child.portPageDetailTH" v-on:keyup="validatePortPageDetailTH();emitToParent7();"></textarea>
                <p ref="portDetailTHValidate" class="help is-danger"></p>
                <br>
                <div>* Please write at least 1 language</div>
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

            var lettersEN = /^[A-Za-z ]+$/;
            var portDetailEN = this.$refs.portDetailEN;
            var portDetailTH = this.$refs.portDetailTH;
            if(this.port_detail_Child.portPageDetailEN != ""){ //ถ้ากรอก
                if(this.port_detail_Child.portPageDetailEN.match(lettersEN)){
                    portDetailEN.style.borderColor = "#88D738"
                    portDetailEN.style.boxShadow = "0 0 3px #88D738"
                    this.$refs.portDetailENValidate.innerHTML = ""
                    this.validatePortDetailChild.validatePortPageDetailEN =  true;

                    portDetailTH.style.borderColor = ""
                    portDetailTH.style.boxShadow = ""
                    this.$refs.portDetailTHValidate.innerHTML = ""
                }else{
                    portDetailEN.style.borderColor = "#EB5656"
                    portDetailEN.style.boxShadow = "0 0 3px #EB5656"
                    this.$refs.portDetailENValidate.innerHTML = "Must be English Alphabet"
                    this.validatePortDetailChild.validatePortPageDetailEN =  false;
                }
            }else{ //ถ้าไม่กรอก
                portDetailEN.style.borderColor = "#EB5656"
                portDetailEN.style.boxShadow = "0 0 3px #EB5656"
                this.$refs.portDetailENValidate.innerHTML = "Field is required"
                this.validatePortDetailChild.validatePortPageDetailEN =  false;
            }
            
        },
        validatePortPageDetailTH() {
            this.emitPortDetailToParentValidate();

            var lettersTH = /^[ก-๐ ]+$/;
            var portDetailTH = this.$refs.portDetailTH;
            var portDetailEN = this.$refs.portDetailEN;
            if(this.port_detail_Child.portPageDetailTH != ""){ //ถ้ากรอก
                if(this.port_detail_Child.portPageDetailTH.match(lettersTH)){
                    portDetailTH.style.borderColor = "#88D738"
                    portDetailTH.style.boxShadow = "0 0 3px #88D738"
                    this.$refs.portDetailTHValidate.innerHTML = ""
                    this.validatePortDetailChild.validatePortPageDetailTH =  true;

                    portDetailEN.style.borderColor = ""
                    portDetailEN.style.boxShadow = ""
                    this.$refs.portDetailENValidate.innerHTML = ""
                }else{
                    portDetailTH.style.borderColor = "#EB5656"
                    portDetailTH.style.boxShadow = "0 0 3px #EB5656"
                    this.$refs.portDetailTHValidate.innerHTML = "Must be Thai Alphabet"
                    this.validatePortDetailChild.validatePortPageDetailTH =  false;
                }
            }else{ //ถ้าไม่กรอก
                portDetailTH.style.borderColor = "#EB5656"
                portDetailTH.style.boxShadow = "0 0 3px #EB5656"
                this.$refs.portDetailTHValidate.innerHTML = "Field is required"
                this.validatePortDetailChild.validatePortPageDetailTH =  false;
            }
        }

    }
}
</script>

