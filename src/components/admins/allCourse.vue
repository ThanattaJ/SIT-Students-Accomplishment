<template>
<div id="allCourse">

    <aside class="menu" id="aside">
        <div id="search">
            <p class="control">
                <input id="searchText" class="input" type="text" v-model="search" placeholder="Search Course ..." style="font-size: 16px !important;margin-top: px !important;border-bottom: 1px solid #DBDBDB !important; width:200px !important">
            </p>
        </div>
        <ul class="menu-list">
            <li>
                <md-button id="manu" @click="all">All</md-button>
            </li>
            <li>
                <md-button id="manu" @click="information">Information Technology</md-button>
            </li>
            <li>
                <md-button id="manu" @click="comSci">Computer Science</md-button>
            </li>
            <li>
                <md-button id="manu" @click="Dsi">Digital Service Innovation</md-button>
            </li>
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
                        {{person.course}} | {{person.name}}</md-table-cell>
                    <md-table-cell id="barAction">
                        <i class="la la-edit" id="Action" @click="edit(index)"></i>
                    </md-table-cell>
                </md-table-row>
                <td><a href="#!" @click="modalAvtive()" class="btn btn-waves green darken-2"><i class="material-icons" id="addCourse">+ Add Course ...</i></a></td>
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
    <div v-bind:class="{'is-active':isActive}" class="modal">
        <div class="modal-background"></div>
        <div class="modal-card" id="editmodal">
            <div class="modal-card-body">
                <md-card-header>
                    <div class="md-title">EDIT</div>
                </md-card-header>
                <div class="row" id="bodymodal">
                    <form class="col s12">
                        <div class="row">
                            <md-field :class="editMessage">
                                <label>Course Number</label>
                                <md-textarea v-model="editInput.course" md-autogrow required></md-textarea>
                                <span class="md-error" id="error">Must have 6 digit</span>
                            </md-field>
                            <md-field>
                                <label>Course Name</label>
                                <md-textarea v-model="editInput.name" md-autogrow></md-textarea>
                            </md-field>
                            <md-field>
                                <label>Course Detail</label>
                                <md-textarea v-model="editInput.course_detail" md-autogrow></md-textarea>
                            </md-field>
                        </div>
                    </form>
                </div>
            </div>
            <footer class="modal-card-foot" id="foot-modal">
                <md-button class="md-dense md-raised md-primary" href="#!" @click="update(editInput.indexCouse)">Update</md-button>
                <md-button class="md-accent" href="#!" @click="close">Cancle</md-button>
            </footer>
        </div>
    </div>
    <div v-bind:class="{'is-active':addActive}" class="modal">
        <div class="modal-background"></div>
        <div class="modal-card" id="addModal">
            <div class="modal-card-body">
                <md-card-header>
                    <div class="md-title">ADD COURSE</div>
                </md-card-header>
                <form class="col s12">
                    <div class="row" id="bodymodal">
                        <md-field :class="messageClass">
                            <label>Course Number</label>
                            <md-textarea v-model="addInput.course" md-autogrow required></md-textarea>
                            <span class="md-error" id="error">There is an error</span>
                        </md-field>
                        <md-field>
                            <label>Course Name</label>
                            <md-textarea v-model="addInput.name" md-autogrow></md-textarea>
                        </md-field>
                        <md-field>
                            <label>Course Detail</label>
                            <md-textarea v-model="addInput.course_detail" md-autogrow></md-textarea>
                        </md-field>
                    </div>
                </form>
            </div>
            <footer class="modal-card-foot" id="foot-modal">
                <md-button class="md-dense md-raised md-primary" href="#!" @click="add">ADD COURSE</md-button>
                <md-button class="md-accent" href="#!" @click="close">Cancle</md-button>
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
            'get_lecturer',
            'GET_PATHNAME'
        ]),
        messageClass() {
            if (this.addInput.course != null) {
                if (this.addInput.course.length === 6) {
                    console.log('not null', this.addInput.course)
                    this.hasMessages = false
                } else {
                    this.hasMessages = true
                    return {
                        'md-invalid': this.hasMessages
                    }
                }
            } else {
                this.hasMessages = true
                return {
                    'md-invalid': this.hasMessages
                }
            }
        },
        editMessage() {
            if ( this.editMessages === false) {
                console.log(' A1')
            } else {
                console.log('A2',this.editMessages)
                return {
                    'md-invalid': this.editMessages
                }
            }

        },
        get_course:function() {
            if (this.search != " ") {
                return this.persons.filter(
                    items =>
                    items.course.toLowerCase().includes(this.search.toLowerCase()) ||
                    items.name.toLowerCase().includes(this.search.toLowerCase())
                )
            } else {
                return this.persons
            }
        }
    },
    data() {
        return {
            columns: ['#', 'Course', 'Actions '],
            persons: [],
            bin: [],
            input: {},
            editInput: {
                course: '',
                indexCouse: null,
            },
            addInput: {},
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
            search: "",
            hasMessages: true,
            editMessages: false
        }
    },

    async mounted() {
        const {
            data
        } = await axios.get(this.GET_PATHNAME+'/course')
        this.set_course(data)
        for (let i = 0; i < data.length; i++) {
            this.persons.push(data[i])
            JSON.stringify(this.persons[i])
            this.persons[i].course = data[i].course_code
            this.persons[i].name = data[i].course_name
            this.persons[i].course_id = data[i].course_id
            this.persons[i].course_detail = data[i].course_detail
        }
        this.persons.length = data.length
        console.log('data',this.persons)
    },
    methods: {
        ...mapActions([
            'set_course',
            'push_course'
        ]),
        modalAvtive: function (index) {
            this.addActive = true
            for (var key in this.addInput) {
                this.addInput[key] = '';
            }
        },
        async add() {
            if (!this.hasMessages) {
                try {
                    axios.post(this.GET_PATHNAME+'/course', {
                        code: this.addInput.course,
                        name: this.addInput.name,
                    }).then(function (res) {
                        console.log(res);

                        console.log('เข้า try')
                        this.push_course({
                            course_code: this.addInput.course,
                            name: this.addInput.name,
                            course_detail: this.addInput.course_detail
                        })
                        // console.log("getCourse : ", this.get_course)

                    })
                    this.message = " uploaded complete";
                    this.file = " ";
                    this.error = false;
                    this.addActive = false
                } catch (err) {
                    console.log('FAILURE!!' + err)
                    this.message = "Something went wrong";
                    this.error = true;
                }
            } else {
                console.log('can not add')
                this.hasMessages = true
            }

        },
        //function to handle data edition
        edit: function (index) {
            this.editInput = this.persons[index];
            this.isActive = true
            this.editInput.indexCouse = index

        },
        //function to send data to bin
        // Delete: function (index) {
        //     this.bin.push(this.persons[index]);
        //     this.delIndex = index
        //     console.log("index : " , this.get_course[this.delIndex].course_id)
        //     this.bin.sort(ordonner);
        //     this.deleteActive = true

        // },
        //function to restore data
        restore: function (index) {
            this.bin.splice(index, 1);
            this.bin.sort(ordonner);
        },
        //function to update data
        update(index) {
            if (this.editInput.course.length === 6) {
                console.log("if : ", this.editInput.course.length)
                JSON.stringify(this.persons[index])
                try {
                    axios.patch(this.GET_PATHNAME+'/course?id=' + this.persons[index].course_id, {
                        code: this.editInput.course,
                        name: this.editInput.name,
                        detail: this.editInput.course_detail
                    }).then(function (res) {
                        console.log(res);
                    })
                    this.message = " uploaded complete";
                    this.file = " ";
                    this.error = false;
                    this.set_course({
                        course_code: this.editInput.course,
                        name: this.editInput.name,
                        detail: this.editInput.course_detail
                    });
                    this.isActive = false;
                    this.editMessages = false
                    // this.persons.splice(index, 1);
                } catch (err) {
                    console.log('FAILURE!!' + err)
                    this.message = "Something went wrong";
                    this.error = true;
                }
            } else {
             
                this.editMessages = true
                console.log('message : ',this.editMessages)
            }
        },
        //function to defintely delete data 
        // deplete: function (delIndex) {
        //     // this.delIndex = index
        //     console.log("delIndex : ", this.delIndex)
        //     try {
        //         axios.delete('https://www.sit-acc.nruf.in.th/course?id=' + this.get_course[this.delIndex].course_id)
        //             .then(function (res) {
        //                 console.log(res);
        //             })
        //         this.message = " uploaded complete";
        //         this.file = " ";
        //         this.error = false;
        //         // JSON.stringify(this.persons[delIndex])
        //         this.bin.splice(delIndex, 1);
        //         this.persons.splice(delIndex, 1);
        //         console.log("delete : " + this.persons[delIndex].course_id)
        //     } catch (err) {
        //         console.log('FAILURE!!' + err)
        //         this.message = "Something went wrong";
        //         this.error = true;
        //     }
        // },
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
                if (this.get_course[i].course_code.substring(0,3) === "INT") {
                    this.int.push(this.get_course[i])
                }
            }
            // console.log("int :",this.int)
            this.set_course(this.int)
            // console.log("get_course",this.get_course.length)
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
    max-width: 75%;
    margin-top: 50px !important;

}

#Action {
    color: #265080 !important
}

#foot-modal {
    justify-content: center;
}

#addCourse {
    font-size: 10px;
    color: grey;
}

#action_bar {
    color: #265080 !important
}

#co {
    margin-top: -200px !important;
    margin-left: 250px !important;

}

#barAction {
    max-width: 50px !important;
}

#editmodal,
#addModal {
    height: 340px;
}

#bodymodal {
    margin-top: -20px;
    height: 90px;
}

#error {
    margin-left: 80%;
}
</style>
