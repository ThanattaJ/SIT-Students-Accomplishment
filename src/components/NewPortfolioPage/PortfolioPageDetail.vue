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
                            <div class="stepName">My Portfolio Page Detail</div>
                            <div class="field">
                                <label class="label inputName">Portfolio Page Detail(TH)</label>
                                <div class="control">
                                    <textarea class="Normal textarea inputData portDetail" placeholder="Detail..."></textarea>
                                </div>
                            </div>

                            <div class="field">
                                <label class="label inputName">Portfolio Page Detail(EN)</label>
                                <div class="control">
                                    <textarea class="Normal textarea inputData portDetail" placeholder="Detail..."></textarea>
                                    <div class="field is-grouped is-grouped-right">0/200</div>
                                    <div>* Please write at least 1 language</div>
                                </div>
                            </div>
                            <!-- <div class="field is-grouped is-grouped-centered">
                                <p class="control">
                                    <router-link to="/CreatePortfolioPage">
                                        <a class="button backButton">
                                            Back
                                        </a>
                                    </router-link>
                                </p>
                                <p class="control">
                                    <router-link to="/TeamMembers">
                                        <a class="button nextButton">
                                            Next
                                        </a>
                                    </router-link>
                                </p>
                            </div> -->
                        </div>
                    </div>
                    <footer class="card-footer field is-grouped is-grouped-centered backNext">
                        <router-link to="/CreatePortfolioPage">
                            <a class="card-footer-item button backButton">
                                Back
                            </a>
                        </router-link>
                        <router-link to="/TeamMembers">
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
    name : 'PortfolioPageDetail',
    data () {
    return {
      nowStep: 2,
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
