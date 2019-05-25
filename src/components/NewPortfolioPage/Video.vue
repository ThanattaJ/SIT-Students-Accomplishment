<template>
    <div>
        <div class="control">
            <input style="width:100%" class="input inputData" type="text" placeholder="Share link" v-model="link" v-on:keyup="callVdo">
        </div>
        <br>
        <div class="control">
            <button style="width:77px" class="button is-link" v-on:click="submitVdo">Save</button>
        </div>
        
        <div class="resp-container">
            <iframe ref="vdoFrame" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            link: ""
        }
    },
    methods: {
        callVdo(){
            var oldPath = this.link
            var newPath = oldPath.replace("https://youtu.be/","https://www.youtube.com/embed/")
            this.$refs.vdoFrame.src = newPath
        },
        submitVdo() {
            console.log("aa")
        }
    }
}
</script>

<style>
.resp-container {
    position: relative;
    /* overflow: hidden; */
    padding-top: 56.2%;
}
iframe {
    position: absolute;
    top: 3%;
    width: 100%;
    height: 100%;
}
</style>
