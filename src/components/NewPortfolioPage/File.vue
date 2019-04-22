<template>
    <div class="section">
        <div class="container">
            <files-upload />
            <label class="label inputName">Portfolio Page Name(EN)</label>
            <div class="control">
                <input class="input inputData" type="text" placeholder="Embed code" v-model="embedCode" v-on:keyup="showVdo">
            </div>
        </div>
        <div class="container resp-container">
            <div v-html="legacySystemHTML"></div>
        </div>
        
    </div>
</template>

<script>
import FilesUpload from './FilesUpload.vue'
export default {
    data(){
        return {
            embedCode : "",
            legacySystemHTML: ""
        }
    },
    components: {
        FilesUpload
    },
    methods: {
        showVdo(){
            this.legacySystemHTML = this.embedCode
            console.log(this.legacySystemHTML)
        }

    }
}
</script>

<style>

.resp-container {
    position: relative;
    overflow: hidden;
    padding-top: 56.25%;
}
iframe {
    position: absolute;
    top: 2%;
    left: 0;
    width: 50%;
    height: 50%;
    border: 0;
}
</style>
