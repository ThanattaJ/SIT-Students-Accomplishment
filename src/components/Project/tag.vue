<template>
<div>
    <multiselect v-model="value" 
    tag-placeholder="Add this as new tag" 
    placeholder="Search or a tag" 
    label="name" 
    track-by="code" 
    :options="options" 
    :multiple="true" 
    :taggable="true" 
    @tag="addTag">
    </multiselect>

    <pre class="language-json"><code>Value tag :  {{value}}</code></pre>

    <input v-model="currentTag">
    <p>current tag : {{ currentTag }}</p>

</div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import Multiselect from 'vue-multiselect'
import {
    mapGetters
} from 'vuex';

Vue.component('multiselect', Multiselect)

export default {
    computed: {
        ...mapGetters([
            'getTag',
            'GET_CONFIG'
        ])
    },
    components: {
        Multiselect
    },
    data() {
        return {
            currentTag: '',
            value: [],
            options: [{
                name: 'hahaha',
                id: 'vu'
            }, ]
        }
    },
    methods: {
        addTag(newTag) {
            const tag = {
                name: newTag,
                id: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
            }
            this.options.push(tag)
            this.value.push(tag)
        }
    },
    async mounted() {

        if (this.getTag) {
            for (let i = 0; i < this.getTag.length; i++) {
                this.value.push({
                    name: this.getTag[i].tag_name,
                    id: this.getTag[i].tag_name.substring(0, 2) + Math.floor((Math.random() * 10000000))
                })
                //set ค่าลง vuex
            }
        }
        console.log('-------------')
        const {
            data
        } = await axios.get(
            `https://www.sit-acc.nruf.in.th/tags/b`,
            this.GET_CONFIG)
        console.log("tags : ", data)

    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
</style>
