<template>
  <div>
      <form enctype="multipart/form-data">
        <div class="field">
            <div class="file is-primary">
                    <input 
                        accept="application/pdf"
                        multiple
                        type="file"
                        ref="files"
                        @change="selectFiles"
                        class="file-input"
                    />
                    <span @click="addFiles" class="file-cta">
                        <span class="file-icon">
                            <i class="fas fa-upload"></i>
                        </span>
                        <span class="file-label">
                            Choose a file...
                        </span>
                    </span>
                    <input type="file" name="" id="" value="Choose file saeeeee">
            </div>

            <div v-for="(file, key) in files" class="file-listing" v-bind:key="key">
                <div class="columns">
                    <div class="column">
                        {{ file.name }} 
                    </div>
                    <div class="column">
                        <span class="delete" v-on:click="removeFile( key )"></span>
                    </div>
                </div>
            </div>
            <button @click.prevent="submitFiles">Submit</button><br>
            {{files.length}} 
        </div>
      </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            files: []
        }
    },
    methods: {
        addFiles: function(){
            this.$refs.files.click();
        },
        removeFile( key ){
            this.files.splice( key, 1 );
            console.log(this.files)
            
        },
        selectFiles: function(){
            let uploadedFiles = this.$refs.files.files;
            console.log(this.files)
            
            for( var i = 0; i < uploadedFiles.length; i++ ){
                this.files.push( uploadedFiles[i] );
            }
        },
        async submitFiles(){
            const formData = new FormData();
            for( var i = 0; i < this.files.length; i++ ){
                let file = this.files[i];
                if(file.size < 10000000 && this.files.length <= 2){
                    formData.append('files[' + i + ']', file);
                }else if(this.files.length > 2) {
                    alert('You can upload just 2 files')
                    return;
                }
                else{
                    alert('Too large. Max size is 10 Mb')
                    return;
                }
            }
            try {
                await axios.post('http://localhost:7000/files/document',formData) // ('/api', ที่จะส่งไป) URL we will be POSTing to
                .then(function(){ console.log('SUCCESS!!');})
            } catch(err) {
                console.log('FAILURE!!'+err)
            }
        }
    }
}
</script>


<style>
input[type="file"]{
    position: absolute;
    top: -500px;
}

div.file-listing{
    width: 600px;
}

.delete{
    cursor: pointer;
    float: right;
}

.delete:hover{
    background-color: #EB5656;
}

.file-cta {
    background-color: #EB5656 !important;
}

.file-cta:hover {
    cursor: pointer;
    background-color: #DE3434 !important;
}
</style>
