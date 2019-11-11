<template>
<div id="tool">
    <div v-if="this.getTool">
        <div class="card lecturerCard">
            <header class="card-header">
                <p class="card-header-title" id="cardHeader">Development Tools & Techniques</p>
            </header>
            <div class="card-content" id="content_tool">
                <textarea class="textarea has-fixed-size" v-model="message" id="tool_box" :disabled="!this.getEditProject"></textarea>
            </div>
        </div>
    </div>
    <div v-else-if="this.getEditProject">
        <div class="card lecturerCard">
            <header class="card-header">
                <p class="card-header-title" id="cardHeader">Development Tools & Techniques</p>
            </header>
            <div class="card-content" id="content_tool">
                <textarea class="textarea has-fixed-size" v-model="message" id="tool_box" :disabled="!this.getEditProject"></textarea>
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
            'getTool',
            'getEditProject'
        ]),
        message: {
            get() {
                return this.getTool
            },
            set(value) {
                this.$store.commit('setTool', value)
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
        var textarea = document.querySelector('textarea');

textarea.addEventListener('keydown', autosize);
             
function autosize(){
  var el = this;
  setTimeout(function(){
    el.style.cssText = 'height:auto; padding:0';
    // for box-sizing other than "content-box" use:
    // el.style.cssText = '-moz-box-sizing:content-box';
    el.style.cssText = 'height:' + el.scrollHeight + 'px';
  },0);
}
    }
}
</script>

<style>
#tool_box {
    color: #265080 !important;
    background-color: white !important;
    border: none !important;
    font-size: 16px !important;
    padding: 0;
    outline: none;
    height: auto;
}
</style>
