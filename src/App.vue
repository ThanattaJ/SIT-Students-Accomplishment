<template>
<div id="app">
    <nav class="navbar nav1 sticky" role="navigation" aria-label="main navigation" style="position:relative; "></nav>
    <nav class="navbar nav1 sticky" role="navigation" aria-label="main navigation" style="position:fixed; top:0;">
        <div class="navbar-brand">
            <router-link to="/">
                <a class="navbar-item" style="margin-top: -15px;">
                    <img src="./assets/logo.png">
                </a>
            </router-link>
            <a ref="showMenu" role="button" class="navbar-burger burger" @click="showMenu" style="color:white" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>

        </div>
        <div ref="menu" id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
                <span class="navbar-item">
                    <router-link to="/Projects">
                        <a class="navbar-item menuName">
                            <img src="./assets/folder.png" style="max-height: 30px !important; margin-right: 10px">
                            All Portfolio
                        </a>
                    </router-link>
                </span>
                <span class="navbar-item">
                    <router-link to="/Faculty">
                        <a class="navbar-item menuName">
                            <!-- <img src="./assets/folder.png" style="max-height: 30px !important; margin-right: 10px"> -->
                            Faculty
                        </a>
                    </router-link>
                </span>

                <span class="navbar-item" v-if="user_role == 'student'">
                    <router-link to="/student">
                    <a class="navbar-item menuName">
                        <i class="la la-user"></i>
                        My Profile
                    </a>
                    </router-link>
                </span>

                <span class="navbar-item" v-if="user_role == 'lecturer'">
                    <router-link to="/course">
                        <a class="navbar-item menuName">
                            <i class="la la-user"></i>
                            Lecturer
                        </a>
                    </router-link>
                </span>
                
                
                <span class="navbar-item" v-if="isAdmin == 'true'">
                    <router-link to="/allCourse">
                        <a class="navbar-item menuName">
                            <i class="la la-user"></i>
                            Admin
                        </a>
                    </router-link>
                </span>

            </div>

            <div class="navbar-end">
                <a class="navbar-item">
                    <span v-if="loginStatus == true">Hi, <b>{{usernameFromState}}</b> | <a @click="logout">Logout</a></span>
                    <span v-else><i class="la la-sign-in"></i> | <a @click="showLoginModal">Login</a></span>
                </a>
            </div>

            <modal name="loginModal" v-if="loginStatus != true">
                <login></login>
            </modal>
        </div>
    </nav>
    <router-view />
</div>
</template>

<script>
import 'bulma/css/bulma.css';
import login from './components/auth/login'
import {
    mapGetters,
    mapActions
} from 'vuex'

export default {
    name: 'app',
    components: {
        login
    },
    data() {
        return {
            clickBurger: true,
            Authen_token: null,
            username: null,
            user_role: null,
            isAdmin: null,
        }
    },
    computed: {
        ...mapGetters({
            loginStatus : 'GET_LOGIN_STATUS',
            usernameFromState: 'GET_USERNAME'
        })
    },
    mounted() {
        //เอาค่า Authen_token จาก localStorage เก็บลง state.config.headers.Authorization ใน loginStore
        this.username = localStorage.getItem('usernameSIT') !== null
        this.Authen_token = localStorage.getItem('Authen_token') !== null
        this.user_role = localStorage.getItem('user_role')
        this.isAdmin = localStorage.getItem('isAdmin')
        if (this.Authen_token && this.username && this.user_role) {
            this.SET_ALL_LOGIN_DATA({
                token: localStorage.getItem('Authen_token'),
                username: localStorage.getItem('usernameSIT')
            })
            this.SET_LOGIN_STATUS(true);
            this.LOAD_OWN_STUDENT_DATA()
            if (this.user_role === 'student') {
                this.LOAD_RESUME_DATA()
            }
        } else {
            this.SET_LOGIN_STATUS(false);  
        }
    },
    methods: {
        ...mapActions(['SET_ALL_LOGIN_DATA', 'SET_LOGIN_STATUS', 'LOAD_OWN_STUDENT_DATA', 'LOAD_RESUME_DATA', 'LOGOUT']),
        showMenu() {
            this.clickBurger = !this.clickBurger
            if (this.clickBurger != true) {
                this.$refs.showMenu.className = "navbar-burger burger is-active"
                this.$refs.menu.className = "navbar-menu is-active"
            } else {
                this.$refs.showMenu.className = "navbar-burger burger"
                this.$refs.menu.className = "navbar-menu"
            }
        },
        logout: function () {
            this.LOGOUT()
            this.SET_LOGIN_STATUS(null);
        },
        showLoginModal() {
            this.$modal.show('loginModal');
        }
    }
}
</script>

<style>
.projectCard{
    box-shadow: none !important;
}
.navbar {
    /* height: 100px; */
    background-color: #265080 !important;
    padding-left: 10% !important;
    padding-right: 10% !important;
    width: 100%;
}

.nav1 {
    position: sticky;
    height: 76px !important;
    padding-top: 15px !important;
    padding-bottom: 15px !important;
}

.nav2 {
    max-height: 20px !important;
    z-index: 0 !important;
    padding-top: 15px !important;
}

.navbar-item {
    color: white !important;
}

@media screen and (max-width: 1085px) {z
    .navbar-item {
        color: #265080 !important; 
    }

    .navbar-menu {
        border-radius: 15px !important;
    }

    .md-theme-default a:not(.md-button) {
        color: #265080 !important
    }

    a:not(.md-button):hover {
        text-decoration: none !important;
    }
}

a.navbar-item:hover {
    background-color: #ffffff00 !important;
}

a.menuName:hover {
    background-color: #ffffff00 !important;
    border-bottom: 2px solid white !important;
}

.navbar-item img {
    max-height: 60px !important;
}

.la {
    font-size: 22px !important;
}

.md-theme-default a:not(.md-button) {
    color: white !important
}

a:not(.md-button):hover {
    text-decoration: none !important;
}
</style>
