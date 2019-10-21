<template>
<!-- <div id="login"> -->
<form class="login" @submit.prevent="onLogin">
    <md-card md-with-hover id="flex-container" style="border-radius: 6px;">
        <div id="media">
            <img src="./../../assets/login.jpg" alt="img" />
        </div>
        <div id="sign-in">
            <form>
                <md-card-header>
                    <md-card-header-text>
                        <div class="md-title" id="title">Sign in</div>
                    </md-card-header-text>
                </md-card-header>
                <div class="grey-text">
                    <md-card-content>
                        <md-field>
                            <label>User Name</label>
                            <md-textarea required v-model="username" md-autogrow></md-textarea>
                        </md-field>
                        <div class="md-layout-item">
                            <md-field>
                                <!-- <label for="movie">selected userType</label>
                              <md-select  required v-model="userType" name="userType" id="userType">
                              <md-option v-for="(types,index) in userType" v-bind:key="index">{{types.type}}</md-option> -->
                                <label>Mail@</label>
                                <md-textarea required v-model="userType" md-autogrow></md-textarea>
                            </md-field>
                        </div>
                        <md-field>
                            <label>Password</label>
                            <md-input required v-model="pass" type="password"></md-input>
                        </md-field>
                    </md-card-content>
                    <p id="loginCenter">
                        <a class="button loginBtn" @click.prevent="onLogin(username,userType,pass)">Login</a>
                    </p>
                </div>
            </form>
        </div>
    </md-card>
</form>
<!-- </div> -->
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
            console.log("a")
            this.LOGIN({
                username: this.username,
                userType: this.userType,
                pass: this.pass
            })
        }
    }
}
</script>

<style>
.loginBtn{
    color: white;
    background-color: #265080;
    border-radius: 8px !important;
    border-color: white;
    padding: 2px 20px 2px 20px;
    font-size: 14px;
    font-weight: 500;
}
.loginBtn:hover{
    color: white;
    background-color: #1b3a5e;
    border-color: white;
}
#loginCenter{
    text-align: center;
}
#loginText{
    color: #265080;
}
#title {
    color: #265080;
    text-align: center
}
#flex-container {
    display: flex;
}
#sign-in {
    /* flex-grow: 1; */
    width: 50%;
}
#media {
    /* flex-grow: 1; */
    width: 50%;

}
</style>
