<template>
    <div class="">
        <!-- <div class="container"> -->
            <form enctype="multipart/form-data">
                <table class="table" v-if="uploaded.length!=0" style="height:60px">
                    <tbody v-for="(upload,index) in uploaded" v-bind:key="index">
                        <tr>
                            <td style="padding-left: 0;"><a v-bind:href="upload.path_name">{{upload.doc_name}}</a></td>
                            <td><button v-if="clickUpload==true" @click.prevent="removeUploadedDocument(index)" class="delete"></button></td>
                        </tr>
                    </tbody>
                </table>
      {{countFileUploaded}}
                <div class="uploadDocument" v-if="clickUpload">
                        <div class="filed" v-if="countFileUploaded<2">
                            <div class="columns">
                                <div class="column is-four-fifths">
                                    <div class="file has-name">
                                        <label class="file-label">
                                            <input 
                                                accept="application/pdf,application/zip" 
                                                class="file-input" 
                                                type="file" 
                                                ref = "file" 
                                                @change="handleFileUpload">
                                            <span class="file-cta">
                                            <span class="file-icon"><i class="fas fa-upload"></i></span>
                                            <span class="file-label">Choose a file…</span>
                                            </span>

                                            <span class="file-name has-icon-right" style="width: 200px;">{{file['name']}}</span>

                                        </label>
                                    </div>
                                </div>
                                <div class="column is-one-fifth" style="margin-right: -100px;">
                                    <span ref="submit" class="button is-warning" v-on:click="submitFile" style="height: 36px;width: 36px;margin-right: 10px;">
                                        <i class="la la-upload" style="color:white;font-size:18px;"></i>
                                    </span>
                                    <span class="button is-danger" v-on:click="removeFile" style="height: 36px;width: 36px;">
                                        <i class="la la-trash" style="color:white;font-size:18px;"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <p ref="fileValidate" class="help is-danger"></p>
                        <p ref="over2docs" class="help is-danger" style="margin-bottom:10px"></p>

                        <br>
                </div>   
                <div class="control">
                    <button style="width: 77px;" class="button is-link" @click.prevent="clickUpload=!clickUpload">
                        <span v-if="clickUpload==false">Upload</span>
                        <span v-if="clickUpload==true">Save</span>
                    </button>
                </div>
            </form>
        <!-- </div> -->
    </div>
</template>


<script>
import axios from 'axios';
import {
    mapGetters,
    mapActions,
} from 'vuex'
  export default {
    computed: {
    ...mapGetters({
        URL: 'GET_PATHNAME'
    }),
    },
    data(){
      return {
        file: "",
        countFileUploaded: 0,
        clickUpload: false,
        uploaded: [] //ใช้ตอนดู port page
      }
    },
    //-------------------------------------------------------ใช้ตอนดู port page--------------------------------------------------
    async mounted() {
        // console.log("ดึงจาก db ครั้งที่ 1")

        const { data } = await axios.get(`${this.URL}/projects/${this.$route.params.pId}`)
        const doc = data.document.map((_item , index = 0) => _item.path_name);
        for(let i=0;i<doc.length;i++){
            var docName = doc[i].substring(doc[i].lastIndexOf("/", doc[i].length-1)).substring(1)
            this.uploaded.push({
              doc_name: docName.substring(docName.lastIndexOf("_")).substring(1),
              path_name: doc[i]
            })
        }
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
            console.log("ไม่เอา file นี้")
            this.file = "";
        },
        async removeUploadedDocument(index){
            try {
                await axios.delete(`${this.URL}/files/document`, {
                data: {"path_name": this.uploaded[index].path_name}
            } )
            
                .then(function(){ 
                    console.log('SUCCESS!!');
                    })
            }catch(err) {
                console.log('FAILURE!!'+err)
            }

            this.file = "";
            this.uploaded.splice(index,1);
            for(var i=1;i<this.uploaded.length;i++){
                console.log(i + " : " + this.uploaded[i].path_name)
            }

            const { data } = await axios.get(`${this.URL}/projects/${this.$route.params.pId}`)
            const doc = data.document.map((_item , index = 0) => _item.path_name);
            this.countFileUploaded = doc.length; 
        },
        async submitFile(){
            let formData = new FormData();
            if(this.file!=""){
                // ดักในกรณีที่อัพไฟล์ชื่อซ้ำอันเก่า
                // if(this.uploaded!=[]){
                //     if(this.uploaded.length == 1){
                //         if(this.file['name'] == this.uploaded[0].doc_name){
                //             this.$refs.fileValidate.innerHTML = 'Document name the same as your uploaded'
                //         }
                //     }
                    
                // }
                formData.append('file', this.file);
                formData.append('project_id', "1");
                if(this.countFileUploaded < 2){
                    if(this.file.size > 10000000){
                        this.$refs.fileValidate.innerHTML = 'Too large. Max size is 10 Mb'
                    }else{
                        try {
                            console.log("เอาลง db")
                            await axios.post(`${this.URL}/files/document`,formData)
                            .then(function(){ console.log('SUCCESS!!');})
                            this.file = "";
                            
                            const { data } = await axios.get(`${this.URL}/projects/${this.$route.params.pId}`)
                            const doc = data.document.map((_item , index = 0) => _item.path_name);
                            this.countFileUploaded = doc.length; 
                            
                            this.uploaded = []
                            for(let i=0;i<doc.length;i++){
                                var docName = doc[i].substring(doc[i].lastIndexOf("/", doc[i].length-1)).substring(1)
                                this.uploaded.push({
                                    doc_name: docName.substring(docName.lastIndexOf("_")).substring(1),
                                    path_name: doc[i]
                                })
                            }  
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