<template>
<div>
    <div class="stepName">Create Project <i class="la la-edit"></i></div>

    <div class="field">
        <label class="label inputName">Project Name (English) <span class="require">*</span></label>
        <ValidationProvider name=" Project Name (English) " rules="required">
            <div class="control" slot-scope="{ errors }">
                <input v-model="project_name_en" @blur="handleUpdate('UPDATE_FIELD','SET_PROJECTNAME_EN')" ref="portNameEN" class="input inputData" type="text" placeholder="e.g. Library VR">
                <p class="help is-danger">{{ errors[0] }}</p>
            </div>
        </ValidationProvider>
    </div>

    <div class="field">
        <label class="label inputName">ชื่อผลงาน (ภาษาไทย) <span class="require">*</span></label>
        <ValidationProvider name=" ชื่อผลงาน (ภาษาไทย) " rules="required">
            <div class="control" slot-scope="{ errors }">
                <input v-model="project_name_th" @blur="handleUpdate('UPDATE_FIELD','SET_PROJECTNAME_TH')" ref="portNameTH" class="input inputData" type="text" placeholder="เช่น ระบบจําลองภาพเสมือนหอสมุด">
                <p class="help is-danger">{{ errors[0] }}</p>
            </div>
        </ValidationProvider>
    </div>
    <!-- ------ When did you start the project? ------ -->
    <div class="columns">
        <div class="column">
            <div class="inputName">When did you start the project?</div>
            <ValidationProvider name=" start project " rules="required">
                <div slot-scope="{ errors }">
                    <VueMonthlyPicker id='startDate' v-model="startProject" @selected="handleUpdateStartDate('UPDATE_FIELD','SET_DATE_STARTPROJECT')" :monthLabels="month" selectedBackgroundColor="#007bff" placeHolder="Select month" dateFormat="MMM, YYYY">
                    </VueMonthlyPicker>
                    <p class="help is-danger">{{ errors[0] }}</p>
                </div>
            </ValidationProvider>
        </div>
        <div class="column">
            <div class="inputName">When did you finish the project?</div>
            <ValidationProvider name=" end project " rules="required">
                <div slot-scope="{ errors }">
                    <VueMonthlyPicker id='endDate' v-model="endProject" @selected="handleUpdateEndDate('UPDATE_FIELD','SET_DATE_ENDPROJECT')" :monthLabels="month" selectedBackgroundColor="#007bff" placeHolder="Select month" dateFormat="MMM, YYYY">
                    </VueMonthlyPicker>
                    <p class="help is-danger">{{ errors[0] }}</p>
                </div>
            </ValidationProvider>
        </div>
    </div>
</div>
</template>

<script>
import VueMonthlyPicker from 'vue-monthly-picker'
import {
    mapGetters,
    mapActions
} from 'vuex'
import {
    ValidationObserver,
    ValidationProvider
} from "vee-validate";

export default {
    name: 'CloseOnSelectDatepicker',
    data() {
        return {
            project_name_th: null,
            project_name_en: null,

            month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            startProject: null,
            endProject: null,
        }
    },
    components: {
        VueMonthlyPicker,
        ValidationObserver,
        ValidationProvider
    },
    mounted() {
        this.project_name_en = this.GET_PROJECTNAME_EN
        this.project_name_th = this.GET_PROJECTNAME_TH
        this.startProject = this.GET_DATE_STARTPROJECT
        this.endProject = this.GET_DATE_ENDPROJECT
    },
    computed: {
        ...mapGetters([
            'GET_PROJECTNAME_EN', 'GET_PROJECTNAME_TH', 'GET_DATE_STARTPROJECT', 'GET_DATE_ENDPROJECT',
        ])
    },
    methods: {
        ...mapActions(['UPDATE_FIELD']),
        handleUpdate(actionName, setter) {
            this[actionName]({
                callSetter: setter,
                value: event.target.value
            })
        },
        handleUpdateStartDate(actionName, setter) {
            var startProject = this.startProject
            this[actionName]({
                callSetter: setter,
                value: startProject,
            })
        },
        handleUpdateEndDate(actionName, setter) {
            var endProject = this.endProject
            this[actionName]({
                callSetter: setter,
                value: endProject,
            })
        }
    }
}
</script>
