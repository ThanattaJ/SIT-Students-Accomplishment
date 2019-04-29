<template>
 <div id="app">
     {{ info }}
</div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      info:null
    }
  },
  methods: {
    mounted () {
    axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => (this.info = response))
   }
  }

}
</script>

<style scoped>

</style>
