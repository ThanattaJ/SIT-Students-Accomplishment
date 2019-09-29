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
                        <td id="index">{{index+1}}</td>
                        <td id="subjects">
                          {{person.fName}} {{person.lName}}
                        </td>
                        <td id="position">
                          {{person.position}}
                        </td>
                        <td id="Action">
                          <a href="#modal" class="btn waves-effect waves-light yellow darken-2"><i class="material-icons" id="action_bar">edit</i>
                          </a>
                          <a href="#!" class="btn waves-effect waves-light red darken-2" ><i class="material-icons" id="action_bar">Delete</i>
                          </a>
                        </td>
                    </tr>   
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
  name : "Lecturer",
  components: {
  },
  data(){
      return{
                columns: ['#', 'Name','Position', 'Actions '],
                persons: [{
                  fName : "Sophon",
                  lName: "Jampasornklin",
                  position:"รายละเอียดวิชา"
                },],
                bin: [],
                isActive: false,
            }
         },
async mounted() {
    const { data } = await axios.get('https://www.sit-acc.nruf.in.th/users/list_lecturer');
    // console.log("allcourse : ",data)
    for(let i = 0; i < data.length; i++){
      this.persons.push(data[i])
      this.persons[i].fName = data[i].firstname
      this.persons[i].lName = data[i].lastname
      this.persons[i].position = data[i].position_name
    }
    this.persons.length = data.length
},
methods: {
    //function to add data to table
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
    width: 90%;
    margin-top: 6.5%;
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
    width: 200px;
}
#position{
    width: 200px;
}
#Action{
  width: 100px
}
#foot-modal{
    justify-content: center;
}
#add{
  font-size: 10px;
  color: grey;
}
#action_bar{
  color: #265080 !important
}
</style>
