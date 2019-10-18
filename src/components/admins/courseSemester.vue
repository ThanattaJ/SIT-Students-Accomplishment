<template>
<div id="courseSemester">

    <aside class="menu" id="aside">
        <p class="menu-label">
            General
        </p>
        <ul class="menu-list" v-for="(year,indexSem) in semesters" v-bind:key="indexSem">
            <li><a @click="getSemester(indexSem)" id="year">{{year.academic_term}}</a></li>
        </ul>
    </aside>

    <div id="body">
        <div class="container" id="semester">
            <md-table>
                <md-table-row>
                    <md-table-head md-numeric>#</md-table-head>
                    <md-table-head>Course</md-table-head>
                    <md-table-head>Lecturer</md-table-head>
                    <md-table-head>Action</md-table-head>
                </md-table-row>
                <md-table-row v-for="(person,index) in get_semester.course" v-bind:key="index">
                    <md-table-cell md-numeric>{{index+1}}</md-table-cell>
                    <md-table-cell> {{person.course}}</md-table-cell>
                    <md-table-cell>
                        <md-table-row v-for="(nameLec,index) in get_semester.course[index].lecturers" v-bind:key="index">
                            {{nameLec.lecturer_name}}
                        </md-table-row>
                    </md-table-cell>
                    <md-table-cell>
                        <a href="#modal" id="Action" @click="edit(index)" class="btn waves-effect waves-light yellow darken-2"><i class="material-icons">edit</i>
                        </a>
                        <a href="#!" id="Action" class="btn waves-effect waves-light red darken-2" @click="Delete(index)"><i class="material-icons">Delete</i>
                        </a>
                    </md-table-cell>
                </md-table-row>
                <a href="#!" @click="getCourse()" class="btn btn-waves green darken-2"><i class="material-icons" id="add">+ Add Course ...</i></a>
            </md-table>
            <div class="modal" v-show="bin.length" v-bind:class="{'is-active':deleteActive}" id="alert">
                <div class="modal-background"></div>
                <div class="modal-content">
                    <md-card class="md-accent" md-with-hover v-for="(person,index) in bin" v-bind:key="index">
                        <md-ripple>
                            <md-card-header>
                                <div class="md-title"> {{person.course}}</div>
                                <div class="md-subhead" v-for="(nameLec,lecturers) in person.lecturer" v-bind:key="lecturers">Lecturer : {{nameLec.name}}</div>
                                <div class="md-subhead">index : {{delIndex+1}}</div>

                            </md-card-header>
                            <md-card-actions>
                                <md-button href="#!" @click="restore(index)">cancle</md-button>
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

                        <!-- <label>Course Code</label>
                                    <md-textarea v-model="editInput" md-autogrow></md-textarea>
                                     <label>Course Name</label>
                                    <md-textarea v-model="editInput" md-autogrow></md-textarea> -->

                        <md-field>
                            <label for="lec">Course</label>
                            <md-select v-model="lec" name="movie" id="movie">
                                <md-option v-for="(nCourse,index) in get_course" v-bind:key="index" id="option">
                                    {{nCourse.course_code}} : {{nCourse.course_name}}
                                </md-option>
                            </md-select>
                        </md-field>

                        <md-field>
                            <label>Lecturer</label>
                            <md-textarea v-model="editInput.lecturer" md-autogrow></md-textarea>
                        </md-field>

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
                            <select @change="switchView($event, $event.target.selectedIndex)">
                                <option v-for="(nCourse,index) in get_course" v-bind:key="index"> {{nCourse.course_code}} : {{nCourse.course_name}} </option>
                            </select>
                            <select @change="lecIndex($event, $event.target.selectedIndex)">
                                <option v-for="(nlec,index) in get_lecturer" v-bind:key="index"> {{nlec.firstname}} {{nlec.lastname}} </option>
                            </select>
                        </form>
                    </div>
                </div>
                <footer class="modal-card-foot" id="foot-modal">
                    <md-button class="md-dense md-raised md-primary" href="#!" @click="add">Update</md-button>
                    <md-button class="md-dense md-primary" href="#!" @click="close">Cancle</md-button>
                </footer>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import {
    mapGetters,
    mapActions,
} from 'vuex'
export default {
    name: "courseSemester",
    computed: {
        ...mapGetters([
            'get_semester',
            'get_course',
            'get_lecturer'
        ])
    },
    data() {
        return {
            columns: ['#', 'Course', 'Lecturer', 'Actions '],
            selectedCourse: null,
            course: [{
                course: null,
                course_id: null,
                selectedCourse: null,
                id: null
            }],

            persons: [{
                course: null,
                course_id: null,
                lecturer: [{
                    name: ''
                }],
                academic_term_id: null
            }],
            semesters: [{
                academic_term: null,
                academic_term_id: ''
            }],
            lecturers: [{
                lecturer_id: null,
                fName: null,
                lName: null
            }],
            bin: [],
            input: {},
            editInput: [],
            isActive: false,
            deleteActive: false,
            addActive: false,
            delIndex: null,
            addIndex: null,
            selectedIndex: 0,
            selectedYear: 0,
            lec: 0
        }
    },
    async mounted() {
        const {
            data
        } = await axios.get('https://www.sit-acc.nruf.in.th/course/courseSemester')
        this.set_semester(data)
        for (let i = 0; i < data.course.length; i++) {
            this.set_course(data.course[i])
            if (data.course[i] > 0) {
                for (let r = 0; r < data.course[i].lecturers.length; r++) {
                    this.set_lecturer(data.course[i].lecturers)
                }
                this.persons[i].lecturer.length = data.course[i].lecturers.length
            } else {}
        }
        this.persons.length = data.course.length

        for (let i = 0; i < data.semester.length; i++) {
            this.semesters.push(data.semester[i])
            JSON.stringify(this.semesters[i])
            this.semesters[i].academic_term = data.semester[i].academic_term
            this.semesters[i].academic_term_id = data.semester[i].academic_term_id
        }
        this.semesters.length = data.semester.length

        var lecturer
        await axios.get('https://www.sit-acc.nruf.in.th/users/list_lecturer').then(response => lecturer = response.data)
        for (let i = 0; i < lecturer.length; i++) {
            this.set_lecturer(lecturer)
        }
        // console.log('lec : ',this.get_lecturer)
        var course
        await axios.get('https://www.sit-acc.nruf.in.th/course').then(response => course = response.data)

        for (let i = 0; i < course.length; i++) {
            this.set_course(course)
        }
        // console.log('course',this.get_course)

    },
    methods: {
        ...mapActions([
            'set_semester',
            'set_lecturer',
            'set_course',
            'add_semester',
        ]),
        switchView: function (event, selectedIndex) {

            this.selectedIndex = selectedIndex;
            console.log(this.get_course[this.selectedIndex].id);
        },
        lecIndex: function (event, selectedIndex) {
            this.selectedIndex = selectedIndex;
            console.log(this.get_lecturer[this.selectedIndex].lecturer_id);
        },
        getCourse() {
            this.addActive = true
        },
        async add() {

            try {
                await axios.post('https://www.sit-acc.nruf.in.th/course/courseSemester', {
                    academic_term_id: this.get_semester.course[this.delIndex].academic_term_id,
                    course_id: this.get_course[this.selectedIndex].id,
                    lecturers: [{
                        lecturer_id: this.get_lecturer[this.selectedIndex].lecturer_id
                    }]
                }).then((res) => {
                    console.log(res);
                    console.log("this : ", this)
                    this.add_semester({
                        course: this.get_course[this.selectedIndex],
                        lecturer: this.get_lecturer[this.selectedIndex]
                    })

                })
                this.file = " ";
                this.error = false;
            } catch (err) {
                console.log('FAILURE!!' + err)
                this.message = "Something went wrong";
                console.log("err", this.selectedYear, this.get_course[this.selectedIndex].id, this.get_lecturer[this.lec].lecturer_id)
                this.error = true;
            }
            this.addActive = false
            // this.persons.push({
            //     course_id: this.course[this.selectedIndex].course_id,
            //     course: this.course[this.selectedIndex].course,

            // });
            // this.course.sort(ordonner);
        },
        // function to handle data edition
        edit: function (index) {
            this.editInput.push({
                course_code: this.get_course[index].course_code
            })
            this.editInput.push({
                course_name: this.get_course[index].course_name
            })
            // this.editInput.lecturer = this.get_lecturer[index]
            this.isActive = true
            this.editInput.indexCouse = index
            console.log("isActive : ", this.editInput)
        },
        //function to send data to bin
        Delete: function (index) {
            this.bin.push(this.get_semester.course[index]);
            this.persons.splice(index, 1);
            this.bin.sort(ordonner);
            this.delIndex = index
            this.deleteActive = true
        },
        //function to restore data
        restore: function (index) {
            this.persons.push(this.bin[index]);
            this.bin.splice(index, 1);
            this.bin.sort(ordonner);
        },
        //function to update data
        update(index) {
            JSON.stringify(this.persons[index])
            try {
                axios.patch('https://www.sit-acc.nruf.in.th/course/courseSemester', {
                    academic_term_id: this.get_semester.course[this.delIndex].academic_term_id,
                    course_id: this.get_course[this.selectedIndex].id,
                    lecturers: [{
                        lecturer_id: this.get_lecturer[this.selectedIndex].lecturer_id
                    }]
                }).then(function (res) {
                    console.log(res);
                })
                this.message = " uploaded complete";
                this.file = " ";
                this.error = false;
                this.persons.splice(index, 1);
                console.log(this.persons[index].name + "couse")
                this.persons.push({
                    course: this.editInput.course,
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
                console.log(this.persons[index])
            }
        },
        //function to defintely delete data 
        deplete(delIndex) {
            let academic_term_id = this.get_semester.course[this.delIndex].academic_term_id
            let course_id = this.get_course[this.delIndex].id
            console.log("____")
            try {
                axios
                    .delete("https://www.sit-acc.nruf.in.th/course/courseSemester", {
                        data: {
                            academic_term_id: academic_term_id,
                            course_id: course_id
                        }
                    }).then(function (res) {
                        console.log(res);
                    })
                // this.persons.splice(index, 1);
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
        async getSemester(indexSem) {
            try {
                const {
                    data
                } = await axios.get('https://www.sit-acc.nruf.in.th/course/courseSemester?semester_id=' + this.semesters[indexSem].academic_term_id)
                console.log("semester : ", data)

                for (let i = 0; i < data.course.length; i++) {
                    this.set_semester({
                        course: data.course
                    })
                    this.delIndex = i
                    if (data.course[i] === []) {
                        console.log("data is null ")
                        this.persons[i].course = "is Empty"

                    } else {
                        for (let r = 0; r < data.course[r].lecturers; r++) {
                            this.set_semester({
                                lecturer: data.course[i].lecturers
                            })
                        }
                    }
                }
                this.persons.length = data.course.length
            } catch (err) {
                console.log('FAILURE!!' + err)
                this.message = "Something went wrong";
                this.error = true;
            }

        }
    }
};
var ordonner = function (a, b) {
    return (a.course > b.course);
};
</script>

<style>
#courseSemester {
    width: 80%;
    margin-top: 5%;
    margin-left: 30%;
}

#index {
    width: 100px;
}

#subjects {
    width: 350px;
}

#Action {
    width: 200px;
}

#foot-modal {
    justify-content: center;
}

#add {
    font-size: 10px;
    color: grey;
}

#semester {
  max-width: 90%;
  margin-left: 50px;
  margin-top: -150px
}
#aside{
    max-width: 30%;
}

#year {
    color: #265080 !important;
}

#Action {
    color: #265080 !important;
}

.md-menu-content.md-select-menu {
    z-index: 1200 !important;
}
#courseSemester{
  margin-left: 220px;
  margin-top: -130px
}
</style>
