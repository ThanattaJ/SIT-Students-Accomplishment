<template>
<div id="bodyBg">
    <div class="columns">
        <div class="column is-narrow">
            <div class="field">
                <p class="control has-icons-left">
                    <input class="input" type="text" v-model="search" placeholder="Search Lecturer ...">
                    <span class="icon is-small is-left">
                        <i class="la la-search"></i>
                    </span>
                </p>
            </div>
        </div>
    </div>

    <div class="columns">
        <div class="column">
            <div class="card-content cardSize colName">
                <div class="columns">
                    <div class="column is-4">Name</div>
                    <div class="column">Position</div>
                </div>
            </div>
            <div class="card lecturerCard lecturerCourseCard" v-for="(person,index) in lecturer" v-bind:key="index">
                <div class="card-content cardSize">
                    <div class="columns">
                        <div class="column is-4 courseName">{{index+1}}) {{person.fName}} {{person.lName}}</div>
                        <div class="column">{{person.position}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import {
    mapActions,
    mapGetters,
    mapMutations
} from 'vuex';
export default {
    computed: {
        ...mapGetters([
            'GET_PATHNAME'
        ]),
    },
    name: "Lecturer",
    data() {
        return {
            columns: ['#', 'Name', 'Position', 'Actions '],
            persons: [{
                fName: "Sophon",
                lName: "Jampasornklin",
                position: "รายละเอียดวิชา"
            }, ],
            bin: [],
            isActive: false,
            search: ""
        }
    },
    async mounted() {

        const {
            data
        } = await axios.get(`https://www.sit-acc.nruf.in.th/users/list_lecturer`);
        for (let i = 0; i < data.length; i++) {
            this.persons.push(data[i])
            this.persons[i].fName = data[i].firstname
            this.persons[i].lName = data[i].lastname
            this.persons[i].position = data[i].position_name
        }
        this.persons.length = data.length
    },
    methods: {
        //function to add data to table
        close: function () {
            this.isActive = false;
        },
    },
    computed: {
        lecturer() {
            if (this.search != "") {
                return this.persons.filter(
                    items =>
                    items.fName.toLowerCase().includes(this.search.toLowerCase()) ||
                    items.lName.toLowerCase().includes(this.search.toLowerCase())
                )
            } else {
                return this.persons
            }
        }
    },
};

//function to sort table data alphabetically
var ordonner = function (a, b) {
    return (a.name > b.name);
    return (a.position > b.position)

};
</script>