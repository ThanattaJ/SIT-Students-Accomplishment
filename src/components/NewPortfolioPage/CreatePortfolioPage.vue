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
                            <form action="" method="post">
                                <div class="stepName">Create My Portfolio Page</div>
                                <div class="field">
                                    <label class="label inputName">Portfolio Page Name(TH)</label>
                                    <div class="control">
                                        <input class="input inputData" type="text" placeholder="Portfolio Page Name" v-model="port.portPageNameTH">
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label inputName">Portfolio Page Name(EN)</label>
                                    <div class="control">
                                        <input class="input inputData" type="text" placeholder="Portfolio Page Name" v-model="port.portPageNameEN">
                                    </div>
                                </div>
                                <div class="inputName">When you start the Portfolio Page?</div>
                                <div class="columns field"> 
                                    <div class="column is-one-quarter startMonth">
                                        <span class="select">
                                            <select v-model="port.startMonth" style="background-color: #ECECEC;">
                                                <option selected disabled :value=null>Month</option>
                                                <option>Jan</option>
                                                <option>Feb</option>
                                            </select>
                                        </span>
                                    </div>
                                    <div class="column">
                                        <span class="select">
                                            <select v-model="port.startYear" style="background-color: #ECECEC;">
                                                <option selected disabled :value=null>Year</option>
                                                <option>2016</option>
                                                <option>2017</option>
                                            </select>
                                        </span>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <footer class="card-footer field is-grouped is-grouped-centered backNext">
                        <router-link to="/Project">
                            <a class="card-footer-item button backButton">
                                Back
                            </a>
                        </router-link>
                        <router-link to="/PortfolioPageDetail">
                            <a class="card-footer-item button nextButton" @click="saveData">
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
    name : 'CreatePortfolioPage',
    data () {
        return {
            port:{
                portPageNameTH: null,
                portPageNameEN: null,
                startMonth: null,
                startYear: null
            }
            ,
            nowStep: 1,
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
    },
    methods: {
        saveData: function() {
            localStorage.setItem('port', JSON.stringify(this.port))
        }
    }
}
</script>
