<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Go go go</h2>
    <ul>
      <li>
        <a
          href="https://www.sit.kmutt.ac.th/"
          target="_blank"
        >
          SIT KMUTT
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'SIT Studens Accomplishment'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #b94242;
}
</style>
