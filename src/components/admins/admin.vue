<template>
    <div id="admin">
        <div class="tabs" id="header_admin">
            <ul>
              <li><a @click="allCourse()">All Course</a></li>
              <!-- class="is-active" -->
              <li><a @click="lecturer()">Lecturer</a></li>
              <!-- <li><a @click="courseSemester()">Course Semester</a></li>
              <li><a @click="ManageEditRequest()">Manage Edit Request</a></li> -->
            </ul>
        </div>
        <router-view/>
        <div id="body_admin">
            <div id="manu_admin" v-if="seen">
                <aside class="menu">
                    <p class="menu-label">
                      General
                    </p>
                    <ul class="menu-list">
                      <li><a>Dashboard</a></li>
                      <li><a>Customers</a></li>
                    </ul>
                </aside>
            </div>
            <div id="table_admin">
            </div>
        </div>
    </div>

    
        
</template>
<script>
export default {
    name : "admin",
    data(){
        return{
            seen : true,
        }
    },
    component:{ 
    },
    methods:{
        allCourse(){
            this.$router.push({path: '/allCourse'})
            this.seen = true
        },
        ManageEditRequest(){
            this.$router.push({path: '/ManageEditRequest'})
            this.seen = false
        },
        lecturer(){
            this.$router.push({path: '/lecturer'})
            this.seen = true
        },
        courseSemester(){
            this.$router.push({path: '/courseSemester'})
            this.seen = false
        }
    }
}

</script>
<style>

#header_admin{
    max-width: 80%;
    margin: 2% 0 0 10%;    
}
#manu_admin{
    margin-top: -5%;
    margin-left: 20%;
    width: 5%;
    border-right: 2px;


}

</style>
