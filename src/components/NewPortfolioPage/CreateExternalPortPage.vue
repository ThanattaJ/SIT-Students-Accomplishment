<template>
  <div id="body-bg">
    <div class="columns is-mobile">
      <div class="column is-one-fifth">
        <div>
          <vue-step
            :nowStep="nowStep"
            :stepList="stepList"
            :activeColor="activeColor"
            :direction="direction"
          ></vue-step>
        </div>
      </div>
      <div class="column">
        <div class="card card-equal-height">
          <div class="card-content form">
            <div class="content">
              <form>
                <!-- step1 -->
                <div v-if="nowStep === 1">
                  <step1
                    v-on:childToParent1="getPortPageNameENfromChild($event)"
                    v-on:childToParent2="getPortPageNameTHfromChild($event)"
                    v-on:childToParent3="getStartMonthfromChild($event)"
                    v-on:childToParent4="getStartYearfromChild($event)"
                    :portParent="portParent"
                    v-on:validationStep1="getValidatePortfromChild($event)"
                    :validatePortParent="validatePortParent"
                    ref="childRefStep1"
                  />
                </div>
                <!-- step2 -->
                <div v-if="nowStep === 2">
                  <step2
                    v-on:childToParent6="getPortPageDetailENfromChild($event)"
                    v-on:childToParent7="getPortPageDetailTHfromChild($event)"
                    :port_detail_Parent="port_detail_Parent"
                    v-on:validationStep2="getValidatePortDetailfromChild($event)"
                    :validatePortDetailParent="validatePortDetailParent"
                    ref="childRefStep2"
                  />
                </div>
                <!-- step3 -->
                <div v-if="nowStep === 3">
                  <!-- v-if="portParent.haveOutsider=='true'" -->
                  <step3haveOutsider
                    v-on:childToParent8="getMemberfromChild($event)"
                    v-on:childToParent9="getSelectedStudentfromChild($event)"
                    v-on:childToParent20="getNameSelectedStudentfromChild($event)"
                    :membersParent="membersParent"
                    :selectedStudentParent="selectedStudentParent"
                    :nameSelectedStudentParent="nameSelectedStudentParent"
                    ref="childRefStep3"
                    :studentDataFromParent="studentDataFromParent"
                  />
                  <!-- <step3noOutsider v-if="portParent.haveOutsider=='false'"
                                        v-on:childToParent8="getMemberfromChild($event)"
                                        v-on:childToParent9="getSelectedStudentfromChild($event)"
                                        :membersParent="membersParent"
                                        :selectedStudentParent="selectedStudentParent"
                  />-->
                </div>
                <!-- step1 -->
                <div v-if="nowStep === 4">
                  <step4
                    v-on:childToParent10="getAchievementNamefromChild($event)"
                    v-on:childToParent11="getAchievementDetailfromChild($event)"
                    v-on:childToParent12="getCompanyfromChild($event)"
                    v-on:childToParent13="getDate($event)"
                    :achievementParent="achievementParent"
                    v-on:validationStep4="getValidateAchievementfromChild($event)"
                    :validateAchievementParent="validateAchievementParent"
                    ref="childRefStep4"
                  />
                </div>
                <!-- next, back -->
              </form>
              <!-- Child to Parent<br>
                            {{achievementParent.achievementName}} <br>
              Parent : {{achievementParent.achievementDetail}} <br>-->
            </div>
          </div>
          <footer class="card-footer field is-grouped is-grouped-centered">
            <button class="card-footer-item button backButton" @click.prevent="prev">
              <p class="letterBackNext">Back</p>
            </button>
            <button
              class="card-footer-item button nextButton"
              @click.prevent="next"
              v-if="nowStep === 1 || nowStep === 2 || nowStep === 3"
            >
              <p class="letterBackNext">Next</p>
            </button>
            <button
              class="card-footer-item button nextButton"
              @click.prevent="askForSure"
              v-if="nowStep === 4"
            >
              <p class="letterBackNext">Submit</p>
            </button>
          </footer>
        </div>
      </div>
    </div>

    <div>
      {{membersParent}}
    </div>
    <!-- <div>
      {{membersParent}}
      <br>
      Port name EN : {{portParent.portPageNameEN}}
      <br>
      Port name TH : {{portParent.portPageNameTH}}
      <br>
      Start : {{portParent.startMonth}} / {{portParent.startYear}}
      <br>
      <hr>
      Port Detail EN : {{port_detail_Parent.portPageDetailEN}}
      <br>
      Port Detail TH : {{port_detail_Parent.portPageDetailTH}}
      <br>
      <hr>
      Have outsider : {{membersParent.haveOutsider}}
      <br>
      Student Members : {{membersParent.student}}
      <br>
      Outsider Members : {{membersParent.outsider}}
      <br>
      <hr>
      Achievement name : {{achievementParent.achievementName}}
      <br>
      Achievement detail : {{achievementParent.achievementDetail}}
      <br>
      Company : {{achievementParent.company}}
      <br>
      date : {{achievementParent.date}}
      <br>
    </div> -->
  </div>
