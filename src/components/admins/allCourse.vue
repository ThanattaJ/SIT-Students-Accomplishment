<template>
<div v-if="loading"><img src="../../assets/Rolling-2s-200px.svg" class="center-div"></div>
<div v-else>
    <div id="bodyBg">
        <div class="columns">
            <div class="column is-narrow">
                <div class="field">
                    <p class="control has-icons-left">
                        <input class="input" type="text" v-model="search" placeholder="Search Course ...">
                        <span class="icon is-small is-left">
                            <i class="la la-search"></i>
                        </span>
                    </p>
                </div>
            </div>
            <div class="column countAll">
                <button class="button createBtn" @click="showAddCourseModal()">+ Add Course</button>
            </div>
        </div>

        <div class="columns" style="margin-top:40px">
            <!-- nav bar -->
            <div class="column is-2">
                <aside class="menu navAssignDetail">
                    <ul id="faculty" class="menu-list navTopic clickSearch" @click="filterByFaculty('')">All</ul>
                    <ul id="faculty" class="menu-list navTopic clickSearch" @click="filterByFaculty('INT')">Information Technology</ul>
                    <ul id="faculty" class="menu-list navTopic clickSearch" @click="filterByFaculty('CSC')">Computer Science</ul>
                    <ul id="faculty" class="menu-list navTopic clickSearch" @click="filterByFaculty('DSI')">Digital Service Innovation</ul>
                    <ul id="faculty" class="menu-list navTopic clickSearch" @click="showNoInCourse('noInCourse')">Canceled Courses</ul>
                </aside>
            </div>
            <div class="column" style="padding-left:100px;">
                <div class="columns">
                    <div class="column" v-if="this.noInCourse === false">
                        <div class="card-content cardSize colName">
                            <div class="columns">
                                <div class="column is-two-thirds">Course Name</div>
                                <div class="column countAssign">Edit Detail</div>
                                <div class="column countAssign">Remove Course</div>
                            </div>
                        </div>
                        <div class="card lecturerCard lecturerCourseCard" v-for="(person,index) in get_course " v-bind:key="index">
                            <div class="card-content cardSize">
                                <div class="columns">
                                    <div class="column is-two-thirds courseName" @click="showDetail(index)">{{index+1}}) {{person.course}} | {{person.name}}</div>
                                    <div class="column countAssign"><i class="la la-edit" id="Action" @click="edit(index)"></i></div>
                                    <div class="column countAssign"><i class="la la-trash" id="Action" @click="deleteCourse(index)"></i></div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="column" v-if="this.noInCourse === true">
                        <div class="card-content cardSize colName">
                            <div class="columns">
                                <div class="column is-two-thirds">Course Name</div>
                                <div class="column countAssign">Add Course</div>
                            </div>
                        </div>
                        <div class="card lecturerCard lecturerCourseCard" v-for="(person,index) in get_notInCourse " v-bind:key="index">
                            <div class="card-content cardSize">
                                <div class="columns">
                                    <div class="column is-two-thirds courseName" @click="showDetail(index)">{{index+1}}) {{person.course_code}} | {{person.course_name}}</div>
                                    <div class="column countAssign"><i id="Action" @click="addCourse(index)">+</i></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <modal name="showCourseDetail">
            <md-card-header>
                <md-card-header-text>
                    <div class="md-title" id="title">Course detail</div>
                </md-card-header-text>
            </md-card-header>
            <md-card-content v-if="courseDetail == null">
                No detail
            </md-card-content>
            <md-card-content v-else>
                {{courseDetail}}
            </md-card-content>
            <md-card-content>
                <span class="addBtn">
                    <a class="button addCommentBtn" @click="closeCourseDetail">Close</a>
                </span>
            </md-card-content>
        </modal>

        <modal name="editCourseDetail">
            <md-card-header>
                <md-card-header-text>
                    <div class="md-title" id="title">Course detail</div>
                </md-card-header-text>
            </md-card-header>
            <md-card-content>
                <md-field>
                    <label>Edit Course Detail</label>
                    <md-textarea v-model="editInput.course_detail" md-autogrow></md-textarea>
                </md-field>
            </md-card-content>
            <md-card-content>
                <span class="addBtn">
                    <a class="button addCommentBtn" @click="close">Cancel</a>
                    <a class="button addCommentBtn" @click="update(editInput.indexCouse)">Update</a>
                </span>
            </md-card-content>
        </modal>

        <modal name="addCourse">
            <md-card-header>
                <md-card-header-text>
                    <div class="md-title" id="title">Add Course</div>
                </md-card-header-text>
            </md-card-header>
            <md-card-content>
                <md-field>
                    <label>Course ID</label>
                    <md-textarea v-model="addInput.course" md-autogrow required></md-textarea>
                    <span id="error" v-if="this.hasMessages">There is an error</span>
                </md-field>
                <md-field>
                    <label>Course Name</label>
                    <md-textarea v-model="addInput.name" md-autogrow></md-textarea>
                </md-field>
                <md-field>
                    <label>Course Detail</label>
                    <md-textarea v-model="addInput.course_detail" md-autogrow></md-textarea>
                </md-field>
            </md-card-content>
            <md-card-content>
                <span class="addBtn">
                    <a class="button addCommentBtn" @click="closeAddCourseModal">Cancel</a>
                    <a class="button addCommentBtn" @click="add">Add</a>
                </span>
            </md-card-content>
        </modal>

        <div>
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
    </div>
