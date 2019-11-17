<template>
    <div id="body-bg">
        <div class="columns is-mobile">
            <div class="column is-one-fifth">
                <div>
                    <vue-step :now-step="nowStep" :step-list="stepList" :active-color="activeColor" :direction="direction"></vue-step>
                </div>
            </div>
            <div class="column">
                <div class="card card-equal-height">
                    <div class="card-content form">
                        <div class="content">
                            <div class="columns header">
                                <div class="column is-one-quarter stepName">My Team</div>
                                <div class="column addMember" v-on:mouseover="clickAddMember=!clickAddMember">+ Add more members...</div>
                            </div>
                            <!-- add member -->
                            <div class="columns">
                                <div class="column is-one-quarter stepName"></div>
                                <div v-if="clickAddMember">
                                    <div class="column is-one-fifth" style="z-index: 1;position:absolute">
                                        <div class="card borderSelectMember">
                                            <div class="card-content selectMember">
                                                <div class="content">
                                                    <div class="chooseMemberType" v-on:click="chooseStudent=true,clickAddMember=!clickAddMember">SIT Student</div>
                                                    <hr>
                                                    <div class="chooseMemberType" v-on:click="chooseOutsider=true,clickAddMember=!clickAddMember">Outsider</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- ------------- -->
                            <div class="columns">
                                <div class="column">
                                    <div>Student</div><hr>
                                        <div class=""  v-for="(student,student_index) in members.student" v-bind:key="student_index"> 
                                            <div>{{student_index+1}}. Student ID: {{student.student_id}}</div>
                                        </div>
                                </div>
                                <div class="column">
                                    <div>Outsider</div><hr>
                                    <div class=""  v-for="(outsider,outsider_index) in members.outsider" v-bind:key="outsider_index"> 
                                            <div>{{outsider_index+1}}. Firstname: {{outsider.firstname}} Lastname: {{outsider.lastname}} 
                                                <span @click="removeOutsider(outsider_index)" style="cursor:pointer"> x </span> 
                                            </div>
                                        </div>
                                </div>
                            </div>
                            <!-- modal add student -->
                            <div v-if="chooseStudent">
                                <div class="modal is-active">
                                    <div class="modal-background"></div>
                                    <div class="modal-card">
                                        <header class="modal-card-head">
                                        <p class="modal-card-title">Add Student</p>
                                        <button class="delete" aria-label="close" v-on:click="chooseStudent=!chooseStudent"></button>
                                        </header>
                                        <section class="modal-card-body" style="height: 400px">
                                            <!-- <div class="columns" v-for="(student,student_index) in members.student" v-bind:key="student_index">  -->
                                            <div class="columns"> 
                                                <div class="column">
                                                    <div class="field">
                                                        <label class="label inputName">Student ID</label>
                                                        <p class="control has-icons-right">
                                                            <input class="input inputData" type="text" placeholder="Search..." @change="searchStdID" v-model="newStudent.student_id">
                                                            <span class="icon is-small is-right">
                                                                <i class="fa fa-search"></i>
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div class="column">
                                                </div>
                                            </div>
                                        </section>
                                        <footer class="modal-card-foot studentFoot field is-grouped is-grouped-centered">
                                            <button class="button is-success" @click="addStudent" v-on:click="chooseStudent=!chooseStudent">Add</button>
                                        </footer>
                                    </div>
                                </div>
                            </div>
                            <!-- ------------- -->
                            <!-- modal add outsider -->
                            <div v-if="chooseOutsider">
                                <div class="modal is-active">
                                    <div class="modal-background"></div>
                                    <div class="modal-card">
                                        <header class="modal-card-head">
                                        <p class="modal-card-title">Add Outsider</p>
                                        <button class="delete" aria-label="close" v-on:click="chooseOutsider=!chooseOutsider"></button>
                                        </header>
                                        <section class="modal-card-body">
                                            <div class="columns"> 
                                                <div class="column">
                                                    <div class="field">
                                                        <label class="label inputName">firstname</label>
                                                        <div class="control">
                                                            <input class="input inputData" type="text" placeholder="firstname" v-model="newOutsider.tmpFirst">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="column">
                                                    <div class="field">
                                                        <label class="label inputName">lastname</label>
                                                        <div class="control">
                                                            <input class="input inputData" type="text" placeholder="lastname" v-model="newOutsider.tmpLast">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="addOutsiderButton">
                                                <button class="button is-success" @click="addOutsider" v-on:click="chooseOutsider=!chooseOutsider">Add</button>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                            <!-- ------------- -->
                        </div>
                    </div>
                    <multi-select :options="options"
                       :selected-options="items"
                       placeholder="select item"
                       @select="onSelect">
        </multi-select>
        {{items}}
                    <footer class="card-footer field is-grouped is-grouped-centered backNext">
                        <router-link to="/PortfolioPageDetail">
                            <button class="card-footer-item button backButton">
                                <p class="letterBackNext">Back</p> 
                            </button>
                        </router-link>
                        <router-link to="/Achievement">
                            <button class="card-footer-item button nextButton">
                                <p class="letterBackNext">Next</p> 
                            </button>
                        </router-link>
                    </footer>
                </div>
            </div>
        </div>
        <!-- <div>
            <ul>
                <li v-for="(gib,index) in gibs" v-bind:key="index">
                    <span>{{gib.nickname}}</span>
                    <span>{{gib.age}}</span>
                </li>
            </ul>
        </div> -->
        

    </div>
