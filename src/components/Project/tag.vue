<template>
<div>
    <vue-tags-input v-model="tag" :tags="tags" :autocomplete-items="filteredItems" @tags-changed="newTags => tags = newTags" />
    <div>{{tag}}</div>
</div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueTagsInput from '@johmun/vue-tags-input';
import {
    mapGetters,
    mapActions
} from 'vuex';

export default {
    components: {
        VueTagsInput,
    },
    data() {
        return {
            tag: '',
            tags: [],
            autocompleteItems: [{
                text: 'Spain',
            }, {
                text: 'France',
            }, {
                text: 'USA',
            }, {
                text: 'Germany',
            }, {
                text: 'China',
            }],
            index: 0,
            storeTags: [],

        };
    },
    computed: {
        ...mapGetters([
            'getTag',
        ]),
        filteredItems() {
            return this.autocompleteItems.filter(i => {
                return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
            });
        },
    },
    mounted() {
        for (let i = 0; i < this.getTag.length; i++) {
            // this.storeTags[i] = this.getTag[i].tag_name
            this.tags.push({
                text : this.getTag[i].tag_name
            })
            // console.log(this.storeTags[i])

        }
    },
    methods: {
        ...mapActions([
            'setTag'
        ])
    },
    watch: {
        async tag(newVal) {
            console.log(this.tag.length)
            if (this.tag.length === 0) {
                this.autocompleteItems = []
                console.log("ไม่มีค่า tag")
            }
            const {
                data
            } = await axios.get(`https://www.sit-acc.nruf.in.th/tags/${this.tag}`)
            // console.log(data)
            data.forEach(tag => {
                this.autocompleteItems.push({
                    text: tag.tag_name
                })
            })
            // console.log(this.autocompleteItems)
        },
        tags() {
            this.autocompleteItems = []
            if(this.tags.length != 0){
                for(let i =0 ; i < this.tags.length ;i++){
                    console.log("tags : ",this.tags[i].text)
                    this.storeTags.push({
                        tag_name:this.tags[i].text
                    })
                }
                this.setTag(this.storeTags)
                console.log("getTag : ",this.getTag)
            }else{
                this.storeTags= []
                this.setTag(this.storeTags)
            }
            // this.setTag(this.storeTags)
        },
        getTag(){
            this.storeTags= []
        }

    }

};
</script>
