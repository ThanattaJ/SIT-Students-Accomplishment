<template>
    <div id="allCourse">
        <div class="container">
            <table class="table" v-show="persons.length">
                <thead>
                    <tr id="thead">
                        <!-- <th v-for="(column,index) in columns" v-bind:key="index" id="thead"> -->
                            <!-- {{column}} -->
                            <th id="index">#</th>
                            <th id="subjects">Course</th>
                            <th id="Action">Actions</th>
                        <!-- </th> -->
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(person,index) in persons" v-bind:key="index">
                        <td id="index">{{index+1}}</td>
                        <td id="subjects" @click="showDetail(index)">
                            {{person.course}} | {{person.name}}
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
                        <td><a href="#!" @click="modalAvtive()" class="btn btn-waves green darken-2"><i class="material-icons" id="add">+ Add Course ...</i></a></td>
                    </tr>     
                </tbody>
            </table>
            <div class="modal" v-show="bin.length" v-bind:class="{'is-active':deleteActive}" id="alert">
                <div class="modal-background"></div>
                <div class="modal-content">
                  <md-card class="md-accent" md-with-hover v-for="(person,index) in bin" v-bind:key="index">
                    <md-ripple>
                      <md-card-header>
                        <div class="md-title" > {{person.course}} | {{person.name}}</div>
                        <div class="md-subhead">index : {{delIndex+1}}</div>
                      </md-card-header>

                      <md-card-content>
                        {{person.detail}}
                      </md-card-content>

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
                                  <label>Course Name</label>
                                  <md-textarea v-model="editInput.name" 
                                   md-autogrow></md-textarea>
                              </md-field>
                              <md-field>
                                  <label>Course Detail</label>
                                  <md-textarea v-model="editInput.detail" 
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
                        <div class="row">
                               <md-field>
                                  <label>Course Number</label>
                                  <md-textarea v-model="editInput.course" 
                                   md-autogrow></md-textarea>
                              </md-field>
                              <md-field>
                                  <label>Course Name</label>
                                  <md-textarea v-model="editInput.name" 
                                   md-autogrow></md-textarea>
                              </md-field>
                              <md-field>
                                  <label>Course Detail</label>
                                  <md-textarea v-model="editInput.detail" 
                                   md-autogrow></md-textarea>
                              </md-field>
                        </div>
                    </form>
                </div>
            </div>
            <footer class="modal-card-foot" id="foot-modal">
                <md-button class="md-dense md-raised md-primary" href="#!"  @click="add">Update</md-button>
                <md-button class="md-dense md-primary" href="#!" @click="close">Cancle</md-button>
            </footer>
            </div>
        </div>
        <div id="detailActive">
          <md-dialog :md-active.sync="detailActive">
          <md-card-header>
              <div class="md-title">{{persons[this.detailIndex].name}}</div>
              <div class="md-subhead">{{persons[this.detailIndex].course}}</div>
          </md-card-header>
          <md-card-content>
            {{persons[this.detailIndex].detail}}
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
export default {
  name : "allCourse",
  components: {
  },
  data(){
      return{
                columns: ['#', 'Course', 'Actions '],
                persons: [{
                  course:null,
                  name : null ,
                  detail:null,
                  course_id: null 
                  
                }],
                bin: [],
                input: { },
                editInput: {
                   course: "",
                   name: "",
                   detail:"",
                   indexCouse:null,
                },
                isActive: false,
                deleteActive:false,
                detailActive:false,
                info:null,
                addActive:false,
                delIndex:null,
                detailIndex:null
            }
         },
async mounted() {

  
    const { data } = await axios.get('http://localhost:7000/course');
    for(let i  = 0;  i < data.length; i++){
      this.persons.push(data[i])
      JSON.stringify(this.persons[i])
      this.persons[i].course = data[i].course_code
      this.persons[i].name = data[i].course_name
      this.persons[i].course_id = data[i].id
      this.persons[i].detail = data[i].detail
      console.log("details : "+  this.persons[i].course_id )
    }   
      this.persons.length = data.length

},
methods: {
    //function to add data to table
    modalAvtive: function(index){
      this.addActive = true
      for (var key in this.editInput) {
        this.editInput[key] = '';
      }
    },
    async add() {
      try{
        axios.post('http://localhost:7000/course',{
            code: this.editInput.course,
            name: this.editInput.name,
        }).then(function(res){ console.log(res);})
               this.message = " uploaded complete";
               this.file=" ";
               this.error = false;
      }catch(err){
        console.log('FAILURE!!'+err)
        this.message = "Something went wrong";
        this.error = true;
      }
      this.addActive = false
      this.persons.push({
        // course: this.input.course,
        // name: this.input.name,
        // detail: this.input.detail
        course: this.editInput.course,
        name: this.editInput.name,
        detail: this.editInput.detail
      });
     
      this.persons.sort(ordonner);
      // this.$refs.course.focus();
      // this.$refs.name.focus();
      // this.$refs.detail.focus();
    },
    //function to handle data edition
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
      // this.persons.splice(index, 1);
      this.bin.sort(ordonner);
      this.deleteActive = true
      this.delIndex = index
      console.log(this.persons[index].course_id +" : index" + index)
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
        console.log('eiei: ' + index)
      try{
        axios.patch('http://localhost:7000/course?id=',{
               code : this.persons[index].course,
               name : this.persons[index].name,
               detail : this.persons[index].detail
        }).then(function(res){ console.log(res);})
               this.message = " uploaded complete";
               this.file=" ";
               this.error = false;
        this.persons.splice(index, 1);
        console.log(this.persons[index].name + "couse")
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
      }catch(err){
        console.log('FAILURE!!'+err)
        this.message = "Something went wrong";
        this.error = true;
        console.log(this.persons[index])
      }
    },
    //function to defintely delete data 
    deplete: function(delIndex) {
     
      try{
        axios.delete('http://localhost:7000/course?id='+ this.persons[delIndex].course_id)
              .then(function(res){ console.log(res);})
               this.message = " uploaded complete";
               this.file=" ";
               this.error = false;
        // JSON.stringify(this.persons[delIndex])
        this.bin.splice(delIndex, 1);
        this.persons.splice(index, 1);
        console.log("delete : "+  this.persons[delIndex].course_id)
      }catch(err){
          console.log('FAILURE!!'+err)
          this.message = "Something went wrong";
          this.error = true;
      }
    },
    close: function() {
        this.isActive = false;
        this.addActive=false;
    },
    showDetail: function(index){
        this.detailActive = true
        this.detailIndex = index
        console.log(index+"detailIndex" + this.detailIndex)

        //detailIndex = index someone

    }
  }
};

//function to sort table data alphabetically
var ordonner = function(a, b) {
  return (a.course > b.course);
  return (a.name > b.name);
  return (a.detail > b.detail)

};


</script>
<style>
#allCourse{
    width: 80%;
    margin-top: 5%;
    margin-left: 30%;
}
#index{
    width: 1px;
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
</style>
