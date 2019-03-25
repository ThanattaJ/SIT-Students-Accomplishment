<template>
 <div class="Home">
    <div class="header" id="header">
      <div class="text_header" id="text_header"><br/><br/>
        <p>Welcome to School of Information Technology </p><br/>
        <p>@ King Mongkut's University of Technology Thonburi </p>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import './../../node_modules/bulma/css/bulma.css';
import Multiselect from 'vue-multiselect'
export default {
  name :'Home'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#header{
  background: #F8F8F8;
  height: 100px;
}
#text_header{
  text-align: center;
  font-size: 10px;
  background: #F8F8F8;
} 
</style>
