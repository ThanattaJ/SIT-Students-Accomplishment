<template>
<div id="bodyBg">
    <div class="columns">
        <div class="column countAll">
            <button class="button createBtn" @click="openCreateAssignmentModal()">+ Add course ...</button>
        </div>
    </div>
    <div class="columns">
        <!-- nav bar -->
        <div class="column is-1">
            <aside class="menu navAssignDetail">
                <ul id="navAssignment" class="menu-list navTopic navCanClick" v-for="(year,indexSem) in semesters" v-bind:key="indexSem">
                    <li @click="getSemester(indexSem)" id="year">{{year.academic_term}}</li>
                </ul>
            </aside>
        </div>
        <div class="column">
            <div class="columns">
                <div class="column">
                    <div class="card-content cardSize colName">
                        <div class="columns">
                            <div class="column is-6">Course Name</div>
                            <!-- <div class="column countAssign">Lecturer</div> -->
                            <div class="column countAssign">Add Lecturer</div>
                        </div>
                    </div>
                    <div class="card lecturerCard lecturerCourseCard" v-for="(person,index) in get_semester.course" v-bind:key="index">
                        <div class="card-content cardSize">
                            <div class="columns">
                                <div class="column is-6 courseName" @click="showLecturer(index)">{{index+1}}) {{person.course}}</div>
                                <div class="column countAssign"><i class="la la-edit" id="Action" @click="edit(index)"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <modal name="lecturer">
        <md-card-header>
            <md-card-header-text>
                <div class="md-title" id="title">{{courseName}}</div>
            </md-card-header-text>
        </md-card-header>
        <md-card-content v-if="allLecturers.length == 0">
            No lecturer
        </md-card-content>
        <md-card-content v-else>
            <b>Lecturer</b>
            <div v-for="(lecturer,index) in allLecturers" v-bind:key="index">
                {{index+1}}) {{lecturer.lecturer_name}}
            </div>
        </md-card-content>
        <md-card-content>
            <span class="addBtn">
                <a class="button addCommentBtn" @click="hideLecturer">Close</a>
            </span>
        </md-card-content>
    </modal>
    <div id="bodyBg">
        <div v-bind:class="{'is-active':isActive}" id="modal" class="modal">
            <div class="modal-background"></div>
            <div class="modal-card" id="editCourse">
                <div class="modal-card-body" id="editCourse">
                    <md-card-header>
                        <div class="md-title">Add Lecturer</div>
                    </md-card-header>
                    <div class="column">
                        <div class="card-content cardSize colName">
                            <div class="columns">
                                <div class="column is-6">Course</div>
                                <div class="column countAssign">Lecturer</div>
                            </div>
                        </div>
                        <div class="card lecturerCard ">
                            <div class="columns">
                                <div class="column is-6" style="margin-left: 20px;" id="title">{{this.item.text}}</div>
                                <md-card-content v-if="allLecturers.length == 0">
                                    No lecturer
                                </md-card-content>
                                <md-card-content v-else>
                                    <div v-for="(lecturers,index) in allLecturers" v-bind:key="index">
                                        {{index+1}}) {{lecturers.lecturer_name}}
                                    </div>
                                </md-card-content>
                            </div>
                        </div>
                    </div>
                    <!-- <model-select :options="option" v-model="item" placeholder="select course">
                    </model-select> -->
                    <md-card-content v-if="this.options.length == 0">
                        No lecturer can be added
                    </md-card-content>
                    <multi-select :options="options" :selected-options="items" placeholder="select lecturer" @select="onSelect" v-else>
                    </multi-select>
                </div>
                <span class="addBtn">
                    <a class="button cancelCommentBtn"><span class="courseName" @click="close">Cancel</span></a>
                    <a class="button addCommentBtn" @click="update(editInput.indexCouse)">Update</a>
                </span>
            </div>
        </div>
    </div>
    <modal name="add">
        <div class="modal-card-body" id="editCourse">
            <md-card-header>
                <div class="md-title">Add Course</div>
            </md-card-header>
            <div class="column">
                <model-select :options="option" v-model="item" placeholder="select course" style="position: absolute; max-width: 250px; margin-top :10px; height:36px ;font-size: 12px ">
                </model-select>
                <div v-if="item.text">
                    <multi-select :options="options" :selected-options="items" placeholder="select lecturer" @select="onSelect" style="position: absolute; max-width: 200px; font-size: 12px; margin-left:50%">
                    </multi-select>
                </div>
            </div>
        </div>
        <span class="addBtn">
            <a class="button cancelCommentBtn"><span class="courseName" @click="hideAdd">Cancel</span></a>
            <a class="button addCommentBtn" @click="add">ADD</a>
        </span>
    </modal>
