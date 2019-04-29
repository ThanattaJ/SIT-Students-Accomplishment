<template>
    <div class="section">
        <div class="container">
            <form enctype="multipart/form-data">
  <!-- ใช้ตอนดู port page -->
      <!-- <div v-for="(upload,index) in uploaded" v-bind:key="index">
        <a v-bind:href="upload.path_name">{{upload.doc_name}}</a>
      </div> -->
      {{countFileUploaded}}
            <p ref="uploadSuccess" v-if="this.countFileUploaded === 1" class="help is-danger" style="margin-bottom:10px">Uploaded 1 file success</p>
            <p ref="uploadSuccess" v-if="this.countFileUploaded === 2" class="help is-danger" style="margin-bottom:10px">Uploaded 2 file success</p>
<br><br>
            <div class="filed" v-if="countFileUploaded<2">
                <div class="columns">
                <div class="column is-four-fifths">
                    <div class="file has-name is-fullwidth">
                    <label class="file-label">
                        <input 
                            accept="application/pdf" 
                            class="file-input" 
                            type="file" 
                            ref = "file" 
                            @change="handleFileUpload">
                        <span class="file-cta">
                        <span class="file-icon"><i class="fas fa-upload"></i></span>
                        <span class="file-label">Choose a file…</span>
                        </span>

                        <span class="file-name has-icon-right">{{file['name']}}</span>

                    </label>
                    </div>
                </div>
                <div class="column is-one-fifth" style="margin-right: -100px;">
                    <span ref="submit" class="button is-warning" v-on:click="submitFile" style="height: 36px;width: 36px;margin-right: 10px;">
                    <i class="fas fa-upload" style="color:white;font-size:18px;"></i>
                    </span>
                    <span class="button is-danger" v-on:click="removeFile" style="height: 36px;width: 36px;">
                    <i class="fas fa-times" style="color:white;font-size:18px"></i>
                    </span>
                </div>
                </div>
            </div>
            <p ref="fileValidate" class="help is-danger"></p>
            <p ref="over2docs" class="help is-danger" style="margin-bottom:10px"></p>
            <br><br>
            <div class="control">
                <button class="button is-link">Update</button>
            </div>
        </form>
        </div>
        
    </div>
</template>


<script>
import axios from 'axios';
  export default {
    data(){
      return {
        file: "",
        countFileUploaded: 0,
        // uploaded: [] //ใช้ตอนดู port page
      }
    },
    //-------------------------------------------------------ใช้ตอนดู port page--------------------------------------------------
    async mounted() {
        var path = window.location.href
        var sub = path.substring(path.lastIndexOf("/", path.length-1)).substring(1)
        console.log(sub)


        //connect API ดึง document
        // const { data } = await axios.get('http://localhost:7000/projects/3')
        // const doc = data.document.map((_item , index = 0) => _item.path_name);
        // for(let i=0;i<doc.length;i++){
        //     this.uploaded.push({
        //       doc_name: doc[i].substring(doc[i].lastIndexOf("/", doc[i].length-1)).substring(1),
        //       path_name: doc[i]
        //     })
        // }
        // console.log(this.uploaded)

        const { data } = await axios.get('http://localhost:7000/projects/23')
        const doc = data.document.map((_item , index = 0) => _item.path_name);
        console.log(doc.length)
        this.countFileUploaded = doc.length
    },
    //--------------------------------------------------------------------------------------------------------------------------
    methods: {
        handleFileUpload(){
            this.file = this.$refs.file.files[0];
            if(this.file.size > 10000000){
                this.$refs.fileValidate.innerHTML = 'Too large. Max size is 10 Mb'
            }else{
                this.$refs.fileValidate.innerHTML = ''
            }
        },
        removeFile(){
            this.file = "";
        },
        async submitFile(){
            let formData = new FormData();
            if(this.file!=""){
                formData.append('file', this.file);
                formData.append('project_id', "23");
                if(this.countFileUploaded < 2){
                    if(this.file.size > 10000000){
                        this.$refs.fileValidate.innerHTML = 'Too large. Max size is 10 Mb'
                    }else{
                            this.countFileUploaded++;
                        try {
                            await axios.post('http://localhost:7000/files/document',formData)
                            .then(function(){ console.log('SUCCESS!!');})
                            console.log("countFileUploaded: " +this.countFileUploaded)
                            this.file = "";
                        } catch(err) {
                            console.log('FAILURE!!'+err)
                        }
                    }
                }
            }else{
                this.$refs.fileValidate.innerHTML = "Please choose file"
            }
        }
    }
}
</script>