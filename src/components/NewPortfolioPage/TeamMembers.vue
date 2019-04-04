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
                    <div class="card-content">
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
                            <div>+Add more members...</div>
                            <button type="button" name="button" v-on:click="like=!like">like</button>
                            <div v-if="like">hi, gib</div><br>
                        </div>
                    </div>
                    <footer class="card-footer field is-grouped is-grouped-centered">
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

// Vue.component('gib',{
//     template:'<button v-on:click="count++">click: {{count}}</button>'
    
// });

export default {
    data () {
    return {
        name : 'TeamMembers',
        like: false,
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