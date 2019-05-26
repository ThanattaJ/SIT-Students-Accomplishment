<template>
    <form @submit.prevent="sendFile" enctype="multipart/form-data">
    <div class="columns">
        <div class="column">
            <div class="file is-boxed is-primary">
                <label class="file-label" >
                    <input 
                        type="file"
                        ref="file"
                        @change="selectFile"
                        class="file-input"
                        accept=".jpg, .png, .gif"
                    />
                    <span class="file-cta">
                        <span class="file-label" id="button_choose">
                            Choose a file...
                        </span>
                    </span>
                    <span v-if="file" class="file-name">{{file.name}}</span>
                </label>
            </div>    
        </div>
        <div class="column" id="update">
            <button class="button is-info" id="button_update">Update</button>
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
            error: false    
        }
    },
    methods:{
        selectFile: function(){
            this.file = this.$refs.file.files[0];
            this.error = false;
            this.message =" ";
        },
        async sendFile(){
            const formData = new FormData();
            formData.append('file', this.file);
            formData.append('project_id',this.$route.params.pId);
            formData.append('isCover',"false");
            try{
                await axios.post('http://34.73.213.209:7000/files/image',formData)
                .then(function(res){ console.log(res);})
                this.message = "File has been uploaded";
                this.file=" ";
                this.error = false;
            }catch(err){
                console.log('FAILURE!!'+err)
                this.message = "Something went wrong";
                this.error = true;
            }
        }
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
</style>
 