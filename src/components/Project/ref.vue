<template>
<div id="ref">
    <div class="card lecturerCard" id="References" v-if="this.getRef">
        <header class="card-header">
            <p class="card-header-title" id="cardHeader">References</p>
        </header>
        <div class="card-content">
            <div class="content">
                <textarea class="textarea has-fixed-size" v-model="message" id="ref" :disabled="!this.getEditProject"></textarea>
            </div>
        </div>
    </div>
    <div class="card lecturerCard" id="References" v-else-if="this.getEditProject">
        <header class="card-header">
            <p class="card-header-title" id="cardHeader">References</p>
        </header>
        <div class="card-content">
            <div class="content">
                <textarea class="textarea has-fixed-size" v-model="message" id="ref" :disabled="!this.getEditProject"></textarea>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    mapGetters
} from 'vuex';
export default {

    computed: {
        ...mapGetters([
            'getRef',
            'getEditProject'
        ]),
        message: {
            get() {
                return this.getRef
            },
            set(value) {
                this.$store.commit('setRef', value)
            }
        }
    },
    async mounted() {
        console.log("ref : ",this.getRef)
        var sizeArea = document.getElementsByTagName("textarea");
        for (var i = 0; i < sizeArea.length; i++) {
            sizeArea[i].setAttribute(
                "style",
                "height:" + sizeArea[i].scrollHeight + "px;overflow-y:hidden;"
            );
            sizeArea[i].addEventListener("input", OnInput, false);
        }

        function OnInput() {
            this.style.height = "auto";
            this.style.height = this.scrollHeight + "px";
        }
    }

}
</script>

<style>
#ref {
    color: #265080 !important;
    background-color: white !important;
    border: none !important;
    font-size: 16px !important;
    padding: 0;
    outline: none;
    height: auto;
}
</style>