</template>

<script>
// import './../../../node_modules/bulma/css/bulma.css';
import './../css/form.css';
import vueStep from 'vue-step';
import _ from 'lodash'
  import { MultiSelect } from 'vue-search-select'

export default {
    components: {
        vueStep, MultiSelect
    },
    data () {
        return {
            newOutsider: [{
                tmpFirst:"",
                tmpLast:""
            }],
            newStudent: [{
                student_id:""
            }],
            members: {
                student:[],
                outsider:[]
            },
            name : 'TeamMembers',
            clickAddMember: false,
            chooseStudent: false,
            chooseOutsider: false,
            // step
            nowStep: 3,
            stepList: [
                'Create Portfolio Page',
                'Project Datail',
                'Team Members',
                'Acheivement'
            ],
            activeColor:'#265080',
            direction: 'vertical',

            options: [
          { value: '1', text: '59130500024' },
          { value: '2', text: '59130500025' },
          { value: '3', text: '59130500036' },
          { value: '4', text: '59130500051' },
          { value: '5', text: '59130500100' },
          { value: '6', text: '59130500105' },
          { value: '7', text: '59130500109' },
        ],
        searchText: '', // If value is falsy, reset searchText & searchItem
        items: []
        // lastSelectItem: {}
        }
    },
    methods: {
        onSelect (items) {
        this.items = items
        console.log(items)
        // this.lastSelectItem = lastSelectItem
      },
      // deselect option
      reset () {
        this.items = [] // reset
      },
      // select option from parent component
//       selectFromParentComponent () {
//         this.items = _.unionWith(this.items, [this.options[0]], _.isEqual)
//       }
// ,
        addStudent: function() {
            this.members.student.push({
                student_id:""
            })   
        },
        addOutsider: function() {
            this.members.outsider.push({
                firstname: this.newOutsider.tmpFirst,
                lastname: this.newOutsider.tmpLast
            }) 
            this.newOutsider.tmpFirst = ""
            this.newOutsider.tmpLast = ""
        },
        removeOutsider: function(outsider_index){
            this.members.outsider.splice(outsider_index,1)
        },
        saveOutsiderData: function() {
            // localStorage.setItem('members', JSON.stringify(this.members.outsider))
        },
        searchStdID: function() {
            var AllStudents = [
                {ID:'59130500024',name: 'gib'},
                {ID:'59130500025',name: 'volk'},
                {ID:'59130500026',name: 'gus'},
                {ID:'59130500036',name: 'jah'},
                {ID:'59130500051',name: 'mix'},
                {ID:'59130500066',name: 'bom'},
                {ID:'59130500068',name: 'boom'},
                {ID:'59130500094',name: 'ball'},
                {ID:'59130500100',name: 'nam'}
            ]
        }
    },
    computed: {
        // gibs(){
        //     return this.$store.state.gibs
        // }
    }
}
</script>