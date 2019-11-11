<template>
<div id="Details">
    <div v-if="(this.getDetail)">
        <div class="card lecturerCard" id="Details">
            <header class="card-header">
                <p class="card-header-title" id="cardHeader">Details</p>
            </header>
            <!-- ------------------------------ -->
            <div class="card-content">
                <div class="content" id="content">
                    <textarea class="textarea has-fixed-size" v-model="message" id="contentDetails" :disabled="!this.getEditProject"></textarea>
                </div>
            </div>
        </div>
    </div>
    <div v-else-if="this.getEditProject">
        <div class="card lecturerCard" id="Details">
            <header class="card-header">
                <p class="card-header-title" id="cardHeader">Details</p>
            </header>
            <div class="card-content">
                <div class="content" id="content">
                    <textarea class="textarea has-fixed-size" v-model="message" id="contentDetails" :disabled="!this.getEditProject"></textarea>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    mapGetters,
    mapActions
} from 'vuex';
export default {
    computed: {
        ...mapGetters([
            'getDetail',
            'getEditProject'
        ]),

        message: {
            get() {
                return this.getDetail
            },
            set(value) {
                this.$store.commit('setDetail', value)
            }
        },
        mounted() {

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

}
</script>

<style>
#contentDetails {
    color: #265080 !important;
    background-color: white !important;
    border: none !important;
    font-size: 16px !important;
    padding: 0;
    outline: none;
    height: 100%;
}
</style>
