<template>
    <div id="lecturer">
        <div class="container">
            <table class="table" v-show="persons.length">
                <thead>
                    <tr id="thead">
                        <!-- <th v-for="(column,index) in columns" v-bind:key="index" id="thead"> -->
                            <!-- {{column}} -->
                            <th id="index">#</th>
                            <th id="subjects">Name</th>
                            <th id="position">Position</th>
                            <th id="Action">Actions</th>
                        <!-- </th> -->
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(person,index) in persons" v-bind:key="index">
                        <td id="index">{{index}}</td>
                        <td id="subjects">
                          {{person.name}}
                        </td>
                        <td id="position">
                          {{person.position}}
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
                        <td><a href="#!" @click="add" class="btn btn-waves green darken-2"><i class="material-icons" id="add">+ Add Member ...</i></a></td>
                    </tr>     
                </tbody>
            </table>
            <div class="modal" v-show="bin.length" v-bind:class="{'is-active':deleteActive}" id="alert">
                <div class="modal-background"></div>
                <div class="modal-content">
                  <md-card class="md-accent" md-with-hover v-for="(person,index) in bin" v-bind:key="index">
                    <md-ripple>
                      <md-card-header>
                        <div class="md-title" > {{person.name}}</div>
                        <div class="md-subhead">index : {{index}}</div>
                      </md-card-header>

                      <md-card-content>
                        {{person.position}}
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
                                  <label> Name</label>
                                  <md-textarea v-model="editInput.name" 
                                   md-autogrow></md-textarea>
                              </md-field>
                              <md-field>
                                  <label>position</label>
                                  <md-textarea v-model="editInput.position" 
                                   md-autogrow></md-textarea>
                              </md-field>
                        </div>
                    </form>
                </div>
            </div>
            <footer class="modal-card-foot" id="foot-modal">
                <md-button class="md-dense md-raised md-primary" href="#!"  @click="update">Update</md-button>
                <md-button class="md-dense md-primary" href="#!" @click="close">Cancle</md-button>
            </footer>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name : "Lecturer",
  components: {
  },
  data(){
      return{
                columns: ['#', 'Name','Position', 'Actions '],
                persons: [{
                  name : "IT FUN",
                  position:"รายละเอียดวิชา"
                }, {
                  name: "Data Base",
                  position:"รายละเอียดวิชา"
                },],
                bin: [],
                input: {

                },
                editInput: {
                  name: "",
                  position:""
                        },
                isActive: false,
                deleteActive:false
            }
         },
methods: {
    //function to add data to table
    add: function() {
      this.isActive = true
      this.persons.push({
        name: this.input.name,
        position: this.input.position
      });
      for (var key in this.input) {
        this.input[key] = '';
      }
      this.persons.sort(ordonner);
      // this.$refs.name.focus();
      // this.$refs.position.focus();
    },
    //function to handle data edition
    edit: function(index) {
      this.editInput = this.persons[index];
      console.log(this.editInput);
      this.isActive = true
      console.log("isActive : "+ this.isActive)
    },
    //function to send data to bin
    Delete: function(index) {
      this.bin.push(this.persons[index]);
      this.persons.splice(index, 1);
      this.bin.sort(ordonner);
      this.deleteActive = true
    },
    //function to restore data
    restore: function(index) {
      this.persons.push(this.bin[index]);
      this.bin.splice(index, 1);
      this.bin.sort(ordonner);
    },
    //function to update data
    update: function(){
      // this.persons.push(this.editInput);
       this.persons.splice(index, 1);
       this.persons.push({
        name: this.editInput.name,
        position: this.editInput.position
      });
       for (var key in this.editInput) {
        this.editInput[key] = '';
      }
      this.persons.sort(ordonner);
      this.isActive = false;
    },
    //function to defintely delete data 
    deplete: function(index) {
      // console.log(this.bin[index]);
      this.bin.splice(index, 1);
    },
     close: function() {
        this.isActive = false;
    },
  }
};

//function to sort table data alphabetically
var ordonner = function(a, b) {
  return (a.name > b.name);
  return (a.position > b.position)

};


</script>
<style>
#lecturer{
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
    width: 200px;
}
#position{
    width: 200px;
}
#Action{
  width: 100px;
}
#foot-modal{
    justify-content: center;
}
#add{
  font-size: 10px;
  color: grey;
}
</style>
