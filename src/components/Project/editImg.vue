<template>
<div id="editImg">
    <div id="card lecturerCard">
        <md-dialog :md-active.sync="active">
            <md-card>
                <md-card-header>
                    <div class="md-title" id="title">Edit Image</div>
                    <md-button style=" justify-content: center" class="md-fab md-mini md-plain md-fab-top-right" @click="close">
                        <md-icon>X</md-icon>
                    </md-button>
                </md-card-header>
                <div id="upload">
                    <h5>{{messageUpload}}</h5>
                    <input type="file" ref="file" @change="selectFile" class="file-input" accept=".jpg, .png, .gif" id="inputCovr" />
                    <img v-if="url" :src="url" id="Img" />
                </div>
                <span>&nbsp;</span>
                <span v-if="file" class="file-name">{{file.name}}</span>
                <p id="update">{{message}}</p>
                <div class="column" id="update">
                    <md-button class="md-raised md-primary" @click="sendFile" @submit="onSubmit" id="Bottom">Upload</md-button>
                </div>
                <md-card-content>
                    <div class="columns is-gapless is-multiline">
                        <div class="column is-2" v-for="(picture,index) in getImages" v-bind:key="index">
                            <div class="image is-128x128">
                                <md-button id="delete" class="md-fab md-mini md-plain md-fab-bottom-center md-dense" v-if="getEditProject" @click="deletePicture(index)">
                                    <md-icon>-</md-icon>
                                </md-button>
                                <table id="table">
                                    <tr><img :src="picture.path" id="imgShow" /></tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </md-card-content>
                <!-- <md-card-actions md-alignment="left">
                    <md-button class="md-accent" @click="close" id="close">Close</md-button>
                </md-card-actions> -->
            </md-card>
        </md-dialog>
    </div>

    <md-button class="md-raised md-primary" id="add" v-if="getEditProject === true" @click="active = true">Add Image</md-button>

</div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import uploadimg from './uploadimg';
import {
    mapActions,
    mapGetters,
    mapMutations
} from 'vuex';
export default {
    computed: {
        ...mapGetters([
            'getEditProject',
            'getImages',
            'GET_CONFIG',
            'getPic'
        ]),
    },
    components: {
        uploadimg
    },
    data() {
        return {
            active: false,
            file: " ",
            project_id: 1,
            path_name: '',
            message: " ",
            error: false,
            url: null,
            isActive: false,
            messageUpload: "+ เลือกรูปภาพ",
            headerCover: "Cover Image"

        }
    },
    methods: {
        ...mapActions([
            'addImage',
            'addPushImage',
            'setImage'
        ]),
        selectFile(e) {
            this.file = this.$refs.file.files[0];
            this.error = false;
            this.message = " ";
            const file = e.target.files[0];
            this.url = URL.createObjectURL(file);
        },
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
            this.url = ''
        },
        async sendFile() {
            const formData = new FormData();
            formData.append('files', this.file);
            formData.append('project_id', this.$route.params.pId);
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiJzdHVkZW50MDEiLCJmdWxsbmFtZSI6InN0dWRlbnQwMSIsImVtYWlsIjoic3R1ZGVudDAxQHN0LnNpdC5rbXV0dC5hYy50aCIsImRlc2NyaXB0aW9uIjoiQ1MiLCJyb2xlIjoic3R1ZGVudCIsImlhdCI6MTU2ODcxNzYxNzI0NH0.Vn_kGau8dG9DBQIqm7_NOQVTKfK4ZjlfUKGmrZK0NzU'
                }
            }
            // "false"
            try {
                const {
                    data
                } = await axios.post('https://www.sit-acc.nruf.in.th/files/imageMul', formData, this.GET_CONFIG)

                this.message = "File has been uploaded";
                this.error = false;
                this.addImage({
                    path: data.url[0].path_name
                })
                // console.log("upload image : ", data.url[0].path_name)
                this.isActive = false;
                // this.setPic({ path :data.url[0].path_name})

            } catch (err) {
                console.log('FAILURE!!' + err)
                this.message = "Something went wrong";
                this.error = true;
            }
        },
        onSubmit(e) {
            const file = this.$refs.file.files[0]
            if (!file) {
                e.preventDefault();
                alert('No file chosen');
                return;
            }
            if (file.size > 1024) {
                e.preventDefault();
                alert('File too big (> 1MB)');
                return;
            }
            alert('File OK');

        }
    },
    beforeDestroy() {
        // this.setImage([])
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

#add {
    margin-left: 20%;
    margin-top: 5%;
}

#Img {
    max-width: 250px;
    max-height: 250px;
    margin-right: -120px;
    margin-top: 10px
}

#upload {
    margin-left: 43%;
    margin-top: 20px
}

#title {
    margin-left: 5%;
}

#Bottom {
    margin-left: 40%;
}

#table {
    width: 80%
}

#delete {
    margin-left: 38px;
    margin-bottom: 15px
}
</style>
