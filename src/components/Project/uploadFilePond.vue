<template>
<div id="app">
    <div v-if="clickUpload==true" >
        <div  v-for="(file,index) in files" v-bind:key="index">
            {{file}}
        </div>
    </div>
    <file-pond v-if="clickUpload==false"
        name="test" 
        ref="pond" 
        label-idle="Drop files here..." 
        v-bind:allow-multiple="true" 
        accepted-file-types="application/pdf" 
        :server="api"
        v-bind:files="myFiles" 
        v-on:init="handleFilePondInit" 
        v-bind:maxFiles="2"
        maxFileSize="5MB"
    />
    <button v-if="clickUpload==true" @click="clickUpload = !clickUpload">upload</button>
    <button v-if="clickUpload==false" @click="clickUpload = !clickUpload;loadAllDocs()">save</button>

    <!-- v-bind:instantUpload="false"  -->
</div>
</template>

<script>
import axios from 'axios';
// Import Vue FilePond
import vueFilePond from 'vue-filepond';
// Import FilePond styles
import './filepond.min.css';
// Import image preview plugin styles
import './filepond-plugin-image-preview.min.css';
// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import { mapGetters } from 'vuex';
// import {
//     async
// } from 'q';

// Create component
const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview, FilePondPluginFileValidateSize);

export default {
    name: 'app',
    computed:{
        ...mapGetters([
            'getPID'
        ])
    },
    data: function () {
        return {
            clickUpload: true,
            files: [],
            myFiles: [],
            // apiPath: "http://localhost:7000/files/document",
            apiPath: "https://www.sit-acc.nruf.in.th/files/document",
            api: {
                process: async (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
                    const formData = new FormData();
                    formData.append('file', file);
                    formData.append('project_id', "1");

                    const request = new XMLHttpRequest();
                    request.open('POST', this.apiPath);

                    request.upload.onprogress = (e) => {
                        progress(e.lengthComputable, e.loaded, e.total);
                    };

                    request.onload = function () {
                        if (request.status >= 200 && request.status < 300) {
                            // console.log('req :', request.responseText)
                            load(request.responseText);
                        } else {
                            error('oh no');
                        }
                    };

                    request.send(formData);

                    return {
                        abort: () => {
                            request.abort();
                            abort();
                        }
                    };
                },
                revert: async (uniqueFileId, load, error) => {
                    let path_name
                    try {
                        path_name = JSON.parse(uniqueFileId).url
                    } catch (error) {
                        path_name = uniqueFileId
                    }
                    // console.log('unq :', uniqueFileId)
                    const res = await axios.delete(this.apiPath, {
                        data: {
                            path_name
                        }
                    })
                    // console.log('res : ', res)
                },
            }
        };
    },

    async mounted() {
        this.loadAllDocs()
        // const { data } = await axios.get('http://localhost:7000/projects/1')
        // console.log("getID : ",this.getPID)
        const { data } = await axios.get(`https://www.sit-acc.nruf.in.th/projects/${this.$route.params.pId}`)
        const doc = data.document.map((_item, index = 0) => _item.path_name);

        for (let i = 0; i < doc.length; i++) {
            // console.log('doc : ', doc)
            var docName = doc[i].substring(doc[i].lastIndexOf("/", doc[i].length - 1)).substring(1)
            this.myFiles.push({
                source: doc[i],
                options: {
                    type: 'limbo',
                    file: {
                        name: docName.substring(docName.lastIndexOf("_")).substring(1),
                        type: 'application/pdf',
                        // size: 3001025
                    }
                }
            })
        }
    },

    methods: {
        handleFilePondInit: async function () {
            console.log('FilePond has initialized');
        },
        loadAllDocs: async function () {
            this.files = []
            // const { data } = await axios.get('http://localhost:7000/projects/1')
            const { data } = await axios.get(`https://www.sit-acc.nruf.in.th/projects/${this.$route.params.pId}`)
            const doc = data.document.map((_item, index = 0) => _item.path_name);

            for (let i = 0; i < doc.length; i++) {
                var docName = doc[i].substring(doc[i].lastIndexOf("/", doc[i].length - 1)).substring(1)
                this.files.push(docName.substring(docName.lastIndexOf("_")).substring(1))
            }
        }
    },
    components: {
        FilePond
    }
};
</script>
