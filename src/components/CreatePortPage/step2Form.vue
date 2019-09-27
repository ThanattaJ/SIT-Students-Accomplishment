<template>
    <div>
        <div class="stepName">Project Overview <i class="la la-file-text-o"></i></div>
        <div class="field">
            <label class="label inputName">Abstract(English/Thai)</label>
            <div class="control">
                <textarea v-model="project_abstract" @blur="handleUpdate('UPDATE_FIELD','SET_PROJECT_ABSTRACT')" ref="projectDetail" class="Normal textarea inputData portDetail" placeholder="เช่น ระบบจําลองภาพเสมือนหอสมุดโดยนําเทคโนโลยี Virtual Reality มาใช้ทํางานร่วมกับหอสมุดของมหาวิทยาลัยเพื่อศึกษาพัฒนาระบบจำลองภาพเสมือนหอสมุดให้มีความน่าสนใจมากยิ่งขึ้น"></textarea>
                <p ref="projectDetailValidate" class="help is-danger"></p>
                <br>
            </div>
        </div>
        <div class="field">
            <label class="label inputName">Project Detail(English/Thai)</label>
            <div class="control">
                <textarea v-model="project_detail" @blur="handleUpdate('UPDATE_FIELD','SET_PROJECT_DETAIL')" ref="abstract" class="Normal textarea inputData portDetail" placeholder="e.g. Virtual Reality is applied to the KMUTT Library for VR study and development to help explore different views." maxlength="200"></textarea>
                <p ref="abstractValidate" class="help is-danger"></p>
                <div class="field is-grouped is-grouped-right">{{count}}/200</div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    mapGetters,
    mapActions
} from 'vuex'

export default {
    data(){
        return{
            count: 0,
            project_detail: "",
            project_abstract: ""
        }
    },
    mounted() {
        this.project_detail = this.GET_PROJECT_DETAIL
        this.project_abstract = this.GET_PROJECT_ABSTRACT
    },
    computed: {
        ...mapGetters([
            'GET_PROJECT_DETAIL',
            'GET_PROJECT_ABSTRACT'
        ])
    },
    methods: {
        ...mapActions(['UPDATE_FIELD']),
        handleUpdate(actionName, setter) {
            this[actionName]({
                callSetter: setter,
                value: event.target.value
            })
        }
    }
}
</script>

