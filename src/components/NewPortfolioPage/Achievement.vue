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
                            <div class="stepName">Achievement</div>
                            <div class="field">
                                <label class="label inputName">Achievement name</label>
                                <div class="control">
                                    <input class="input inputData" type="text" placeholder="Achievement name">
                                </div>
                            </div>
                            <div class="field">
                                <label class="label inputName">Achievement Detail</label>
                                <div class="control">
                                    <textarea class="Normal textarea inputData" placeholder="Detail..."></textarea>
                                </div>
                            </div>
                            <div class="columns"> 
                                <div class="column">
                                    <div class="field">
                                        <label class="label inputName">Organize by</label>
                                        <div class="control">
                                            <input class="input inputData" type="text" placeholder="Company name">
                                        </div>
                                    </div>
                                </div>
                                <div class="column">
                                    <div class="field">
                                        <label class="label inputName">Date of Event</label>
                                        <div class="control">
                                            <input class="input inputData" type="text" placeholder="Wimaluangtrakul">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="field is-grouped is-grouped-centered">
                                <p class="control">
                                    <router-link to="/TeamMembers">
                                        <a class="button backButton">
                                            Back
                                        </a>
                                    </router-link>
                                </p>
                                <p class="control">
                                    <a class="button nextButton">
                                        Next
                                    </a>
                                </p>
                            </div> -->
                            <!-- <input type="date" data-display-mode="inline" data-is-range="true" data-close-on-select="false">
                            <hr>
                            <div id='calendar'>
                                Selected date: {{niceDate}}
                                <button ref='calendarTrigger' type='button'>Change</button>
                            </div> -->
                        </div>
                    </div>
                    <footer class="card-footer field is-grouped is-grouped-centered backNext">
                        <router-link to="/TeamMembers">
                            <a class="card-footer-item button backButton">
                                Back
                            </a>
                        </router-link>
                        <router-link to="">
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
import bulmaCalendar from './../../../node_modules/bulma-extensions/bulma-calendar/dist/js/bulma-calendar.min.js';
import vueStep from 'vue-step'

export default {
    name : 'Achievement',
    data () {
    return {
      nowStep: 4,
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