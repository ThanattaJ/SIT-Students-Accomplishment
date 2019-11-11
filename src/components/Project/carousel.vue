<template>
<div id="carousel">
    <div>
        <img :src = this.getImages[this.indexImg].path >
    </div>
    <div v-if="this.getImages.length > 1">
    <carousel>
        <div v-for="(pic,index) in getImages" :key="index" @click="focusImg(index)" >
            <img :src = pic.path id="imgSize">
        </div>
    </carousel>
    </div>
</div>
</template>

<script>
import carousel from 'vue-owl-carousel2'
import mediumZoom from 'medium-zoom'
import {
    mapGetters
} from 'vuex';

export default {
    computed: {
        ...mapGetters([
            'getImages'
        ])
    },
    components: {
        carousel
    },
    data() {
        return {
            indexImg: 0,
        }
    },
    mounted() {
        console.log('img :', this.getImages)
    },
    methods: {
        focusImg(index) {
            this.indexImg = index
            console.log(index);

        }

    },
}
</script>

<style>
#imgSize {
    margin-top: 20px;
    padding: 5px;   
}
</style>
