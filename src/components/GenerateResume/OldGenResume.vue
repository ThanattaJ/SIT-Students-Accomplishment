<template>
<div class="stricky">
    <article class="columns">
        <section class="column is-one-quarter resumeForm">
            <div v-if="page == 1">
                <div style="text-align:center">
                    <i class="la la-angle-left"></i>
                    <!-- <router-link to="/"><i class="la la-angle-left"></i></router-link> -->
                    <span class="titleText">Generate Resume</span>
                    <img src="./../../assets/upload.png" class="uploadImg" alt="Smiley face" height="22" width="22">
                </div>
                <div style="color:#F7F7F7;height:22px">.</div>
                <div>
                    <md-field>
                        <label>Fullname</label>
                        <md-input id="" :value="GET_FULLNAME" @change="handleUpdate('UPDATE_FIELD','SET_FULLNAME')"></md-input>
                    </md-field>
                    <md-field>
                        <label>Nickname</label>
                        <md-input id="" :value="GET_NICKNAME" @change="handleUpdate('UPDATE_FIELD','SET_NICKNAME')"></md-input>
                    </md-field>
                    <md-field>
                        <label>Biography</label>
                        <md-textarea md-autogrow id="" :value="GET_BIOGRAPHY" @change="handleUpdate('UPDATE_FIELD','SET_BIOGRAPHY')"></md-textarea>
                    </md-field>
                    <div class="mainTopic">ADDRESS</div>
                    <md-field>
                        <label>Street</label>
                        <md-input id="" :value="GET_STREET" @change="handleUpdate('UPDATE_FIELD','SET_STREET')"></md-input>
                    </md-field>
                    <md-field>
                        <label>Subdistrict</label>
                        <md-input id="" :value="GET_SUBDISTRICT" @change="handleUpdate('UPDATE_FIELD','SET_SUBDISTRICT')"></md-input>
                    </md-field>
                    <md-field>
                        <label>District</label>
                        <md-input id="" :value="GET_DISTRICT" @change="handleUpdate('UPDATE_FIELD','SET_DISTRICT')"></md-input>
                    </md-field>
                    <md-field>
                        <label>Province</label>
                        <md-input id="" :value="GET_PROVINCE" @change="handleUpdate('UPDATE_FIELD','SET_PROVINCE')"></md-input>
                    </md-field>
                    <md-field>
                        <label>Zipcode</label>
                        <md-input id="" :value="GET_ZIPCODE" @change="handleUpdate('UPDATE_FIELD','SET_ZIPCODE')"></md-input>
                    </md-field>
                    <div class="mainTopic">CONTACT INFO</div>
                    <md-field>
                        <label>Phone Number</label>
                        <md-input id="" :value="GET_PHONENO" @change="handleUpdate('UPDATE_FIELD','SET_PHONENO')"></md-input>
                    </md-field>
                    <md-field>
                        <label>Email</label>
                        <md-input id="" :value="GET_EMAIL" @change="handleUpdate('UPDATE_FIELD','SET_EMAIL')"></md-input>
                    </md-field>
                    <md-field>
                        <label>Date of Birth</label>
                        <md-input id="" :value="GET_BIRTHDAY" @change="handleUpdate('UPDATE_FIELD','SET_BIRTHDAY')"></md-input>
                    </md-field>
                </div>
                <!-- Full Name -->
                <!-- <div id="topic1" class="topic">
                    <div v-on:click="showInput('information','topic',1);">
                        <span>Full Name</span>
                        <span class="plusIcon"><i class="la la-plus"></i></span>
                    </div>
                </div>
                <div class="expandable" id="information1">
                    <span class="smallTopic">Full Name</span>
                    <input id="value1" type="text" placeholder="Full name" v-model="fullname" v-on:focus="showBtn('information',1)">
                    <div class="saveCancelBtn" id="saveCancelBtn1">
                        <a id="saveBtn1" class="button is-small saveBtn" @click="hideBtn('saveBtn','value','topic',1)">Save</a>
                        <a id="cancelBtn1" class="button is-small cancelBtn" @click="hideBtn('cancelBtn','value','topic',1)">Cancel</a>
                    </div>
                </div>
                <div style="color:#F7F7F7;height:12px">.</div> -->
                <!-- Nickname -->
                <!-- <div id="topic2" class="topic">
                    <div v-on:click="showInput('information','topic',2);">
                        <span>Nickname</span>
                        <span class="plusIcon"><i class="la la-plus"></i></span>
                    </div>
                </div>

                <div class="expandable" id="information2">
                    <span class="smallTopic">Nickname</span>
                    <input id="value2" type="text" placeholder="Nickname" v-model="nickname" v-on:focus="showBtn('information',2)">
                    <div class="saveCancelBtn" id="saveCancelBtn2">
                        <a id="saveBtn2" class="button is-small saveBtn" @click="hideBtn('saveBtn','value','topic',2)">Save</a>
                        <a id="cancelBtn2" class="button is-small cancelBtn" @click="hideBtn('cancelBtn','value','topic',2)">Cancel</a>
                    </div>
                </div>
                <div style="color:#F7F7F7;height:12px">.</div> -->
                <!-- Bio -->
                <!-- <div id="topic3" class="topic">
                    <div v-on:click="showInput('information','topic',3);">
                        <span>Biography</span>
                        <span class="plusIcon"><i class="la la-plus"></i></span>
                    </div>
                </div>

                <div class="expandable" id="information3">
                    <span class="smallTopic">Biography</span>
                    <input id="value3" type="text" placeholder="Biography" v-model="biography" v-on:focus="showBtn('information',3)">
                    <div class="saveCancelBtn" id="saveCancelBtn3">
                        <a id="saveBtn3" class="button is-small saveBtn" @click="hideBtn('saveBtn','value','topic',3)">Save</a>
                        <a id="cancelBtn3" class="button is-small cancelBtn" @click="hideBtn('cancelBtn','value','topic',3)">Cancel</a>
                    </div>
                </div>
                <div style="color:#F7F7F7;height:12px">.</div> -->
                <!-- CONTACT INFO -->
                <!-- <div class="mainTopic">CONTACT INFO</div> -->
                <!-- Address -->
                <!-- <div id="topic4" class="topic">
                    <div v-on:click="showInput('information','topic',4);">
                        <span>Address</span>
                        <span class="plusIcon"><i class="la la-plus"></i></span>
                    </div>
                </div>

                <div class="expandable" id="information4">
                    <span class="smallTopic">Address</span>
                    <input id="value4" type="text" placeholder="Street" v-model="street" v-on:focus="showBtn('information',4)">
                    <input id="value5" type="text" placeholder="Subdistrict" v-model="subdistrict" v-on:focus="showBtn('information',4)">
                    <input id="value6" type="text" placeholder="District" v-model="district" v-on:focus="showBtn('information',4)">
                    <input id="value7" type="text" placeholder="Province" v-model="province" v-on:focus="showBtn('information',4)">
                    <input id="value8" type="text" placeholder="Zip Code" v-model="zipcode" v-on:focus="showBtn('information',4)">
                    <div class="saveCancelBtn" id="saveCancelBtn4">
                        <a id="saveBtn4" class="button is-small saveBtn" @click="hideBtn('saveBtn','value','topic',4)">Save</a>
                        <a id="cancelBtn4" class="button is-small cancelBtn" @click="hideBtn('cancelBtn','value','topic',4)">Cancel</a>
                    </div>
                </div> -->
                <div style="color:#F7F7F7;height:12px">.</div>
                <!-- Date of Birth -->
                <!-- <div id="topic5" class="topic">
                    <div v-on:click="showInput('information','topic',5);">
                        <span>Date of Birth</span>
                        <span class="plusIcon"><i class="la la-plus"></i></span>
                    </div>
                </div>

                <div class="expandable" id="information5">
                    <span class="smallTopic">Date of Birth</span>
                    <input id="value9" type="text" placeholder="Please select your birth date" v-model="dateofbirth" v-on:focus="showBtn('information',5)">
                    <div class="saveCancelBtn" id="saveCancelBtn5">
                        <a id="saveBtn5" class="button is-small saveBtn" @click="hideBtn('saveBtn','value','topic',5)">Save</a>
                        <a id="cancelBtn5" class="button is-small cancelBtn" @click="hideBtn('cancelBtn','value','topic',5)">Cancel</a>
                    </div>
                </div>
                <div style="color:#F7F7F7;height:12px">.</div> -->
                <!-- Phone Number -->
                <!-- <div id="topic6" class="topic">
                    <div v-on:click="showInput('information','topic',6);">
                        <span>Phone Number</span>
                        <span class="plusIcon"><i class="la la-plus"></i></span>
                    </div>
                </div>

                <div class="expandable" id="information6">
                    <span class="smallTopic">Phone Number</span>
                    <input id="value10" type="text" placeholder="091-234-xxxx" v-model="phonenumber" v-on:focus="showBtn('information',6)">
                    <div class="saveCancelBtn" id="saveCancelBtn6">
                        <a id="saveBtn6" class="button is-small saveBtn" @click="hideBtn('saveBtn','value','topic',6)">Save</a>
                        <a id="cancelBtn6" class="button is-small cancelBtn" @click="hideBtn('cancelBtn','value','topic',6)">Cancel</a>
                    </div>
                </div>
                <div style="color:#F7F7F7;height:12px">.</div> -->
                <!-- Email -->
                <!-- <div id="topic7" class="topic">
                    <div v-on:click="showInput('information','topic',7);">
                        <span>Email</span>
                        <span class="plusIcon"><i class="la la-plus"></i></span>
                    </div>
                </div>

                <div class="expandable" id="information7">
                    <span class="smallTopic">Email</span>
                    <input id="value11" type="text" placeholder="abc@gmail.com" v-model="email" v-on:focus="showBtn('information',7)">
                    <div class="saveCancelBtn" id="saveCancelBtn7">
                        <a id="saveBtn7" class="button is-small saveBtn" @click="hideBtn('saveBtn','value','topic',7)">Save</a>
                        <a id="cancelBtn7" class="button is-small cancelBtn" @click="hideBtn('cancelBtn','value','topic',7)">Cancel</a>
                    </div>
                </div>
                <div style="color:#F7F7F7;height:12px">.</div> -->
                <!-- Website -->
                <div id="topic8" class="topic" v-on:click="page = 2">
                    <i class="la la-ellipsis-v"></i>
                    <span>Websites</span>
                    <span class="plusIcon"><i class="la la-plus"></i></span>
                </div>
                <div style="color:#F7F7F7;height:12px">.</div>
                <!-- EXTENDED INFO -->
                <div class="mainTopic">EXTENDED INFO</div>
                <div style="color:#F7F7F7;height:12px">.</div>
                <!-- Educations -->
                <div id="topic9" class="topic" v-on:click="page = 3">
                    <i class="la la-ellipsis-v"></i>
                    <span>Educations</span>
                    <span class="plusIcon"><i class="la la-plus"></i></span>
                </div>
                <div style="color:#F7F7F7;height:12px">.</div>
                <!-- Experiences -->
                <div id="topic10" class="topic" v-on:click="page = 4">
                    <i class="la la-ellipsis-v"></i>
                    <span>Experiences</span>
                    <span class="plusIcon"><i class="la la-plus"></i></span>
                </div>
                <div style="color:#F7F7F7;height:12px">.</div>
                <!-- Skills -->
                <div id="topic11" class="topic" v-on:click="page = 5">
                    <i class="la la-ellipsis-v"></i>
                    <span>Skills</span>
                    <span class="plusIcon"><i class="la la-plus"></i></span>
                </div>
                <div style="color:#F7F7F7;height:12px">.</div>
                <!-- Languages -->
                <div id="topic12" class="topic" v-on:click="page = 6">
                    <i class="la la-ellipsis-v"></i>
                    <span>Languages</span>
                    <span class="plusIcon"><i class="la la-plus"></i></span>
                </div>

                <div style="text-align:center;margin-top: 20px;">
                    <a class="button is-rounded savepdf" onclick="printJS('printJS-form', 'html')">
                        <span>Save as PDF</span>
                        <span class="icon">
                            <i class="la la-download"></i>
                        </span>
                    </a>
                </div>

                <div style="color:#F7F7F7;height:90px"></div>
            </div>
            <!-- Website -->
            <div v-if="page == 2">
                <div class="genText">
                    <i class="la la-angle-left" v-on:click="page = 1;cancelWebsiteBtn()"></i>
                    <span class="titleText">Website</span>
                </div>
                <div class="selectnw" style="display: block;">
                    <span class="selectnwText">Select a network</span>
                    <div class="nwLogo">
                        <span class="tooltip">
                            <i id="logo1" class="la la-twitter" @click="addNw(1);chooseNw=true"></i><span class="tooltiptext">Twitter</span>
                        </span>
                        <span class="tooltip">
                            <i id="logo2" class="la la-facebook" @click="addNw(2);chooseNw=true"></i><span class="tooltiptext">Facebook</span>
                        </span>
                        <span class="tooltip">
                            <i id="logo3" class="la la-instagram" @click="addNw(3);chooseNw=true"></i><span class="tooltiptext">Instagram</span>
                        </span>
                        <span class="tooltip">
                            <i id="logo4" class="la la-linkedin" @click="addNw(4);chooseNw=true"></i><span class="tooltiptext">Linkedin</span>
                        </span>
                        <span class="tooltip">
                            <i id="logo5" class="la la-github" @click="addNw(5);chooseNw=true"></i><span class="tooltiptext">Github</span>
                        </span>
                        <span class="tooltip">
                            <i id="logo6" class="la la-pinterest" @click="addNw(6);chooseNw=true"></i><span class="tooltiptext">Pinterest</span>
                        </span>
                        <span class="tooltip">
                            <i id="logo7" class="la la-vimeo" @click="addNw(7);chooseNw=true"></i><span class="tooltiptext">Vimeo</span>
                        </span>
                        <span class="tooltip">
                            <i id="logo8" class="la la-tumblr" @click="addNw(8);chooseNw=true"></i><span class="tooltiptext">Tumblr</span>
                        </span>
                        <span class="tooltip">
                            <i id="logo9" class="la la-flickr" @click="addNw(9);chooseNw=true"></i><span class="tooltiptext">Flickr</span>
                        </span>
                        <span class="tooltip">
                            <i id="logo10" class="la la-link" @click="addNw(10);chooseNw=true"></i><span class="tooltiptext">Link</span>
                        </span>
                    </div>
                </div>
                <div v-if="chooseNw==true" @load="changePre()" class="afterChooseNw">
                    <span class="pre">{{preNw}}</span>
                    <input id="username" type="text" placeholder="username">
                    <div class="" id="addCancelBtn" style="margin-top: 8px;">
                        <a id="addBtn" class="button is-small saveBtn" @click="addWebsiteBtn()">Add</a>
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
                            <i :id="'trash'+index" class="la la-trash" @click="removeWebsite(index)" style="color:#A2A2A2"></i>
                            <i :id="'check'+index" class="la la-check" style="font-size:17px;display:none;" @click="changeUsername(index);editUsername(index)"></i>
                            <i :id="'close'+index" class="la la-close" style="font-size:17px;display:none;" @click="editUsername(index)"></i>
                        </p>
                    </div>
                </div>
            </div>

            <!-- Education -->
            <div v-if="page == 3">
                <div class="genText">
                    <i class="la la-angle-left" v-on:click="page = 1;"></i>
                    <span class="titleText">Education</span>
                </div>
                <!-- <div class="education">
                    <div class="select">
                        <select>
                            <option>Select a Degree ...</option>
                            <option>Junior High School</option>
                            <option>Senior High School</option>
                            <option>Technical College</option>
                            <option>Polytechnical College</option>
                            <option>Vocational Certificate</option>
                            <option>Certificate of Technical Vocation</option>
                        </select>
                    </div>
                    <div>
                        <md-field>
                            <label>School Name</label>
                            <md-input id="schoolName"></md-input>
                        </md-field>
                        <md-field>
                            <label>Program/Faculty</label>
                            <md-input id="program"></md-input>
                        </md-field>
                        <md-field>
                            <label>GPA</label>
                            <md-input id="gpa"></md-input>
                        </md-field>
                    </div>
                    <div class="columns">
                        <div class="column">
                            <md-field>
                                <label>Start Year</label>
                                <md-input id="startYear"></md-input>
                            </md-field>
                        </div>
                        <div class="column">
                            <md-field>
                                <label>End Year</label>
                                <md-input id="endYear"></md-input>
                            </md-field>
                            <label class="checkbox" style="font-size:11px;">
                                <input type="checkbox">
                                I currently study here
                            </label>
                        </div>
                    </div>
                    <a id="saveBtn1" class="button is-small saveBtn" @click="addEducation()" style="margin-top: -15px;">Add</a>
                </div> -->
                <addEducationForm></addEducationForm>

                <!-- <div class="columns allEducation" v-for="(edu,index) in education" v-bind:key="index">
                    <div class="column is-1 educationList">
                        <i class="la la-ellipsis-v educationIcon"></i>
                    </div>
                    <div class="column">
                        <p class="showEducation schoolname">{{edu.schoolName}}</p>
                        <p class="showEducation program">{{edu.program}} | GPA: {{edu.gpa}}</p>
                        <p class="showEducation eduYear">{{edu.startYear}} - {{edu.endYear}}</p>
                    </div>
                </div> -->
            </div>
            <!-- Experience -->
            <div v-if="page == 4">
                <div class="genText">
                    <i class="la la-angle-left" v-on:click="page = 1"></i>
                    <span class="titleText">Experience</span>
                </div>
            </div>
            <!-- Skill -->
            <div v-if="page == 5">
                <div class="genText">
                    <i class="la la-angle-left" v-on:click="page = 1"></i>
                    <span class="titleText">Skill</span>
                </div>
                <addSkillForm></addSkillForm>
            </div>
            <!-- Language -->
            <div v-if="page == 6">
                <div class="genText">
                    <i class="la la-angle-left" v-on:click="page = 1"></i>
                    <span class="titleText">Language</span>
                </div>
            </div>
        </section>

        <section class="column resumeGen">
            <form method="post" action="#" id="printJS-form" style="color:white">
                <p>{{GET_FULLNAME}}</p>
                <p>{{GET_NICKNAME}}</p>
                <p>{{GET_BIOGRAPHY}}</p>
                <p>{{GET_BIRTHDAY}}</p>
            </form>
        </section>

    </article>

