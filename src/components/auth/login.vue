<template>
<!-- <div id="login"> -->
<form class="login" @submit.prevent="onLogin">
    <md-card md-with-hover id="flex-container" style="border-radius: 6px;">
        <div id="media">
            <img src="./../../assets/login.jpg" alt="img" />
        </div>
        <div id="sign-up">
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
                    <a id="login" type="submit" @click="onLogin(username,userType,pass)" style="color:#265080 !important;">Log in </a>
                </div>
                <!-- <div class="text-center" id="btm">
                        <a id="login" type="submit" @click="onLogin(username,userType,pass)" style="color:#265080 !important;">Log in </a>
                    </div> -->
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
#login {
    justify-content: center;
    width: 40%;
    margin-left: 30%;
    margin-top: 3%;
    padding: 10px;
    font-family: 'Courier New', Courier, monospace;
}

#title {
    color: grey;
    margin-left: 30%;
}

#flex-container {
    display: flex;
}

#sign-up {
    flex-grow: 1;
    width: 50%;
}

#media {
    flex-grow: 1;
    width: 50%;

}

#login-btm {
    color: grey;
    text-decoration: none;
    width: 70%;
}

#btm {
    margin-left: 25%;
    margin-top: 15%;
}
</style>
