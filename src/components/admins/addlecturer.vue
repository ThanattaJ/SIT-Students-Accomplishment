<template>
<div>
    <multi-select :options="options" :selected-options="items" placeholder="select item" @select="onSelect" style="position: absolute; max-width: 200px; font-size: 12px">
    </multi-select>
    <!-- <div v-for="(lecturer,index) in items" v-bind:key="index">
        {{index+1}} . {{lecturer.firstname}} {{lecturer.lastname}}
    </div> -->
</div>
</template>

<script>
import _ from 'lodash'
import {
    MultiSelect
} from 'vue-search-select'
import {
    mapGetters,
    mapActions
} from 'vuex';

export default {
    data() {
        return {
            options: [],
            searchText: [],
            items: [],
            lastSelectItem: {}

        }
    },
    computed: {
        ...mapGetters([
            'get_lecturer',
            'get_select_lecturer'
        ]),
    },
    methods: {
        ...mapActions([
            'set_select_lecturer',
            'set_lecturer'
        ]),
        onSelect(items, lastSelectItem) {
            this.items = items
            this.lastSelectItem = lastSelectItem
            // for (let i = 0; i < this.items.length; i++) {
            //     this.set_select_lecturer(this.items[i].text)
            // }
            // console.log("get_lecturer : ", this.get_select_lecturer)
        },
        reset() {
            this.items = []
        },
        selectFromParentComponent() {
            this.items = _.unionWith(this.items, [this.options[0]], _.isEqual)
        }
    },
    mounted() {
        for (let i = 0; i < this.get_lecturer.length; i++) {
            this.options.push({
                text: this.get_lecturer[i].firstname + " " + this.get_lecturer[i].lastname,
                value: i 
            })
        }

    },
    components: {
        MultiSelect
    },
}
</script>
