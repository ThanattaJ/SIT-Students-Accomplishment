<template>
<div id="admin">
    <div id="bodyBg">
        <div class="buttons has-addons is-centered " style="font-weight:bold">

            <div @click="navClick('course')" class="button adminMenu is-info is-selected" id="coursebtn">
                Courses
            </div>

            <div style="color:#265080 !important" class="button adminMenu" @click="navClick('lecturers')" id="lecturersbtn">
                Lecturers
            </div>

            <div style="color:#265080 !important" @click="navClick('semesters')" class="button adminMenu" id="semestersbtn">
                Courses Semester
            </div>

            <div style="color:#265080 !important" @click="navClick('manage')" class="button adminMenu" id="managebtn">
                 Manage Requests
            </div>

        </div>
    </div>
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
        return {}
    },
    methods: {
        navClick(type) {
            var btn = ['course', 'lecturers', 'semesters', 'manage']
            if (type == 'course') {
                this.$router.push({
                    path: '/allCourse'
                })
            }
            if (type == 'lecturers') {
                this.$router.push({
                    path: '/lecturer'
                })
            }
            if (type == 'semesters') {
                this.$router.push({
                    path: '/courseSemester'
                })
            }
            if (type == 'manage') {
                this.$router.push({
                    path: '/ManageEditRequest'
                })
            }
            console.log(type, '-----------')
            for (var n = 0; n < btn.length; n++) {
                document.getElementById(btn[n] + 'btn').className = "button adminMenu"
                document.getElementById(btn[n] + 'btn').style.color = "#265080"
            }
            document.getElementById(type + 'btn').className = "button adminMenu is-info is-selected"
            document.getElementById(type + 'btn').style.color = "white"
        }
    }
}
</script>

<style>
#header_admin {
    max-width: 80%;
    margin: 2% 0 0 10%;
}

#coursebtn,
#lecturersbtn,
#semestersbtn,
#managebtn {
    font-size: 16px;
    width: 20%;
}

.adminMenu {
    padding: 1.7% 12.4% 1.7% 12.4% !important
}

@media screen and (max-width: 1024px) {
    .adminMenu {
        padding: 1.7% 5.1% 1.7% 5.1% !important;
    }
}

@media screen and (max-width: 800px) {
    .adminMenu {
        padding: 1.7% 3.5% 1.7% 3.5% !important;
    }
}

@media screen and (max-width: 500px) {
    .adminMenu {
        width: 100% !important;
        border-radius: 5px !important;
    }
}
</style>
