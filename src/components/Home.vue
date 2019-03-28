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
import './css/Home.css'
export default {
  name :'Home'
}
</script>

