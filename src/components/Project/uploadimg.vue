<template>
    <form @submit.prevent="sendFile" enctype="multipart/form-data">
        <div class="field">
            <div class="file is-boxed is-primary">
                <label class="file-label" >
                    <input 
                        type="file"
                        ref="file"
                        @change="selectFile"
                        class="file-input"
                    />
                    <span class="file-cta">
                        <span class="file-icon">
                            <i class="fas fa-upload"></i>
                        </span>
                        <span class="file-label">
                            Choose a file...
                        </span>
                    </span>
                    <span v-if="file" class="file-name">{{file.name}}</span>
                </label>
            </div>    
        </div>
        <div class="fied">
            <button class="button is-info">Send</button>
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

            
        }
    },
    methods:{
        selectFile(){
            this.file = this.$refs.file.files[0];
        },
        async sendFile(){
            const formData = new FormData();
            formData.append('file', this.file);

            try{
                await axios.post('http://localhost:7000/files/image', data);
            }catch(err){
                console.log(err)
            }
        }
    }
}
</script>