</div>
</template>

<script>
import './../css/genResume.css';
import addEducationForm from './addEducationForm.vue'
import addSkillForm from './addSkillForm.vue'
import {
    mapGetters,
    mapActions
} from 'vuex'

export default {
    data() {
        return {
            chooseNw: false,
            preNw: 'network',
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
            clickEditUsername: false,
            page: '1',
            website: [], //network(twitter,instagram,...) , username
        }
    },
    components: {
        addEducationForm,
        addSkillForm
    },
    computed: {
        ...mapGetters(['GET_RESUME_DATA', 'GET_FULLNAME', 'GET_NICKNAME', 'GET_BIOGRAPHY', 
        'GET_STREET', 'GET_SUBDISTRICT', 'GET_DISTRICT', 'GET_PROVINCE', 'GET_ZIPCODE',
        'GET_EMAIL', 'GET_PHONENO', 'GET_BIRTHDAY'])
    },
    mounted() {
        // this.alwaysCallData()
        this.LOAD_RESUME_DATA()
    },
    methods: {
        ...mapActions(['LOAD_RESUME_DATA', 'UPDATE_FIELD']),
        handleUpdate(actionName, setter) {
            this[actionName]({ callSetter: setter, value: event.target.value})
        },
        addNw(n) {
            var logo = document.getElementById('logo' + n).style;
            // var color = ['#47ABE7','#4267b2','#FF007A','#0077B5','#24292D','#E60122','#1CB7EA','#000000','#0063DB','#DB6318'];
            for (var num = 1; num <= 10; num++) {
                document.getElementById('logo' + num).style.color = '#4A4A4A';
            }
            logo.color = this.allNetwork[n - 1].color;
            // var network = ['Twitter','Facebook','Instagram','Linkedin','Github','Pinterest','Vimeo','Tumblr','Flickr','Link'];
            this.preNw = this.allNetwork[n - 1].network;
            this.colorNw = this.allNetwork[n - 1].color;
        },
        addWebsiteBtn() {
            this.cancelWebsiteBtn();
            var username = document.getElementById('username').value;
            this.website.push({
                network: this.preNw,
                color: this.colorNw,
                username: username
            })
        },
        cancelWebsiteBtn() {
            this.chooseNw = false;
            for (var num = 1; num <= 10; num++) {
                document.getElementById('logo' + num).style.color = '#4A4A4A' //set logo to default color
            }
        },
        changeUsername(n) {

        },
        editUsername(n) {
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
        },
        // alwaysCallData() {
        //     if (this.fullname.length > 0) {
        //         this.showInput('information', 'topic', 1)
        //     }
        //     if (this.nickname.length > 0) {
        //         this.showInput('information', 'topic', 2)
        //     }
        //     if (this.biography.length > 0) {
        //         this.showInput('information', 'topic', 3)
        //     }
        //     if (this.street.length > 0) {
        //         this.showInput('information', 'topic', 4)
        //     }
        //     if (this.subdistrict.length > 0) {
        //         this.showInput('information', 'topic', 4)
        //     }
        //     if (this.district.length > 0) {
        //         this.showInput('information', 'topic', 4)
        //     }
        //     if (this.province.length > 0) {
        //         this.showInput('information', 'topic', 4)
        //     }
        //     if (this.zipcode.length > 0) {
        //         this.showInput('information', 'topic', 4)
        //     }
        //     if (this.dateofbirth.length > 0) {
        //         this.showInput('information', 'topic', 5)
        //     }
        //     if (this.phonenumber.length > 0) {
        //         this.showInput('information', 'topic', 6)
        //     }
        //     if (this.email.length > 0) {
        //         this.showInput('information', 'topic', 7)
        //     }
        //     if (this.district.length > 0) {
        //         this.showInput('information', 'topic', 8)
        //     }
        // },
        showInput(input, topic, n) {
            console.log("showInput")
            var elem1 = document.getElementById(input + n);
            var elem2 = document.getElementById(topic + n);
            elem1.style.transition = "all 0.1s ease-in-out"; //show input field
            if (n == 4) {
                elem1.style.height = "160px";
            } else {
                elem1.style.height = "50px";
            }
            elem2.style.display = "none"; //hide plus icon
        },
        hideBtn(btn, value, topic, n) { //กดปุ่ม save, cancel
            console.log("hideBtn")
            var btn = document.getElementById(btn + n).id;
            var val = document.getElementById(value + n).value; //input value
            var topic = document.getElementById(topic + n);
            var num = n;
            if (val.length > 0) { //มี input -> ไม่แสดงปุ่ม save, cancel
                document.getElementById("saveCancelBtn" + num).style.transition = "all 0.0s ease-in-out"; //hide button
                document.getElementById("saveCancelBtn" + num).style.overflow = "hidden"; //hide button
                // document.getElementById("saveCancelBtn"+num).style.height = "0px";//hide button
                document.getElementById("information" + num).style.height = "50px";
                if (btn == "saveBtn" + num) {
                    console.log("save")
                } else if (btn == "cancelBtn" + num) {
                    console.log("cancel")
                }
            } else if (val.length == 0) { //ไม่มี input -> ซ่อน ช่องinput
                this.hideInput('information' + num, 'topic' + num, num);
            }
        },
        hideInput(el, topic, n) { // -> ซ่อน ช่องinput
            console.log("hideInput")
            var elem = document.getElementById(el); //ช่องinput
            var topic = document.getElementById(topic);
            elem.style.overflow = "hidden"; //ซ่อน ช่องinput
            elem.style.height = "0px"; //ซ่อน ช่องinput
            topic.style.display = "block";
        },
        showBtn(input, n) {
            console.log("showBtn")
            var num = n;
            var elem1 = document.getElementById(input + n);
            if (n == 4) {
                elem1.style.height = "190px";
            } else {
                elem1.style.height = "80px";
            }
            document.getElementById("saveCancelBtn" + num).style.transition = "all 0.3s ease-in-out"; //show button
            document.getElementById("saveCancelBtn" + num).style.height = "40px"; //show button
        },
        // Education
        // addEducation() {
        //     var schoolName = document.getElementById('schoolName').value;
        //     var program = document.getElementById('program').value;
        //     var gpa = document.getElementById('gpa').value;
        //     var startYear = document.getElementById('startYear').value;
        //     var endYear = document.getElementById('endYear').value;
        //     this.education.push({
        //         // degree: document.getElementById('degree').value,
        //         schoolName: schoolName,
        //         program: program,
        //         gpa: gpa,
        //         startYear: startYear,
        //         endYear: endYear
        //     })
        //     schoolName = null;
        //     program = null;
        //     gpa = "";
        //     startYear == "";
        //     endYear == ""
        // }
    }
}
</script>
