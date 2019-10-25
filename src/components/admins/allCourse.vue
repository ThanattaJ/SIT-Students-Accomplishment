<template>
<div id="allCourse">

    <aside class="menu" id="aside">
        <!-- <div id="search">
            <p class="control">
                <input id="searchText" class="input" type="text" v-model="search" placeholder="Search Course ..." style="font-size: 16px !important;margin-top: px !important;border-bottom: 1px solid #DBDBDB !important; width:200px !important">
            </p>
        </div> -->
        <ul class="menu-list">
            <md-button id="manu" @click="all">All</md-button>
            <md-button id="manu" @click="information">Information Technology</md-button>
            <md-button id="manu" @click="comSci">Computer Science</md-button>
            <md-button id="manu" @click="Dsi">Digital Service Innovation</md-button>
        </ul>
    </aside>

    <div>
        <div id="co">
            <md-table v-show="persons.length">
                <md-table-row>
                    <md-table-head md-numeric>#</md-table-head>
                    <md-table-head>Name</md-table-head>
                    <md-table-head>Action</md-table-head>
                </md-table-row>
                <md-table-row v-for="(person,index) in get_course " v-bind:key="index">
                    <md-table-cell md-numeric>{{index+1}}</md-table-cell>
                    <md-table-cell @click="showDetail(index)">
                        {{person.course_code}} | {{person.name}}</md-table-cell>
                    <md-table-cell>
                        <a href="#modal" id="Action" @click="edit(index)" class="btn waves-effect waves-light yellow darken-2"><i class="material-icons">edit</i>
                        </a>
                        <a href="#!" id="Action" class="btn waves-effect waves-light red darken-2" @click="Delete(index)"><i class="material-icons">Delete</i>
                        </a>
                    </md-table-cell>
                </md-table-row>
                <td><a href="#!" @click="modalAvtive()" class="btn btn-waves green darken-2"><i class="material-icons" id="add">+ Add Course ...</i></a></td>
            </md-table>
        </div>
        <div class="modal" v-show="bin.length" v-bind:class="{'is-active':deleteActive}" id="alert">
            <div class="modal-background"></div>
            <div class="modal-content">
                <md-card class="md-accent" md-with-hover v-for="(person,index) in bin" v-bind:key="index">
                    <md-ripple>
                        <md-card-header>
                            <div class="md-title"> {{person.course}} | {{person.name}}</div>
                            <div class="md-subhead">index : {{delIndex+1}}</div>
                        </md-card-header>

                        <md-card-content>
                            {{person.detail}}
                        </md-card-content>

                        <md-card-actions>
                            <md-button href="#!" @click="restore(index)">cancel</md-button>
                            <md-button href="#!" @click="deplete(index)">delete</md-button>
                        </md-card-actions>
                    </md-ripple>
                </md-card>
            </div>
        </div>
    </div>
    <div v-bind:class="{'is-active':isActive}" id="modal" class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
            <div class="modal-card-body">
                <h4 class="center-align">Edit</h4>
                <div class="row">
                    <form class="col s12">
                        <div class="row">
                            <md-field>
                                <label>Course Number</label>
                                <md-textarea v-model="editInput.course" md-autogrow></md-textarea>
                            </md-field>
                            <md-field>
                                <label>Course Name</label>
                                <md-textarea v-model="editInput.name" md-autogrow></md-textarea>
                            </md-field>
                            <md-field>
                                <label>Course Detail</label>
                                <md-textarea v-model="editInput.detail" md-autogrow></md-textarea>
                            </md-field>
                        </div>
                    </form>
                </div>
            </div>
            <footer class="modal-card-foot" id="foot-modal">
                <md-button class="md-dense md-raised md-primary" href="#!" @click="update(editInput.indexCouse)">Update</md-button>
                <md-button class="md-dense md-primary" href="#!" @click="close">Cancle</md-button>
            </footer>
        </div>
    </div>
    <div v-bind:class="{'is-active':addActive}" id="addModal" class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
            <div class="modal-card-body">
                <h4 class="center-align">Edit</h4>
                <div class="row">
                    <form class="col s12">
                        <div class="row">
                            <md-field>
                                <label>Course Number</label>
                                <md-textarea v-model="editInput.course" md-autogrow></md-textarea>
                            </md-field>
                            <md-field>
                                <label>Course Name</label>
                                <md-textarea v-model="editInput.name" md-autogrow></md-textarea>
                            </md-field>
                            <md-field>
                                <label>Course Detail</label>
                                <md-textarea v-model="editInput.detail" md-autogrow></md-textarea>
                            </md-field>
                        </div>
                    </form>
                </div>
            </div>
            <footer class="modal-card-foot" id="foot-modal">
                <md-button class="md-dense md-raised md-primary" href="#!" @click="add">Update</md-button>
                <md-button class="md-dense md-primary" href="#!" @click="close">Cancle</md-button>
            </footer>
        </div>
    </div>
    <div id="detailActive">
        <md-dialog :md-active.sync="detailActive" v-if="persons[detailIndex]">
            <md-card-header>
                <div class="md-title">{{persons[detailIndex].name}}</div>
                <div class="md-subhead">{{persons[detailIndex].course}}</div>
            </md-card-header>
            <md-card-content>
                {{persons[detailIndex].detail}}
            </md-card-content>
            <md-dialog-actions>
                <md-button class="md-primary" @click="detailActive = false">Close</md-button>
            </md-dialog-actions>
        </md-dialog>
    </div>

