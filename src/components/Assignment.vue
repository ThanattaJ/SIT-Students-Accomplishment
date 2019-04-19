<template>
 <div id="app">
  <div>
    First Name:
    <input type="text" v-model="user.firstName" :disabled="!isEditing"
           :class="{view: !isEditing}">
  </div><div>
    Last Name:
    <input type="text" v-model="user.lastName" :disabled="!isEditing"
           :class="{view: !isEditing}">  
  </div>
  <button @click="isEditing = !isEditing" v-if="!isEditing">Edit</button>
  <button @click="save" v-else-if="isEditing">Save</button>
  <button v-if="isEditing" @click="cancel">Cancel</button>
</div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      isEditing: false,
      msg: 'Welcome to Your Vue.js App',
      user: {
      firstName: 'John',
      lastName: 'Smith',
    }
      
    }
  },
    mounted() {
    this.cachedUser = Object.assign({}, this.user);
  },
  methods: {
    save() {
      this.cachedUser = Object.assign({}, this.user);
      this.isEditing = false;
    },
    cancel() {
      this.user = Object.assign({}, this.cachedUser);
      this.isEditing = false;
    }
  }

}
</script>

<style scoped>
  #test{
        margin-top: 100px;
    }
    .view {
  border-color: transparent;
  background-color: initial;
  color: initial
}

</style>
