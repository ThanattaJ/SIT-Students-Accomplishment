<template>
<div id="carousel">
    <div id="frame">
        <vue-picture-swipe :items="[{src:this.getImages[this.indexImg].path,thumbnail: this.getImages[this.indexImg].path,w: 1920,h: 1080}]" :options="{shareEl: false}" id="showImg"></vue-picture-swipe>
    </div>
    <div v-if="this.getImages.length > 1">
        <carousel :autoplay="true">
            <div v-for="(pic,index) in getImages" :key="index" @click="focusImg(index)">
                <img :src=pic.path id="imgSize">
            </div>
        </carousel>
    </div>
</div>
</template>

<script>
import carousel from 'vue-owl-carousel2'
import mediumZoom from 'medium-zoom'
import VuePictureSwipe from 'vue-picture-swipe';
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
        carousel,
        VuePictureSwipe
    },
    data() {
        return {
            indexImg: 0,
            loopIndex: 0
        }
    },
    mounted() {
        console.log('img :', this.getImages.length)

    },
    methods: {
        focusImg(index) {
            this.indexImg = index
            console.log(index);
        },
    },
}
</script>

<style>
#imgSize {
    margin-top: 10%;
    padding: 5px;
    max-width: 100% !important;
    height: 110px !important;
}

#showImg {
    max-width: 100% !important;
    max-height: 100% !important;
    display: block;
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
}

#showImg.pointer {
    cursor: zoom-in;
}
#frame{
    width: 100%;
    height: 350px;
}
</style>
