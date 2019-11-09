<template>
<vueper-slides class="no-shadow"  transition-speed="450" :touchable="false" :slide-ratio="1/2" fixed-height="400px" :arrowsOutside="true">
    <vueper-slide v-for="(pic,i) in getImages" :key="i" :image="pic.path">
    </vueper-slide>
</vueper-slides>
</template>

<script>
import Vue from "vue";
import {
    VueperSlides,
    VueperSlide
} from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
import '../../../node_modules/vueperslides/dist/vueperslides.common.js'
import {
    mapGetters,
    mapActions
} from 'vuex';

export default {
    components: {
        VueperSlides,
        VueperSlide
    },
    computed: {
        ...mapGetters([
            'getImages',
        ])
    },
    data: () => ({
        slides: [{
            title: 'Slide #1',
            content: 'Slide content.'
        }, ]
    }),
    mounted() {
        // console.log("getImages : ", this.getImages)
    },
    methods: {
        ...mapActions([
            'setImage'
        ])
    },
    beforeDestroy() {
        this.setImage([])
    }

}
</script>

<style>
.ex--center-mode {
    width: 600px;
    max-width: 100%;
    margin: auto;
}

.vueperslides__bullet {
    /* background-color: rgba(0, 0, 0, 0.3); */
    /* border: none;
    box-shadow: none; */
    transition: 0.3s;
    width: 16px;
    height: 16px;
}

.vueperslides__bullet--active {
    background-color: #ff5252;
}

.vueperslides__bullet span {
    display: block;
    color: #fff;
    font-size: 10px;
    opacity: 0.8;
}

/* .vueperslides--fixed-height {
    height: 1000px;
} */

.vueperslide__image {
    transform: scale(1.5) rotate(-10deg);
}

.vueperslide__title {
    font-size: 7em;
    opacity: 0.7;
}
</style>
