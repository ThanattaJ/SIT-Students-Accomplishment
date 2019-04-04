<template>
    <div id="body-bg">
        <div class="columns is-mobile">
            <div class="column is-one-fifth">
                <div>
                    <vue-step :now-step="nowStep" :step-list="stepList" :active-color="activeColor" :direction="direction"></vue-step>
                </div>
            </div>
            <div class="column">
                <div class="card card-equal-height">
                    <div class="card-content form">
                        <div class="content">
                            <div class="stepName">My Team</div>
                            <div class="columns"> 
                                <div class="column">
                                    <div class="field">
                                        <label class="label inputName">Firstname</label>
                                        <div class="control">
                                            <input class="input inputData" type="text" value="Nattanat" readonly>
                                        </div>
                                    </div>
                                </div>
                                <div class="column">
                                    <div class="field">
                                        <label class="label inputName">Lastname</label>
                                        <div class="control">
                                            <input class="input inputData" type="text" value="Wimaluangtrakul" readonly>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="addMember" v-on:click="clickAddMember=!clickAddMember">+ Add more members...</div>
                            <div v-if="clickAddMember">
                                <!-- เพิ่มตรงเน้ -->
                                <div class="column is-one-fifth">
                                <div class="card borderSelectMember">
                                    <div class="card-content selectMember">
                                        <div class="content">
                                            <div class="chooseMemberType" v-on:click="chooseSIT=true">SIT Student</div>
                                            <div v-if="chooseSIT">
                                            <!-- เพิ่มตรงเน้ -->
                                            </div>
                                            <hr>
                                            <div class="chooseMemberType" v-on:click="chooseExternal=true">External </div>
                                            <div v-if="chooseExternal">
                                            <!-- เพิ่มตรงเน้ -->
                                            </div>
                                         </div>
                                    </div>
                                </div>
                                </div>
                                <!-- <div class="columns"> 
                                    <div class="column">
                                        <div class="field">
                                            <label class="label inputName">Firstname</label>
                                            <div class="control">
                                                <input class="input inputData" type="text" value="Nattanat" readonly>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="column">
                                        <div class="field">
                                            <label class="label inputName">Lastname</label>
                                            <div class="control">
                                                <input class="input inputData" type="text" value="Wimaluangtrakul" readonly>
                                            </div>
                                        </div>
                                    </div>
                                </div> -->

                                <!-- --------------------------------- -->
                            </div>
                        </div>
                    </div>
                    <footer class="card-footer field is-grouped is-grouped-centered backNext">
                        <router-link to="/PortfolioPageDetail">
                            <a class="card-footer-item button backButton">
                                Back
                            </a>
                        </router-link>
                        <router-link to="/Achievement">
                            <a class="card-footer-item button nextButton">
                                Next
                            </a>
                        </router-link>
                    </footer>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import './../../../node_modules/bulma/css/bulma.css';
import './../css/form.css';
import vueStep from 'vue-step';

export default {
    data () {
    return {el:"#addMember",
        name : 'TeamMembers',
        clickAddMember: false,
        chooseSIT: false,
        chooseExternal: false,
        nowStep: 3,
        stepList: [
            'Create Portfolio Page',
            'Project Datail',
            'Team Members',
            'Acheivement'
        ],
        activeColor:'#265080',
        direction: 'vertical'
    }
  },
  components: {
    vueStep
  }
}
</script>