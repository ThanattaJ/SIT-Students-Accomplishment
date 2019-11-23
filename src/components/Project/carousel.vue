<template>
<div id="carousel">
    <div id="frame">
        <vue-picture-swipe :items="[{src:this.getImages[this.indexImg].path,thumbnail: this.getImages[this.indexImg].path,w: width,h: height}]" :options="{shareEl: false}" id="showImg"></vue-picture-swipe>
    </div>
    <div v-if="this.getImages.length > 1">
        <carousel :autoplay="true">
            <div v-for="(pic,index) in getImages" :key="index" @click="focusImg(index)">
                <img :src="pic.path"  :id="'focusImg'+index" class="imgSize">
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
            loopIndex: 0,
            height: 0,
            width: 0,
        }
    },
    mounted() {
        console.log('img :', this.getImages.length)

    },
    methods: {
        focusImg(index) {
            this.indexImg = index
            var img = new Image()
            img.src = this.getImages[index].path
            this.height = img.height
            this.width = img.width
            for(var n = 0; n < this.getImages.length; n++){
                document.getElementById('focusImg'+n).style.border = "none"
            }
            document.getElementById('focusImg'+index).style.border = "1px solid #265080"

        }
    },
}
</script>

<style>
.imgSize {
    margin-top: 10%;
    padding: 5px;
    max-width: 100% !important;
    height: 110px !important;
    display: block;
    text-align: center;
    object-fit:contain;
}

#showImg {
    max-width: 100% !important;
    max-height: 100% !important;
    display: block;
    margin-left: auto;
    margin-right: auto;
    object-fit:contain;
    overflow: hidden;
}

#showImg.pointer {
    cursor: zoom-in;
}
#frame{
    width: 100% !important;
    height: 400px !important;
    text-align: center;
}

figure{
    display: inline-block !important;
    margin: 0px !important;
}
figure > a > img {
    display: inline-block !important;
    width: 100% !important;
    height: 100% !important;
    max-height: 400px !important;
    object-fit:contain;
}
</style>
