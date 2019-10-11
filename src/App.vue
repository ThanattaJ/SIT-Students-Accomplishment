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
            </div>

            <div class="navbar-end">
                <a class="navbar-item">
                    <i class="la la-sign-in"></i>
                    <!-- <span v-if="isLoggedIn"> | <a @click="logout">Logout</a></span> -->
                    <span v-if="Authen_token!=null"> | <a @click="logout">Logout</a></span>
                    <span v-if="Authen_token==null"> | <router-link to="/login">Login</router-link></span>
                </a>
            </div>
        </div>
    </nav>
    <router-view />
</div>
</template>

<script>
import {
    mapGetters,
    mapActions
} from 'vuex'

export default {
    name: 'app',
    data() {
        return {
            clickBurger: true,
            Authen_token: null
        }
    },
    mounted() {
        //เอาค่า Authen_token จาก localStorage เก็บลง state.config.headers.Authorization ใน loginStore
        this.Authen_token = localStorage.getItem('Authen_token');
        this.setIdToken(this.Authen_token)
        // console.log("Authen_token >  ",this.Authen_token)
        this.LOAD_STUDENT_DATA()
        this.LOAD_RESUME_DATA()
    },
    computed: {
        isLoggedIn: function () {
            return this.$store.getters.userId;
        }
    },
    methods: {
        ...mapActions(['setIdToken', 'GET_CONFIG', 'LOAD_STUDENT_DATA', 'LOAD_RESUME_DATA']),
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
            // this.$store.dispatch("logout").then(() => {
            //     this.$router.push("/login");
            // });
            this.Authen_token = null
            this.setIdToken(this.Authen_token)
            localStorage.setItem('Authen_token', null);
            this.$router.push("/");
        },
    }
}
</script>

<style>
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
