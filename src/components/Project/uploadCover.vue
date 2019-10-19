<template>
<form @submit.prevent="" enctype="multipart/form-data">
    <div class="columns" id="cover">
        <div class="column">
            <div class="file is-boxed is-primary">
                <label class="file-label">
                    <span class="file">
                        <div class="container">
                            <div class="content has-text-centered">
                                <p class="control">
                                    <button v-on:click="launch" class="button is-primary" id="uploadCover">Upload Cover</button>
                                </p>
                            </div>
                            <div class="modal" v-bind:class="{'is-active':isActive}" id="modalCover">
                                <!-- <header class="modal-card-head">
                                        <p class="modal-card-title">Modal title</p>
                                        <button class="delete" aria-label="close"></button>
                                    </header> -->
                                <div class="modal-background"></div>
                                <div class="modal-content">
                                    <div class="box">
                                        <div class="content has-text-centered">
                                            <p class="control" />
                                            <h5>{{messageUpload}}</h5>
                                            <input type="file" ref="file" @change="selectFile" class="file-input" accept=".jpg, .png, .gif" id="inputCovr" />
                                            <img v-if="url" :src="url" id="cover"/>
                                            <span>&nbsp;</span>
                                            <span v-if="file" class="file-name">{{file.name}}</span>
                                            <p>{{message}}</p>
                                            <div class="column" id="update">
                                                <md-button class="md-raised md-primary" @click="sendFile" @submit="onSubmit">Update</md-button>
                                                <md-button class="md-accent" @click="close">cancle</md-button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- <button @click="close" class="modal-close"></button> -->
                            </div>
                        </div>
                    </span>
                    <!-- <span class="file-cta">
                        <span class="file-label" id="cover_choose" @click="selectFile">
                            Upload Cover
                        </span>
                    </span> -->
                </label>
            </div>
        </div>
    </div>
</form>
</template>

<script>
import axios from 'axios';
import {
    mapActions,
    mapGetters
} from 'vuex';
export default {
    name: "uploadCover",
    data() {
        return {
            file: " ",
            project_id: "1",
            cover: null,
            path_name: '',
            message: " ",
            error: false,
            url: null,
            isActive: false,
            messageUpload: "+ อัพโหลดรูปภาพ",
            headerCover: "Cover Image"
        }
    },
    methods: {
        ...mapActions([
            'setFile',
            'setPath'
        ]),
        selectFile(e) {
            this.file = this.$refs.file.files[0];
            this.error = false;
            this.message = " ";
            const file = e.target.files[0];
            this.url = URL.createObjectURL(file);
        },
        // ----------------------------------------------
        async sendFile() {
            const formData = new FormData();
            formData.append('file', this.file);
            formData.append('project_id', this.$route.params.pId);
            formData.append('isCover', true);
            // console.log("formdata : ",formData)

            // this.isActive = false

            try {
                const {
                    data
                } = await axios.post('https://www.sit-acc.nruf.in.th/files/image', formData)

                this.message = "File has been uploaded";
                this.error = false;
                console.log(data)
                this.setFile(data.url)
                this.isActive = false;
                // this.setFile(data.status)

            } catch (err) {
                console.log('FAILURE!!' + err)
                this.message = "Something went wrong";
                this.error = true;
            }
        },
        // -----------------------------------

        updateCover() {
            console.log("updateCover")
        },
        launch: function () {
            this.isActive = true;
        },
        close: function () {
            this.isActive = false;
            this.url =''
        },
        onSubmit(e) {
            const file = this.$refs.file.files[0];
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
        },
        beforeDestroy() {
            this.setFile(" ")
        }
    },
}
</script>

<style>
#cover_update {
    height: 54px;
    margin-left: 10%;
}

#cover_choose {
    height: 20px;
}

.file-name {
    border: none
}

/* .columns {
    margin-top: 2%;
} */

#cover {
    margin-left: -20%;
    margin-top: -2%;
}

#preview {
    display: flex;
    justify-content: center;
    align-items: center;
}

#preview img {
    max-width: 100%;
    max-height: 500px;
}

#uploadCover {
    height: 55px;
}

.modal {
    overflow: hidden;
}
#cover{
    max-width: 300px;
    max-height: 300px;
    margin-right: -120px;
    margin-top: 10px

}
</style>
