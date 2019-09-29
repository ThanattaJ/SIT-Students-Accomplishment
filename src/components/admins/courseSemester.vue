<template>
    <div id="courseSemester">
        <div id="manu">
            <aside class="menu">
                <p class="menu-label">
                  General
                </p>
                <ul class="menu-list" v-for="(year,indexSem) in semesters" v-bind:key="indexSem">
                  <li><a @click="getSemester(indexSem)">{{year.academic_term}} {{year.academic_term_id}}</a></li>
                </ul>
            </aside>
        </div>
        <div id="body">
        <div class="container" id="semester">
            <table class="table" v-show="persons.length">
                <thead>
                    <tr id="thead">
                        <!-- <th v-for="(column,index) in columns" v-bind:key="index" id="thead"> -->
                            <!-- {{column}} -->
                            <th id="index">#</th>
                            <th id="subjects">Course</th>
                            <th id="Lecturer">Lecturer</th>
                            <th id="Action">Actions</th>
                        <!-- </th> -->
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(person,index) in persons" v-bind:key="index">
                        <td id="index">{{index+1}}</td>
                        <td id="subjects">
                            {{person.course_id}} {{person.course}}
                        </td>
                        <td id="lecturer" v-for="(nameLec,lecturers) in person.lecturer" v-bind:key="lecturers" >
                            <p>
                                {{nameLec.name}}
                            </p>
                        </td>
                        <td id="Action">
                          <a href="#modal" @click="edit(index)" class="btn waves-effect waves-light yellow darken-2"><i class="material-icons">edit</i>
                          </a>
                          <a href="#!" class="btn waves-effect waves-light red darken-2" @click="Delete(index)"><i class="material-icons">Delete</i>
                          </a>
                        </td>
                    </tr>
                     <!-- add -->
                    <tr>
                        <td><a href="#!" @click="getCourse()" class="btn btn-waves green darken-2"><i class="material-icons" id="add">+ Add Course ...</i></a></td>
                    </tr>  
                    <!-- //modalAvtive()    -->
                </tbody>
            </table>
            <div class="modal" v-show="bin.length" v-bind:class="{'is-active':deleteActive}" id="alert">
                <div class="modal-background"></div>
                <div class="modal-content">
                  <md-card class="md-accent" md-with-hover v-for="(person,index) in bin" v-bind:key="index">
                    <md-ripple>
                      <md-card-header>
                        <div class="md-title" > {{person.course}}</div>
                        <div class="md-subhead" v-for="(nameLec,lecturers) in person.lecturer" v-bind:key="lecturers" >Lecturer : {{nameLec.name}}</div>
                        <div class="md-subhead">index : {{delIndex+1}}</div>
                        
                      </md-card-header>
                      <md-card-actions>
                        <md-button href="#!"  @click="restore(index)">restore</md-button>
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
                                  <md-textarea v-model="editInput.course" 
                                   md-autogrow></md-textarea>
                              </md-field>
                               <md-field>
                                  <label>Lecturer</label>
                                  <md-textarea v-model="editInput.lecturer" 
                                   md-autogrow></md-textarea>
                              </md-field>
                        </div>
                    </form>
                </div>
            </div>
            <footer class="modal-card-foot" id="foot-modal">
                <md-button class="md-dense md-raised md-primary" href="#!"  @click="update(editInput.indexCouse)">Update</md-button>
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
                           <option  v-for="(nCourse,index) in course" v-bind:key="index"> {{nCourse.course_id}} : {{nCourse.course}} </option>
                         </select>
                         <select @change="lecIndex($event, $event.target.selectedIndex)">
                           <option  v-for="(nlec,index) in lecturers" v-bind:key="index"> {{nlec.fName}}  {{nlec.lName}} </option>
                         </select>
                    </form>
                </div>
            </div>
            <footer class="modal-card-foot" id="foot-modal">
                <md-button class="md-dense md-raised md-primary" href="#!"  @click="add">Update</md-button>
                <md-button class="md-dense md-primary" href="#!" @click="close">Cancle</md-button>
            </footer>
            </div>
        </div>   
    </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
  name : "courseSemester",
  components: {
  },
  data(){
      return{
                columns: ['#', 'Course','Lecturer','Actions '],
                selectedCourse:null,
                course:[{
                    course:null,
                    course_id:null,
                    selectedCourse:null,
                    id:null
                }],
      
                persons: [{
                  course:null,
                  course_id: null,
                  lecturer :[
                    {name: ''}
                  ],
                  academic_term_id:null
                }],
                semesters:[{
                    academic_term: null,
                    academic_term_id:''
                }],
                lecturers:[{
                    lecturer_id: null,
                    fName:null,
                    lName:null
                }],
                bin: [],
                input: { },
                editInput: {
                   course: "",
                   lecturer: [{}],
                   indexCouse:null,
                },
                isActive: false,
                deleteActive:false,           
                addActive:false,
                delIndex:null,   
                addIndex: null, 
                selectedIndex: 0,
                selectedYear:0,
                lec:0
            }
         },
