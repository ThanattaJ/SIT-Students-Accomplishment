<template>
        <div id="Profile-bg">
            <div class="body" id="body">
                <div class="columns is-gapless.is-centered" id="head-table">
                    <div class="button column" id="th">
                        <router-link to="/Profile" >Profile</router-link> 
                    </div>
                    <div class="button column" id="tb" >
                        <router-link to="/Project" >Project</router-link> 
                    </div>
                    <div class="button column" id="tb" >
                        <router-link to="/AssiPrgnment" >Assignment</router-link> 
                    </div>
                    <div class="button column" id="tb" >
                        Fingerprint
                    </div>
                    <div class="button column" id="te" >
                        Generate Resume
                    </div>
                </div>
            </div>
        </div>
  
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style scoped>
#Profile-bg{ 
  width: 80%;
  margin-left: 10%;
  margin-top: 10%;
}

</style>
