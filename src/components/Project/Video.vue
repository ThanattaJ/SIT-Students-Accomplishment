<template>
<div>
    <div class="field has-addons">
        <div class="control" style="width: 100%;">
            <input id="myUrl" v-model="myUrl" @change="callIframe()" class="input urlField" type="text" placeholder="Paste a youtube link">
        </div>
        <div class="control">
            <!-- <a class="button is-info embed" @click="callIframe()">EMBED</a> -->
        </div>
    </div>
    <!-- <div v-if="myUrl.length > 0" class="resp-container" id="myCode"></div> -->
</div>
</template>

<script>
import {
    mapGetters,
    mapActions
} from 'vuex'
export default {
    data() {
        return {
            myUrl: "",
            link: "",
            showIframe: false,
            src: "",
            a: ""
        }
    },
    computed: {
        ...mapGetters(['GET_VDO_PATHNAME']),
    },
    mounted() {
        this.myUrl = 'https://youtu.be/' + this.GET_VDO_PATHNAME
    },
    methods: {
        ...mapActions(['SET_VDO_PATHNAME']),
        getId(url) {
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            var match = url.match(regExp);

            if (match && match[2].length == 11) {
                return match[2];
            } else {
                return 'error';
            }
        },
        callIframe() {
            console.log("callIframe")
            var myId = this.getId(this.myUrl);
            if (myId != '' || myId == null) {
                // document.getElementById('myCode').innerHTML = '<iframe width="560" height="315" src="//www.youtube.com/embed/' + myId + '" frameborder="0" allowfullscreen></iframe>'
                this.SET_VDO_PATHNAME(myId)
                console.log("myId : ", myId)
            }
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
    height: 100% !important;
}

.urlField {
    background: transparent !important;
    border: none !important;
    border-bottom: 1px solid #DBDBDB !important;
    /* width: 100%;
    color: #265080 !important; */
    font-size: 16px !important;
    margin-top: 0px !important;
}

.embed {
    background-color: #265080 !important;
    /* border-color: transparent !important; */
}

.md-theme-default a:not(.md-button) {
    color: white !important
}

a:not(.md-button):hover {
    text-decoration: none;
}
</style>
