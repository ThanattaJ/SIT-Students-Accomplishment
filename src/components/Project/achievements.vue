<template>
<div id="achievements">
    <div class="card" id="achievements" style="$card-header-padding: 20px" v-if="this.GET_ACHIEVEMENT.length != 0">
        <header class="card-header">
            <p class="card-header-title" id="cardHeader">Acheivement</p>
        </header>
        <div id="achieve">
            <div id="Acheivement" v-for=" i in this.GET_ACHIEVEMENT" v-bind:key="i.name">
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
                        <md-button @click="addAchievement">Add</md-button>
                        <md-button @click="close">Cancle</md-button>
                    </md-card-actions>
                </md-card>
            </md-dialog>
            <md-button class="md-raised md-primary" id="Achive" v-if="getEditProject === true" @click="active = true">Add Achivement</md-button>
        </div>
    </div>
</div>
</template>

<script>
import {
    mapGetters,
    mapActions
} from 'vuex';
export default {
    data() {
        return {
            active: false,
            value: null,
            achievement_name: null,
            achievement_detail: null,
            organize_by: null,
            date_of_event: null,
        }
    },
    computed: {
        ...mapGetters([
            'getAchievements',
            'getEditProject',
            'GET_ACHIEVEMENT'
        ])
    },
    mounted() {
        console.log("getAchievements  : ", this.GET_ACHIEVEMENT)
    },
    methods: {
        ...mapActions(['SET_ACHIEVEMENT']),
        addAchievement() {
            if (this.achievement_name != null && this.achievement_name.length > 0) {
                this.SET_ACHIEVEMENT({
                    achievement_name: this.achievement_name,
                    achievement_detail: this.achievement_detail,
                    organize_by: this.organize_by,
                    date_of_event: this.date_of_event
                })
                this.active = false,
                    this.clearInputValue()
                console.log("have achivement")
            } else {
                console.log("post achivement some thing went worng")
            }
        },
        clearInputValue() {
            this.achievement_name = null
            this.achievement_detail = null
            this.organize_by = null
            this.date_of_event = null
        },
        close: function () {
            this.active = false
        },
    }

}
</script>

<style>
.md-dialog.md-theme-default {
    width: 50%
}

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

#Achive {
    margin-top: 20px;
}
</style>
