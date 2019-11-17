<template>
<div>
    <vue-tags-input v-model="tag" :tags="tags" :autocomplete-items="filteredItems" @tags-changed="newTags => tags = newTags" />
    <!-- <div>{{tag}}</div> -->
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
import index from '../../router';

export default {
    components: {
        VueTagsInput,
    },
    data() {
        return {
            tag: '',
            tags: [],
            autocompleteItems: [],
            index: 0,
            storeTags: [],
            arrayTags:[]

        };
    },
    computed: {
        ...mapGetters([
            'getTag',
            'GET_PATHNAME'
        ]),
        filteredItems() {
            return this.arrayTags.filter(i => {
                return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
            });
        },   
    },
    mounted() {
        for (let i = 0; i < this.getTag.length; i++) {
            this.tags.push({
                value:this.getTag[i].tag_id,
                text: this.getTag[i].tag_name  
            })
        }
        // console.log(this.getTag,'tags');
        
    },
    methods: {
        ...mapActions([
            'setTag'
        ])
    },
    watch: {
        async tag(newVal) {
            if (this.tag.length === 0) {
                this.autocompleteItems = []
                // console.log("ไม่มีค่า tag")
            }
            const {
                data
            } = await axios.get(this.GET_PATHNAME+`/tags/${this.tag}`)
            console.log('data', data);
            this.autocompleteItems = []
            data.forEach(tag => {
                this.autocompleteItems.push({
                    text: tag.tag_name,
                    value: tag.id
                })
            })
            // console.log(this.arrayTags,'Items')
            this.arrayTags = []
            for(let i = 0 ;i<this.autocompleteItems.length;i++){
                this.arrayTags.push(this.autocompleteItems[i])
            }
            this.arrayTags.reduce((unique,item)=>{
                return this.arrayTags = unique.includes(item) ? unique : [...unique,item]
            },[])
        },
        tags() {
            if (this.tags.length != 0) {
                for (let i = 0; i < this.tags.length; i++) {
                    this.storeTags.push({
                        tag_id:this.tags[i].value,
                        tag_name: this.tags[i].text
                    })
                }
                this.setTag(this.storeTags)
                console.log(this.getTag,'getTags...');
            } else {
                this.storeTags = []
                this.setTag(this.storeTags)
            }
            this.setTag(this.storeTags)
        },
        getTag() {
            this.storeTags = []
        }

    },
    beforeDestroy() {
    this.storeTags = [] 
    this.autocompleteItems = []
    },

};
</script>
