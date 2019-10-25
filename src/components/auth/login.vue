<template>
<form class="login" @submit.prevent="onLogin">
    <!-- <md-card md-with-hover id="flex-container" style="border-radius: 6px;"> -->
    <!-- <div id="media">
            <img src="./../../assets/login.jpg" alt="img" />
        </div> -->
    <div id="sign-in">
        <form>
            <md-card-header>
                <md-card-header-text>
                    <div class="md-title" id="title">Login</div>
                </md-card-header-text>
            </md-card-header>
            <div class="grey-text">
                <md-card-content>
                    <div class="columns">
                        <div class="column">
                            <md-field>
                                <label>User Name</label>
                                <md-input required v-model="username"></md-input>
                            </md-field>
                        </div>
                        <span style="padding-top: 35px;">@</span>
                        <div class="column">
                            <div class="select" style="bottom: -18px;">
                                <select id="userType" class="selectInGenResume" required>
                                    <option selected value="st.sit.kmutt.ac.th">st.sit.kmutt.ac.th</option>
                                    <option value="sit.kmutt.ac.th">sit.kmutt.ac.th</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <md-field>
                        <label>Password</label>
                        <md-input required v-model="pass" type="password"></md-input>
                    </md-field>
                </md-card-content>
                <p id="loginCenter">
                    <a class="button loginBtn" @click.prevent="onLogin">Login</a>
                </p>
            </div>
        </form>
    </div>
    <!-- </md-card> -->
</form>
</template>

<script>
import axios from 'axios';
import {
    mapActions,
    mapGetters
} from 'vuex'
export default {
    name: 'login',
    data() {
        return {
            username: 'student01',
            userType: 'st.sit.kmutt.ac.th',
            pass: 'Fxig08'
        }
    },
    computed: {
        userRole: function () {
            let role = this.$store.state.userRole
            if (role === 'student') {
                router.push('/student')
            } else if (role === 'admin') {
                router.push('/admin')
            }

            return role
        }
    },
    methods: {
        ...mapActions(['LOGIN', 'LOGOUT']),
        onLogin: function () {
            console.log(document.getElementById('userType').value)
            this.LOGIN({
                username: this.username,
                userType: document.getElementById('userType').value,
                pass: this.pass
            })
        }
    }
}
</script>

<style>
.loginBtn {
    color: white;
    background-color: #265080;
    border-radius: 8px !important;
    border-color: white;
    padding: 2px 20px 2px 20px;
    font-size: 14px;
    font-weight: 500;
}

.loginBtn:hover {
    color: white;
    background-color: #1b3a5e;
    border-color: white;
}

#loginCenter {
    text-align: center;
}

#loginText {
    color: #265080;
}

#title {
    color: #265080;
    text-align: center;
    font-weight: 600
}

#flex-container {
    display: flex;
}

#sign-in {
    width: 100%;
}

/* #media {
    width: 50%;
} */
</style>