</template>

<script>
import "./../css/form.css";
import vueStep from "vue-step";
import step1 from "./step1.vue";
import step2 from "./step2.vue";
import step3haveOutsider from "./step3haveOutsider.vue";
import step3noOutsider from "./step3noOutsider.vue";
import step4 from "./step4.vue";
import axios from "axios";
import Swal from "sweetalert2";

var projectId;

export default {
  async mounted() {
    //connect API ดึงข้อมูลนศ
    const { data } = await axios.get(
      "https://calm-shelf-19378.herokuapp.com/users/list_student/59"
    );
    var studentID = data.map((_item, index = 0) => _item.student_id);
    var studentFname = data.map((_item, index = 0) => _item.firstname_en);
    var studentLname = data.map((_item, index = 0) => _item.lastname_en);
    for (let i = 0; i < studentID.length; i++) {
      this.studentDataFromParent.push({
        value: i + 1,
        text: studentID[i],
        firstname: studentFname[i],
        lastname: studentLname[i]
      });
    }
    console.log(data);
  },
  data() {
    return {
      // step list
      studentDataFromParent: [],
      name: "",
      nowStep: 1,
      stepList: [
        "Create Project",
        "Project Overview",
        "Project Members",
        "Project Achievement"
      ],
      activeColor: "#265080",
      direction: "vertical",

      //step1
      portParent: {
        portPageNameEN: "",
        portPageNameTH: "",
        startMonth: null,
        startYear: null
      },
      //step2
      port_detail_Parent: {
        portPageDetailEN: "",
        portPageDetailTH: ""
      },
      //step3
      membersParent: {
        haveOutsider: false,
        student: [],
        outsider: []
      },
      selectedStudentParent: [],
      nameSelectedStudentParent: [],
      //step4
      achievementParent: {
        achievementName: "",
        achievementDetail: null,
        company: null,
        date: null
      },

      //validateData
      validatePortParent: {
        validatePortPageNameEN: false,
        validatePortPageNameTH: false,
        validateStartMonth: true,
        validateStartYear: false
      },
      validatePortDetailParent: {
        validatePortPageDetailEN: false,
        validatePortPageDetailTH: false
      },
      validateAchievementParent: {
        validateAchievementName: "noData",
        validateAchievementDetail: "noData",
        validateCompany: "noData"
      }
    };
  },
  methods: {
    askForSure() {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to create a new Portfolio Page?",
        type: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        // confirmButtonText: '<a href="localhost:7001/#/projectdetail"><span style="color:white">Yes</span></a>', //<a href="http://localhost:7001/#/projectdetail"></a>
        confirmButtonText: "yes", //<a href="http://localhost:7001/#/projectdetail"></a>
        // confirmButtonText: '<router-link to="/ProjectDetail"><span style="color:white">Yes</span></router-link>', //<a href="http://localhost:7001/#/projectdetail"></a>
        cancelButtonText: "No"
      }).then(result => {
        // this.submit()
        if (result.value) {
          Swal.fire({
            title: "Success!",
            text: "Click to view your new Portfolio Page.",
            type: "success",
            showConfirmButton: false,
            timer: 2000
          });
          this.submit();
        }
      });
    },
    submit: function() {
      //   this.sendDataToDb();
      
      this.$refs.childRefStep4.step4Check();
      console.log("before submit")
      if (
        (this.validateAchievementParent.validateAchievementName == "noData" ||
          this.validateAchievementParent.validateAchievementName ==
            "trueData") &&
        this.validateAchievementParent.validateAchievementDetail == "noData" &&
        this.validateAchievementParent.validateCompany == "noData" &&
        this.achievementParent.date == null
      ) {
        this.sendDataToDb();
      } else if (
        this.validateAchievementParent.validateAchievementName == "trueData" &&
        this.validateAchievementParent.validateAchievementDetail ==
          "trueData" &&
        this.validateAchievementParent.validateCompany != "falseData"
      ) {
        this.sendDataToDb();
      } else if (
        this.validateAchievementParent.validateAchievementName == "trueData" &&
        this.validateAchievementParent.validateAchievementDetail !=
          "falseData" &&
        this.validateAchievementParent.validateCompany == "trueData"
      ) {
        this.sendDataToDb();
      } else if (
        this.validateAchievementParent.validateAchievementName == "trueData" &&
        this.achievementParent.date != null
      ) {
        this.sendDataToDb();
      }
    },
    prev: function() {
      if (this.nowStep != 1) {
        this.nowStep--;
      }
    },
    next: function() {
      //   this.nowStep++;
      if (this.nowStep == 1) {
        var validPort = this.validatePortParent;
        if (
          validPort.validatePortPageNameEN == true &&
          validPort.validatePortPageNameTH == true &&
          validPort.validateStartMonth == true &&
          validPort.validateStartYear == true
        ) {
          this.nowStep++;
        } else {
          this.$refs.childRefStep1.step1Check();
        }
      } else if (this.nowStep == 2) {
        var validPortDetail = this.validatePortDetailParent;
        if (
          validPortDetail.validatePortPageDetailEN == true &&
          validPortDetail.validatePortPageDetailTH == true
        ) {
          this.nowStep++;
        } else if (
          validPortDetail.validatePortPageDetailEN == true &&
          this.port_detail_Parent.portPageDetailTH == ""
        ) {
          this.nowStep++;
        } else if (
          validPortDetail.validatePortPageDetailTH == true &&
          this.port_detail_Parent.portPageDetailEN == ""
        ) {
          this.nowStep++;
        } else {
          this.$refs.childRefStep2.step2Check();
        }
      } else if (this.nowStep == 3) {
        this.nowStep++;
        //   if(this.membersParent.haveOutsider == null){
        //       this.$refs.childRefStep3.step3Check();
        //   }else if(this.membersParent.haveOutsider == "true"){
        //       if(this.membersParent.student.length!=0 && this.membersParent.outsider.length!=0){
        //           this.nowStep++;
        //           if(this.membersParent.haveOutsider == "false"){
        //               this.membersParent.outsider = []
        //           }
        //       }else{
        //           this.$refs.childRefStep3.step3CheckMember();
        //       }
        //   }else if(this.membersParent.haveOutsider == "false"){
        //       if(this.membersParent.student.length==0){
        //           this.$refs.childRefStep3.step3CheckMember();
        //       }else{
        //           this.nowStep++;
        //           if(this.membersParent.haveOutsider == "false"){
        //               this.membersParent.outsider = []
        //           }
        //       }
        //   }
      }
    },
    //step1
    getPortPageNameENfromChild(portPageNameEN) {
      this.portParent.portPageNameEN = portPageNameEN;
    },
    getPortPageNameTHfromChild(portPageNameTH) {
      this.portParent.portPageNameTH = portPageNameTH;
    },
    getStartMonthfromChild(startMonth) {
      this.portParent.startMonth = startMonth;
    },
    getStartYearfromChild(startYear) {
      this.portParent.startYear = startYear;
    },
    //step2
    getPortPageDetailENfromChild(portPageDetailEN) {
      this.port_detail_Parent.portPageDetailEN = portPageDetailEN;
    },
    getPortPageDetailTHfromChild(portPageDetailTH) {
      this.port_detail_Parent.portPageDetailTH = portPageDetailTH;
    },
    //step3
    getMemberfromChild(members) {
      this.membersParent = members;
    },
    getSelectedStudentfromChild(selectedStudent) {
      this.selectedStudentParent = selectedStudent;
    },
    getNameSelectedStudentfromChild(nameSelectedStudent) {
      this.nameSelectedStudentParent = nameSelectedStudent;
    },
    //step4
    getAchievementNamefromChild(achievementName) {
      this.achievementParent.achievementName = achievementName;
    },
    getAchievementDetailfromChild(achievementDetail) {
      this.achievementParent.achievementDetail = achievementDetail;
    },
    getCompanyfromChild(company) {
      this.achievementParent.company = company;
    },
    getDate(date) {
      this.achievementParent.date = date;
    },
    getDateOfEventfromChild(dateOfEvent) {
      this.achievementParent.dateOfEvent = dateOfEvent;
    },
    getMonthOfEventfromChild(monthOfEvent) {
      this.achievementParent.monthOfEvent = monthOfEvent;
    },
    getYearOfEventfromChild(yearOfEvent) {
      this.achievementParent.yearOfEvent = yearOfEvent;
    },
    // validation
    getValidatePortfromChild(validatePort) {
      this.validatePortParent = validatePort;
    },
    getValidatePortDetailfromChild(validatePortDetail) {
      this.validatePortDetailParent = validatePortDetail;
    },
    getValidateAchievementfromChild(ValidateAchievement) {
      this.validateAchievementParent = ValidateAchievement;
    },
    async sendDataToDb() {
      if (this.port_detail_Parent.portPageDetailTH == "") {
        this.port_detail_Parent.portPageDetailTH = null;
      }
      if (this.port_detail_Parent.portPageDetailEN == "") {
        this.port_detail_Parent.portPageDetailEN = null;
      }
      if (this.portParent.startMonth == null) {
        this.portParent.startMonth = 0;
      }
      var data;
      data = {
        project_data: {
          project_name_th: this.portParent.portPageNameTH,
          project_name_en: this.portParent.portPageNameEN,
          project_type_name: "external",
          project_detail_th: this.port_detail_Parent.portPageDetailTH,
          project_detail_en: this.port_detail_Parent.portPageDetailEN,
          start_month: this.portParent.startMonth,
          start_year_en: this.portParent.startYear,
          haveOutsider: this.membersParent.haveOutsider
        },
        member: {
          students: JSON.parse(JSON.stringify(this.membersParent.student))
        }
      };
      if (this.achievementParent.achievementName != "") {
        console.log("have achievement");
        data["achievement"] = {
          achievement_name: this.achievementParent.achievementName,
          achievement_detail: this.achievementParent.achievementDetail,
          organize_by: this.achievementParent.company,
          date_of_event: this.achievementParent.date
        };
      }
      if (this.membersParent.outsider.length > 0) {
        this.membersParent.haveOutsider = true;
        console.log("มีคนนอก : " + this.membersParent.haveOutsider)
        data.member.outsiders = JSON.parse(JSON.stringify(this.membersParent.outsider))
        console.log("OUTSIDER: "+ this.membersParent.outsider)
      }
      try {
        await axios
          // .post("http://localhost:7000/projects/external", data)
          .post("https://calm-shelf-19378.herokuapp.com/projects/external", data)
          .then(res => {
            console.log(res);
            this.$router.push({
              path: `/ProjectDetail/${res.data.project_id}`
            });
          })
          .catch(res => {
            console.log(res);
          });
      } catch (err) {
        console.log("FAILURE!!" + err);
      }
    },
    setProjectId(project_id) {
      projectId = project_id;
    }
  },
  components: {
    vueStep,
    step1,
    step2,
    step3haveOutsider,
    step3noOutsider,
    step4
  }
};
</script>

