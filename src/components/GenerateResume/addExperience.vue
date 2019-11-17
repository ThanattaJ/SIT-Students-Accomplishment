<template>
<div>
    <div class="genText">
        <i class="la la-angle-left" v-on:click="addExpeToState"></i>
        <span class="titleText">Experience</span>
    </div>
    Please select the project
    <!-- form for edit -->
    <!-- <div class="education editing" v-if="showForm == true && selectedExpe.length>0">
        <div>
            <md-field>
                <label>Project Name</label>
                <md-input :id="'project_name_en'+getIndex" :value="selectedExpe[getIndex].project_name_en"></md-input>
            </md-field>
            <md-field>
                <label>Abstract</label>
                <md-input :id="'project_abstract'+getIndex" :value="selectedExpe[getIndex].project_abstract"></md-input>
            </md-field>
            <md-field>
                <label>Year</label>
                <md-input :id="'start_year_en'+getIndex" :value="selectedExpe[getIndex].start_year_en"></md-input>
            </md-field>
        </div>

        <a class="button is-small saveBtn" @click="saveChange(getIndex);showForm = !showForm" style="margin-top: 3px;">Save</a>
        <a class="button is-small cancelBtn" @click="cancelChange(getIndex);showForm = !showForm" style="margin-top: 3px;">Cancel</a>
        <i class="la la-trash" style="float:right" @click="unselect(getIndex);showForm = !showForm;"></i>
    </div> -->
    <!-- show selected experience -->
    <!-- <div :id="'edit'+index" class="columns allEducation" v-for="(expe,index) in selectedExpe" v-bind:key="'selected'+index" @click="showDetail(index);showForm = !showForm;"> -->
    <div :id="'edit'+index" class="columns allEducation" v-for="(expe,index) in selectedExpe" v-bind:key="'selected'+index" @click="unselect(getIndex)">
        <div class="column is-1 educationList">
            <i class="la la-ellipsis-v educationIcon"></i>
        </div>
        <div class="column">
            <p class="showEducation schoolname">{{expe.project_name_en}}</p>
            <p class="showEducation levelEdu">{{expe.project_abstract}}</p>
            <p class="showEducation eduYear">{{expe.start_year_en}}</p>
        </div>
    </div>
    <!-- show all experience -->
    <div :id="'allExp'+index" class="columns allEducation" v-for="(expe,index) in experience" v-bind:key="index" @click="chooseExp(index);showForm = false">
        <div class="column is-1 educationList">
            <!-- <input :id="'checkbox'+index" type="checkbox" class="checkboxExpe" @click="chooseExp(index);showForm = false"> -->
            <input :id="'checkbox'+index" type="checkbox" class="checkboxExpe">
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
import {
    mapGetters,
    mapActions
} from 'vuex'

export default {
    data() {
        return {
            showForm: false,
            getIndex: 0
        }
    },
    computed: {
        ...mapGetters({
            experience: 'GET_EXPERIENCE_DATA',
            selectedExpe: 'GET_EXPERIENCE_SELECTED'
        })
    },
    async mounted() {},
    methods: {
        ...mapActions(['SET_PAGE']),
        // canClick() {
        //     for (var n = 0; n < this.experience.length; n++) {
        //         document.getElementById('allExp' + n).setAttribute("class", "columns allEducation")
        //     }
        //     for (var n = 0; n < this.selectedExpe.length; n++) {
        //         document.getElementById('edit' + n).setAttribute("class", "columns allEducation")
        //     }
        // },
        // cannotClick() {
        //     for (var n = 0; n < this.experience.length; n++) {
        //         document.getElementById('allExp' + n).setAttribute("class", "columns allEducation mystyle")
        //     }
        //     for (var n = 0; n < this.selectedExpe.length; n++) {
        //         document.getElementById('edit' + n).setAttribute("class", "columns allEducation mystyle")
        //     }
        // },
        addExpeToState() {
            this.SET_PAGE(1);
        },
        chooseExp(index) {
            this.selectedExpe.push(this.experience[index])
            this.experience.splice(index, 1)
            document.getElementById('checkbox' + index).checked = false;
        },
        unselect(index) {
            this.experience.push(this.selectedExpe[index])
            this.selectedExpe.splice(index, 1)
            document.getElementById('edit' + index).style.display = 'flex'
            // this.canClick()
        },
        // showDetail(index) {
        //     document.getElementById('edit' + index).style.display = 'none'
        //     this.getIndex = index
        //     return this.getIndex
        //     // this.cannotClick()
        // },
        // saveChange(index) {
        //     var project_name_en = document.getElementById('project_name_en' + index).value;
        //     var project_abstract = document.getElementById('project_abstract' + index).value;
        //     var start_year_en = document.getElementById('start_year_en' + index).value;

        //     var replaceExp = {
        //         project_name_en: project_name_en,
        //         project_abstract: project_abstract,
        //         start_year_en: start_year_en
        //     }
        //     this.selectedExpe.splice(index, 1, replaceExp)
        //     this.cancelChange(index)
        // },
        // cancelChange(index) {
        //     document.getElementById('edit' + index).style.display = 'flex'
        //     // this.canClick()
        // },
    }
}
</script>
