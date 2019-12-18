<template>
<div v-if="loading"><img src="../../assets/Rolling-2s-200px.svg" class="center-div"></div>
<div v-else>
    <div id="bodyBg">
        <div class="columns" v-if="this.haveLecturer">
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

        <div class="columns" v-if="this.haveLecturer">
            <div class="column">
                <div class="card-content cardSize colName">
                    <div class="columns">
                        <div class="column is-4">Lecturer Name</div>
                        <div class="column">Position</div>
                        <div style="margin-right:22%;">Admin</div>

                    </div>
                </div>
                <div class="card lecturerCard lecturerName" v-for="(person,index) in lecturer" v-bind:key="index">
                    <div class="card-content cardSize">
                        <div class="columns">
                            <div class="column is-3 courseName">{{index+1}}) {{person.fName}} {{person.lName}}</div>
                            <div class="column">{{person.position}}</div>
                            <div v-if="person.isAdmin == true" style="margin-right:10%; margin-top:10px">
                                <div class="columns">
                                    <div class="column">
                                        Allow
                                    </div>
                                    <!-- <md-switch v-model="person.isAdmin" style="margin-top:12px">
                                    </md-switch> -->
                                </div>
                            </div>
                            <div v-else style="margin-right:9%;margin-top:10px">
                                <div class="columns">
                                    <div class="column">
                                        Not Allow
                                    </div>
                                    <!-- <md-switch v-model="person.isAdmin" style="margin-top:12px">
                                    </md-switch> -->
                                </div>
                            </div>
                            <div @click="showAdmin(index)" style="margin-top:7px"><i class="la la-edit" id="Action"></i></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <img src="/static/img/empty.f27adc6.png" style="height: 350px !important;">
            <b id="noLecturer" style="font-size: 20px;">
                Lecturer not found </b>
        </div>
        <modal name="showStatusAdmin">
            <md-card-header>
                <div v-if="this.Admin == false">
                    <md-card-header-text>
                        <div class="md-title" id="title">You want to not allow {{this.firstname}} to become a admin? </div>
                    </md-card-header-text>
                </div>
                <div v-else>
                    <md-card-header-text>
                        <div class="md-title" id="title">You want to allow {{this.firstname}} to become a admin? </div>
                    </md-card-header-text>
                </div>
            </md-card-header>
            <md-card-content>
                <span class="addBtn">
                    <a class="button addCommentBtn" @click="saveChange">Yes</a>
                    <a class="button addCommentBtn" @click="closeAdmin">Close</a>
                </span>
            </md-card-content>
        </modal>
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
            haveLecturer: true,
            Admin: false,
            firstname: '',
            index: ''
        }
    },
    async mounted() {
        console.log(this.URL);
        const {
            data
        } = await axios.get(`${this.URL}/users/list_lecturer`);
        console.log(data, 'lecId');
        if (data.message != 'Validate Error') {
            for (let i = 0; i < data.length; i++) {
                this.persons.push(data[i])
                this.persons[i].fName = data[i].firstname
                this.persons[i].lName = data[i].lastname
                this.persons[i].position = data[i].position_name
                this.persons[i].isAdmin = data[i].isAdmin
                this.persons[i].lecturerId = data[i].lecturerId
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
        showAdmin(index) {
            this.index = index
            this.firstname = this.persons[index].fName
            this.Admin = this.persons[index].isAdmin
            if (this.Admin == false) {
                this.Admin = true
            } else {
                this.Admin = false
            }
            console.log(this.Admin, 'admin');

            this.$modal.show('showStatusAdmin')
        },
        closeAdmin() {
            this.$modal.hide('showStatusAdmin')
        },
        saveChange() {
            try {
                axios.patch(`${this.URL}/users/admin`, {
                    lecturerId: this.persons[this.index].lecturer_id,
                    isAdmin: this.Admin
                }, this.GET_CONFIG).then(res => {
                    console.log("res : ", res)
                    if (res.status == 200) {
                        this.$modal.hide('showStatusAdmin')
                        location.reload();
                        // console.log(this.persons[this.index],'lecID');
                        // console.log(this.Admin,'admin');
                    }
                })
            } catch (err) {
                console.log('FAILURE!!' + err)
            }

        }
    },
    beforeMount() {
        this.SET_LOADING_STATUS(true)
    },
    computed: {
        ...mapGetters({
            URL: 'GET_PATHNAME',
            loading: 'GET_LOADING',
            GET_CONFIG: 'GET_CONFIG'
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

#noLecturer {
    margin-left: 45%;
    margin-top: 10%
}
</style>
