<template>
<div id="lecturer">
   <div id="search">
        <p class="control">
        <input id="searchText" class="input" type="text" v-model="search" placeholder="Search Course ..." style="font-size: 16px !important;margin-top: px !important;border-bottom: 1px solid #DBDBDB !important; width:200px !important">
    </p>
   </div>

    <div id="boxLec">
        <div id="lec">
            <md-table v-show="persons.length">
                <md-table-row>
                    <md-table-head md-numeric>#</md-table-head>
                    <md-table-head>Name</md-table-head>
                    <md-table-head>Action</md-table-head>
                </md-table-row>
                <md-table-row v-for="(person,index) in lecturer" v-bind:key="index">
                    <md-table-cell md-numeric>{{index+1}}</md-table-cell>
                    <md-table-cell @click="showDetail(index)">
                        {{person.fName}} {{person.lName}}</md-table-cell>
                    <md-table-cell>
                        {{person.position}}
                    </md-table-cell>
                </md-table-row>
            </md-table>
        </div>
    </div>
    
</div>
</template>

<script>
import axios from 'axios';
export default {
    name: "Lecturer",
    components: {},
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
        } = await axios.get(this.GET_PATHNAME+'/users/list_lecturer');
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
        lecturer(){
            if(this.search != ""){
                return this.persons.filter(
                    items =>
                    items.fName.toLowerCase().includes(this.search.toLowerCase())||
                    items.lName.toLowerCase().includes(this.search.toLowerCase())
                )
            }else{
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

<style>
#lecturer {
    width: 90%;
    margin-left: 150px;
    max-width: 70%;
    margin-top: 50px !important;
}

#thead {
    margin-right: 20px;
    background: wheat;
}

#index {
    width: 100px;
}

#subjects {
    width: 200px;
}

#position {
    width: 200px;
}

#Action {
    width: 100px
}

#foot-modal {
    justify-content: center;
}

#add {
    font-size: 10px;
    color: grey;
}

#action_bar {
    color: #265080 !important
}

#aside {
    max-width: 15%;
}

#lec {
    margin-top: -30px !important;
    margin-left: 200px !important;
    width: 90%;
}
#search{
    margin-left: -30px;
}
</style>