</div>
</template>

<script>
import axios from 'axios';
import Vue from "vue";
import './../css/Loading.css';

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
            'GET_PATHNAME',
            'get_notInCourse',
            'GET_LOADING'
        ]),
        editMessage() {
            if (this.editMessages === false) {
                console.log(' A1')
            } else {
                console.log('A2', this.editMessages)
                return {
                    'md-invalid': this.editMessages
                }
            }

        },
        get_course() {
            if (this.faculty == "") {
                if (this.search != "") {
                    return this.persons.filter(
                        items =>
                        items.course.toLowerCase().includes(this.search.toLowerCase()) ||
                        items.name.toLowerCase().includes(this.search.toLowerCase())
                    )
                }
                return this.persons

            } else if (this.faculty == "DSI") {
                var ssc = "SSC"
                if (this.search != "") {
                    return this.persons.filter(
                        items =>
                        (items.course.toLowerCase().includes(this.search.toLowerCase()) ||
                            items.name.toLowerCase().includes(this.search.toLowerCase())) &&
                        (items.course_code.toLowerCase().includes(this.faculty.toLowerCase()) ||
                            items.course_code.toLowerCase().includes(ssc.toLowerCase()))
                    )
                }
                return this.persons.filter(
                    items =>
                    items.course_code.toLowerCase().includes(this.faculty.toLowerCase()) ||
                    items.course_code.toLowerCase().includes(ssc.toLowerCase())
                )
            } else {
                if (this.search != "") {
                    return this.persons.filter(
                        items =>
                        (items.course.toLowerCase().includes(this.search.toLowerCase()) ||
                            items.name.toLowerCase().includes(this.search.toLowerCase())) &&
                        items.course_code.toLowerCase().includes(this.faculty.toLowerCase())
                    )
                }
                return this.persons.filter(
                    items =>
                    items.course_code.toLowerCase().includes(this.faculty.toLowerCase())
                )
            }
        },
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
            info: null,
            addActive: false,
            delIndex: null,
            int: [],
            cs: [],
            dsi: [],
            search: "",
            hasMessages: false,
            editMessages: false,
            isDelete: true,
            noInCourse: false,

            courseDetail: '', //gib
            faculty: '',
            loading: true
        }
    },

    async mounted() {
        const {
            data
        } = await axios.get(this.GET_PATHNAME + '/course')
        this.set_course(data.course)
        this.set_notInCourse(data.courseIsDelete)
        // console.log(this.get_notInCourse, "course delete")
        for (let i = 0; i < data.course.length; i++) {
            this.persons.push(data.course[i])
            JSON.stringify(this.persons[i])
            this.persons[i].course = data.course[i].course_code
            this.persons[i].name = data.course[i].course_name
            this.persons[i].course_id = data.course[i].course_id
            this.persons[i].course_detail = data.course[i].course_detail
        }
        this.persons.length = data.course.length
        // console.log('persons : ', this.persons)
        this.loading = false
    },
    methods: {
        filterByFaculty(faculty) {
            this.faculty = faculty
            this.noInCourse = false
        },
        showNoInCourse() {
            this.noInCourse = true
        },
        ...mapActions([
            'set_course',
            'push_course',
            'set_notInCourse',
            'push_notInCourse'
        ]),
        showAddCourseModal() {
            console.log('allcourse : ', this.get_course)
            this.$modal.show('addCourse')
        },
        closeAddCourseModal() {
            this.$modal.hide('addCourse')
            this.hasMessages = false
            this.addInput= {}
        },
        modalActive: function (index) {
            this.addActive = true
            for (var key in this.addInput) {
                this.addInput[key] = '';
            }
        },
        async add() {
            if (this.addInput.course != null) {
                if (this.addInput.course.length === 6) {
                    try {
                        axios.post(this.GET_PATHNAME + '/course', {
                            code: this.addInput.course,
                            name: this.addInput.name,
                        }).then(res => {
                            console.log("res : ", res)
                            if (res.status == 200) {
                                this.addActive = false
                            }
                            this.persons.push({
                                course: this.addInput.course,
                                course_code: this.addInput.course,
                                name: this.addInput.name,
                                course_detail: this.addInput.course_detail
                            })

                            this.$modal.hide('addCourse')
                            console.log("getCourse : ", this.get_course)

                        })
                        this.message = " uploaded complete";
                        this.file = " ";
                    } catch (err) {
                        console.log('FAILURE!!' + err)
                        this.message = "Something went wrong";
                        this.error = true;
                    }
                    this.hasMessages = false
                    this.addInput= {}
                } else {
                    this.hasMessages = true
                }
            } else {
                this.hasMessages = true
                console.log('null',this.hasMessages );
                
            }

        },
        //function to handle data edition
        edit: function (index) {
            this.editInput = this.persons[index];
            this.isActive = true
            this.editInput.indexCouse = index
            this.$modal.show('editCourseDetail')

        },
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
                    axios.patch(this.GET_PATHNAME + '/course?id=' + this.persons[index].course_id, {
                        code: this.editInput.course,
                        name: this.editInput.name,
                        detail: this.editInput.course_detail
                    }).then(res => {
                        console.log("res : ", res)
                        if (res.status == 200) {
                            this.isActive = false;
                            this.editMessages = false
                        }
                    })

                    this.message = " uploaded complete";
                    this.file = " ";
                    this.error = false;

                } catch (err) {
                    console.log('FAILURE!!' + err)
                    this.message = "Something went wrong";
                    this.error = true;
                }
            } else {

                this.editMessages = true
                console.log('message : ', this.editMessages)
            }
        },

        close: function () {
            this.isActive = false;
            this.addActive = false;
            this.$modal.hide('editCourseDetail')
        },
        showDetail(index) {
            this.courseDetail = this.get_course[index].course_detail
            this.$modal.show('showCourseDetail')
        },
        closeCourseDetail() {
            this.$modal.hide('showCourseDetail')
        },
        addCourse(index) {
            console.log(index)
            console.log("allcourse : ", this.get_course);

            console.log("course_id", this.get_notInCourse[index].course_name);

            if (this.noInCourse) {
                this.isDelete = false
            }
            if ((confirm('Do you want to add ? '))) {
                try {
                    axios.patch(this.GET_PATHNAME + '/course?id=' + this.get_notInCourse[index].course_id, {
                        code: this.get_notInCourse[index].course_code,
                        name: this.get_notInCourse[index].course_name,
                        isDelete: this.isDelete
                    }).then(res => {
                        console.log("res : ", res)
                        if (res.status == 200) {
                            this.isActive = false;
                            this.editMessages = false
                        }
                        this.persons.push({
                            course_code: this.get_notInCourse[index].course_code,
                            course: this.get_notInCourse[index].course_code,
                            name: this.get_notInCourse[index].course_name,
                        })
                        console.log("--", this.get_notInCourse[index].course_code, "\\", this.get_notInCourse[index].course_name)
                        this.get_notInCourse.splice(index, 1)
                    })
                } catch (err) {
                    console.log('FAILURE!!' + err)
                }
            }
        },
        deleteCourse(index) {
            if ((confirm('Do you want to remove ? '))) {
                try {
                    axios.delete(this.GET_PATHNAME + '/course?id=' + this.persons[index].course_id, {
                        code: this.get_course[index].course,
                    }).then(res => {

                        console.log("res : ", res)
                        if (res.status == 200) {
                            this.isActive = false;
                            this.editMessages = false
                        }
                        this.push_notInCourse({
                            course_code: this.get_course[index].course,
                            course_detail: this.get_course[index].course_detail,
                            course_name: this.get_course[index].course_name,
                        })
                        this.get_course.splice(index, 1)
                    })
                } catch (err) {}
            }
        }
    }

};

//function to sort table data alphabetically
var ordonner = function (a, b) {
    return (a.course > b.course);
    return (a.name > b.name);
    return (a.detail > b.detail)

};
</script>

<style>
#Action {
    color: #265080 !important
}

#error {
    margin-left: 80%;
    color: red
}

.clickSearch {
    border: none;
    outline: none;
    padding: 10px 16px;
    background-color: #f1f1f1;
    cursor: pointer;
}

.clickSearch:hover {
    background-color: #265080;
    color: white;
}
</style>
