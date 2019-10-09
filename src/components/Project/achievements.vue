<template>
<div id="achievements">
    <div class="card" id="achievements" style="$card-header-padding: 20px" v-if="this.getAchievements.length >= 0">
        <header class="card-header">
            <p class="card-header-title" id="cardHeader">Acheivement</p>
        </header>
        <div id="achieve">
            <div id="Acheivement" v-for=" i in this.getAchievements" v-bind:key="i.name">
                <md-card id="achievem">
                    <md-card-header>
                        <md-card-header-text id="aName"> {{i.achievement_name}}</md-card-header-text>
                    </md-card-header>
                    <md-card-content id="acDetail" style=" font-size: 12px ;
                            color : #6F6F6F !important;
                            margin-left: 20px;">
                        <br>
                        <div id="detail">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{i.achievement_detail}}</div>
                        <br>
                        <br>
                        <div id="organize">Organize by : &nbsp;&nbsp;{{i.organize_by}}</div>
                        <br>
                        <div id="date"> Date of Event: &nbsp;&nbsp;&nbsp;{{i.date_of_event}}</div>
                    </md-card-content>
                </md-card>
                <div>
                    <md-dialog :md-active.sync="active" v-model="value">
                        <md-card>
                            <md-card-header>
                                <div class="md-title">Add Acheivement</div>
                            </md-card-header>

                            <md-card-content>
                                <md-field>
                                    <label>Achievement Name</label>
                                    <md-textarea v-model="achievement_name" md-autogrow></md-textarea>
                                </md-field>
                                <md-field>
                                    <label>Achievement Detail</label>
                                    <md-textarea v-model="achievement_detail" md-autogrow></md-textarea>
                                </md-field>
                                <md-field>
                                    <label>Organize by</label>
                                    <md-textarea v-model="organize_by" md-autogrow></md-textarea>
                                </md-field>
                                <md-field>
                                    <label>Date of event</label>
                                    <md-textarea v-model="date_of_event" md-autogrow></md-textarea>
                                </md-field>
                            </md-card-content>

                            <md-card-actions>
                                <md-button>Add</md-button>
                                <md-button>Cancle</md-button>
                            </md-card-actions>
                        </md-card>
                    </md-dialog>
                    <md-button style="margin-right: 20px;margin-bottom:-10px;" class="md-fab md-mini md-primary md-fab-bottom-right" v-if="getEditProject === true" @click="active = true">
                        <md-icon>+</md-icon>
                    </md-button>
                    <span v-if="value">Value: {{ value }}</span>
                </div>

            </div>
        </div>
    </div>
    <div v-else>
        test
    </div>
</div>
</template>

<script>
import {
    mapGetters
} from 'vuex';
export default {
    data: () => ({
        active: false,
        value: null,
        achievement_name: null,
        achievement_detail:null,
        organize_by:null,
        date_of_event:null,
    }),
    computed: {
        ...mapGetters([
            'getAchievements',
            'getEditProject'
        ])
    },
    mounted() {
        console.log("อิสัส  : ", this.getAchievements.length)
    },
    // methods

}
</script>

<style>
#aName {
    color: #265080 !important;
    background-color: white !important;
    border: none !important;
    font-family: Asap !important;
    font-style: normal !important;
    font-weight: normal !important;
    font-size: 16px !important;
    margin-left: 30px !important;
}

#detail {
    color: #265080 !important;
    background-color: white !important;
    border: none !important;
    font-family: Asap !important;
    font-style: normal !important;
    font-weight: normal !important;
    font-size: 13px !important;

}

#organize {

    color: #265080 !important;
    background-color: white !important;
    border: none !important;
    font-family: Asap !important;
    font-style: normal !important;
    font-weight: normal !important;
    font-size: 12px !important;
}

#date {
    color: #265080 !important;
    background-color: white !important;
    border: none !important;
    font-family: Asap !important;
    font-style: normal !important;
    font-weight: normal !important;
    font-size: 12px !important;
    margin-left: 60% !important;
}

#achievem {
    border: none !important;
}
</style>