</div>
</template>

<script>
import axios from 'axios';
import _ from 'lodash'
import {
    mapGetters,
    mapActions,
} from 'vuex'
import 'vue-multi-select/dist/lib/vue-multi-select.css';
import {
    MultiSelect
} from 'vue-search-select'
import {
    ModelSelect
} from 'vue-search-select'
export default {
    components: {
        MultiSelect,
        ModelSelect
    },
    name: "courseSemester",
    computed: {
        ...mapGetters([
            'get_semester',
            'get_course',
            'get_lecturer',
            'get_select_lecturer',
            'GET_PATHNAME'
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
            delIndex: null,
            addIndex: null,
            selectedIndex: 0,
            selectedYear: 0,
            lec: 0,
            showLec: [],
            removed: '',
            options: [],
            items: [],
            lastSelectItem: {},
            option: [],
            item: {},
            storeLecturer: [],
            storeLecName: [],
            storeCourse: [],

            courseName: '',
            allLecturers: []
        }
    },
    async mounted() {
        const {
            data
        } = await axios.get(this.GET_PATHNAME + '/course/courseSemester')
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

        var course
        await axios.get(this.GET_PATHNAME + '/course').then(response => course = response.data)
        this.set_course(course.course)
        console.log('all course : ', course)
        // ---------------

        const allCouse = this.get_course;
        const haveCouse = this.get_semester.course
        console.log("semester :", this.get_semester)

        function comparer(otherArray) {
            return function (current) {
                return otherArray.filter(function (other) {
                    return other.course_id == current.course_id
                }).length == 0;
            }
        }
        var onlyInCourse = allCouse.filter(comparer(haveCouse));
        var onlyInHave = haveCouse.filter(comparer(allCouse));

        var result = onlyInCourse
        for (let i = 0; i < result.length; i++) {
            this.option.push({
                text: result[i].course_code + ' ' + result[i].course_name,
                value: result[i].course_id
            })
        }
        console.log('option : ', this.option)

    },
    methods: {
        showLecturer(index) {
            this.courseName = this.get_semester.course[index].course
            this.allLecturers = this.get_semester.course[index].lecturers
            this.$modal.show('lecturer')
        },
        hideLecturer() {
            this.$modal.hide('lecturer')
        },
        openCreateAssignmentModal() {
            this.$modal.show('add')
        },
        hideAdd() {
            this.$modal.hide('add')
        },
        ...mapActions([
            'set_semester',
            'set_lecturer',
            'set_course',
            'add_semester',
            'set_select_lecturer'
        ]),
        onSelect(items, lastSelectItem) {
            this.items = items
            this.lastSelectItem = lastSelectItem
        },
        reset() {
            this.items = []
            this.item = {}
        },
        async add() {
            for (let i = 0; i < this.items.length; i++) {
                this.storeLecName.push({
                    lecturer_name: this.items[i].text
                })
            }
            for (let i = 0; i < this.items.length; i++) {
                this.storeLecturer.push({
                    "lecturer_id": this.items[i].value
                })
            }
            if (this.get_semester.course[0].academic_term_id) {
                try {
                    await axios.post(this.GET_PATHNAME + '/course/courseSemester', {
                        academic_term_id: this.get_semester.course[0].academic_term_id,
                        course_id: this.item.value,
                        lecturers: this.storeLecturer
                    }).then((res) => {
                        console.log(res);
                        this.get_semester.course.push({
                            course: this.item.text,
                            lecturers: this.storeLecName
                        })
                        this.$modal.hide('add')
                        // this.item = ''
                        this.items = []
                        this.storeLecturer = []

                    })
                    this.file = " ";
                    this.error = false;
                } catch (err) {
                    console.log('FAILURE!!' + err)
                    this.message = "Something went wrong";
                    this.error = true;
                    this.storeLecturer = []
                }
            } else {
                console.log("err something")
            }
        },
        // function to handle data edition
        async edit(index) {

            this.isActive = true
            this.editInput.indexCouse = index

            this.option.push({
                text: this.get_semester.course[this.editInput.indexCouse].course,
                value: this.get_semester.course[this.editInput.indexCouse].course_id
            })
            this.item = this.option[this.option.length - 1]
            // ---------------------
            this.allLecturers = this.get_semester.course[index].lecturers
            var lecturer
            await axios.get(this.GET_PATHNAME + `/users/list_lecturer/?academic_term_id=${this.get_semester.course[0].academic_term_id}&courses_id=${this.get_semester.course[index].course_id}`)
                .then(response => lecturer = response.data)
            for (let i = 0; i < lecturer.length; i++) {
                this.options.push({
                    text: lecturer[i].firstname + ' ' + lecturer[i].lastname,
                    value: lecturer[i].lecturer_id
                })
                console.log('options : ', this.options)
            }

        },
        hideEdit() {
            this.$modal.hide('edit')
        },
        //function to send data to bin
        Delete: function (index) {
            this.bin.push(this.get_semester.course[index]);
            this.persons.splice(index, 1);
            this.bin.sort(ordonner);
            this.delIndex = index
            this.deleteActive = true
            console.log('index del : ', this.delIndex)
        },
        //function to restore data
        restore: function (index) {
            this.persons.push(this.bin[index]);
            this.bin.splice(index, 1);
            this.bin.sort(ordonner);
        },
        //function to update data
        update(index) {
            for (let i = 0; i < this.items.length; i++) {
                this.storeLecName.push(
                    this.items[i].text
                )
            }
            for (let i = 0; i < this.items.length; i++) {
                this.storeLecturer.push({
                    "lecturer_id": this.items[i].value
                })
            }
            if (this.get_semester.course[0].academic_term_id) {
                try {
                    axios.patch(this.GET_PATHNAME + '/course/courseSemester', {
                        academic_term_id: this.get_semester.course[0].academic_term_id,
                        course_id: this.item.value,
                        lecturers: this.storeLecturer
                    }).then(res => {
                        for (let i = 0; i < this.items.length; i++) {
                            this.allLecturers.push({
                                lecturer_name: this.items[i].text
                            })
                        }
                        this.items = []
                        this.options = []
                        this.storeLecturer = []
                        console.log("res : ", res)
                        if (res.status == 200) {
                            this.$modal.hide('lecturer')
                        }
                    })
                    this.message = " uploaded complete";
                    this.file = " ";
                    this.persons.splice(index, 1);
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
                }
            } else {
                console.log("err some thing")
            }
        },
        close: function (index) {
            this.isActive = false;
            this.option.splice(this.option.length - 1, 1)
            this.items = []
            this.item = {}
        },
        async getSemester(indexSem) {
            try {
                const {
                    data
                } = await axios.get(this.GET_PATHNAME + '/course/courseSemester?semester_id=' + this.semesters[indexSem].academic_term_id)
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
    },
    watch: {
        async item() {
            try {
                console.log('item', this.item.value, this.get_semester.course[0].academic_term_id)
                var lecturer
                await axios.get(this.GET_PATHNAME + `/users/list_lecturer/?academic_term_id=${this.get_semester.course[0].academic_term_id}&courses_id=${this.item.value}`)
                    .then(response => lecturer = response.data)
                console.log('data ; ', lecturer)
                for (let i = 0; i < lecturer.length; i++) {
                    this.options.push({
                        text: lecturer[i].firstname + ' ' + lecturer[i].lastname,
                        value: lecturer[i].lecturer_id
                    })
                }
            } catch (err) {

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
    width: 90%;
    margin-left: 100px;
    max-width: 80%;
    margin-top: 50px !important;

}

#index {
    width: 100px;
}

#subjects {
    width: 350px;
}

#Action {
    width: 150px !important;
}

#foot-modal {
    justify-content: center;
}

#addSemester {
    font-size: 14px;
    color: white;
    height: 35px;
    margin-top: -4px
}

#semester {
    max-width: 90%;
    margin-top: -150px;
}

#aside {
    max-width: 30%;
}

#year {
    color: #265080 !important;
}

#Action {
    color: #265080 !important;
}

#courseSemester {
    margin-left: 220px;
    margin-top: -130px
}

#add_course {
    padding: 15px;
    font-size: 14px;
}

#editCourse {
    height: 500px;
}
</style>
