<template>
<div id="editImg">
    <div id="card">
        <md-dialog :md-active.sync="active">
            <md-card>
                <md-card-header>
                    <div class="md-title">Edit Image</div>
                </md-card-header>

                <md-card-content>
                    <div class="columns is-multiline">
                        <div class="column is-one" v-for="(picture,index) in getImages" v-bind:key="index">
                            <div class="image is-128x128">
                                <md-button style=" justify-content: center" class="md-fab md-mini md-plain md-fab-bottom-right" v-if="getEditProject" @click="deletePicture(index)">
                                    <md-icon>x</md-icon>
                                </md-button>
                                <img :src="picture.path" id="imgShow" />
                            </div>
                        </div>
                    </div>
                </md-card-content>
                <md-card-actions id="upload">
                    <uploadimg />
                </md-card-actions>
                <md-card-actions>
                    <md-button class="md-accent" @click="close">cancle</md-button>
                </md-card-actions>
            </md-card>
        </md-dialog>
    </div>

    <md-button class="md-raised md-primary" id="add"  
    v-if="getEditProject === true" @click="active = true">Add Image</md-button>

</div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import uploadimg from './uploadimg';
import {
    mapGetters
} from 'vuex';
export default {
    computed: {
        ...mapGetters([
            'getEditProject',
            'getImages'
        ])
    },
    components: {
        uploadimg
    },
    data() {
        return {
            active: false,

        }
    },
    methods: {
        deletePicture(index) {
            console.log("delete  : " + this.getImages[index].path);

            try {
                axios
                    .delete("https://www.sit-acc.nruf.in.th/files/image", {
                        //.delete("http://localhost:7000/files/image", {
                        data: {
                            path_name: this.getImages[index].path
                        }
                    }, this.GET_CONFIG)
                    //
                    .then(response => this.getImages.splice(index, 1));
            } catch (err) {
                console.log("FAILURE!!" + err);
                this.message = "Something went wrong";
                this.error = true;
            }
        },
        close: function () {
            this.active = false;
        },
    }

}
</script>

<style>
#imgShow {
    margin-left: 50%;
}

#cancle {
    margin-right: 50px;
}
#add{
    margin-left: 20%;
    margin-top: 5%;
}
</style>
