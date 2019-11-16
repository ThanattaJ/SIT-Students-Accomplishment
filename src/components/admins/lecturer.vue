<template>
<div v-if="loading"><img src="../../assets/Rolling-2s-200px.svg" class="center-div"></div>
<div v-else>
    <div id="bodyBg">
        <div class="columns"  v-if="this.haveLecturer">
            <div class="column is-narrow"> 
                <div class="field">
                    <p class="control has-icons-left">
                        <input class="input" type="text" v-model="search" placeholder="Search Lecturer ..." >
                        <span class="icon is-small is-left">
                            <i class="la la-search"></i>
                        </span>
                    </p>
                </div>
            </div>
        </div>

        <div class="columns" v-if="this.haveLecturer">
            <div class="column">
                <div class="card-content cardSize colName">
                    <div class="columns">
                        <div class="column is-4">Lecturer Name</div>
                        <div class="column">Position</div>
                    </div>
                </div>
                <div class="card lecturerCard lecturerName" v-for="(person,index) in lecturer" v-bind:key="index">
                    <div class="card-content cardSize">
                        <div class="columns">
                            <div class="column is-4 courseName">{{index+1}}) {{person.fName}} {{person.lName}}</div>
                            <div class="column">{{person.position}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <p id="noLecturer">
                Lecturer not found </p>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import './../css/Loading.css';
import {
    mapActions,
    mapGetters,
    mapMutations
} from 'vuex';
export default {
    name: "Lecturer",
    data() {
        return {
            columns: ['#', 'Name', 'Position', 'Actions '],
            persons: [],
            bin: [],
            isActive: false,
            search: "",
            haveLecturer: true
        }
    },
    async mounted() {
        console.log(this.URL);
        const {
            data
        } = await axios.get(`${this.URL}/users/list_lecturer`);
        console.log(data);
        if (data.message != 'Validate Error') {
            for (let i = 0; i < data.length; i++) {
                this.persons.push(data[i])
                this.persons[i].fName = data[i].firstname
                this.persons[i].lName = data[i].lastname
                this.persons[i].position = data[i].position_name
            }
            this.persons.length = data.length
            this.SET_LOADING_STATUS(false)
        } else {
            console.log('no locturer');
            this.SET_LOADING_STATUS(false)
            this.haveLecturer = false

        }
    },
    methods: {
        ...mapActions(['SET_LOADING_STATUS']),
        //function to add data to table
        close: function () {
            this.isActive = false;
        },
    },
    beforeMount() {
        this.SET_LOADING_STATUS(true)
    },
    computed: {
        ...mapGetters({
            URL: 'GET_PATHNAME',
            loading: 'GET_LOADING'
        }),
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

<style scoped>
.lecturerName {
    height: 60px !important;
    margin-bottom: 15px;
}
#noLecturer{
    margin-left: 45%;
    margin-top: 10%
}
</style>
