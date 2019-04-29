<template>
    <div class="section">
        <div class="container">
            <div class="control">
                <input class="input inputData" type="text" placeholder="Share link" v-model="link" v-on:keyup="callVdo">
            </div>
            <div class="control">
                <button class="button is-link" v-on:click="submitVdo">Submit</button>
            </div>
            <div class="container resp-container">
                <iframe ref="vdoFrame" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
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
