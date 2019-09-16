<template>
<div>
    <div class="genText">
        <i class="la la-angle-left" v-on:click="addExpeToState"></i>
        <span class="titleText">Experience</span>
    </div>
    
    <!-- show experience -->
    <div class="columns allEducation" v-for="(expe,index) in experience" v-bind:key="index">
        <div class="column is-1 educationList">
            <input :id="'checkbox'+index" type="checkbox" class="checkboxExpe" v-if="chooseExp==false" @click="changeExp(index)">
            <i class="la la-ellipsis-v educationIcon" v-if="chooseExp==true"></i>
        </div>
        <div class="column">
            <p class="showEducation schoolname">{{expe.project_name_en}}</p>
            <p class="showEducation levelEdu">{{expe.project_abstract}}</p>
            <p class="showEducation eduYear">{{expe.start_year_en}}</p>
        </div>
    </div>
</div>
</template>

<script>
import axios from "axios";
import {
    mapGetters,
    mapActions
} from 'vuex'

export default {
    data() {
        return {
            chooseExp: false
        }
    },
    computed: {
        ...mapGetters({
            experience: 'GET_EXPERIENCE_DATA'
        })
    },
    async mounted() {
    },
    methods: {
        ...mapActions(['SET_PAGE']),
        addExpeToState() {
            this.SET_PAGE(1);
        },
        changeExp(index) {
            console.log("cc")
            this.chooseExp = true
        }
    }
}
</script>
