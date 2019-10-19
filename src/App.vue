<template>
<div id="app">
    <nav class="navbar nav1 sticky" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <router-link to="/">
                <a class="navbar-item" style="margin-top: -10px;">
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
                <a class="navbar-item menuName">
                    <i class="la la-home"></i>
                    <router-link to="/student">
                        Home
                    </router-link>
                </a>

                <a class="navbar-item menuName">
                    <i class="la la-folder-o"></i>
                    Project
                </a>

                <a class="navbar-item menuName">
                    <i class="la la-user"></i>
                    Profile
                </a>
                <a class="navbar-item menuName">
                    <i class="la la-user"></i>
                    <router-link to="/allCourse">
                        Admin
                    </router-link>
                </a>
                <a class="navbar-item menuName">
                    <i class="la la-user"></i>
                    <router-link to="/course">
                        Lecturer
                    </router-link>
                </a>
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
        this.username = localStorage.getItem('usernameSIT');
        this.Authen_token = localStorage.getItem('Authen_token');
        this.SET_LOGIN_STATUS(localStorage.getItem('loginStatus'));
        if (this.Authen_token != 'null' && this.username != 'null') {
            this.SET_ALL_LOGIN_DATA({
                token: this.Authen_token,
                username: this.username
            })
            this.SET_LOGIN_STATUS(true);
        }
        this.LOAD_OWN_STUDENT_DATA()
        this.LOAD_RESUME_DATA()
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
}

.nav1 {
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

@media screen and (max-width: 1085px) {
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
    max-height: 50px !important;
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
