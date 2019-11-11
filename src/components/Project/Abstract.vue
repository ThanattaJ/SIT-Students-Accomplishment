<template>
<div id="Abstract">
    <div v-if="this.getAbstract">
        <div class="card lecturerCard" id="Abstract">
            <header class="card-header">
                <p class="card-header-title" id="cardHeader">Abstract</p>
            </header>
            <!-- ------------------------------ -->
            <div class="card-content">
                <div class="content" id="contentAbstract">
                    <textarea class="textarea has-fixed-size" v-model="message" id="abstracts" :disabled=" !this.getEditProject"></textarea>
                </div>
            </div>
        </div>
    </div>
    <div v-else-if="this.getEditProject">
        <div class="card lecturerCard" id="Details">
            <header class="card-header">
                <p class="card-header-title" id="cardHeader">Abstract</p>
            </header>
            <!-- ------------------------------ -->
            <div class="card-content">
                <div class="content" id="abstracts">
                    <textarea class="textarea has-fixed-size" v-model="message" id="abstracts" :disabled="!this.getEditProject"></textarea>
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
            'getAbstract',
            'getEditProject'
        ]),
        message: {
            get() {
                return this.getAbstract
            },
            set(value) {
                this.$store.commit('setAbstract', value)
            }
        }
    },
    async mounted() {
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
#abstracts {
    color: #265080 !important;
    background-color: white !important;
    border: none !important;
    font-size: 16px !important;

    padding: 0;
    outline: none;
    height: 100px;
}
</style>
