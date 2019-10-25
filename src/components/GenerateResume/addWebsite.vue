<template>
<div>
    <!-- {{website}}
    <p>=====</p>
    {{social}} -->
    <div class="genText">
        <i class="la la-angle-left" v-on:click="SetSocailToState"></i>
        <span class="titleText">Website</span>
    </div>
    <div class="selectnw" style="display: block;">
        <span class="selectnwText">Select a network</span>
        <div class="nwLogo">
            <span class="tooltip" v-for="(nw,index) in allNetwork" v-bind:key="index">
                <i :id="'logo'+index" :class="'la la-'+nw.network.toLowerCase()" @click="addNw(index);chooseNw=true" style="margin-right: 2%"></i><span class="tooltiptext">{{nw.network}}</span>
            </span>
        </div>
    </div>
    <div v-if="chooseNw==true" class="afterChooseNw">
        <span class="pre">{{networkName}}</span>
        <input id="username" type="text" placeholder="username">
        <div class="" id="addCancelBtn" style="margin-top: 8px;">
            <a id="addBtn" class="button is-small saveBtn" @click="addWebsiteBtn();">Add</a>
            <a id="cancelBtn1" class="button is-small cancelBtn" @click="cancelWebsiteBtn()">Cancel</a>
        </div>
    </div>
    <div v-for="(web,index) in website" v-bind:key="index" class="listWebsite">
        <div class="field has-addons">
            <p class="control">
                <i class="la la-ellipsis-v hamburgerWebsite"></i><i id="test" :class="'la la-'+web.network.toLowerCase()" :style="'color:'+web.color"></i>
            </p>
            <p class="control is-expanded username">
                <span class="usernameText" :id="'usernameText'+index" @click="editUsername(index);">{{web.username}}</span>
                <input :id="'username'+index" type="text" placeholder="username" :value="web.username" style="display:none;">
            </p>
            <p class="control">
                <i :id="'trash'+index" class="la la-trash" @click="removeWebsite(index)"></i>
                <i :id="'check'+index" class="la la-check" style="font-size:17px;display:none;" @click="changeUsername(index);editUsername(index)"></i>
                <i :id="'close'+index" class="la la-close" style="font-size:17px;display:none;" @click="unChangeUsername(index);editUsername(index)"></i>
            </p>
        </div>
    </div>
</div>
</template>

<script>
import axios from "axios";
import {
    mapGetters,
    mapActions
} from 'vuex'

export default {
    data() {
        return {
            allSocial: {},
            // website: [],
            chooseNw: false,
            networkName: 'network',
            colorNw: '',
            allNetwork: [{
                    id: 0,
                    network: 'Twitter',
                    color: '#47ABE7'
                },
                {
                    id: 1,
                    network: 'Facebook',
                    color: '#4267b2'
                },
                {
                    id: 2,
                    network: 'Instagram',
                    color: '#FF007A'
                },
                {
                    id: 3,
                    network: 'Linkedin',
                    color: '#0077B5'
                },
                {
                    id: 4,
                    network: 'Github',
                    color: '#24292D'
                },
                {
                    id: 5,
                    network: 'Pinterest',
                    color: '#E60122'
                },
                {
                    id: 6,
                    network: 'Vimeo',
                    color: '#1CB7EA'
                },
                {
                    id: 7,
                    network: 'Tumblr',
                    color: '#000000'
                },
                {
                    id: 8,
                    network: 'Flickr',
                    color: '#0063DB'
                },
                {
                    id: 9,
                    network: 'Link',
                    color: '#DB6318'
                },
            ],
            clickEditUsername: false
        }
    },
    computed: {
        ...mapGetters({
            social: 'GET_SOCIAL',
            config: 'GET_CONFIG',
            website: 'GET_WEBSITE',
            URL: 'GET_PATHNAME'
        })
    },
    mounted() {
    },
    methods: {
        ...mapActions(['SET_PAGE', 'SET_SOCIAL', 'SEND_WEB_TOSTATE']),
        async SetSocailToState() {
            this.SET_PAGE(1);
            console.log("this.website.length : " + this.website.length)
            var allWebData = {
                Twitter: null,
                Facebook: null,
                Instagram: null,
                Linkedin: null,
                Github: null,
                Pinterest: null,
                Vimeo: null,
                Tumblr: null,
                Flickr: null,
                Link: null
            }
            console.log("socail : ", this.social)
            for (var n = 0; n < this.website.length; n++) {
                var nw = this.website[n].network
                allWebData[nw] = this.website[n].username
            }
            console.log("all web : ", allWebData)
            this.SET_SOCIAL(allWebData)

            try {
                await axios
                    .patch(this.URL + "/users/social", {
                        social: allWebData
                    }, this.config)
                    .then((res) => {
                        console.log("res : ", res);
                        console.log("success!");
                    })
                    .catch((err) => {
                        console.error("err : " + err);
                    });
            } catch (err) {
                console.log("FAILURE!!" + err);
            }
        },
        addNw(n) {
            var logo = document.getElementById('logo' + n).style;
            for (var num = 0; num <= 9; num++) {
                document.getElementById('logo' + num).style.color = '#4A4A4A';
            }
            logo.color = this.allNetwork[n].color;
            this.networkName = this.allNetwork[n].network;
            this.colorNw = this.allNetwork[n].color;
        },
        addWebsiteBtn() {
            this.cancelWebsiteBtn();
            var username = document.getElementById('username').value;
            this.website.push({
                network: this.networkName,
                color: this.colorNw,
                username: username
            })
            console.log(this.website)
        },
        cancelWebsiteBtn() {
            this.chooseNw = false;
            for (var num = 0; num <= 9; num++) {
                document.getElementById('logo' + num).style.color = '#4A4A4A' //set logo to default color
            }
        },
        changeUsername(n) {
            this.website[n].username = document.getElementById('username' + n).value;
        },
        unChangeUsername(n) {
            document.getElementById('username' + n).value = this.website[n].username;
        },
        editUsername(n) { //แสดงไอคอนต่างๆตอนกดเพื่อจะ edit แต่ไม่ได้เปลี่ยนข้อมูลอะไร
            var usernameText = document.getElementById('usernameText' + n);
            var trash = document.getElementById('trash' + n);
            var username = document.getElementById('username' + n);
            var check = document.getElementById('check' + n);
            var close = document.getElementById('close' + n);
            if (usernameText.style.display === "none" && trash.style.display === "none") {
                usernameText.style.display = "inline";
                trash.style.display = "inline";
                username.style.display = "none";
                check.style.display = "none";
                close.style.display = "none";
            } else {
                usernameText.style.display = "none";
                trash.style.display = "none";
                username.style.display = "inline";
                check.style.display = "inline";
                close.style.display = "inline";
            }
        },
        hover(n) {
            var usernameText = document.getElementById('usernameText' + n);
            usernameText.style.color = '#000000';
        },
        leave(n) {
            var usernameText = document.getElementById('usernameText' + n);
            usernameText.style.color = '#4A4A4A';
        },
        removeWebsite(n) {
            this.website.splice(n, 1)
        }
    }
}
</script>
