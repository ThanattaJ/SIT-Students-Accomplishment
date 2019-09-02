<template>
    <form @submit.prevent="" enctype="multipart/form-data">
    <div class="columns" id="imageUpdate">
        <div class="column">
            <div class="file is-boxed is-primary">
                <label class="file-label" >
                    <span class="file">
                        <div class="container">
                             <div class="content has-text-centered">
                                <p class="control">
                                    <button v-on:click="launch" class="button is-primary" 
                                    id="uploadCover">Upload Image</button>
                                </p>
                            </div>
                                <div class="modal" v-bind:class="{'is-active':isActive}" id="modalImage">
                                    <div class="modal-background"></div>
                                        <div class="modal-content">
                                            <div class="box">
                                                <div class="content has-text-centered">
                                                    <p class="control"/>
                                                    <h5>{{messageUpload}}</h5>
                                                    <input 
                                                        type="file"
                                                        ref="file"
                                                        @change="selectFile"
                                                        class="file-input"
                                                        accept=".jpg, .png, .gif"
                                                        id="inputCovr"
                                                    />
                                                    <img v-if="url" :src="url" />
                                                    <span>&nbsp;</span>
                                                    <span v-if="file" class="file-name">{{file.name}}</span>
                                                    <p>{{message}}</p>
                                                    <div class="column" id="update">
                                                        <button class="button is-info" id="image_update" @click="sendFile"  @submit="onSubmit">Update</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button @click="close" class="modal-close"></button>
                                </div>
                        </div>
                    </span>
                </label>
            </div>    
        </div>
    </div>
    </form>
</template>
<script>
import axios from 'axios';
export default {
    name: "uploadimg",
    data(){
        return{
            file:" ",
            project_id: 1,
            path_name:'',
            message: " ",
            error: false,
            url: null,
            isActive: false,
            messageUpload: "+ อัพโหลดรูปภาพ",
            headerCover : "Cover Image"   
        }
    },
    methods:{
        selectFile(e){
            this.file = this.$refs.file.files[0];
            this.error = false;
            this.message =" ";
            const file = e.target.files[0];
            this.url = URL.createObjectURL(file);
        },
        async sendFile(){
            const formData = new FormData();
            formData.append('file', this.file);
            formData.append('project_id',this.$route.params.pId);
            formData.append('isCover',"false");
            // "false"
            try{
                await axios.post('http://localhost:7000/files/image',formData)
                .then(function(res){ console.log(res);})
                    this.message = "File has been uploaded";
                    this.file=" ";
                    this.error = false;
            }catch(err){
                console.log('FAILURE!!'+err)
                    this.message = "Something went wrong";
                    this.error = true;
            }
        },
        updateCover(){
            console.log("updateCover")
        },
        launch: function() {
            this.isActive = true;
        },
        close: function() {
            this.isActive = false;
        },
        onSubmit(e) {
            const file = this.$refs.file.files[0];
            if (!file) {
              e.preventDefault();
              alert('No file chosen');
              return;
            }
            if (file.size >  1024) {
              e.preventDefault();
              alert('File too big (> 1MB)');
              return;
            }
            alert('File OK');
        },
    }
}
</script>
<style>
    #update{
        margin-right: 60%;
    }
    #button_update{
        height: 54px;
    }
    #button_choose{
        height: 20px;
    }
    .file-name{
        border: none
    }
    .columns{
        margin-top: 2%;
    }
    #cover{
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
    #uploadCover{
        height: 55px;
    }
    .modal{
        overflow: hidden;
    }
</style>
 