<template>
<div>
    <div id="card lecturerCard">
        <md-dialog :md-active.sync="active" id="editImg">
            <md-card>
                <md-card-header>
                    <div class="md-title" id="title">Edit Image</div>
                    <md-button style=" justify-content: center" class="md-fab md-mini md-plain md-fab-top-right" @click="close">
                        <md-icon>X</md-icon>
                    </md-button>
                </md-card-header>
                <div>
                    <div id="upload">
                        <h5>{{messageUpload}}</h5>
                        <input type="file" ref="file" @change="selectFile" class="file-input" accept=".jpg, .png, .gif" id="inputCovr" />
                        <img v-if="url" :src="url" id="Img" />
                    </div>
                    <span>&nbsp;</span>
                    <span v-if="file" class="file-name" id="fileName"> {{file.name}}</span>
                    <p id="fileName">{{message}}</p>
                    <div class="column" id="update">
                        <button class="button" @click="sendFile" @submit="onSubmit" id="Bottom">Upload</button>
                    </div>
                </div>
                <md-card-content>
                    <div class="columns" style="  display: flex; flex-wrap: wrap;">
                        <div v-for="(picture,index) in getImages" v-bind:key="index" class="column is-one-third" style="box-sizing: border-box; padding: 1em; width: 33.3%;">
                            <md-button id="delete" class="md-fab md-mini " @click="deletePicture(index)">
                                <md-icon>-</md-icon>
                            </md-button>
                            <img :src="picture.path" />
                        </div>
                    </div>
                </md-card-content>
            </md-card>
        </md-dialog>
    </div>
    <span class="button " id="addImage" v-if="getEditProject === true" @click="active = true">Edit Image</span>

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
            'getPic',
            'GET_PATHNAME'
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
                    .delete(this.GET_PATHNAME + "/files/image", {
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
            this.file = ''
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
            try {
                const {
                    data
                } = await axios.post(this.GET_PATHNAME + '/files/imageMul', formData, this.GET_CONFIG)

                this.message = "File has been uploaded";
                this.error = false;
                this.addImage({
                    path: data.url[0].path_name
                })
                console.log('get', this.getImages)
                this.url = ''
                this.file = ''
                console.log(data.url[0].path_name, "path")
                this.isActive = false;
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

#addImage {
    margin-left: 20%;
    margin-top: 5%;
    color: white;
    background-color: #265080 !important;
}

#Img {
    max-width: 250px;
    max-height: 250px;
    margin-top: 10px;
    margin-left: -70px
}

#fileName {
    margin-left: 320px;
}

#upload {
    margin-left: 43%;
    margin-top: 20px
}

#title {
    margin-left: 5%;
}

#Bottom {
    margin-left: 80%;
    color: white;
    background-color: #265080 !important;
}

#table {
    width: 80%
}

#delete {
    margin-bottom: -25%;
    margin-left: 90%;
}

#editImg {
    background-color: white !important;
    width: 800px !important;
}

.ti-tag {
    background-color: #265080 !important;
}
</style>
