<template>
<!-- <div class="columns">
    <div class="column is-one-quarter"> -->
<div>
    <div class="createPortPage" @click="showChooseProjectType">
        <div class="textCreate" style="font-size:30px !important">+</div>
        <div class="textCreate" style="padding-top:10px">Create Project</div>
    </div>
    <modal name="chooseProjectType">
        <chooseProjectTypeModal />
    </modal>
</div>
<!-- </div>
    <div class="column"></div>
</div> -->
</template>

<script src="print.js"></script>

<script>
// import './../../../node_modules/bulma/css/bulma.css';
import './../css/studentProjectTab.css';
import chooseProjectTypeModal from './chooseProjectTypeModal';
import {
    mapGetters,
    mapActions
} from 'vuex'
import axios from 'axios'

export default {
    data() {
        return {}
    },
    components: {
        chooseProjectTypeModal
    },
    computed: {
        ...mapGetters({})
    },
    mounted() {},
    methods: {
        showChooseProjectType() {
            this.$modal.show('chooseProjectType')
        }
    }
}
</script>
