<template>
    <div>
        <div class="stepName">My Portfolio Page Detail</div>
        <div class="field">
            <label class="label inputName">Portfolio Page Detail(EN)</label>
            <div class="control">
                <textarea class="Normal textarea inputData portDetail" placeholder="Detail..." v-model="port_detail_Child.portPageDetailEN" v-on:keyup="emitToParent6"></textarea>
                <div class="field is-grouped is-grouped-right">0/200</div>
                
            </div>
        </div>
        <div class="field">
            <label class="label inputName">Portfolio Page Detail(TH)</label>
            <div class="control">
                <textarea class="Normal textarea inputData portDetail" placeholder="Detail..." v-model="port_detail_Child.portPageDetailTH" v-on:keyup="emitToParent7"></textarea>
                <div>* Please write at least 1 language</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            port_detail_Child: {
                portPageDetailEN: this.port_detail_Parent.portPageDetailEN,
                portPageDetailTH: this.port_detail_Parent.portPageDetailTH
            }
        }
    },
    props:{
        port_detail_Parent: Object
    },
    methods: {
        emitToParent6(event) {
            this.$emit('childToParent6', this.port_detail_Child.portPageDetailEN)
        },
        emitToParent7(event) {
            this.$emit('childToParent7', this.port_detail_Child.portPageDetailTH)
        }
    }
}
</script>

