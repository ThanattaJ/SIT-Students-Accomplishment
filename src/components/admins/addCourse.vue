<template>
<!-- object value -->
<div id="addCourse">
    <button @click="reset">reset </button>
    <div>{{this.item.value}}</div>
    <model-select :options="options" v-model="item"
         placeholder="select course" 
         style="position: absolute; max-width: 250px; 
         margin-top :10px; height:36px ;font-size: 12px ">
    </model-select>
    
    
</div>
</template>

<script>
import {
    ModelSelect
} from 'vue-search-select'
import {
    mapGetters,
    mapActions
} from 'vuex';
export default {
    computed: {
        ...mapGetters([
            'get_course'
        ])
    },
    data() {
        return {
            option: [],
            item: {
                value: '',
                text: ''
            },
        }
    },
    methods: {
        reset() {
            this.item = {}
        },
        selectFromParentComponent1() {
            this.item = this.options[0]
        },
    },
    components: {
        ModelSelect
    },
    mounted() {
        for (let i = 0; i < this.get_course.length; i++) {
            this.options.push({
                text: this.get_course[i].course_code + ' | ' + this.get_course[i].course_name,
                value: i
            })
        }
    }
}
</script>