async mounted() {
        const { data } = await axios.get('http://localhost:7000/course/courseSemester')
        // console.log("term : ",data)
        for(let i  = 0;  i < data.course.length; i++){
            this.persons.push(data.course[i])
            JSON.stringify(this.persons[i])
            this.persons[i].course = data.course[i].course
            // this.persons[i].course_id = data.course[i].course_id
            console.log("data.course[i].length : ",data.course[i].lecturers.length)
             if(data.course[i] > 0){
                for(let r = 0; r < data.course[i].lecturers.length; r++){
                      this.persons[i].lecturer.push(data.course[i].lecturers)
                      this.persons[i].lecturer[r].name = data.course[i].lecturers[r].lecturer_name                  
                }
                    this.persons[i].lecturer.length =data.course[i].lecturers.length
               }else{
                 console.log("err : ")
               }
        }   
            this.persons.length = data.course.length

        for(let i = 0; i < data.semester.length;i++){
            this.semesters.push(data.semester[i])
            JSON.stringify(this.semesters[i])
            this.semesters[i].academic_term  = data.semester[i].academic_term
            this.semesters[i].academic_term_id = data.semester[i].academic_term_id
            // console.log("academic_term_id : " + this.semester[i].id)
        }
        this.semesters.length = data.semester.length
        
},
methods: {
    switchView: function(event, selectedIndex) {
      console.log(event, selectedIndex);      
      this.selectedIndex = selectedIndex;
    },
    lecIndex: function(event, selectedIndex) {
      console.log(event, selectedIndex);      
      this.lec = selectedIndex;
    },
    async getCourse(){
      this.addActive = true
      // for (var key in this.editInput) {
      // this.editInput[key] = '';
      // }
        const { data } = await axios.get('http://localhost:7000/course')
        // console.log("data : ",data)
        for(let i=0; i<data.length;i++){
          this.course.push(data[i])
          this.course[i].course = data[i].course_name
          this.course[i].course_id =data[i].course_code
          this.course[i].id = data[i].id
        }
          this.course.length = data.length

        var lecturer
        await axios.get('http://localhost:7000/users/list_lecturer').then(response => lecturer = response.data)
        // console.log("lecturer : ",lecturer)
        for(let i = 0; i < lecturer.length;i++){
          this.lecturers.push(lecturer[i])
          this.lecturers[i].fName = lecturer[i].firstname
          this.lecturers[i].lName =lecturer[i].lastname
          this.lecturers[i].lecturer_id = lecturer[i].lecturer_id
          // console.log("lecturer : ", this.lecturers[i].lecturer_id)
        }
          this.lecturers.length = lecturer.length
    },
    async add(){
      // console.log("index : ", this.lecturers[this.lec].lecturer_id  )
      try{
        await axios.post('http://localhost:7000/course/courseSemester',{
            academic_term_id: this.selectedYear,
            course_id:  this.course[this.selectedIndex].id  ,
            lecturers:[{
                lecturer_id: this.lecturers[this.lec].lecturer_id 
            }]
        }).then(function(res){ console.log(res);})
              //  console.log( "course: ",this.course[this.selectedIndex].course)
               this.file=" ";
               this.error = false;
      }catch(err){
        console.log('FAILURE!!'+err)
        this.message = "Something went wrong";
        this.error = true;
      }
      this.addActive = false
      this.persons.push({
          course_id: this.course[this.selectedIndex].course_id,
          course: this.course[this.selectedIndex].course,

      });
      this.course.sort(ordonner);
    },
    // function to handle data edition
    edit: function(index) {
      this.editInput = this.persons[index];
      // console.log(this.editInput);
      this.isActive = true
      this.editInput.indexCouse = index
      console.log("isActive : "+ index)
    },
    //function to send data to bin
    Delete: function(index) {
      this.bin.push(this.persons[index]);
      this.persons.splice(index, 1);
      this.bin.sort(ordonner);
      this.deleteActive = true
      // this.delIndex = index
    //   console.log(this.persons[index].course_id +" : index" + index)
    },
    //function to restore data
    restore: function(index) {
      this.persons.push(this.bin[index]);
      this.bin.splice(index, 1);
      this.bin.sort(ordonner);
    },
    //function to update data
    update(index){
      // this.persons.push(this.editInput);
        JSON.stringify(this.persons[index])
        // console.log('eiei: ' + index)
      try{
        axios.patch('http://localhost:7000/course/courseSemester',{
            academic_term_id: this.selectedYear,
            course_id:  this.course[this.selectedIndex].id  ,
            lecturers:[{
                lecturer_id: this.lecturers[this.lec].lecturer_id 
            }]
        }).then(function(res){ console.log(res);})
               this.message = " uploaded complete";
               this.file=" ";
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
      }catch(err){
        console.log('FAILURE!!'+err)
        this.message = "Something went wrong";
        this.error = true;
        console.log(this.persons[index])
      }
    },
    //function to defintely delete data 
    deplete: function(delIndex) {
      console.log('delete :', delIndex)
      try{
        axios.delete('http://localhost:7000/course/courseSemester',{

            academic_term_id:  this.semesters[this.delIndex].academic_term_id,
            course_id:  this.course[delIndex].id ,

        }).then(function(res){ console.log(res);})
        // this.persons.splice(index, 1);
      }catch(err){
        console.log('FAILURE!!'+err)
        this.message = "Something went wrong";
        this.error = true;
        console.log(this.persons[index])
      }
    },
    close: function() {
        this.isActive = false;
        this.addActive=false;
    },
    // showDetail: function(index){
    //     this.detailActive = true
    //     this.detailIndex = index
    //     // console.log(index+"detailIndex" + this.detailIndex)
    //     //detailIndex = index someone
    // },
    async getSemester(indexSem){
       
        this.delIndex = indexSem
         console.log("ไอ้สัส",this.delIndex)
        try{
            const {data}  =  await axios.get('http://localhost:7000/course/courseSemester?semester_id='+this.semesters[indexSem].academic_term_id)
            // this.addIndex = indexSem
            for(let i  = 0 ; i < data.course.length; i++){
              this.persons.push(data.course[i])
              this.persons[i].academic_term_id = data.course[i].academic_term_id
              // console.log("academic_term : ", this.semesters[i].academic_term_id )
              this.selectedYear = this.persons[i].academic_term_id 
              console.log("year : ",this.selectedYear)
              if(data.course[i] === []){
              // console.log("push data : ",this.persons[i])
                  console.log("data is null ")
                  this.persons[i].course = "is Empty"
                        
              }else{
                  for(let r = 0; r< data.course[r].lecturers; r++){
                  this.persons[i].course.push(data.course[i].lecturers)
                // console.log("lex : ",this.persons[i].course[r])
              } 
                //is empty ไม่ออกวะ [] ที่ไม่มีค่าต้องไม่ออกดิวะ
              }
            }             
              this.persons.length = data.course.length
        }catch(err){
            console.log('FAILURE!!'+err)
            this.message = "Something went wrong";
            this.error = true;  
      }
          
    }
  }
};

//function to sort table data alphabetically
var ordonner = function(a, b) {
  return (a.course > b.course);
};


</script>
<style>
#courseSemester{
    width: 80%;
    margin-top: 5%;
    margin-left: 30%;
}
#thead{
    margin-right: 20px;
    background:wheat;
}
#index{
    width:100px;
}
#subjects{
    width: 350px;
}
#Action{
  width: 200px;
}
#foot-modal{
    justify-content: center;
}
#add{
  font-size: 10px;
  color: grey;
}
#manu{
    margin-left: -13%;
    width: 5%;
    border-right: 2px;
    margin-top: -1%;
}
#semester{
    margin-left: -17%;
    margin-top: -18%;
}
</style>
