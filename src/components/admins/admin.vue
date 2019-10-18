<template>
<div id="admin">
     <div id="bodyBg">
        <div class="buttons has-addons is-centered " style="font-weight:bold">
            <span class="button menuBar" @click="allCourse()" style="color: #265080 " id="box" >Project</span>
            <span class="button menuBar" @click="lecturer()" style="color: #265080 " id="box">Lecturer</span>
            <span class="button menuBar" @click="courseSemester()" style="color: #265080 " id="box">Course Semester</span>
             <span class="button menuBar" @click="ManageEditRequest()" style="color: #265080 " id="box"> Manage Request</span>
        </div>
    </div>
    <!-- <div class="tabs" id="header_admin">
        <ul>
            <li><a @click="allCourse()" id="manu_bar">All Course</a></li>
            <li><a @click="lecturer()" id="manu_bar">Lecturer</a></li>
            <li><a @click="courseSemester()" id="manu_bar">Course Semester</a></li>
            <li><a @click="ManageEditRequest()">Manage Edit Request</a></li>
        </ul>
    </div> -->
    <router-view />

</div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex';
export default {
    name: "admin",

    data() {
        return {
        }
    },
    component: {},

    methods: {
        allCourse() {
            this.$router.push({
                path: '/allCourse'
            })
        },
        ManageEditRequest() {
            this.$router.push({
                path: '/ManageEditRequest'
            })
        },
        lecturer() {
            this.$router.push({
                path: '/lecturer'
            })
        },
        courseSemester() {
            this.$router.push({
                path: '/courseSemester'
            })
        }
    }
}
</script>

<style>
#header_admin {
    max-width: 80%;
    margin: 2% 0 0 10%;
}

#manu_bar {
    color: #265080 !important
}

#manu {
    color: #265080 !important;
    font-size: 12px;
}
span:active{
    background-color: #265080 !important;
    color: white !important
}
#box{
     width: 10%;
    font-size: 16px;
    
    
}


</style>