</div>
</template>

<script>
import axios from 'axios';
import Vue from "vue";
import {
    mapGetters,
    mapActions,
} from 'vuex'
export default {

    name: "allCourse",
    computed: {
        ...mapGetters([
            'get_course',
            'get_lecturer'
        ])
    },
    data() {
        return {
            columns: ['#', 'Course', 'Actions '],
            persons: [],
            bin: [],
            input: {},
            editInput: {
                course: "",
                name: "",
                detail: "",
                indexCouse: null,
            },
            isActive: false,
            deleteActive: false,
            detailActive: false,
            info: null,
            addActive: false,
            delIndex: null,
            detailIndex: null,
            int: [],
            cs: [],
            dsi: [],
            search: " "
        }
    },
    // computed: {
    //     searchCourse() {
    //         if (this.search != " ") {
    //             return this.get_course.filter(
    //                 items =>
    //                 items.course_code.toLowerCase().includes(this.search.toLowerCase()) ||
    //                 items.course_name.toLowerCase().includes(this.search.toLowerCase())
    //             )
    //         } else {
    //             return this.get_course
    //         }
    //     }
    // },

    async mounted() {
        const {
            data
        } = await axios.get('https://www.sit-acc.nruf.in.th/course')
        this.set_course(data)
        console.log("get", this.get_course)
        console.log("data ", data)
        for (let i = 0; i < data.length; i++) {
            this.persons.push(data[i])
            JSON.stringify(this.persons[i])
            this.persons[i].course = data[i].course_code
            this.persons[i].name = data[i].course_name
            this.persons[i].course_id = data[i].id
            this.persons[i].detail = data[i].detail
        }
        this.persons.length = data.length
    },
    methods: {
        ...mapActions([
            'set_course',
        ]),
        modalAvtive: function (index) {
            this.addActive = true
            for (var key in this.editInput) {
                this.editInput[key] = '';
            }
        },
        async add() {
            try {
                axios.post('https://www.sit-acc.nruf.in.th/course', {
                    code: this.editInput.course,
                    name: this.editInput.name,
                }).then(function (res) {
                    console.log(res);
                })
                this.message = " uploaded complete";
                this.file = " ";
                this.error = false;
            } catch (err) {
                console.log('FAILURE!!' + err)
                this.message = "Something went wrong";
                this.error = true;
            }
            this.addActive = false
            this.persons.push({
                course: this.editInput.course,
                name: this.editInput.name,
                detail: this.editInput.detail
            });

            this.persons.sort(ordonner);
        },
        //function to handle data edition
        edit: function (index) {
            this.editInput = this.persons[index];
            this.isActive = true
            this.editInput.indexCouse = index
            console.log("isActive : " + index)
        },
        //function to send data to bin
        Delete: function (index) {
            this.bin.push(this.persons[index]);
            this.delIndex = index
            console.log("index : " + this.delIndex)
            this.bin.sort(ordonner);
            this.deleteActive = true

        },
        //function to restore data
        restore: function (index) {
            // this.persons.push(this.bin[index]);
            this.bin.splice(index, 1);
            this.bin.sort(ordonner);
        },
        //function to update data
        update(index) {
            // this.persons.push(this.editInput);
            JSON.stringify(this.persons[index])
            console.log('eiei: ' + index)
            try {
                //เอา  id ของโปรเจคมาใส่เพื่อ update 
                axios.patch('https://www.sit-acc.nruf.in.th/course?id=' + this.persons[index].course_id, {
                    code: this.editInput.course,
                    name: this.editInput.name,
                    detail: this.persons[index].detail
                }).then(function (res) {
                    console.log(res);
                })
                this.message = " uploaded complete";
                this.file = " ";
                this.error = false;
                this.persons.splice(index, 1);
                // console.log(this.persons[index].name + "couse")
                this.persons.push({
                    course: this.editInput.course,
                    name: this.editInput.name,
                    detail: this.editInput.detail
                });
                for (var key in this.editInput) {
                    this.editInput[key] = '';
                }
                this.persons.sort(ordonner);
                this.isActive = false;
            } catch (err) {
                console.log('FAILURE!!' + err)
                this.message = "Something went wrong";
                this.error = true;
                // console.log(this.persons[index])
            }
        },
        //function to defintely delete data 
        deplete: function (delIndex) {
            // this.delIndex = index
            console.log("delIndex : ", this.delIndex)
            try {
                axios.delete('https://www.sit-acc.nruf.in.th/course?id=' + this.persons[this.delIndex].course_id)
                    .then(function (res) {
                        console.log(res);
                    })
                this.message = " uploaded complete";
                this.file = " ";
                this.error = false;
                // JSON.stringify(this.persons[delIndex])
                this.bin.splice(delIndex, 1);
                this.persons.splice(delIndex, 1);
                console.log("delete : " + this.persons[delIndex].course_id)
            } catch (err) {
                console.log('FAILURE!!' + err)
                this.message = "Something went wrong";
                this.error = true;
            }
        },
        close: function () {
            this.isActive = false;
            this.addActive = false;
        },
        showDetail(index) {
            this.detailActive = true
            this.detailIndex = index
            console.log("")
            //detailIndex = index someone

        },
        information() {
            this.dsi = []
            this.cs = []
            this.int = []
            this.set_course(this.persons)
            for (let i = 0; i < this.persons.length; i++) {
                if (this.get_course[i].course_code.substring(0, 3) === "INT") {
                    this.int.push(this.get_course[i])
                }
            }
            console.log(this.get_course.length)
            this.set_course(this.int)
        },
        comSci() {
            this.int = []
            this.cs = []
            this.dsi = []
            this.set_course(this.persons)
            for (let i = 0; i < this.persons.length; i++) {
                if (this.get_course[i].course_code.substring(0, 3) === "CSC") {
                    this.cs.push(this.get_course[i])
                }
            }
            console.log(this.get_course.length)
            this.set_course(this.cs)
        },
        Dsi() {
            this.int = []
            this.cs = []
            this.dsi = []
            this.set_course(this.persons)
            for (let i = 0; i < this.persons.length; i++) {
                if (this.get_course[i].course_code.substring(0, 3) === "DSI" || this.get_course[i].course_code.substring(0, 3) === "SSC") {
                    this.dsi.push(this.get_course[i])
                }
            }
            console.log(this.get_course.length)
            this.set_course(this.dsi)
        },
        all() {
            this.int = []
            this.cs = []
            this.dsi = []
            this.set_course(this.persons)
        },

    },

};

//function to sort table data alphabetically
var ordonner = function (a, b) {
    return (a.course > b.course);
    return (a.name > b.name);
    return (a.detail > b.detail)

};
</script>

<style>
#allCourse {
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
    width: 350px;
}

#Action {
    width: 200px;
    color: #265080 !important
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
    max-width: 30%;
}

#co {
    margin-top: -200px !important;
    margin-left: 200px !important;

}
</style>
