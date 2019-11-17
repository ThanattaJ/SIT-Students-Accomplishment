<template>
<div id="app">
    <!-- <div v-if="clickUpload==true">
        <div v-for="(file,index) in files" v-bind:key="index">
            {{file}}
        </div>
    </div> -->
    <file-pond name="test" ref="pond" label-idle="Click to Upload or Drop files here..." v-bind:allow-multiple="true" accepted-file-types="application/pdf" :server="api" v-bind:files="myFiles" v-on:init="handleFilePondInit" v-bind:maxFiles="2" maxFileSize="5MB" />
    <!-- <file-pond v-if="clickUpload==false" name="test" ref="pond" label-idle="Click to Upload or Drop files here..." v-bind:allow-multiple="true" accepted-file-types="application/pdf" :server="api" v-bind:files="myFiles" v-on:init="handleFilePondInit" v-bind:maxFiles="2" maxFileSize="5MB" /> -->

    <!-- <button v-if="clickUpload==true" @click="clickUpload = !clickUpload">upload</button> -->
    <!-- <button v-if="clickUpload==false" @click="clickUpload = !clickUpload;loadAllDocs();showFileinFilepond()">save</button> -->

</div>
</template>

<script>
import axios from 'axios';
import vueFilePond from 'vue-filepond';
import './filepond.min.css';
import './filepond-plugin-image-preview.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import {
    mapGetters
} from 'vuex';

// Create component
const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview, FilePondPluginFileValidateSize);

export default {
    name: 'app',
    computed: {
        ...mapGetters([
            'getPID', 'GET_CONFIG', 'GET_PATHNAME'
        ])
    },
    data: function () {
        return {
            clickUpload: true,
            files: [],
            myFiles: [],
            api: {
                process: async (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
                    const formData = new FormData();
                    formData.append('file', file);
                    var project_id = this.$route.params.pId
                    formData.append('project_id', project_id);

                    const request = new XMLHttpRequest();
                    request.open('POST', this.GET_PATHNAME + '/files/document');
                    request.upload.onprogress = (e) => {
                        progress(e.lengthComputable, e.loaded, e.total);
                    };
                    request.onload = function () {
                        if (request.status >= 200 && request.status < 300) {
                            load(request.responseText);
                            console.log("upload document success")
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
                    let path_name;
                    try {
                        path_name = JSON.parse(uniqueFileId).url
                    } catch (error) {
                        path_name = uniqueFileId
                    }
                    console.log("delete document success")
                    const res = await axios.delete(this.GET_PATHNAME + '/files/document', {
                        data: {
                            path_name
                        }
                    })
                },
            }
        };
    },

    async mounted() {
        // this.loadAllDocs()
        this.showFileinFilepond()
    },

    methods: {
        handleFilePondInit: async function () {
            console.log('FilePond has initialized');
        },
        // loadAllDocs: async function () {
        //     this.files = []
        //     const {
        //         data
        //     } = await axios.get(this.GET_PATHNAME + `/projects/?project_id=${this.$route.params.pId}`)
        //     const doc = data.document.map((_item, index = 0) => _item.path_name);

        //     for (let i = 0; i < doc.length; i++) {
        //         var docName = doc[i].substring(doc[i].lastIndexOf("/", doc[i].length - 1)).substring(1)
        //         this.files.push(docName.substring(docName.lastIndexOf("_")).substring(1))
        //     }
        // },
        showFileinFilepond: async function () {
            this.myFiles = []
            const {
                data
            } = await axios.get(this.GET_PATHNAME + `/projects/?project_id=${this.$route.params.pId}`,
                this.GET_CONFIG)
            const doc = data.document.map((_item, index = 0) => _item.path_name);

            for (let i = 0; i < doc.length; i++) {
                var docName = doc[i].substring(doc[i].lastIndexOf("/", doc[i].length - 1)).substring(1)
                this.myFiles.push({
                    source: doc[i],
                    options: {
                        type: 'limbo',
                        file: {
                            name: docName.substring(docName.lastIndexOf("_")).substring(1),
                            type: 'application/pdf',
                        }
                    }
                })
            }
        }
    },
    components: {
        FilePond
    }
};
</script>
